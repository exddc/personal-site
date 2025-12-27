"use client";

// Libraries
import React, { createContext, useContext } from "react";
import type { Project } from "@/lib/projects";

// Contexts
const ProjectContext = createContext<Project | null>(null);
const ProjectsListContext = createContext<Project[] | null>(null);

// Types
interface ProjectProviderProps {
  project: Project;
  children: React.ReactNode;
}

interface ProjectsListProviderProps {
  projects: Project[];
  children: React.ReactNode;
}

export function ProjectProvider({ project, children }: ProjectProviderProps) {
  return (
    <ProjectContext.Provider value={project}>
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject() {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProject must be used within a ProjectProvider");
  }
  return context;
}

export function ProjectsListProvider({
  projects,
  children,
}: ProjectsListProviderProps) {
  return (
    <ProjectsListContext.Provider value={projects}>
      {children}
    </ProjectsListContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(ProjectsListContext);
  if (context === null) {
    throw new Error("useProjects must be used within a ProjectsListProvider");
  }
  return context;
}

