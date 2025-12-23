"use client";

// Libraries
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Types
interface Props {
  children: React.ReactNode;
  content: string;
}

export default function Tooltip({ children, content }: Props) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <span className="text-foreground cursor-pointer font-medium underline-offset-8 transition-all hover:underline hover:underline-offset-4">
        {children}
      </span>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 5, x: 0 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 5, x: 0 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 w-max max-w-[250px] -translate-x-1/2 rounded bg-black px-4 py-2 text-sm leading-relaxed text-white shadow-xl shadow-neutral-400"
          >
            {content}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-black"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}
