import { z } from "zod";
import { defineSchema } from "litecms/schema";

export const SiteSettingsDef = defineSchema({
  schema: z.object({
    siteName: z.string().min(1, "Site name is required"),
    footerRolePrefix: z.string().min(1, "Footer role text is required"),
    footerCompanyName: z.string().min(1, "Footer company name is required"),
    footerCompanyUrl: z.string().url("Must be a valid URL").or(z.literal("")),
    socialGitHubLabel: z.string().min(1, "GitHub label is required"),
    socialGitHubUrl: z.string().url("Must be a valid URL").or(z.literal("")),
    socialXLabel: z.string().min(1, "X label is required"),
    socialXUrl: z.string().url("Must be a valid URL").or(z.literal("")),
    socialLinkedInLabel: z.string().min(1, "LinkedIn label is required"),
    socialLinkedInUrl: z
      .string()
      .url("Must be a valid URL")
      .or(z.literal("")),
  }),
  fields: {
    siteName: {
      label: "Site Name",
      placeholder: "Timo Weiss",
      order: 1,
    },
    footerRolePrefix: {
      label: "Footer Role Prefix",
      placeholder: "Full-stack developer at",
      group: "Footer",
      order: 20,
    },
    footerCompanyName: {
      label: "Footer Company Name",
      placeholder: "HMMC",
      group: "Footer",
      order: 21,
    },
    footerCompanyUrl: {
      label: "Footer Company URL",
      type: "url",
      placeholder: "https://hmmc.io",
      group: "Footer",
      order: 22,
    },
    socialGitHubLabel: {
      label: "GitHub Label",
      placeholder: "GitHub",
      group: "Socials",
      order: 30,
    },
    socialGitHubUrl: {
      label: "GitHub URL",
      type: "url",
      placeholder: "https://github.com/exddc",
      group: "Socials",
      order: 31,
    },
    socialXLabel: {
      label: "X Label",
      placeholder: "X (Twitter)",
      group: "Socials",
      order: 32,
    },
    socialXUrl: {
      label: "X URL",
      type: "url",
      placeholder: "https://x.com/timooweiss",
      group: "Socials",
      order: 33,
    },
    socialLinkedInLabel: {
      label: "LinkedIn Label",
      placeholder: "LinkedIn",
      group: "Socials",
      order: 34,
    },
    socialLinkedInUrl: {
      label: "LinkedIn URL",
      type: "url",
      placeholder: "https://linkedin.com/in/timoweiss",
      group: "Socials",
      order: 35,
    },
  },
  defaults: {
    siteName: "Timo Weiss",
    footerRolePrefix: "Full-stack developer at",
    footerCompanyName: "HMMC",
    footerCompanyUrl: "https://hmmc.io",
    socialGitHubLabel: "GitHub",
    socialGitHubUrl: "https://github.com/exddc",
    socialXLabel: "X (Twitter)",
    socialXUrl: "https://x.com/timooweiss",
    socialLinkedInLabel: "LinkedIn",
    socialLinkedInUrl: "https://linkedin.com/in/timoweiss",
  },
});

export type SiteSettingsData = z.infer<typeof SiteSettingsDef.schema>;
export const SiteSettingsSchema = SiteSettingsDef.schema;
export const siteSettingsDefaults = SiteSettingsDef.defaults;

export const ProjectsSettingsDef = defineSchema({
  schema: z.object({
    projectsJson: z.string().optional(),
  }),
  fields: {
    projectsJson: {
      label: "Projects JSON",
      type: "textarea",
      rows: 16,
      helpText:
        "Paste a JSON array of projects to override the R2-backed list.",
      order: 1,
    },
  },
  defaults: {
    projectsJson: "",
  },
});

export type ProjectsSettingsData = z.infer<typeof ProjectsSettingsDef.schema>;
export const ProjectsSettingsSchema = ProjectsSettingsDef.schema;
export const projectsSettingsDefaults = ProjectsSettingsDef.defaults;

