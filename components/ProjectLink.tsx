"use client";

import Link from "@/components/Link";

interface Props {
  href: string;
  title: string;
  description: string;
  actionLabel: string;
  secondaryLink?: { href: string; label: string };
}

export default function ProjectLink({
  href,
  title,
  description,
  actionLabel,
  secondaryLink,
}: Props) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-foreground font-mono text-base font-normal">
        {title}
      </h3>
      <div className="flex h-full flex-col justify-between">
        <p className="tracking-normal text-neutral-500">{description}</p>
        <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-xs">
          {[
            { href, label: actionLabel },
            ...(secondaryLink ? [secondaryLink] : []),
          ].map((action) => (
            <Link
              key={action.href}
              href={action.href}
              title={action.label}
              className="text-xs"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
