"use client";

import { motion, Variants } from "framer-motion";

import NextLink from "next/link";

interface Props {
  variants: Variants;
}

export default function NavBar({ variants }: Props) {
  return (
    <motion.nav
      variants={variants}
      className="flex gap-6 font-mono text-sm tracking-tight text-neutral-500 sm:gap-14"
    >
      <NextLink
        href="/"
        className="text-accent hover:text-accent transition-colors"
      >
        home
      </NextLink>
      <NextLink href="/#apps" className="hover:text-accent transition-colors">
        apps
      </NextLink>
      <NextLink
        href="/#projects"
        className="hover:text-accent transition-colors"
      >
        projects
      </NextLink>
      <NextLink
        href="/#socials"
        className="hover:text-accent transition-colors"
      >
        socials
      </NextLink>
    </motion.nav>
  );
}
