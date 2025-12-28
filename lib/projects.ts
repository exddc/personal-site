import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

// Types
export interface Project {
  slug: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  externalLink: string;
  content: string;
}

// Constants
const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME;

if (
  !R2_ACCOUNT_ID ||
  !R2_ACCESS_KEY_ID ||
  !R2_SECRET_ACCESS_KEY ||
  !R2_BUCKET_NAME
) {
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

export async function getProjects(): Promise<Project[]> {
  try {
    const getCommand = new GetObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: "projects/projects.json",
    });

    const { Body } = await S3.send(getCommand);
    if (!Body) return [];

    const fileContent = await Body.transformToString();
    const projects: Project[] = JSON.parse(fileContent);

    return projects;
  } catch (error) {
    console.error("Error fetching projects from R2:", error);
    return [];
  }
}

export async function getProject(slug: string): Promise<Project | undefined> {
  const projects = await getProjects();
  return projects.find((project) => project.slug === slug);
}
