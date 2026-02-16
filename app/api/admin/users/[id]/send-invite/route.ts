import { eq } from "drizzle-orm";
import { createAdminUserSendInviteRoute } from "litecms/server";
import { getDb } from "@/app/db";
import { user } from "@/app/db/auth-schema";
import { requireAdminSession } from "@/app/lib/authz";
import { sendPasswordResetEmail } from "@/app/lib/email";
import {
  buildPasswordResetLink,
  createPasswordResetToken,
} from "@/app/lib/password-reset";

function requireDb() {
  const db = getDb();
  if (!db) {
    throw new Error("DATABASE_URL is not configured");
  }

  return db;
}

export const { POST } = createAdminUserSendInviteRoute({
  checkAdminAuth: async () => {
    const session = await requireAdminSession();
    return !!session;
  },
  sendInvite: async ({ id }) => {
    const db = requireDb();

    const targetUser = await db.query.user.findFirst({
      where: eq(user.id, id),
      columns: { id: true, name: true, email: true },
    });

    if (!targetUser) {
      return false;
    }

    const token = await createPasswordResetToken(targetUser.id);
    const inviteLink = buildPasswordResetLink(token);

    await sendPasswordResetEmail({
      to: targetUser.email,
      recipientName: targetUser.name,
      url: inviteLink,
      purpose: "invite",
    });

    return true;
  },
});
