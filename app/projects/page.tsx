"use client";

// Libraries
import React from "react";
import { motion } from "framer-motion";

// Components
import { container, item } from "@/lib/animations";

export default function Projects() {
  return (
    <motion.div variants={container} className="flex flex-col gap-24 xl:gap-32">
      <motion.div variants={item} className="flex flex-col gap-2">
        <h1 className="text-foreground text-4xl font-medium tracking-tight sm:text-6xl">
          Projects
        </h1>
      </motion.div>
    </motion.div>
  );
}
