import { eq } from "drizzle-orm";
import { createAdminUserInviteLinkRoute } from "litecms/server";
import { getDb } from "@/app/db";
import { user } from "@/app/db/auth-schema";
import { requireAdminSession } from "@/app/lib/authz";
import {
  buildPasswordResetLink,
  createPasswordResetToken,
  PASSWORD_RESET_TOKEN_TTL_SECONDS,
} from "@/app/lib/password-reset";

function requireDb() {
  const db = getDb();
  if (!db) {
    throw new Error("DATABASE_URL is not configured");
  }

  return db;
}

export const { POST } = createAdminUserInviteLinkRoute({
  checkAdminAuth: async () => {
    const session = await requireAdminSession();
    return !!session;
  },
  createInviteLink: async ({ id }) => {
    const db = requireDb();

    const targetUser = await db.query.user.findFirst({
      where: eq(user.id, id),
      columns: { id: true },
    });

    if (!targetUser) {
      return null;
    }

    const token = await createPasswordResetToken(targetUser.id);
    const link = buildPasswordResetLink(token);

    return {
      link,
      expiresInSeconds: PASSWORD_RESET_TOKEN_TTL_SECONDS,
    };
  },
});
