"use client";

// Libraries
import { motion } from "framer-motion";
import { container, item } from "@/lib/animations";
import { useBlogPosts } from "./context";
import { useNavigation } from "@/lib/context/navigation-context";

// Components
import PageHeader from "@/components/PageHeader";
import AnimatedList from "./AnimatedList";

export default function Blog() {
  const posts = useBlogPosts();
  const { isInitialLoad } = useNavigation();

  return (
    <motion.div
      variants={container}
      initial={isInitialLoad ? "hidden" : false}
      animate="show"
      className="flex flex-col gap-24 xl:gap-32"
    >
      <PageHeader title="Writing" />

      <motion.section variants={item} id="posts">
        <AnimatedList posts={posts} />
      </motion.section>
    </motion.div>
  );
}
