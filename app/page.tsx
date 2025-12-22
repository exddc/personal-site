"use client";

// Libraries
import React from "react";
import { motion, Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";

// Components
import NextLink from "next/link";
import Link from "@/components/Link";
import ProjectLink from "@/components/ProjectLink";
import Tooltip from "@/components/Tooltip";
import NavBar from "@/components/NavBar";
import BlogPostPreview from "@/components/BlogPostPreview";

// Variants
const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] },
  },
};

export default function Home() {
  return (
    <motion.main
      variants={container}
      initial="hidden"
      animate="show"
      className="mx-auto flex w-full max-w-5xl flex-col gap-24 p-6 sm:p-12 lg:p-24 xl:gap-32"
    >
      <NavBar variants={item} />

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
          <ProjectLink
            href="https://name-generator.timoweiss.me"
            title="Name Generator"
            description="Generate domain names that are guaranteed to be available. Next.js frontend, FastAPI backend with multiple workers for performance."
          />

          <ProjectLink
            href="https://svelte-keyboard.timoweiss.me"
            title="Svelte Mac Keyboard"
            description="A virtual, fully interactive keyboard component built with Svelte and Tailwind CSS."
          />

          <ProjectLink
            href="https://box-grid.timoweiss.me"
            title="Box Grid Generator"
            description="Dynamically generate a grid of boxes for drawers or cabinets. Next.js with Three.js for the 3D visualization."
          />

          <ProjectLink
            href="https://gotdoneapp.com"
            title="Got Done"
            description="Minimal To-Do & Habit Tracker. Track daily tasks, build streaks and see your progress. Built with Swift and SwiftUI."
          />
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
            Blog
          </h2>
          <NextLink
            href="/blog"
            className="hover:text-accent mt-4 flex items-center gap-2 font-mono text-sm transition-all"
          >
            Read all posts <ArrowRight className="h-4 w-4" />
          </NextLink>
        </div>

        <div className="flex flex-col gap-12">
          <BlogPostPreview
            href="/blog/hello-world"
            title="Hello World"
            description="Welcome to my new blog space. This is a preview of whats to come. A blog about my experiences in software development, design and everything in between. I'll be writing about my projects, my learnings and my thoughts on the world."
            date="December 22, 2025"
            readingMinutes={5}
          />

          <BlogPostPreview
            href="/blog/hello-world"
            title="Hello World"
            description="Welcome to my new blog space. This is a preview of whats to come. A blog about my experiences in software development, design and everything in between. I'll be writing about my projects, my learnings and my thoughts on the world."
            date="December 22, 2025"
            readingMinutes={5}
          />
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
    </motion.main>
  );
}
