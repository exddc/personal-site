"use client";

// Libraries
import { motion, Variants } from "framer-motion";

// Components
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

// Types
interface Props {
  variants: Variants;
}

export default function NavBar({ variants }: Props) {
  const currentPath = usePathname();
  const isActive = (path: string) => currentPath === path;

  return (
    <motion.nav
      variants={variants}
      className="flex gap-6 font-mono text-sm tracking-tight text-neutral-500 sm:gap-14"
    >
      <NextLink
        href="/"
        className={cn(
          "hover:text-accent transition-colors",
          isActive("/") && "text-accent",
        )}
      >
        home
      </NextLink>
      <NextLink
        href="/projects"
        className={cn(
          "hover:text-accent transition-colors",
          isActive("/projects") && "text-accent",
        )}
      >
        projects
      </NextLink>
      <NextLink
        href="/blog"
        className={cn(
          "hover:text-accent transition-colors",
          isActive("/blog") && "text-accent",
        )}
      >
        blog
      </NextLink>

      <NextLink
        href="/#socials"
        className={cn(
          "hover:text-accent transition-colors",
          isActive("/socials") && "text-accent",
        )}
      >
        socials
      </NextLink>
    </motion.nav>
  );
}
