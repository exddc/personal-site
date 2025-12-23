"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import NavBar from "@/components/NavBar";
import { container, item } from "@/lib/animations";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isInitialMount, setIsInitialMount] = useState(true);

  useEffect(() => {
    setIsInitialMount(false);
  }, []);

  return (
    <motion.main
      variants={container}
      initial={isInitialMount ? "hidden" : "show"}
      animate="show"
      className="mx-auto flex w-full max-w-5xl flex-col gap-12 p-6 sm:p-12 lg:p-24 xl:gap-24"
    >
      <NavBar variants={item} />
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          className="contents"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </motion.main>
  );
}
