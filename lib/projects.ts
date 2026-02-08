import { desc, eq } from "drizzle-orm";
import { getDb } from "@/app/db";
import { projects as projectsTable } from "@/app/db/schema";

// Types
export interface Project {
  slug: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  externalLink: string;
  repositoryLink?: string;
  appStoreLink?: string;
  content: string;
}

async function getProjectsFromDb(): Promise<Project[] | null> {
  const db = getDb();
  if (!db) return null;

  try {
    const projects = await db.query.projects.findMany({
      where: eq(projectsTable.status, "published"),
      orderBy: [desc(projectsTable.publishedAt), desc(projectsTable.createdAt)],
    });

    return projects.map((project) => ({
      slug: project.slug,
      title: project.title,
      description: project.description,
      image: project.image ?? "",
      technologies: (project.technologies as string[]) ?? [],
      externalLink: project.externalLink,
      repositoryLink: project.repositoryLink ?? undefined,
      appStoreLink: project.appStoreLink ?? undefined,
      content: project.content,
    }));
  } catch (error) {
    console.error("Error fetching projects from database:", error);
    return null;
  }
}

export async function getProjects(): Promise<Project[]> {
  const dbProjects = await getProjectsFromDb();
  return dbProjects ?? [];
}

export async function getProject(slug: string): Promise<Project | undefined> {
  const projects = await getProjects();
  return projects.find((project) => project.slug === slug);
}
