import { randomBytes, randomUUID } from "node:crypto";
import { and, eq, like } from "drizzle-orm";
import { getDb } from "@/app/db";
import { verification } from "@/app/db/auth-schema";

export const PASSWORD_RESET_TOKEN_TTL_SECONDS = 60 * 60 * 24;

const authBaseUrl =
  process.env.BETTER_AUTH_URL ??
  process.env.NEXT_PUBLIC_BETTER_AUTH_URL ??
  "http://localhost:3000";

function requireDb() {
  const db = getDb();
  if (!db) {
    throw new Error("DATABASE_URL is not configured");
  }

  return db;
}

export function buildResetPasswordPageUrl() {
  return `${authBaseUrl}/reset-password`;
}

export function buildPasswordResetLink(token: string) {
  const callbackURL = encodeURIComponent(buildResetPasswordPageUrl());
  return `${authBaseUrl}/api/auth/reset-password/${token}?callbackURL=${callbackURL}`;
}

export async function createPasswordResetToken(
  userId: string,
  expiresInSeconds = PASSWORD_RESET_TOKEN_TTL_SECONDS,
) {
  const db = requireDb();

  await db
    .delete(verification)
    .where(
      and(
        like(verification.identifier, "reset-password:%"),
        eq(verification.value, userId),
      ),
    );

  const token = randomBytes(24).toString("hex");

  await db.insert(verification).values({
    id: randomUUID(),
    identifier: `reset-password:${token}`,
    value: userId,
    expiresAt: new Date(Date.now() + expiresInSeconds * 1000),
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return token;
}
