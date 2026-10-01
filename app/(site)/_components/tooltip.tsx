"use client";

import type { ReactNode } from "react";
import { useId, useState } from "react";

interface TooltipProps {
  children: ReactNode;
  content: string;
  suffix?: ReactNode;
}

export function Tooltip({ children, content, suffix }: TooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const id = useId();

  return (
    <span
      aria-describedby={id}
      className="relative inline-block focus-visible:outline-none"
      tabIndex={0}
      onPointerEnter={() => setIsOpen(true)}
      onPointerLeave={() => setIsOpen(false)}
      onFocus={() => setIsOpen(true)}
      onBlur={() => setIsOpen(false)}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          setIsOpen(false);
        }
      }}
    >
      <span
        className={`text-foreground cursor-help font-medium underline-offset-8 transition-all motion-reduce:transition-none ${isOpen ? "underline underline-offset-4" : ""}`}
      >
        {children}
      </span>
      {suffix}
      <span
        id={id}
        role="tooltip"
        className={`pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 w-max max-w-[250px] -translate-x-1/2 rounded bg-black px-4 py-2 text-sm leading-relaxed text-white shadow-xl shadow-neutral-400 transition duration-200 motion-reduce:transform-none motion-reduce:transition-none ${isOpen ? "visible translate-y-0 scale-100 opacity-100" : "invisible translate-y-2 scale-95 opacity-0"}`}
      >
        {content}
        <span className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-black" />
      </span>
    </span>
  );
}
