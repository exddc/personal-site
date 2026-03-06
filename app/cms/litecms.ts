import { randomUUID } from "node:crypto";
import { and, desc, eq, isNotNull, like } from "drizzle-orm";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { defineLiteCMS, type LiteCMSPageConfig } from "litecms/next";
import { cmsConfig } from "./config";
import { getDb } from "@/app/db";
import { blogPosts, projects } from "@/app/db/schema";
import { account, user, verification } from "@/app/db/auth-schema";
import { getAuth } from "@/app/lib/auth";
import {
  buildPasswordResetLink,
  createPasswordResetToken,
} from "@/app/lib/password-reset";
import { sendPasswordResetEmail } from "@/app/lib/email";

function requireDb() {
  const db = getDb();
  if (!db) {
    throw new Error("DATABASE_URL is not configured");
  }
  return db;
}

function normalizeRole(
  session: {
    user?: { role?: string | null } | null;
  } | null,
) {
  return (session?.user as { role?: string | null } | undefined)?.role ?? null;
}

function toIsoString(value: unknown): string | undefined {
  if (value === null || value === undefined) return undefined;
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? undefined : value.toISOString();
  }
  if (typeof value === "string" || typeof value === "number") {
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? undefined : parsed.toISOString();
  }
  return undefined;
}

function toRequiredIsoString(value: unknown, field: string): string {
  const isoString = toIsoString(value);
  if (!isoString) {
    throw new TypeError(`${field} must be a valid date value`);
  }
  return isoString;
}

function toDateOrNull(value: unknown): Date | null {
  if (value === null || value === undefined || value === "") return null;
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value;
  }
  if (typeof value === "string" || typeof value === "number") {
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }
  return null;
}

function serializeBlogPost(post: typeof blogPosts.$inferSelect) {
  return {
    ...post,
    excerpt: post.excerpt ?? undefined,
    coverImage: post.coverImage ?? undefined,
    tags: (post.tags as string[]) ?? [],
    publishedAt: toIsoString(post.publishedAt),
    createdAt: toRequiredIsoString(post.createdAt, "blog post createdAt"),
    updatedAt: toRequiredIsoString(post.updatedAt, "blog post updatedAt"),
  };
}

function serializeProject(project: typeof projects.$inferSelect) {
  return {
    ...project,
    image: project.image ?? undefined,
    technologies: (project.technologies as string[]) ?? [],
    repositoryLink: project.repositoryLink ?? undefined,
    appStoreLink: project.appStoreLink ?? undefined,
    publishedAt: toIsoString(project.publishedAt),
    createdAt: toRequiredIsoString(project.createdAt, "project createdAt"),
    updatedAt: toRequiredIsoString(project.updatedAt, "project updatedAt"),
  };
}

function mapPageToLiteCMS(
  page: (typeof cmsConfig.pages)[number],
  group?: string,
): LiteCMSPageConfig {
  return {
    slug: page.slug,
    title: page.title,
    description: page.description,
    group: group ?? page.group,
    definition: page.definition,
    getData: async () =>
      (await page.getData()) as Record<string, unknown> | null | undefined,
    action: page.action as LiteCMSPageConfig["action"],
  };
}

const settingsPages = cmsConfig.pages
  .filter((page) => page.group === "Settings")
  .map((page) => mapPageToLiteCMS(page, "Settings"));

const contentPages = cmsConfig.pages
  .filter((page) => page.group !== "Settings")
  .map((page) => mapPageToLiteCMS(page));

