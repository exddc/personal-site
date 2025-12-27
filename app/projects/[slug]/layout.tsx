// Libraries
import { getProjects, getProject } from "@/lib/projects";
import { notFound } from "next/navigation";
import { ProjectProvider } from "@/lib/context/projects-context";

export async function generateStaticParams() {
  const projects = getProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

// Types
interface ProjectLayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

export default async function ProjectLayout({
  children,
  params,
}: ProjectLayoutProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  return <ProjectProvider project={project}>{children}</ProjectProvider>;
}
