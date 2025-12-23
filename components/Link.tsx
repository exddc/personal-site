// Components
import NextLink from "next/link";
import { ArrowUpRight } from "lucide-react";

// Types
interface Props {
  href: string;
  title: string;
}

export default function Link({ href, title }: Props) {
  return (
    <NextLink
      href={href}
      target="_blank"
      className="group text-foreground hover:text-accent flex w-fit items-center gap-2 font-mono text-base transition-all duration-300"
    >
      <ArrowUpRight className="group-hover:-translate-y-0.1 h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-x-0.5 group-hover:rotate-45" />
      <span className="relative">
        {title}
        <span className="bg-accent absolute -bottom-1 left-0 h-[1px] w-0 transition-all duration-300 group-hover:w-full"></span>
      </span>
    </NextLink>
  );
}
