import { createBlogPostRoutes } from "litecms/server";
import { headers } from "next/headers";
import { and, eq, ne } from "drizzle-orm";
import { getAuth } from "@/app/lib/auth";
import { getDb } from "@/app/db";
import { blogPosts } from "@/app/db/schema";

function requireDb() {
  const db = getDb();
  if (!db) {
    throw new Error("DATABASE_URL is not configured");
  }
  return db;
}

export const { GET, PATCH, DELETE } = createBlogPostRoutes({
  checkAuth: async () => {
    const auth = getAuth();
    if (!auth) return false;

    const session = await auth.api.getSession({
      headers: await headers(),
    });
    return !!session?.user;
  },
  getPost: async (id) => {
    const db = requireDb();
    const post = await db.query.blogPosts.findFirst({
      where: eq(blogPosts.id, id),
    });
    if (!post) return null;
    return {
      ...post,
      excerpt: post.excerpt ?? undefined,
      coverImage: post.coverImage ?? undefined,
      tags: (post.tags as string[]) ?? [],
    };
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

    if (data.status === "published" && current?.status !== "published") {
      updateData.publishedAt = new Date();
    }

    if (data.status === "draft" && current?.status === "published") {
      updateData.publishedAt = null;
    }

    const [updated] = await db
      .update(blogPosts)
      .set(updateData)
      .where(eq(blogPosts.id, id))
      .returning();

    return {
      ...updated,
      excerpt: updated.excerpt ?? undefined,
      coverImage: updated.coverImage ?? undefined,
      tags: (updated.tags as string[]) ?? [],
    };
  },
  deletePost: async (id) => {
    const db = requireDb();
    await db.delete(blogPosts).where(eq(blogPosts.id, id));
  },
  slugExistsExcluding: async (slug, excludeId) => {
    const db = requireDb();
    const existing = await db.query.blogPosts.findFirst({
      where: and(eq(blogPosts.slug, slug), ne(blogPosts.id, excludeId)),
      columns: { id: true },
    });
    return !!existing;
  },
});
