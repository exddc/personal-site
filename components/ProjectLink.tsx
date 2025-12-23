"use client";

// Components
import Link from "@/components/Link";
import NextLink from "next/link";
import { ArrowRight } from "lucide-react";

// Types
interface Props {
  href: string;
  title: string;
  description: string;
  internalLink: string;
}

export default function ProjectLink({
  href,
  title,
  description,
  internalLink,
}: Props) {
  return (
    <div className="flex flex-col gap-2">
      <Link href={href} title={title} />
      <NextLink
        href={internalLink}
        className="group flex h-full flex-col justify-between"
      >
        <p className="tracking-normal text-neutral-500">{description}</p>
        <div className="group-hover:text-accent mt-4 flex items-center gap-2 font-mono text-xs transition-all group-hover:gap-3">
          Read more <ArrowRight className="h-4 w-4" />
        </div>
      </NextLink>
    </div>
  );
}
