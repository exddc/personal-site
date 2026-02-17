import { toNextJsHandler } from "better-auth/next-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function authNotConfiguredResponse() {
  return Response.json({ error: "Auth not configured" }, { status: 500 });
}

async function resolveHandler() {
  const { getAuth } = await import("@/app/lib/auth");
  const auth = getAuth();

  if (!auth) {
    return null;
  }

  return toNextJsHandler(auth.handler);
}

export async function GET(request: Request) {
  const handler = await resolveHandler();
  if (!handler) {
    return authNotConfiguredResponse();
  }

  return handler.GET(request);
}

export async function POST(request: Request) {
  const handler = await resolveHandler();
  if (!handler) {
    return authNotConfiguredResponse();
  }

  return handler.POST(request);
}
