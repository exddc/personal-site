"use client";

// Libraries
import { item } from "@/lib/animations";
import { motion } from "framer-motion";

// Types
interface Props {
  title: string;
}

export default function PageHeader({ title }: Props) {
  return (
    <motion.div variants={item} className="flex flex-col gap-2">
      <h1 className="text-foreground text-4xl font-medium tracking-normal sm:text-6xl">
        {title}
      </h1>
    </motion.div>
  );
}
