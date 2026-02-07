import { headers } from "next/headers";
import { desc, eq } from "drizzle-orm";
import { getAuth } from "@/app/lib/auth";
import { getDb } from "@/app/db";
import { projects } from "@/app/db/schema";

type ProjectStatus = "draft" | "published";
type ProjectsFilter = { status: ProjectStatus };
type CreateProjectPayload = {
  id: string;
  slug: string;
  title: string;
  description: string;
  image?: string | null;
  technologies?: string[];
  externalLink: string;
  repositoryLink?: string | null;
  appStoreLink?: string | null;
  content: string;
  status?: ProjectStatus;
  publishedAt?: Date | null;
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

function normalizeProject(project: typeof projects.$inferSelect) {
  return {
    ...project,
    image: project.image ?? undefined,
    technologies: (project.technologies as string[]) ?? [],
    repositoryLink: project.repositoryLink ?? undefined,
    appStoreLink: project.appStoreLink ?? undefined,
  };
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

function parseCreatePayload(raw: unknown):
  | { ok: true; data: CreateProjectPayload }
  | { ok: false; error: string } {
  if (!raw || typeof raw !== "object") {
    return { ok: false, error: "Invalid request body" };
  }

  const body = raw as Record<string, unknown>;
  const requiredStringFields = [
    "id",
    "slug",
    "title",
    "description",
    "externalLink",
    "content",
  ] as const;

  for (const field of requiredStringFields) {
    if (typeof body[field] !== "string" || body[field].trim().length === 0) {
      return { ok: false, error: `${field} is required` };
    }
  }

  if (
    body.technologies !== undefined &&
    (!Array.isArray(body.technologies) ||
      !body.technologies.every((item) => typeof item === "string"))
  ) {
    return { ok: false, error: "technologies must be an array of strings" };
  }

  const status =
    body.status === undefined ? "draft" : parseProjectStatus(body.status);
  if (!status) {
    return { ok: false, error: "status must be draft or published" };
  }

  const publishedAt = parseOptionalDate(body.publishedAt);
  if (publishedAt === null && body.publishedAt !== null) {
    return { ok: false, error: "publishedAt must be a valid date" };
  }

  return {
    ok: true,
    data: {
      id: body.id as string,
      slug: body.slug as string,
      title: body.title as string,
      description: body.description as string,
      image:
        typeof body.image === "string"
          ? body.image
          : body.image === null
            ? null
            : undefined,
      technologies: (body.technologies as string[] | undefined) ?? [],
      externalLink: body.externalLink as string,
      repositoryLink:
        typeof body.repositoryLink === "string"
          ? body.repositoryLink
          : body.repositoryLink === null
            ? null
            : undefined,
      appStoreLink:
        typeof body.appStoreLink === "string"
          ? body.appStoreLink
          : body.appStoreLink === null
            ? null
            : undefined,
      content: body.content as string,
      status,
      publishedAt,
    },
  };
}

function parseFilter(request: Request):
  | { ok: true; filter?: ProjectsFilter }
  | { ok: false; error: string } {
  const status = new URL(request.url).searchParams.get("status");
  if (!status) {
    return { ok: true };
  }

  const parsedStatus = parseProjectStatus(status);
  if (!parsedStatus) {
    return { ok: false, error: "status must be draft or published" };
  }

  return { ok: true, filter: { status: parsedStatus } };
}

export async function GET(request: Request) {
  if (!(await isAuthorized())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const parsedFilter = parseFilter(request);
  if (!parsedFilter.ok) {
    return Response.json({ error: parsedFilter.error }, { status: 400 });
  }

  const db = requireDb();
  const items = await db.query.projects.findMany({
    where: parsedFilter.filter ? eq(projects.status, parsedFilter.filter.status) : undefined,
    orderBy: [desc(projects.createdAt)],
  });
  return Response.json({ projects: items.map(normalizeProject) });
}

export async function POST(request: Request) {
  if (!(await isAuthorized())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = parseCreatePayload(body);
  if (!parsed.ok) {
    return Response.json({ error: parsed.error }, { status: 400 });
  }

  const db = requireDb();
  const existing = await db.query.projects.findFirst({
    where: eq(projects.slug, parsed.data.slug),
    columns: { id: true },
  });
  if (existing) {
    return Response.json({ error: "Slug already exists" }, { status: 409 });
  }

  const publishedAt =
    parsed.data.status === "published"
      ? parsed.data.publishedAt ?? new Date()
      : null;

  const [created] = await db
    .insert(projects)
    .values({
      id: parsed.data.id,
      slug: parsed.data.slug,
      title: parsed.data.title,
      description: parsed.data.description,
      image: parsed.data.image ?? null,
      technologies: parsed.data.technologies ?? [],
      externalLink: parsed.data.externalLink,
      repositoryLink: parsed.data.repositoryLink ?? null,
      appStoreLink: parsed.data.appStoreLink ?? null,
      content: parsed.data.content,
      status: parsed.data.status ?? "draft",
      publishedAt,
    })
    .returning();

  return Response.json({ project: normalizeProject(created) }, { status: 201 });
}
