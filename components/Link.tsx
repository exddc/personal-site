import React from "react";
import { ArrowUpRight } from "lucide-react";

export default function Link({ href, title }: { href: string; title: string }) {
  return (
    <a
      href={href}
      className="group flex w-fit items-center gap-2 font-mono text-base transition-all duration-100 ease-in-out hover:font-medium"
    >
      <ArrowUpRight className="h-5 w-5 transition-transform duration-300 ease-in-out group-hover:rotate-45" />
      {title}
    </a>
  );
}
