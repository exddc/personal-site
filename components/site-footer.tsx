import { siteConfig } from "@/lib/site-config";

import { ExternalLink } from "./external-link";

export function SiteFooter() {
  return (
    <footer className="reveal flex items-center justify-between border-t border-neutral-300 pt-12 pb-12 font-mono text-xs text-neutral-400">
      <span>
        © {new Date().getFullYear()} {siteConfig.name}
      </span>
      <span className="flex items-center gap-2">
        {siteConfig.role.title}{" "}
        <ExternalLink
          href={siteConfig.role.companyUrl}
          className="text-xs"
          showArrow={false}
        >
          {siteConfig.role.company}
        </ExternalLink>
      </span>
    </footer>
  );
}
