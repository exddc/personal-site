import { getAuth } from "@/app/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

const auth = getAuth();

const handler = auth
  ? toNextJsHandler(auth.handler)
  : {
      GET: () => new Response("Auth not configured", { status: 500 }),
      POST: () => new Response("Auth not configured", { status: 500 }),
    };

export const { GET, POST } = handler;
