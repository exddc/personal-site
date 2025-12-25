"use client";

// Libraries
import { motion } from "framer-motion";
import { container, item } from "@/lib/animations";
import type { BlogPost } from "@/lib/blog";

// Components
import NextLink from "next/link";

// Types
interface Props {
  posts: BlogPost[];
}

export default function AnimatedList({ posts }: Props) {
  return (
    <motion.div variants={container} className="flex flex-col gap-12 sm:gap-16">
      {posts.map((post) => (
        <motion.div key={post.slug} variants={item}>
          <NextLink
            href={`/blog/${post.slug}`}
            className="group flex flex-col gap-2 transition-colors first:pt-0 hover:border-white/30"
          >
            <div className="sm:items-top flex flex-col sm:flex-row sm:justify-between">
              <h2 className="text-foreground group-hover:text-accent text-4xl font-medium transition-colors">
                {post.title}
              </h2>
              <span className="font-mono text-xs tracking-tight text-gray-500">
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                | {post.readingMinutes} min read
              </span>
            </div>
            <p className="max-w-xl text-gray-500">{post.description}</p>
          </NextLink>
        </motion.div>
      ))}
    </motion.div>
  );
}
