"use client";

// Libraries
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigation } from "@/lib/context/navigation-context";
import { useProjects } from "@/lib/context/projects-context";
import { X } from "lucide-react";

// Components
import PageHeader from "@/components/PageHeader";
import ProjectCard from "@/components/ProjectCard";
import { container, item } from "@/lib/animations";
import Tag from "@/components/Tag";
import { cn } from "@/lib/utils";

export default function Projects() {
  const { isInitialLoad } = useNavigation();
  const projects = useProjects();
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);

  const allTechnologies = useMemo(() => {
    const techSet = new Set<string>();
    projects.forEach((project) => {
      project.technologies.forEach((tech) => techSet.add(tech));
    });
    return Array.from(techSet).sort();
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (selectedTechs.length === 0) return projects;
    return projects.filter((project) =>
      selectedTechs.every((tech) => project.technologies.includes(tech)),
    );
  }, [projects, selectedTechs]);

  const toggleTech = (tech: string) => {
    setSelectedTechs((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech],
    );
  };

  const clearFilters = () => {
    setSelectedTechs([]);
  };

  return (
    <motion.div
      variants={container}
      initial={isInitialLoad ? "hidden" : false}
      animate="show"
      className="flex min-h-[50vh] flex-col gap-16 xl:gap-24"
    >
      <PageHeader title="Projects" />

      {/* Filter Bar */}
      <motion.div variants={item} className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {allTechnologies.map((tech) => {
            const isSelected = selectedTechs.includes(tech);
            return (
              <button key={tech} onClick={() => toggleTech(tech)}>
                <Tag
                  className={cn(
                    isSelected
                      ? "bg-foreground text-background hover:bg-foreground/80 hover:cursor-pointer"
                      : "hover:cursor-pointer hover:bg-neutral-200",
                  )}
                >
                  {tech}
                </Tag>
              </button>
            );
          })}

          {selectedTechs.length > 0 && (
            <button
              onClick={clearFilters}
              className="text-accent hover:text-foreground ml-2 flex items-center gap-1 font-mono text-xs transition-colors"
            >
              <X className="h-3 w-3" />
              Clear
            </button>
          )}
        </div>

        {selectedTechs.length > 0 && (
          <p className="font-mono text-xs text-neutral-500">
            Showing {filteredProjects.length} of {projects.length} projects
          </p>
        )}
      </motion.div>

      {/* Projects Grid */}
      <motion.section variants={item} id="projects">
        <motion.div
          variants={container}
          className="grid gap-x-12 gap-y-16 md:grid-cols-2"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.slug}
                variants={item}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <ProjectCard
                  href={`/projects/${project.slug}`}
                  title={project.title}
                  description={project.description}
                  image={project.image}
                  technologies={project.technologies}
                  onTagClick={toggleTech}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <p className="py-12 text-center text-neutral-500">
            No projects match the selected filters.
          </p>
        )}
      </motion.section>
    </motion.div>
  );
}
