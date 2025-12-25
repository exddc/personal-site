"use client";

// Libraries
import { item } from "@/lib/animations";
import { motion } from "framer-motion";

// Types
interface Props {
  title: string;
  subtitle?: string;
}

export default function PageHeader({ title, subtitle }: Props) {
  return (
    <motion.div
      variants={item}
      className="flex flex-col gap-2"
      style={{ viewTransitionName: "page-header" }}
    >
      <h1 className="text-foreground text-4xl font-medium tracking-normal sm:text-6xl">
        {title}
      </h1>
      {subtitle && (
        <p className="font-mono text-xs tracking-tight text-gray-500">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
