import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { authSchema, getDb } from "@/app/db";
import { sendPasswordResetEmail } from "@/app/lib/email";

let authInstance: ReturnType<typeof betterAuth> | null = null;

export function getAuth() {
  if (authInstance) return authInstance;

  const db = getDb();
  if (!db) return null;

  authInstance = betterAuth({
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
