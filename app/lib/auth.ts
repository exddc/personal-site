import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { authSchema, getDb } from "@/app/db";
import { sendPasswordResetEmail } from "@/app/lib/email";

let authInstance: ReturnType<typeof betterAuth> | null = null;

function parseUrlList(raw?: string) {
  if (!raw) {
    return [];
  }

  return raw
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
}

function normalizeOrigin(raw?: string) {
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
  const candidates = [
    ...parseUrlList(process.env.BETTER_AUTH_URL),
    ...parseUrlList(process.env.NEXT_PUBLIC_BETTER_AUTH_URL),
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : undefined,
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined,
  ];

  for (const candidate of candidates) {
    const normalized = normalizeOrigin(candidate);
    if (normalized) {
      return normalized;
    }
  }

  return undefined;
}

function resolveTrustedOrigins(baseURL?: string) {
  const origins = new Set<string>();

  if (baseURL) {
    origins.add(baseURL);
  }

  const candidates = [
    ...parseUrlList(process.env.BETTER_AUTH_URL),
    ...parseUrlList(process.env.NEXT_PUBLIC_BETTER_AUTH_URL),
    ...parseUrlList(process.env.BETTER_AUTH_TRUSTED_ORIGINS),
  ];

  for (const candidate of candidates) {
    const normalized = normalizeOrigin(candidate);
    if (normalized) {
      origins.add(normalized);
    }
  }

  return origins.size > 0 ? Array.from(origins) : undefined;
}

export function getAuth() {
  if (authInstance) return authInstance;

  const db = getDb();
  if (!db) return null;

  const baseURL = resolveBaseURL();

  authInstance = betterAuth({
    baseURL,
    basePath: "/api/auth",
    trustedOrigins: resolveTrustedOrigins(baseURL),
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
