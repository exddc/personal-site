"use client";

// Libraries
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { container, item } from "@/lib/animations";
import { NavigationProvider } from "@/lib/context/navigation-context";

// Components
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

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
    <NavigationProvider>
      <motion.main
        variants={container}
        initial={isInitialMount ? "hidden" : false}
        animate="show"
        className="mx-auto flex w-full max-w-5xl flex-col gap-12 p-6 sm:p-12 lg:p-24 xl:gap-24"
      >
        <NavBar variants={item} />
        <motion.div className="pb-24" variants={item}>
          {children}
        </motion.div>
        <Footer />
      </motion.main>
    </NavigationProvider>
  );
}
