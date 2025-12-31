"use client";

// Libraries
import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Types
interface Props {
  children: React.ReactNode;
  content: string;
}

export default function Tooltip({ children, content }: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showTooltip = () => {
    timeoutRef.current = setTimeout(() => setIsVisible(true), 200);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsVisible(false);
  };

  return (
    <span
      className="relative inline-block"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
    >
      <span className="text-foreground cursor-pointer font-medium underline-offset-8 transition-all hover:underline hover:underline-offset-4">
        {children}
      </span>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={{
              duration: 0.2,
              ease: [0.25, 0.1, 0.25, 1],
            }}
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
