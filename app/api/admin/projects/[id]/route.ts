import { headers } from "next/headers";
import { and, eq, ne } from "drizzle-orm";
import { getAuth } from "@/app/lib/auth";
import { getDb } from "@/app/db";
import { projects } from "@/app/db/schema";

type ProjectStatus = "draft" | "published";
type UpdateProjectInput = {
  slug?: string;
  title?: string;
  description?: string;
  image?: string | null;
  technologies?: string[];
  externalLink?: string;
  repositoryLink?: string | null;
  appStoreLink?: string | null;
  content?: string;
  status?: ProjectStatus;
  publishedAt?: Date | null;
};
type RouteContext = {
  params: { id: string } | Promise<{ id: string }>;
};

function requireDb() {
  const db = getDb();
  if (!db) {
    throw new Error("DATABASE_URL is not configured");
  }
  return db;
}

async function isAuthorized() {
  const auth = getAuth();
  if (!auth) {
    return false;
  }

  const session = await auth.api.getSession({ headers: await headers() });
  return !!session?.user;
}

function parseProjectStatus(value: unknown): ProjectStatus | null {
  if (value === "draft" || value === "published") {
    return value;
  }
  return null;
}

function parseOptionalDate(value: unknown): Date | null | undefined {
  if (value === undefined) return undefined;
  if (value === null) return null;
  if (value instanceof Date) return Number.isNaN(value.getTime()) ? null : value;
  if (typeof value !== "string") return null;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function normalizeProject(project: typeof projects.$inferSelect) {
  return {
    ...project,
    image: project.image ?? undefined,
    technologies: (project.technologies as string[]) ?? [],
    repositoryLink: project.repositoryLink ?? undefined,
    appStoreLink: project.appStoreLink ?? undefined,
  };
}

function parseUpdatePayload(raw: unknown):
  | { ok: true; data: UpdateProjectInput }
  | { ok: false; error: string } {
  if (!raw || typeof raw !== "object") {
    return { ok: false, error: "Invalid request body" };
  }

  const body = raw as Record<string, unknown>;
  const data: UpdateProjectInput = {};

  if (body.slug !== undefined) {
    if (typeof body.slug !== "string" || body.slug.trim().length === 0) {
      return { ok: false, error: "slug must be a non-empty string" };
    }
    data.slug = body.slug;
  }

  if (body.title !== undefined) {
    if (typeof body.title !== "string" || body.title.trim().length === 0) {
      return { ok: false, error: "title must be a non-empty string" };
    }
    data.title = body.title;
  }

  if (body.description !== undefined) {
    if (
      typeof body.description !== "string" ||
      body.description.trim().length === 0
    ) {
      return { ok: false, error: "description must be a non-empty string" };
    }
    data.description = body.description;
  }

  if (body.image !== undefined) {
    if (typeof body.image !== "string" && body.image !== null) {
      return { ok: false, error: "image must be a string or null" };
    }
    data.image = body.image;
  }

  if (body.technologies !== undefined) {
    if (
      !Array.isArray(body.technologies) ||
      !body.technologies.every((item) => typeof item === "string")
    ) {
      return { ok: false, error: "technologies must be an array of strings" };
    }
    data.technologies = body.technologies;
  }

  if (body.externalLink !== undefined) {
    if (
      typeof body.externalLink !== "string" ||
      body.externalLink.trim().length === 0
    ) {
      return { ok: false, error: "externalLink must be a non-empty string" };
    }
    data.externalLink = body.externalLink;
  }

  if (body.repositoryLink !== undefined) {
    if (typeof body.repositoryLink !== "string" && body.repositoryLink !== null) {
      return { ok: false, error: "repositoryLink must be a string or null" };
    }
    data.repositoryLink = body.repositoryLink;
  }

  if (body.appStoreLink !== undefined) {
    if (typeof body.appStoreLink !== "string" && body.appStoreLink !== null) {
      return { ok: false, error: "appStoreLink must be a string or null" };
    }
    data.appStoreLink = body.appStoreLink;
  }

  if (body.content !== undefined) {
    if (typeof body.content !== "string") {
      return { ok: false, error: "content must be a string" };
    }
    data.content = body.content;
  }

  if (body.status !== undefined) {
    const status = parseProjectStatus(body.status);
    if (!status) {
      return { ok: false, error: "status must be draft or published" };
    }
    data.status = status;
  }

  if (body.publishedAt !== undefined) {
    const publishedAt = parseOptionalDate(body.publishedAt);
    if (publishedAt === null && body.publishedAt !== null) {
      return { ok: false, error: "publishedAt must be a valid date" };
    }
    data.publishedAt = publishedAt;
  }

  return { ok: true, data };
}

async function getId(context: RouteContext): Promise<string> {
  const params = await context.params;
  return params.id;
}

export async function GET(_request: Request, context: RouteContext) {
  if (!(await isAuthorized())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = await getId(context);
  const db = requireDb();
  const project = await db.query.projects.findFirst({
    where: eq(projects.id, id),
  });

  if (!project) {
    return Response.json({ error: "Project not found" }, { status: 404 });
  }

  return Response.json({ project: normalizeProject(project) });
}

export async function PATCH(request: Request, context: RouteContext) {
  if (!(await isAuthorized())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = parseUpdatePayload(body);
  if (!parsed.ok) {
    return Response.json({ error: parsed.error }, { status: 400 });
  }

  const id = await getId(context);
  const db = requireDb();
  const current = await db.query.projects.findFirst({
    where: eq(projects.id, id),
    columns: { id: true, status: true, publishedAt: true },
  });
  if (!current) {
    return Response.json({ error: "Project not found" }, { status: 404 });
  }

  if (parsed.data.slug) {
    const existing = await db.query.projects.findFirst({
      where: and(eq(projects.slug, parsed.data.slug), ne(projects.id, id)),
      columns: { id: true },
    });
    if (existing) {
      return Response.json({ error: "Slug already exists" }, { status: 409 });
    }
  }

  const updateData: Record<string, unknown> = {
    ...parsed.data,
    updatedAt: new Date(),
  };

  if (parsed.data.status === "published" && current.status !== "published") {
    updateData.publishedAt = parsed.data.publishedAt ?? new Date();
  } else if (parsed.data.status === "draft" && current.status === "published") {
    updateData.publishedAt = null;
  }

  const [updated] = await db
    .update(projects)
    .set(updateData)
    .where(eq(projects.id, id))
    .returning();

  return Response.json({ project: normalizeProject(updated) });
}

export async function DELETE(_request: Request, context: RouteContext) {
  if (!(await isAuthorized())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = await getId(context);
  const db = requireDb();
  const [deleted] = await db
    .delete(projects)
    .where(eq(projects.id, id))
    .returning({ id: projects.id });

  if (!deleted) {
    return Response.json({ error: "Project not found" }, { status: 404 });
  }

  return Response.json({ success: true });
}
