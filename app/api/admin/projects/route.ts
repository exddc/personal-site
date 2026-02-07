import * as LiteCmsServer from "litecms/server";
import { headers } from "next/headers";
import { desc, eq } from "drizzle-orm";
import { getAuth } from "@/app/lib/auth";
import { getDb } from "@/app/db";
import { projects } from "@/app/db/schema";

type CreateProjectsRoutesFactory = typeof LiteCmsServer.createProjectsRoutes;

const liteCmsServer = LiteCmsServer as {
  createProjectsRoutes?: CreateProjectsRoutesFactory;
  createCollectionRoutes?: CreateProjectsRoutesFactory;
};

function requireDb() {
  const db = getDb();
  if (!db) {
    throw new Error("DATABASE_URL is not configured");
  }
  return db;
}

function getCreateProjectsRoutes(): CreateProjectsRoutesFactory {
  if (liteCmsServer.createProjectsRoutes) {
    return liteCmsServer.createProjectsRoutes;
  }

  const legacyFactory = liteCmsServer.createCollectionRoutes;
  if (legacyFactory) {
    return legacyFactory;
  }

  throw new Error(
    "Missing litecms server factory: expected createProjectsRoutes or createCollectionRoutes.",
  );
}

const createProjectsRoutes = getCreateProjectsRoutes();

export const { GET, POST } = createProjectsRoutes({
  checkAuth: async () => {
    const auth = getAuth();
    if (!auth) {
      return false;
    }

    const session = await auth.api.getSession({ headers: await headers() });
    const hasUser = !!session?.user;
    return hasUser;
  },
  getProjects: async (filter) => {
    const db = requireDb();
    const items = await db.query.projects.findMany({
      where: filter?.status ? eq(projects.status, filter.status) : undefined,
      orderBy: [desc(projects.createdAt)],
    });
    return items.map((project) => ({
      ...project,
      image: project.image ?? undefined,
      technologies: (project.technologies as string[]) ?? [],
      repositoryLink: project.repositoryLink ?? undefined,
      appStoreLink: project.appStoreLink ?? undefined,
    }));
  },
  createProject: async (project) => {
    const db = requireDb();
    const [created] = await db
      .insert(projects)
      .values({
        id: project.id,
        slug: project.slug,
        title: project.title,
        description: project.description,
        image: project.image ?? null,
        technologies: project.technologies ?? [],
        externalLink: project.externalLink,
        repositoryLink: project.repositoryLink ?? null,
        appStoreLink: project.appStoreLink ?? null,
        content: project.content,
        status: project.status ?? "draft",
        publishedAt: project.status === "published" ? new Date() : null,
      })
      .returning();
    return {
      ...created,
      image: created.image ?? undefined,
      technologies: (created.technologies as string[]) ?? [],
      repositoryLink: created.repositoryLink ?? undefined,
      appStoreLink: created.appStoreLink ?? undefined,
    };
  },
  slugExists: async (slug) => {
    const db = requireDb();
    const existing = await db.query.projects.findFirst({
      where: eq(projects.slug, slug),
      columns: { id: true },
    });
    return !!existing;
  },
});
