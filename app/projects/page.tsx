"use client";

// Libraries
import React from "react";
import { motion } from "framer-motion";

// Components
import PageHeader from "@/components/PageHeader";
import { container, item } from "@/lib/animations";

export default function Projects() {
  return (
    <motion.div variants={container} className="flex flex-col gap-24 xl:gap-32">
      <PageHeader title="Projects" />

      <motion.section
        variants={item}
        id="projects"
        className="max-w-2xl"
      ></motion.section>
    </motion.div>
  );
}
