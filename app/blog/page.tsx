"use client";

// Libraries
import { motion } from "framer-motion";
import { container, item } from "@/lib/animations";
import { useBlogPosts } from "./context";

// Components
import PageHeader from "@/components/PageHeader";
import AnimatedList from "./AnimatedList";

export default function Blog() {
  const posts = useBlogPosts();

  return (
    <motion.div variants={container} className="flex flex-col gap-24 xl:gap-32">
      <PageHeader title="Writing" />

      <motion.section variants={item} id="posts">
        <AnimatedList posts={posts} />
      </motion.section>
    </motion.div>
  );
}
