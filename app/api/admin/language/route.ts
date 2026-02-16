import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { eq } from "drizzle-orm";
import { createLanguageRoutes } from "litecms/server";
import { getAuth } from "@/app/lib/auth";
import { getDb } from "@/app/db";
import { user } from "@/app/db/auth-schema";
import type { UserSettings } from "@/app/db/auth-schema";

export const { GET, POST } = createLanguageRoutes(
  {
    getUserId: async () => {
      const auth = getAuth();
      if (!auth) {
        return null;
      }

      const session = await auth.api.getSession({ headers: await headers() });
      return session?.user?.id ?? null;
    },
    getUserSettings: async (userId) => {
      const db = getDb();
      if (!db) {
        return null;
      }

      const userData = await db.query.user.findFirst({
        where: eq(user.id, userId),
        columns: { settings: true },
      });
      return (userData?.settings as UserSettings | null) ?? null;
    },
    updateUserSettings: async (userId, settings) => {
      const db = getDb();
      if (!db) {
        return;
      }

      await db
        .update(user)
        .set({ settings, updatedAt: new Date() })
        .where(eq(user.id, userId));
    },
  },
  NextResponse,
);
