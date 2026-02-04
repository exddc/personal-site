import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";
import * as authSchema from "./auth-schema";

type DbClient = ReturnType<typeof drizzle>;

let db: DbClient | null = null;

export function getDb() {
  const url = process.env.DATABASE_URL ?? process.env.POSTGRES_URL;
  if (!url) return null;

  if (!db) {
    const globalForDb = globalThis as unknown as { _sql?: postgres.Sql };
    const sql =
      globalForDb._sql ??
      postgres(url, {
        max: process.env.NODE_ENV === "production" ? 10 : 1,
        idle_timeout: 20,
      });

    if (process.env.NODE_ENV !== "production") {
      globalForDb._sql = sql;
    }

    db = drizzle(sql, { schema: { ...schema, ...authSchema } });
  }

  return db;
}

export { authSchema };
