import { desc, eq, and } from "drizzle-orm";
import { getDb } from "@/app/db";
import { blogPosts } from "@/app/db/schema";

// Types
export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  content: string;
  readingMinutes: number;
  authorName?: string;
}

function estimateReadingMinutes(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

async function getPostsFromDb(): Promise<BlogPost[] | null> {
  const db = getDb();
  if (!db) return null;

  try {
    const posts = await db.query.blogPosts.findMany({
      where: eq(blogPosts.status, "published"),
      orderBy: [desc(blogPosts.publishedAt), desc(blogPosts.createdAt)],
    });

    return posts.map((post) => {
      const date = post.publishedAt ?? post.createdAt ?? new Date();
      return {
        slug: post.slug,
        title: post.title,
        date: date.toISOString(),
        description: post.excerpt ?? "",
        content: post.content,
        readingMinutes: estimateReadingMinutes(post.content),
        authorName: post.authorName,
      };
    });
  } catch (error) {
    console.error("Error fetching posts from database:", error);
    return null;
  }
}

async function getPostFromDb(slug: string): Promise<BlogPost | null> {
  const db = getDb();
  if (!db) return null;

  try {
    const post = await db.query.blogPosts.findFirst({
      where: and(eq(blogPosts.slug, slug), eq(blogPosts.status, "published")),
    });

    if (!post) return null;

    const date = post.publishedAt ?? post.createdAt ?? new Date();
    return {
      slug: post.slug,
      title: post.title,
      date: date.toISOString(),
      description: post.excerpt ?? "",
      content: post.content,
      readingMinutes: estimateReadingMinutes(post.content),
      authorName: post.authorName,
    };
  } catch (error) {
    console.error(`Error fetching post ${slug} from database:`, error);
    return null;
  }
}

export async function getPosts(): Promise<BlogPost[]> {
  const dbPosts = await getPostsFromDb();
  return dbPosts ?? [];
}

export async function getPost(slug: string): Promise<BlogPost | undefined> {
  const dbPost = await getPostFromDb(slug);
  return dbPost ?? undefined;
}
