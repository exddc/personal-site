import { randomUUID } from "node:crypto";
import { hashPassword } from "better-auth/crypto";
import { and, eq } from "drizzle-orm";
import { createAdminUserSetPasswordRoute } from "litecms/server";
import { getDb } from "@/app/db";
import { account, user } from "@/app/db/auth-schema";
import { requireAdminSession } from "@/app/lib/authz";

function requireDb() {
  const db = getDb();
  if (!db) {
    throw new Error("DATABASE_URL is not configured");
  }

  return db;
}

export const { POST } = createAdminUserSetPasswordRoute({
  checkAdminAuth: async () => {
    const session = await requireAdminSession();
    return !!session;
  },
  setPassword: async ({ id, newPassword }) => {
    const db = requireDb();

    const existingUser = await db.query.user.findFirst({
      where: eq(user.id, id),
      columns: { id: true },
    });

    if (!existingUser) {
      return false;
    }

    const passwordHash = await hashPassword(newPassword);
    const credentialAccount = await db.query.account.findFirst({
      where: and(eq(account.userId, id), eq(account.providerId, "credential")),
      columns: { id: true },
    });

    if (credentialAccount) {
      await db
        .update(account)
        .set({ password: passwordHash, updatedAt: new Date() })
        .where(eq(account.id, credentialAccount.id));
      return true;
    }

    await db.insert(account).values({
      id: randomUUID(),
      accountId: id,
      providerId: "credential",
      userId: id,
      password: passwordHash,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return true;
  },
});
