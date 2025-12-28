"use client";

// Libraries
import { motion } from "framer-motion";
import { container, item } from "@/lib/animations";

// Components
import NextLink from "next/link";

export default function NotFound() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex min-h-[50vh] flex-col items-center justify-center gap-8 text-center"
    >
      <motion.div variants={item} className="flex flex-col gap-2">
        <span className="font-mono text-2xl text-neutral-400">404</span>
        <h1 className="text-foreground text-4xl font-medium tracking-tight sm:text-6xl">
          Page not found
        </h1>
      </motion.div>

      <motion.p variants={item} className="max-w-md text-neutral-500">
        The page you're looking for doesn't exist.
      </motion.p>

      <motion.div variants={item}>
        <NextLink
          href="/"
          className="text-accent hover:text-foreground font-mono text-sm transition-colors"
        >
          ← Back to home
        </NextLink>
      </motion.div>
    </motion.div>
  );
}
