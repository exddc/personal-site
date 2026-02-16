import { headers } from "next/headers";
import { getAuth } from "@/app/lib/auth";

export type SessionUserWithRole = {
  id: string;
  email: string;
  name: string;
  role?: string | null;
};

type SessionData = {
  user?: SessionUserWithRole | null;
} | null;

export function isAdminRole(role: string | null | undefined) {
  return role === "admin";
}

export function getSessionUserWithRole(session: SessionData) {
  if (!session?.user) {
    return null;
  }

  return session.user;
}

export async function getCurrentSession() {
  const auth = getAuth();
  if (!auth) {
    return null;
  }

  return auth.api.getSession({ headers: await headers() });
}

export async function requireAdminSession() {
  const session = await getCurrentSession();
  const user = getSessionUserWithRole(session);

  if (!user || !isAdminRole(user.role)) {
    return null;
  }

  return { session, user };
}
