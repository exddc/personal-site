export interface Project {
  slug: string;
  title: string;
  description: string;
  href: string;
  actionLabel: string;
  secondaryLink?: {
    href: string;
    label: string;
  };
}

export const about = {
  aiTooltip:
    "AI applications spanning frontend interfaces and backend services built with TypeScript, Svelte, and Python.",
  automotiveTooltip:
    "Automotive HMI systems, CLI tools, and automated testing at MAGNA Engineering & Infotainment GmbH.",
  nativeTooltip:
    "Got Done for iOS and Meerkat for macOS, built with Swift and SwiftUI.",
  embeddedTooltip:
    "OpenChime: C++ services, Buildroot Linux, MQTT, electronics, and a 3D-printed enclosure.",
} as const;

export const apps = [
  {
    slug: "meerkat",
    title: "Meerkat",
    description:
      "A native macOS menu bar app for quickly checking your CCTV cameras. Built with Swift and SwiftUI with a focus on low resource usage and near-instant responsiveness, available as a download.",
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
      "A native iOS app for daily tasks and habits in a minimal and focused design. Built with Swift and SwiftUI, published on the App Store.",
    href: "https://apps.apple.com/app/id6737226124",
    actionLabel: "View on the App Store",
    secondaryLink: { href: "https://gotdoneapp.com", label: "Website" },
  },
] as const satisfies readonly Project[];

export const projects = [
  {
    slug: "openchime-speaker-box",
    title: "Chime: Speaker Box",
    description:
      "An MQTT-triggered speaker with C++ services running on a custom Buildroot Linux image and a 3D-printed enclosure. The first product in the OpenChime system introduces OTA updates, fast boot times, and high availability to the ecosystem.",
    href: "https://github.com/exddc/openchime",
    actionLabel: "View source on GitHub",
  },
  {
    slug: "openchime",
    title: "OpenChime",
    description:
      "An open-source, local-first doorbell intercom system. An ongoing rewrite brings together C++ services, embedded Linux, and a Svelte configuration UI, informed by 1.5 years of running the original system at home.",
    href: "https://github.com/exddc/openchime",
    actionLabel: "View source on GitHub",
  },
  {
    slug: "name-generator",
    title: "Name Generator",
    description:
      "Generate domain names that are guaranteed to be available. A Next.js frontend and FastAPI backend use multiple workers for performance. Rank and iterate on domains to improve the AI suggestions.",
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
      "Dynamically generate a grid of boxes for drawers or cabinets. Built with Next.js and Three.js for 3D visualization, then substantially rewritten for efficiency and performance after the initial release.",
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
      "A customizable, animated Mac-style keyboard component built with SvelteKit and Tailwind CSS. It responds visually to keyboard and pointer input.",
    href: "https://svelte-keyboard.timoweiss.me",
    actionLabel: "Visit project",
    secondaryLink: {
      href: "https://github.com/exddc/svelte-mac-keyboard",
      label: "View source on GitHub",
    },
  },
] as const satisfies readonly Project[];
