import { cn } from "@/lib/utils";

import NextLink from "next/link";
import { ArrowUpRight } from "lucide-react";

interface Props {
  href: string;
  title: string;
  className?: string;
  showArrow?: boolean;
}

export default function Link({
  href,
  title,
  className = "",
  showArrow = true,
}: Props) {
  return (
    <NextLink
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group text-foreground hover:text-accent focus-visible:text-accent focus-visible:outline-accent flex w-fit items-center gap-2 font-mono text-base transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 motion-reduce:transition-none",
        className,
      )}
    >
      {showArrow && (
        <ArrowUpRight
          aria-hidden="true"
          className="group-hover:-translate-y-0.1 h-4 w-4 shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-x-0.5 group-hover:rotate-45 motion-reduce:transform-none motion-reduce:transition-none"
        />
      )}
      <span className="relative">
        {title}
        <span
          aria-hidden="true"
          className="bg-accent absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none"
        ></span>
      </span>
    </NextLink>
  );
}
