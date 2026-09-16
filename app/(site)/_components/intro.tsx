import { siteConfig } from "@/lib/site-config";
import { ExternalLink } from "@/components/external-link";

import { about } from "../content";
import { Tooltip } from "./tooltip";

export function Intro() {
  return (
    <>
      <header className="flex flex-col gap-2">
        <h1 className="text-foreground text-4xl font-medium tracking-tight sm:text-6xl">
          {siteConfig.name}
        </h1>
        <div className="flex flex-row gap-2 pl-1 text-xl tracking-tight text-neutral-500">
          <p>{siteConfig.role.title}</p>
          <ExternalLink href={siteConfig.role.companyUrl}>
            {siteConfig.role.company}
          </ExternalLink>
        </div>
      </header>

      <section id="about" className="max-w-3xl">
        <p className="text-xl leading-snug text-neutral-500 sm:text-2xl">
          I build{" "}
          <Tooltip content={about.aiTooltip}>full-stack AI systems</Tooltip> at
          HMMC, with several years of experience shipping high-performance
          applications and systems. Previously,{" "}
          <Tooltip
            content={about.automotiveTooltip}
            suffix={"\u00A0at\u00A0MAGNA."}
          >
            automotive interfaces, testing, and tooling
          </Tooltip>{" "}
          <br />
          My own projects span{" "}
          <Tooltip content={about.nativeTooltip}>native apps</Tooltip> and{" "}
          <Tooltip content={about.embeddedTooltip}>embedded systems</Tooltip>{" "}
          across physical and digital domains.
        </p>
      </section>
    </>
  );
}
