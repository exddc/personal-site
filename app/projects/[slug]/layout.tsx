// Libraries
import { getProject } from "@/lib/projects";
import { notFound } from "next/navigation";
import { ProjectProvider } from "@/lib/context/projects-context";

export const dynamic = "force-dynamic";

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
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  return <ProjectProvider project={project}>{children}</ProjectProvider>;
}
