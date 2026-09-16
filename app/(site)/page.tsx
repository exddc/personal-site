"use client";

import { motion } from "framer-motion";

import Link from "@/components/Link";
import ProjectLink from "@/components/ProjectLink";
import Tooltip from "@/components/Tooltip";
import { container, item } from "@/lib/animations";
import { apps, homePage, projects, siteSettings } from "@/lib/content";
import { buildProjectOutboundUrl } from "@/lib/utils";

export default function Home() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-24"
    >
      <motion.div variants={item} className="flex flex-col gap-2">
        <h1 className="text-foreground text-4xl font-medium tracking-tight sm:text-6xl">
          {siteSettings.siteName}
        </h1>
        <div className="flex flex-row gap-2 pl-1 text-xl tracking-tight text-neutral-500">
          <p>{homePage.heroRolePrefix}</p>
          <Link
            href={homePage.heroCompanyUrl}
            title={homePage.heroCompanyName}
          />
        </div>
      </motion.div>

      <motion.section variants={item} id="about" className="max-w-3xl">
        <p className="text-xl leading-snug text-neutral-500 sm:text-2xl">
          I build{" "}
          <Tooltip content={homePage.aiTooltip}>full-stack AI systems</Tooltip>{" "}
          at HMMC, with several years of experience shipping high performance
          applications and systems. Previously,
          <Tooltip content={homePage.autoTooltip}>
            automotive interfaces, testing and tooling
          </Tooltip>{" "}
          at MAGNA. <br />
          My own projects span{" "}
          <Tooltip content={homePage.nativeTooltip}>
            native apps
          </Tooltip> and{" "}
          <Tooltip content={homePage.embeddedTooltip}>embedded systems</Tooltip>{" "}
          in various physical and digital domains.
        </p>
      </motion.section>

      <motion.section
        variants={item}
        id="apps"
        className="flex scroll-mt-8 flex-col gap-12"
      >
        <div className="flex items-baseline justify-between border-b border-neutral-300 pb-4">
          <h2 className="text-foreground font-mono text-xl font-medium">
            {homePage.appsTitle}
          </h2>
        </div>
        <div className="grid gap-x-12 gap-y-16 lg:grid-cols-2">
          {apps.map((app) => (
            <ProjectLink
              key={app.slug}
              title={app.title}
              description={app.description}
              href={buildProjectOutboundUrl(app.href, app.slug)}
              actionLabel={app.actionLabel}
              secondaryLink={{
                label: app.secondaryLink.label,
                href: buildProjectOutboundUrl(app.secondaryLink.href, app.slug),
              }}
            />
          ))}
        </div>
      </motion.section>

      <motion.section
        variants={item}
        id="projects"
        className="flex scroll-mt-8 flex-col gap-12"
      >
        <div className="flex items-baseline justify-between border-b border-neutral-300 pb-4">
          <h2 className="text-foreground font-mono text-xl font-medium">
            {homePage.projectsTitle}
          </h2>
        </div>

        <div className="grid gap-x-12 gap-y-16 lg:grid-cols-2">
          {projects.map((project) => (
            <ProjectLink
              key={project.slug}
              href={buildProjectOutboundUrl(project.href, project.slug)}
              title={project.title}
              description={project.description}
              actionLabel={project.actionLabel}
            />
          ))}
        </div>
      </motion.section>

      <motion.section
        variants={item}
        id="socials"
        className="flex scroll-mt-8 flex-col gap-12"
      >
        <div className="flex items-baseline justify-between border-b border-neutral-300 pb-4">
          <h2 className="text-foreground font-mono text-xl font-medium">
            {homePage.socialsTitle}
          </h2>
        </div>
        <div className="flex flex-col flex-wrap gap-12 text-base sm:flex-row">
          <Link
            href={siteSettings.socialGitHubUrl}
            title={siteSettings.socialGitHubLabel}
          />
          <Link
            href={siteSettings.socialXUrl}
            title={siteSettings.socialXLabel}
          />
          <Link
            href={siteSettings.socialLinkedInUrl}
            title={siteSettings.socialLinkedInLabel}
          />
        </div>
      </motion.section>
    </motion.div>
  );
}
