"use client";

import type { ReactNode } from "react";
import { motion, MotionConfig } from "framer-motion";
import { container, item } from "@/lib/animations";

import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.main
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto flex w-full max-w-5xl flex-col gap-12 p-6 sm:p-12 lg:p-24 xl:gap-16 xl:pt-12"
      >
        <NavBar variants={item} />
        <motion.div className="pb-24" variants={item}>
          {children}
        </motion.div>
        <Footer />
      </motion.main>
    </MotionConfig>
  );
}
