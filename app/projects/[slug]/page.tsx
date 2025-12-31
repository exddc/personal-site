"use client";

// Libraries
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion } from "framer-motion";
import { container, item } from "@/lib/animations";
import { useProject } from "@/lib/context/projects-context";
import { useNavigation } from "@/lib/context/navigation-context";
import { ExternalLink } from "lucide-react";

// Components
import PageHeader from "@/components/PageHeader";
import NextLink from "next/link";
import NextImage from "next/image";
import Tag from "@/components/Tag";
import Link from "@/components/Link";

export default function ProjectPage() {
  const project = useProject();
  const { isInitialLoad } = useNavigation();

  return (
    <motion.div
      variants={container}
      initial={isInitialLoad ? "hidden" : false}
      animate="show"
      className="flex flex-col gap-16 xl:gap-24"
    >
      {/* Hero Image */}
      <motion.div
        variants={item}
        className="relative aspect-[16/9] w-full overflow-hidden rounded bg-neutral-50"
      >
        <NextImage
          src={project.image}
          alt={project.title}
          fill
          className="object-contain"
          sizes="(max-width: 1200px) 100vw, 1200px"
          priority
        />
      </motion.div>

      {/* Header */}
      <motion.div variants={item} className="flex flex-col gap-6">
        <PageHeader title={project.title} subtitle={project.description} />

        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <Tag key={tech}>{tech}</Tag>
          ))}
        </div>

        <div className="flex flex-row gap-8">
          <Link href={project.externalLink} title="Visit Project" />
          {project.repositoryLink && (
            <Link href={project.repositoryLink} title="View Repository" />
          )}
          {project.appStoreLink && (
            <Link href={project.appStoreLink} title="View App Store" />
          )}
        </div>
      </motion.div>

      {/* Content */}
      <motion.article
        variants={item}
        className="prose prose-neutral prose-lg prose-headings:font-medium prose-img:rounded-xl prose-code:before:content-none prose-code:after:content-none max-w-none"
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            a: ({ href, children }) => (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-foreground transition-colors"
              >
                {children}
              </a>
            ),
            code: ({ className, children, ...props }) => {
              const match = /language-(\w+)/.exec(className || "");
              const isInline = !match && !String(children).includes("\n");
              return isInline ? (
                <code
                  className="text-foreground rounded bg-gray-200 px-1 py-0.5 font-mono text-sm"
                  {...props}
                >
                  {children}
                </code>
              ) : (
                <code className={`${className} font-mono`} {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {project.content}
        </ReactMarkdown>
      </motion.article>

      {/* Back Link */}
      <motion.div variants={item}>
        <NextLink
          href="/projects"
          className="hover:text-accent font-mono text-sm text-gray-500 transition-colors"
        >
          ← Back to all projects
        </NextLink>
      </motion.div>
    </motion.div>
  );
}
