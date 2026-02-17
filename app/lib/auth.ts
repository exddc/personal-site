import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { authSchema, getDb } from "@/app/db";
import { sendPasswordResetEmail } from "@/app/lib/email";

let authInstance: ReturnType<typeof betterAuth> | null = null;

function normalizeBaseURL(raw?: string) {
  if (!raw) {
    return undefined;
  }

  try {
    return new URL(raw).origin;
  } catch {
    return undefined;
  }
}

function resolveBaseURL() {
  return normalizeBaseURL(
    process.env.BETTER_AUTH_URL ??
      process.env.NEXT_PUBLIC_BETTER_AUTH_URL ??
      (process.env.VERCEL_PROJECT_PRODUCTION_URL
        ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
        : undefined) ??
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined),
  );
}

export function getAuth() {
  if (authInstance) return authInstance;

  const db = getDb();
  if (!db) return null;

  authInstance = betterAuth({
    baseURL: resolveBaseURL(),
    basePath: "/api/auth",
    database: drizzleAdapter(db, {
      provider: "pg",
      schema: authSchema,
    }),
    emailAndPassword: {
      enabled: true,
      disableSignUp: true,
      resetPasswordTokenExpiresIn: 60 * 60 * 24,
      sendResetPassword: async ({ user, url }) => {
        await sendPasswordResetEmail({
          to: user.email,
          url,
          recipientName: user.name,
          purpose: "reset",
        });
      },
    },
    plugins: [admin(), nextCookies()],
  });

  return authInstance;
}
