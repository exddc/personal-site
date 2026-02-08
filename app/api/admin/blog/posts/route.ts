import { createBlogPostsRoutes } from "litecms/server";
import { headers } from "next/headers";
import { desc, eq } from "drizzle-orm";
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

export const { GET, POST } = createBlogPostsRoutes({
  checkAuth: async () => {
    const auth = getAuth();
    if (!auth) return false;

    const session = await auth.api.getSession({
      headers: await headers(),
    });
    return !!session?.user;
  },
  getPosts: async (filter) => {
    const db = requireDb();
    const posts = await db.query.blogPosts.findMany({
      where: filter?.status ? eq(blogPosts.status, filter.status) : undefined,
      orderBy: [desc(blogPosts.createdAt)],
    });
    return posts.map((post) => ({
      ...post,
      excerpt: post.excerpt ?? undefined,
      coverImage: post.coverImage ?? undefined,
      tags: (post.tags as string[]) ?? [],
    }));
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
        publishedAt: post.status === "published" ? new Date() : null,
      })
      .returning();
    return {
      ...created,
      excerpt: created.excerpt ?? undefined,
      coverImage: created.coverImage ?? undefined,
      tags: (created.tags as string[]) ?? [],
    };
  },
  slugExists: async (slug) => {
    const db = requireDb();
    const existing = await db.query.blogPosts.findFirst({
      where: eq(blogPosts.slug, slug),
      columns: { id: true },
    });
    return !!existing;
  },
});
