import { NextResponse } from "next/server";
import { listFiles } from "@/app/lib/storage";
import { getAuth } from "@/app/lib/auth";
import { headers } from "next/headers";

export async function GET() {
  try {
    const auth = getAuth();
    if (!auth) {
      return NextResponse.json(
        { error: "Auth not configured" },
        { status: 500 },
      );
    }

    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const files = await listFiles();

    return NextResponse.json({
      success: true,
      files,
    });
  } catch (error) {
    console.error("[storage] List error:", error);
    return NextResponse.json(
      { error: "Failed to list files" },
      { status: 500 },
    );
  }
}
