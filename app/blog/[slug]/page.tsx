"use client";

// Libraries
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion } from "framer-motion";
import { container, item } from "@/lib/animations";
import { useBlogPost } from "@/lib/context/blog-context";
import { useNavigation } from "@/lib/context/navigation-context";

// Components
import PageHeader from "@/components/PageHeader";
import NextLink from "next/link";

export default function BlogPost() {
  const post = useBlogPost();
  const { isInitialLoad } = useNavigation();

  return (
    <motion.div
      variants={container}
      initial={isInitialLoad ? "hidden" : false}
      animate="show"
      className="flex flex-col gap-24 xl:gap-32"
    >
      <PageHeader
        title={post.title}
        subtitle={`${new Date(post.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })} | ${post.readingMinutes} min read | Timo Weiss`}
      />

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
          {post.content}
        </ReactMarkdown>
      </motion.article>

      <motion.div variants={item}>
        <NextLink
          href="/blog"
          className="hover:text-accent font-mono text-sm text-gray-500 transition-colors"
        >
          ← Back to all writing
        </NextLink>
      </motion.div>
    </motion.div>
  );
}
