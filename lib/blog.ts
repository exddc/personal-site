import { S3Client, ListObjectsCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import matter from "gray-matter";

// Types
export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  content: string;
  readingMinutes: number;
}

// Constants
const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME;

if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY || !R2_BUCKET_NAME) {
  console.warn("Missing R2 environment variables");
}

const S3 = new S3Client({
  region: "auto",
  endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID || "",
    secretAccessKey: R2_SECRET_ACCESS_KEY || "",
  },
});

export async function getPosts(): Promise<BlogPost[]> {
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
        const dateStr = data.date instanceof Date ? data.date.toISOString() : (data.date || new Date().toISOString());

        return {
          slug,
          title: data.title || "Untitled",
          date: dateStr,
          description: data.description || "",
          content,
          readingMinutes: data.readingMinutes || 5,
        } as BlogPost;
      })
    );

    return posts
      .filter((post): post is BlogPost => post !== null)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error("Error fetching posts from R2:", error);
    return [];
  }
}

export async function getPost(slug: string): Promise<BlogPost | undefined> {
  try {
    const getCommand = new GetObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: `blog/${slug}.md`,
    });

    const { Body } = await S3.send(getCommand);
    if (!Body) return undefined;

    const fileContent = await Body.transformToString();
    
    // Apply same cleaning logic
    let cleanedContent = fileContent.trim();
    const match = fileContent.match(/^(\s+)---/);
    if (match) {
       const indent = match[1];
       const regex = new RegExp(`^${indent}`, "gm");
       cleanedContent = fileContent.replace(regex, "").trim();
    }

    const { data, content } = matter(cleanedContent);

    // Ensure date is a string
    const dateStr = data.date instanceof Date ? data.date.toISOString() : (data.date || new Date().toISOString());

    return {
      slug,
      title: data.title || "Untitled",
      date: dateStr,
      description: data.description || "",
      content,
      readingMinutes: data.readingMinutes || 5,
    };
  } catch (error) {
    console.error(`Error fetching post ${slug}:`, error);
    return undefined;
  }
}
