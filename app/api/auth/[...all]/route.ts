export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function authNotConfiguredResponse() {
  return Response.json({ error: "Auth not configured" }, { status: 500 });
}

async function handleAuth(request: Request) {
  const { getAuth } = await import("@/app/lib/auth");
  const auth = getAuth();

  if (!auth) {
    return authNotConfiguredResponse();
  }

  return auth.handler(request);
}

export async function GET(request: Request) {
  return handleAuth(request);
}

export async function POST(request: Request) {
  return handleAuth(request);
}
