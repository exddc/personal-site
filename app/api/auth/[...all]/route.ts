import { toNextJsHandler } from "better-auth/next-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function authNotConfiguredResponse() {
  return Response.json({ error: "Auth not configured" }, { status: 500 });
}

export async function GET(request: Request) {
  const { getAuth } = await import("@/app/lib/auth");
  const auth = getAuth();

  if (!auth) {
    return authNotConfiguredResponse();
  }

  const { GET } = toNextJsHandler(auth.handler);
  return GET(request);
}

export async function POST(request: Request) {
  const { getAuth } = await import("@/app/lib/auth");
  const auth = getAuth();

  if (!auth) {
    return authNotConfiguredResponse();
  }

  const { POST } = toNextJsHandler(auth.handler);
  return POST(request);
}