export const liteCMS = defineLiteCMS({
  siteName: cmsConfig.siteName,
  adminTitle: cmsConfig.adminTitle,
  basePath: "/admin",
  publicSiteUrl: "/",
  languageEndpoint: "/api/admin/language",
  auth: {
    loginPath: "/login",
    getSession: async () => {
      const auth = getAuth();
      if (!auth) {
        return null;
      }
      return auth.api.getSession({ headers: await headers() });
    },
    canAccess: async (session) => Boolean(session?.user),
    isAdmin: async (session) => normalizeRole(session) === "admin",
  },
  content: {
    pages: contentPages,
    storage: cmsConfig.storage,
  },
  settings:
    settingsPages.length > 0
      ? {
          pages: settingsPages,
          storage: cmsConfig.storage,
        }
      : undefined,
  blog: {
    defaultAuthorName: "Timo Weiss",
    storage: cmsConfig.storage,
    listPosts: async () => {
      const db = requireDb();
      const posts = await db.query.blogPosts.findMany({
        orderBy: [desc(blogPosts.createdAt)],
      });
      return posts.map(serializeBlogPost);
    },
    createPost: async (post) => {
      const db = requireDb();
      const [created] = await db
        .insert(blogPosts)
        .values({
          id: post.id,
          slug: post.slug,
          title: post.title,
          excerpt: post.excerpt ?? null,
          coverImage: post.coverImage ?? null,
          content: post.content,
          tags: post.tags ?? [],
          authorName: post.authorName,
          status: post.status ?? "draft",
          publishedAt:
            post.status === "published"
              ? post.publishedAt
                ? new Date(post.publishedAt)
                : new Date()
              : null,
        })
        .returning();

      revalidatePath("/blog");
      return serializeBlogPost(created);
    },
    updatePost: async (id, data) => {
      const db = requireDb();
      const current = await db.query.blogPosts.findFirst({
        where: eq(blogPosts.id, id),
        columns: { status: true, publishedAt: true },
      });

      const updateData: Record<string, unknown> = {
        ...data,
        updatedAt: new Date(),
      };

      if (data.publishedAt !== undefined) {
        updateData.publishedAt = toDateOrNull(data.publishedAt);
      }

      if (data.status === "published" && current?.status !== "published") {
        updateData.publishedAt = toDateOrNull(data.publishedAt) ?? new Date();
      }

      if (data.status === "draft" && current?.status === "published") {
        updateData.publishedAt = null;
      }

      const [updated] = await db
        .update(blogPosts)
        .set(updateData)
        .where(eq(blogPosts.id, id))
        .returning();

      revalidatePath("/blog");
      return serializeBlogPost(updated);
    },
    deletePost: async (id) => {
      const db = requireDb();
      await db.delete(blogPosts).where(eq(blogPosts.id, id));
      revalidatePath("/blog");
    },
  },
  projects: {
    storage: cmsConfig.storage,
    listProjects: async () => {
      const db = requireDb();
      const rows = await db.query.projects.findMany({
        orderBy: [desc(projects.publishedAt), desc(projects.createdAt)],
      });
      return rows.map(serializeProject);
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
          publishedAt:
            project.status === "published"
              ? project.publishedAt
                ? new Date(project.publishedAt)
                : new Date()
              : null,
        })
        .returning();

      revalidatePath("/projects");
      return serializeProject(created);
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

      if (data.publishedAt !== undefined) {
        updateData.publishedAt = toDateOrNull(data.publishedAt);
      }

      if (data.status === "published" && current?.status !== "published") {
        updateData.publishedAt =
          toDateOrNull(data.publishedAt) ??
          toDateOrNull(current?.publishedAt) ??
          new Date();
      }

      if (data.status === "draft" && current?.status === "published") {
        updateData.publishedAt = null;
      }

      const [updated] = await db
        .update(projects)
        .set(updateData)
        .where(eq(projects.id, id))
        .returning();

      revalidatePath("/projects");
      return serializeProject(updated);
    },
    deleteProject: async (id) => {
      const db = requireDb();
      await db.delete(projects).where(eq(projects.id, id));
      revalidatePath("/projects");
    },
  },
  users: {
    access: "admin",
    listUsers: async () => {
      const db = requireDb();
      const rows = await db
        .select({
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          banned: user.banned,
          createdAt: user.createdAt,
          credentialAccountId: account.id,
        })
        .from(user)
        .leftJoin(
          account,
          and(
            eq(account.userId, user.id),
            eq(account.providerId, "credential"),
            isNotNull(account.password),
          ),
        )
        .orderBy(desc(user.createdAt));

      const byUser = new Map<
        string,
        {
          id: string;
          name: string;
          email: string;
          role: string;
          banned: boolean;
          createdAt: string;
          hasPassword: boolean;
        }
      >();

      for (const row of rows) {
        const existing = byUser.get(row.id);
        if (existing) {
          if (row.credentialAccountId) {
            existing.hasPassword = true;
          }
          continue;
        }

        byUser.set(row.id, {
          id: row.id,
          name: row.name,
          email: row.email,
          role: row.role ?? "user",
          banned: row.banned ?? false,
          createdAt: row.createdAt.toISOString(),
          hasPassword: Boolean(row.credentialAccountId),
        });
      }

      return Array.from(byUser.values());
    },
    createUser: async ({ name, email }) => {
      const db = requireDb();
      const userId = randomUUID();
      const now = new Date();
      const normalizedEmail = email.trim().toLowerCase();

      const existingUser = await db.query.user.findFirst({
        where: eq(user.email, normalizedEmail),
        columns: { id: true },
      });

      if (existingUser) {
        throw new Error("A user with this email already exists");
      }

      await db.insert(user).values({
        id: userId,
        name: name.trim(),
        email: normalizedEmail,
        role: "user",
        emailVerified: true,
        banned: false,
        createdAt: now,
        updatedAt: now,
      });

      return {
        id: userId,
        name: name.trim(),
        email: normalizedEmail,
        role: "user",
        banned: false,
        createdAt: now.toISOString(),
        hasPassword: false,
      };
    },
    sendInvite: async ({ id }) => {
      const db = requireDb();
      const targetUser = await db.query.user.findFirst({
        where: eq(user.id, id),
        columns: { id: true, name: true, email: true },
      });

      if (!targetUser) {
        return false;
      }

      const token = await createPasswordResetToken(targetUser.id);
      const inviteLink = buildPasswordResetLink(token);

      await sendPasswordResetEmail({
        to: targetUser.email,
        recipientName: targetUser.name,
        url: inviteLink,
        purpose: "invite",
      });

      return true;
    },
    createInviteLink: async ({ id }) => {
      const db = requireDb();
      const targetUser = await db.query.user.findFirst({
        where: eq(user.id, id),
        columns: { id: true },
      });

      if (!targetUser) {
        return null;
      }

      const token = await createPasswordResetToken(targetUser.id);
      return buildPasswordResetLink(token);
    },
    deleteUser: async ({ id }) => {
      const auth = getAuth();
      if (!auth) {
        return false;
      }

      const session = await auth.api.getSession({ headers: await headers() });
      const adminId = session?.user?.id;

      if (!adminId || adminId === id) {
        return false;
      }

      const db = requireDb();
      const existingUser = await db.query.user.findFirst({
        where: eq(user.id, id),
        columns: { id: true },
      });

      if (!existingUser) {
        return false;
      }

      await db
        .delete(verification)
        .where(
          and(
            like(verification.identifier, "reset-password:%"),
            eq(verification.value, id),
          ),
        );

      await db.delete(user).where(eq(user.id, id));
      return true;
    },
  },
  account: {
    changePasswordEndpoint: "/api/auth/change-password",
    minPasswordLength: 8,
  },
});
