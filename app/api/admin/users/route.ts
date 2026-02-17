import { randomUUID } from "node:crypto";
import { and, desc, eq, isNotNull } from "drizzle-orm";
import { createAdminUsersRoutes } from "litecms/server";
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

export const { GET, POST } = createAdminUsersRoutes({
  checkAdminAuth: async () => {
    const session = await requireAdminSession();
    return !!session;
  },
  listUsers: async () => {
    const db = requireDb();

    const rows = await db
      .select({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        banned: user.banned,
        createdAt: user.createdAt,
        credentialAccountId: account.id,
      })
      .from(user)
      .leftJoin(
        account,
        and(
          eq(account.userId, user.id),
          eq(account.providerId, "credential"),
          isNotNull(account.password),
        ),
      )
      .orderBy(desc(user.createdAt));

    const byUser = new Map<
      string,
      {
        id: string;
        name: string;
        email: string;
        role: string;
        banned: boolean;
        createdAt: Date;
        hasPassword: boolean;
      }
    >();

    for (const row of rows) {
      const existing = byUser.get(row.id);

      if (existing) {
        if (row.credentialAccountId) {
          existing.hasPassword = true;
        }
        continue;
      }

      byUser.set(row.id, {
        id: row.id,
        name: row.name,
        email: row.email,
        role: row.role ?? "user",
        banned: row.banned ?? false,
        createdAt: row.createdAt,
        hasPassword: Boolean(row.credentialAccountId),
      });
    }

    return Array.from(byUser.values());
  },
  findUserByEmail: async (email) => {
    const db = requireDb();

    return (
      (await db.query.user.findFirst({
        where: eq(user.email, email),
        columns: { id: true },
      })) ?? null
    );
  },
  createUser: async ({ name, email }) => {
    const db = requireDb();
    const userId = randomUUID();
    const now = new Date();

    await db.insert(user).values({
      id: userId,
      name,
      email,
      role: "user",
      emailVerified: true,
      banned: false,
      createdAt: now,
      updatedAt: now,
    });

    return {
      id: userId,
      name,
      email,
      role: "user",
      banned: false,
      createdAt: now,
      hasPassword: false,
    };
  },
});
