import { ExternalLink } from "@/components/external-link";
import { siteConfig } from "@/lib/site-config";

export function SocialLinks() {
  return (
    <section id="socials" className="flex scroll-mt-8 flex-col gap-12">
      <div className="flex items-baseline justify-between border-b border-neutral-300 pb-4">
        <h2 className="text-foreground font-mono text-xl font-medium">
          Socials
        </h2>
      </div>
      <div className="flex flex-col flex-wrap gap-12 text-base sm:flex-row">
        {siteConfig.socialLinks.map((link) => (
          <ExternalLink key={link.href} href={link.href}>
            {link.label}
          </ExternalLink>
        ))}
      </div>
    </section>
  );
}
