"use client";

// Libraries
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigation } from "@/lib/context/navigation-context";
import { useBlogPosts } from "@/lib/context/blog-context";
import { useProjects } from "@/lib/context/projects-context";

// Components
import NextLink from "next/link";
import Link from "@/components/Link";
import ProjectLink from "@/components/ProjectLink";
import Tooltip from "@/components/Tooltip";
import BlogPostPreview from "@/components/BlogPostPreview";
import { container, item } from "@/lib/animations";

export default function Home() {
  const { isInitialLoad } = useNavigation();
  const posts = useBlogPosts();
  const projects = useProjects();

  return (
    <motion.div
      variants={container}
      initial={isInitialLoad ? "hidden" : false}
      animate="show"
      className="flex flex-col gap-24 xl:gap-32"
    >
      {/* Hero */}
      <motion.div variants={item} className="flex flex-col gap-2">
        <h1 className="text-foreground text-4xl font-medium tracking-tight sm:text-6xl">
          Timo Weiss
        </h1>
        <div className="flex flex-col gap-2 pl-1 text-xl tracking-tight text-neutral-500 sm:flex-row sm:items-center">
          <p>Software developer working at</p>
          <Link href="https://hmmc.io" title="HMMC" />
        </div>
      </motion.div>

      {/* About */}
      <motion.section variants={item} id="about" className="max-w-2xl">
        <span className="text-xl leading-snug text-neutral-500 sm:text-2xl">
          Full-stack developer with several years of experience building{" "}
          <Tooltip content="High throughput, performant web applications in Svelte, React and Python at HMMC.">
            web applications
          </Tooltip>
          ,{" "}
          <Tooltip content="Automotive HMI systems at MAGNA Engineering & Infotainment GmbH.">
            automotive interfaces
          </Tooltip>{" "}
          and{" "}
          <Tooltip content="CLI tools and automated testing for automotive applications at MAGNA Engineering & Infotainment GmbH.">
            tooling
          </Tooltip>
          . I love building in the{" "}
          <Tooltip content="Software, web, mobile and cloud infrastructure.">
            digital
          </Tooltip>{" "}
          and{" "}
          <Tooltip content="Robotics, hardware prototyping and 3D printing.">
            physical
          </Tooltip>{" "}
          world and try to push my abilities by starting projects outside of my
          scope.
        </span>
      </motion.section>

      {/* Projects */}
      <motion.section
        variants={item}
        id="projects"
        className="flex flex-col gap-12"
      >
        <div className="flex items-baseline justify-between border-b border-neutral-300 pb-4">
          <h2 className="text-foreground font-mono text-xl font-medium">
            Projects
          </h2>
          <NextLink
            href="/projects"
            className="hover:text-accent mt-4 flex items-center gap-2 font-mono text-sm transition-all"
          >
            View all projects <ArrowRight className="h-4 w-4" />
          </NextLink>
        </div>

        <div className="grid gap-x-12 gap-y-16 lg:grid-cols-2">
          {projects.slice(0, 4).map((project) => (
            <ProjectLink
              key={project.slug}
              href={project.externalLink}
              title={project.title}
              description={project.description}
              internalLink={`/projects/${project.slug}`}
            />
          ))}
        </div>
      </motion.section>

      {/* Blog */}
      <motion.section
        variants={item}
        id="latest-posts"
        className="flex flex-col gap-12"
      >
        <div className="flex items-baseline justify-between border-b border-neutral-300 pb-4">
          <h2 className="text-foreground font-mono text-xl font-medium">
            Writing
          </h2>
          <NextLink
            href="/blog"
            className="hover:text-accent mt-4 flex items-center gap-2 font-mono text-sm transition-all"
          >
            Read all posts <ArrowRight className="h-4 w-4" />
          </NextLink>
        </div>

        <div className="flex flex-col gap-12">
          {posts.slice(0, 4).map((post) => (
            <BlogPostPreview
              key={post.slug}
              href={`/blog/${post.slug}`}
              title={post.title}
              description={post.description}
              date={new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
              readingMinutes={post.readingMinutes}
            />
          ))}
        </div>
      </motion.section>

      <motion.section
        variants={item}
        id="socials"
        className="flex flex-col gap-12 pb-24"
      >
        <div className="flex items-baseline justify-between border-b border-neutral-300 pb-4">
          <h2 className="text-foreground font-mono text-xl font-medium">
            Socials
          </h2>
        </div>
        <div className="flex flex-wrap gap-12 text-base">
          <Link href="https://github.com/exddc" title="GitHub" />
          <Link href="https://x.com/timooweiss" title="X (Twitter)" />
          <Link href="https://linkedin.com/in/timoweiss" title="LinkedIn" />
        </div>
      </motion.section>
    </motion.div>
  );
}
