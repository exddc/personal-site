import * as LiteCmsServer from "litecms/server";
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
type ProjectRoutesDeps = {
  checkAuth: () => Promise<boolean>;
  getProject: (id: string) => Promise<unknown>;
  updateProject: (id: string, data: UpdateProjectInput) => Promise<unknown>;
  deleteProject: (id: string) => Promise<void>;
  slugExistsExcluding: (slug: string, excludeId: string) => Promise<boolean>;
};
type ProjectRoutesFactory = (deps: ProjectRoutesDeps) => {
  GET: (
    request: Request,
    context: { params: { id: string } | Promise<{ id: string }> },
  ) => Promise<Response>;
  PATCH: (
    request: Request,
    context: { params: { id: string } | Promise<{ id: string }> },
  ) => Promise<Response>;
  DELETE: (
    request: Request,
    context: { params: { id: string } | Promise<{ id: string }> },
  ) => Promise<Response>;
};

const liteCmsServer = LiteCmsServer as Record<string, unknown>;

function requireDb() {
  const db = getDb();
  if (!db) {
    throw new Error("DATABASE_URL is not configured");
  }
  return db;
}

function getCreateProjectRoutes(): ProjectRoutesFactory {
  const nextFactory = liteCmsServer.createProjectRoutes as
    | ProjectRoutesFactory
    | undefined;
  if (nextFactory) {
    return nextFactory;
  }

  const legacyFactory = liteCmsServer.createCollectionItemRoutes as
    | ProjectRoutesFactory
    | undefined;
  if (legacyFactory) {
    return legacyFactory;
  }

  throw new Error(
    "Missing litecms server factory: expected createProjectRoutes or createCollectionItemRoutes.",
  );
}

const createProjectRoutes = getCreateProjectRoutes();

export const { GET, PATCH, DELETE } = createProjectRoutes({
  checkAuth: async () => {
    const auth = getAuth();
    if (!auth) return false;

    const session = await auth.api.getSession({
      headers: await headers(),
    });
    return !!session?.user;
  },
  getProject: async (id) => {
    const db = requireDb();
    const project = await db.query.projects.findFirst({
      where: eq(projects.id, id),
    });
    if (!project) return null;
    return {
      ...project,
      image: project.image ?? undefined,
      technologies: (project.technologies as string[]) ?? [],
      repositoryLink: project.repositoryLink ?? undefined,
      appStoreLink: project.appStoreLink ?? undefined,
    };
  },
  updateProject: async (id, data) => {
    const db = requireDb();
    const current = await db.query.projects.findFirst({
      where: eq(projects.id, id),
      columns: { status: true, publishedAt: true },
    });

    const updateData: Record<string, unknown> = {
      ...data,
      updatedAt: new Date(),
    };

    if (data.status === "published" && current?.status !== "published") {
      updateData.publishedAt = new Date();
    }

    if (data.status === "draft" && current?.status === "published") {
      updateData.publishedAt = null;
    }

    const [updated] = await db
      .update(projects)
      .set(updateData)
      .where(eq(projects.id, id))
      .returning();

    return {
      ...updated,
      image: updated.image ?? undefined,
      technologies: (updated.technologies as string[]) ?? [],
      repositoryLink: updated.repositoryLink ?? undefined,
      appStoreLink: updated.appStoreLink ?? undefined,
    };
  },
  deleteProject: async (id) => {
    const db = requireDb();
    await db.delete(projects).where(eq(projects.id, id));
  },
  slugExistsExcluding: async (slug, excludeId) => {
    const db = requireDb();
    const existing = await db.query.projects.findFirst({
      where: and(eq(projects.slug, slug), ne(projects.id, excludeId)),
      columns: { id: true },
    });
    return !!existing;
  },
});
