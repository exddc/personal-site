import { and, eq, like } from "drizzle-orm";
import { createAdminUserDeleteRoute } from "litecms/server";
import { getDb } from "@/app/db";
import { user, verification } from "@/app/db/auth-schema";
import { requireAdminSession } from "@/app/lib/authz";

function requireDb() {
  const db = getDb();
  if (!db) {
    throw new Error("DATABASE_URL is not configured");
  }

  return db;
}

export const { DELETE } = createAdminUserDeleteRoute({
  checkAdminAuth: async () => {
    const session = await requireAdminSession();
    return !!session;
  },
  deleteUser: async ({ id }) => {
    const adminSession = await requireAdminSession();

    if (!adminSession) {
      return "forbidden";
    }

    if (adminSession.user.id === id) {
      return "forbidden";
    }

    const db = requireDb();

    const existingUser = await db.query.user.findFirst({
      where: eq(user.id, id),
      columns: { id: true },
    });

    if (!existingUser) {
      return "not_found";
    }

    await db
      .delete(verification)
      .where(
        and(
          like(verification.identifier, "reset-password:%"),
          eq(verification.value, id),
        ),
      );

    await db.delete(user).where(eq(user.id, id));

    return "deleted";
  },
});
