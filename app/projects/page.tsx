"use client";

// Libraries
import { motion } from "framer-motion";
import { useNavigation } from "@/lib/navigation-context";

// Components
import PageHeader from "@/components/PageHeader";
import { container, item } from "@/lib/animations";

export default function Projects() {
  const { isInitialLoad } = useNavigation();

  return (
    <motion.div
      variants={container}
      initial={isInitialLoad ? "hidden" : false}
      animate="show"
      className="flex flex-col gap-24 xl:gap-32"
    >
      <PageHeader title="Projects" />

      <motion.section
        variants={item}
        id="projects"
        className="max-w-2xl"
      ></motion.section>
    </motion.div>
  );
}
