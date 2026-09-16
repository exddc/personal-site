export const siteSettings = {
  siteName: "Timo Weiss",
  footerRolePrefix: "Full-stack engineer at",
  footerCompanyName: "HMMC",
  footerCompanyUrl: "https://hmmc.io",
  socialGitHubLabel: "GitHub",
  socialGitHubUrl: "https://github.com/exddc",
  socialXLabel: "X (Twitter)",
  socialXUrl: "https://x.com/timooweiss",
  socialLinkedInLabel: "LinkedIn",
  socialLinkedInUrl: "https://linkedin.com/in/timoweiss",
} as const;

export const homePage = {
  heroRolePrefix: "Full-stack engineer at",
  heroCompanyName: "HMMC",
  heroCompanyUrl: "https://hmmc.io",
  aiTooltip:
    "AI applications, spanning frontend interfaces and backend services built with TypeScript, Svelte and Python.",
  autoTooltip:
    "Automotive HMI systems, CLI tools and automated testing at MAGNA Engineering & Infotainment GmbH.",
  nativeTooltip:
    "Got Done for iOS and Meerkat for macOS, built with Swift and SwiftUI.",
  embeddedTooltip:
    "OpenChime: C++ services, Buildroot Linux, MQTT, electronics and a 3D-printed enclosure.",
  appsTitle: "Apps",
  projectsTitle: "Projects",
  socialsTitle: "Socials",
} as const;

export const apps = [
  {
    slug: "meerkat",
    title: "Meerkat",
    description:
      "A native macOS menu bar app for quickly checking your CCTV cameras. Built with Swift and SwiftUI with a focus on low resource usage and near instant responsiveness, available as a download.",
    href: "https://github.com/exddc/meerkat/releases/latest",
    actionLabel: "Download for macOS",
    secondaryLink: {
      href: "https://github.com/exddc/meerkat",
      label: "Source code",
    },
  },
  {
    slug: "gotdoneapp",
    title: "Got Done",
    description:
      "A native iOS app for daily tasks and habits in a minimalistic and focused design. Built with Swift and SwiftUI, published on the App Store.",
    href: "https://apps.apple.com/app/id6737226124",
    actionLabel: "View on the App Store",
    secondaryLink: { href: "https://gotdoneapp.com", label: "Website" },
  },
] as const;

export const projects = [
  {
    slug: "openchime-speaker-box",
    title: "Chime: Speaker Box",
    description:
      "An MQTT-triggered speaker with C++ services running on a custom Buildroot Linux image and a 3D-printed enclosure. The first  product in the OpenChime system. Introdcues OTA, fast boot and high availability to the OpenChime ecosystem.",
    href: "https://github.com/exddc/openchime",
    actionLabel: "View source on GitHub",
  },
  {
    slug: "openchime",
    title: "OpenChime",
    description:
      "An open-source, local-first doorbell intercom system. An ongoing rewrite brings together C++ services, embedded Linux and a Svelte configuration UI, informed by 1.5 years of running the original system at home.",
    href: "https://github.com/exddc/openchime",
    actionLabel: "View source on GitHub",
  },
  {
    slug: "name-generator",
    title: "Name Generator",
    description:
      "Generate domain names that are guaranteed to be available. Next.js frontend and FastAPI backend with multiple workers for performance. Rank and iterate on domains to imporve the AI's suggestions.",
    href: "https://name-generator.timoweiss.me",
    actionLabel: "Visit project",
    secondaryLink: {
      href: "https://github.com/exddc/name-generator",
      label: "View source on GitHub",
    },
  },
  {
    slug: "box-grid",
    title: "Box Grid Generator",
    description:
      "Dynamically generate a grid of boxes for drawers or cabinets. Next.js with Three.js for the 3D visualization. Rewrote a big part for efficiency and performance after the initial release.",
    href: "https://box-grid.timoweiss.me",
    actionLabel: "Visit project",
    secondaryLink: {
      href: "https://github.com/exddc/drawer-inserts-generator",
      label: "View source on GitHub",
    },
  },
  {
    slug: "svelte-keyboard",
    title: "Svelte Mac Keyboard",
    description:
      "A customizable and animated Mac-style keyboard component for Svelte built with SvelteKit and Tailwind CSS. It visually responds to both keyboard and mouse events.",
    href: "https://svelte-keyboard.timoweiss.me",
    actionLabel: "Visit project",
    secondaryLink: {
      href: "https://github.com/exddc/svelte-mac-keyboard",
      label: "View source on GitHub",
    },
  }
] as const;
