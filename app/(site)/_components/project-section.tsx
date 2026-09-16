import { ExternalLink } from "@/components/external-link";
import { buildOutboundUrl } from "@/lib/utils";

import type { Project } from "../content";

interface ProjectSectionProps {
  id: string;
  title: string;
  projects: readonly Project[];
}

export function ProjectSection({ id, title, projects }: ProjectSectionProps) {
  return (
    <section id={id} className="flex scroll-mt-8 flex-col gap-12">
      <div className="flex items-baseline justify-between border-b border-neutral-300 pb-4">
        <h2 className="text-foreground font-mono text-xl font-medium">
          {title}
        </h2>
      </div>
      <div className="grid gap-x-12 gap-y-16 lg:grid-cols-2">
        {projects.map((project) => (
          <article key={project.slug} className="flex flex-col gap-2">
            <h3 className="text-foreground font-mono text-base font-normal">
              {project.title}
            </h3>
            <div className="flex h-full flex-col justify-between">
              <p className="tracking-normal text-neutral-500">
                {project.description}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-xs">
                <ExternalLink
                  href={buildOutboundUrl(project.href, project.slug)}
                  className="text-xs"
                >
                  {project.actionLabel}
                </ExternalLink>
                {project.secondaryLink ? (
                  <ExternalLink
                    href={buildOutboundUrl(
                      project.secondaryLink.href,
                      project.slug,
                    )}
                    className="text-xs"
                  >
                    {project.secondaryLink.label}
                  </ExternalLink>
                ) : null}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