export const HomePageDef = defineSchema({
  schema: z.object({
    heroRolePrefix: z.string().min(1, "Hero role text is required"),
    heroCompanyName: z.string().min(1, "Company name is required"),
    heroCompanyUrl: z.string().url("Must be a valid URL").or(z.literal("")),
    aboutIntro: z.string().min(1, "About intro is required"),
    aboutWebLabel: z.string().min(1, "Web label is required"),
    aboutWebTooltip: z.string().min(1, "Web tooltip is required"),
    aboutAutoLabel: z.string().min(1, "Automotive label is required"),
    aboutAutoTooltip: z.string().min(1, "Automotive tooltip is required"),
    aboutToolingLabel: z.string().min(1, "Tooling label is required"),
    aboutToolingTooltip: z.string().min(1, "Tooling tooltip is required"),
    aboutBridge: z.string().min(1, "About bridge text is required"),
    aboutDigitalLabel: z.string().min(1, "Digital label is required"),
    aboutDigitalTooltip: z.string().min(1, "Digital tooltip is required"),
    aboutPhysicalLabel: z.string().min(1, "Physical label is required"),
    aboutPhysicalTooltip: z.string().min(1, "Physical tooltip is required"),
    aboutOutro: z.string().min(1, "About outro is required"),
    projectsTitle: z.string().min(1, "Projects title is required"),
    projectsCtaLabel: z.string().min(1, "Projects CTA label is required"),
    writingTitle: z.string().min(1, "Writing title is required"),
    writingCtaLabel: z.string().min(1, "Writing CTA label is required"),
    socialsTitle: z.string().min(1, "Socials title is required"),
  }),
  fields: {
    heroRolePrefix: {
      label: "Hero Role Prefix",
      placeholder: "Software developer working at",
      group: "01 Hero",
      order: 1,
    },
    heroCompanyName: {
      label: "Hero Company Name",
      placeholder: "HMMC",
      group: "01 Hero",
      order: 2,
    },
    heroCompanyUrl: {
      label: "Hero Company URL",
      type: "url",
      placeholder: "https://hmmc.io",
      group: "01 Hero",
      order: 3,
    },
    aboutIntro: {
      label: "Intro",
      type: "textarea",
      rows: 2,
      group: "02 About",
      order: 10,
    },
    aboutWebLabel: {
      label: "Web Label",
      group: "02 About",
      order: 11,
    },
    aboutWebTooltip: {
      label: "Web Tooltip",
      type: "textarea",
      rows: 2,
      group: "02 About",
      order: 12,
    },
    aboutAutoLabel: {
      label: "Automotive Label",
      group: "02 About",
      order: 13,
    },
    aboutAutoTooltip: {
      label: "Automotive Tooltip",
      type: "textarea",
      rows: 2,
      group: "02 About",
      order: 14,
    },
    aboutToolingLabel: {
      label: "Tooling Label",
      group: "02 About",
      order: 15,
    },
    aboutToolingTooltip: {
      label: "Tooling Tooltip",
      type: "textarea",
      rows: 2,
      group: "02 About",
      order: 16,
    },
    aboutBridge: {
      label: "Bridge Text",
      type: "textarea",
      rows: 2,
      group: "02 About",
      order: 17,
    },
    aboutDigitalLabel: {
      label: "Digital Label",
      group: "02 About",
      order: 18,
    },
    aboutDigitalTooltip: {
      label: "Digital Tooltip",
      type: "textarea",
      rows: 2,
      group: "02 About",
      order: 19,
    },
    aboutPhysicalLabel: {
      label: "Physical Label",
      group: "02 About",
      order: 20,
    },
    aboutPhysicalTooltip: {
      label: "Physical Tooltip",
      type: "textarea",
      rows: 2,
      group: "02 About",
      order: 21,
    },
    aboutOutro: {
      label: "Outro",
      type: "textarea",
      rows: 2,
      group: "02 About",
      order: 22,
    },
    projectsTitle: {
      label: "Projects Title",
      group: "03 Projects",
      order: 30,
    },
    projectsCtaLabel: {
      label: "Projects CTA",
      group: "03 Projects",
      order: 31,
    },
    writingTitle: {
      label: "Writing Title",
      group: "04 Writing",
      order: 40,
    },
    writingCtaLabel: {
      label: "Writing CTA",
      group: "04 Writing",
      order: 41,
    },
    socialsTitle: {
      label: "Socials Title",
      group: "05 Socials",
      order: 50,
    },
  },
  defaults: {
    heroRolePrefix: "Software developer working at",
    heroCompanyName: "HMMC",
    heroCompanyUrl: "https://hmmc.io",
    aboutIntro:
      "Full-stack developer with several years of experience building",
    aboutWebLabel: "web applications",
    aboutWebTooltip:
      "High throughput, performant web applications in Svelte, React and Python at HMMC.",
    aboutAutoLabel: "automotive interfaces",
    aboutAutoTooltip:
      "Automotive HMI systems at MAGNA Engineering & Infotainment GmbH.",
    aboutToolingLabel: "tooling",
    aboutToolingTooltip:
      "CLI tools and automated testing for automotive applications at MAGNA Engineering & Infotainment GmbH.",
    aboutBridge: "I love building in the",
    aboutDigitalLabel: "digital",
    aboutDigitalTooltip: "Software, web, mobile and cloud infrastructure.",
    aboutPhysicalLabel: "physical",
    aboutPhysicalTooltip: "Robotics, hardware prototyping and 3D printing.",
    aboutOutro:
      "world and try to push my abilities by starting projects outside of my scope.",
    projectsTitle: "Projects",
    projectsCtaLabel: "View all projects",
    writingTitle: "Writing",
    writingCtaLabel: "Read all posts",
    socialsTitle: "Socials",
  },
});

export type HomePageData = z.infer<typeof HomePageDef.schema>;
export const HomePageSchema = HomePageDef.schema;
export const homePageDefaults = HomePageDef.defaults;
