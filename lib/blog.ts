import {
  S3Client,
  ListObjectsCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { desc, eq, and } from "drizzle-orm";
import matter from "gray-matter";
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

let s3Client: S3Client | null = null;

function getS3Client(): S3Client | null {
  if (s3Client) return s3Client;
  
  const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
  const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
  const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
  
  if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY) {
    console.warn("Missing R2 environment variables:", {
      hasAccountId: !!R2_ACCOUNT_ID,
      hasAccessKeyId: !!R2_ACCESS_KEY_ID,
      hasSecretAccessKey: !!R2_SECRET_ACCESS_KEY,
    });
    return null;
  }
  
  s3Client = new S3Client({
    region: "auto",
    endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: R2_ACCESS_KEY_ID,
      secretAccessKey: R2_SECRET_ACCESS_KEY,
    },
  });
  
  return s3Client;
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

async function getPostsFromR2(): Promise<BlogPost[]> {
  const S3 = getS3Client();
  const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME;

  if (!S3 || !R2_BUCKET_NAME) {
    console.warn("R2 not configured, returning empty posts");
    return [];
  }

  try {
    const listCommand = new ListObjectsCommand({
      Bucket: R2_BUCKET_NAME,
      Prefix: "blog/",
    });

    const { Contents } = await S3.send(listCommand);

    if (!Contents) return [];

    const posts = await Promise.all(
      Contents.filter((item) => item.Key?.endsWith(".md")).map(async (item) => {
        if (!item.Key) return null;

        const getCommand = new GetObjectCommand({
          Bucket: R2_BUCKET_NAME,
          Key: item.Key,
        });

        const { Body } = await S3.send(getCommand);
        if (!Body) return null;

        const fileContent = await Body.transformToString();
        let cleanedContent = fileContent.trim();

        const match = fileContent.match(/^(\s+)---/);
        if (match) {
          const indent = match[1];
          const regex = new RegExp(`^${indent}`, "gm");
          cleanedContent = fileContent.replace(regex, "").trim();
        }

        const { data, content } = matter(cleanedContent);
        const slug = item.Key.replace("blog/", "").replace(".md", "");
        const dateStr =
          data.date instanceof Date
            ? data.date.toISOString()
            : data.date || new Date().toISOString();

        return {
          slug,
          title: data.title || "Untitled",
          date: dateStr,
          description: data.description || "",
          content,
          readingMinutes: data.readingMinutes || estimateReadingMinutes(content),
          authorName: data.authorName || "Timo Weiss",
        } as BlogPost;
      }),
    );

    return posts
      .filter((post): post is BlogPost => post !== null)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error("Error fetching posts from R2:", error);
    return [];
  }
}

async function getPostFromR2(slug: string): Promise<BlogPost | undefined> {
  const S3 = getS3Client();
  const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME;

  if (!S3 || !R2_BUCKET_NAME) {
    console.warn("R2 not configured, cannot fetch post");
    return undefined;
  }

  try {
    const getCommand = new GetObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: `blog/${slug}.md`,
    });

    const { Body } = await S3.send(getCommand);
    if (!Body) return undefined;

    const fileContent = await Body.transformToString();

    let cleanedContent = fileContent.trim();
    const match = fileContent.match(/^(\s+)---/);
    if (match) {
      const indent = match[1];
      const regex = new RegExp(`^${indent}`, "gm");
      cleanedContent = fileContent.replace(regex, "").trim();
    }

    const { data, content } = matter(cleanedContent);
    const dateStr =
      data.date instanceof Date
        ? data.date.toISOString()
        : data.date || new Date().toISOString();

    return {
      slug,
      title: data.title || "Untitled",
      date: dateStr,
      description: data.description || "",
      content,
      readingMinutes: data.readingMinutes || estimateReadingMinutes(content),
      authorName: data.authorName || "Timo Weiss",
    };
  } catch (error) {
    console.error(`Error fetching post ${slug}:`, error);
    return undefined;
  }
}

export async function getPosts(): Promise<BlogPost[]> {
  const dbPosts = await getPostsFromDb();
  if (dbPosts && dbPosts.length > 0) {
    return dbPosts;
  }

  return getPostsFromR2();
}

export async function getPost(slug: string): Promise<BlogPost | undefined> {
  const dbPost = await getPostFromDb(slug);
  if (dbPost) {
    return dbPost;
  }

  return getPostFromR2(slug);
}
