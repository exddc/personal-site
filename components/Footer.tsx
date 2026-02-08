"use client";

// Components
import Link from "@/components/Link";
import { useSiteSettings } from "@/lib/context/site-context";

export default function Footer() {
  const siteSettings = useSiteSettings();

  return (
    <footer className="flex items-center justify-between border-t border-neutral-300 pt-12 pb-12 font-mono text-xs text-neutral-400">
      <span>
        © {new Date().getFullYear()} {siteSettings.siteName}
      </span>
      <span className="flex items-center gap-2">
        {siteSettings.footerRolePrefix}{" "}
        <Link
          href={siteSettings.footerCompanyUrl}
          title={siteSettings.footerCompanyName}
          className="text-xs"
          showArrow={false}
        />
      </span>
    </footer>
  );
}
