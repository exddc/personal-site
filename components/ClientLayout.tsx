"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import NavBar from "@/components/NavBar";
import { container, item } from "@/lib/animations";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
      <div className="contents">{children}</div>
    </motion.main>
  );
}
