import { Intro } from "./_components/intro";
import { ProjectSection } from "./_components/project-section";
import { SocialLinks } from "./_components/social-links";
import { apps, projects } from "./content";

export default function Home() {
  return (
    <div className="reveal-stagger flex flex-col gap-24">
      <Intro />
      <ProjectSection id="apps" title="Apps" projects={apps} />
      <ProjectSection id="projects" title="Projects" projects={projects} />
      <SocialLinks />
    </div>
  );
}
