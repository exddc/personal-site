// Types
export interface Project {
  slug: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  externalLink: string;
  content: string;
}

// Project data
export const projects: Project[] = [
  {
    slug: "name-generator",
    title: "Name Generator",
    description:
      "Generate domain names that are guaranteed to be available. Next.js frontend, FastAPI backend with multiple workers for performance.",
    image: "https://static.timoweiss.me/og-image.jpg",
    technologies: ["Next.js", "FastAPI", "Python", "Tailwind CSS"],
    externalLink: "https://name-generator.timoweiss.me",
    content: `
A domain name generator that creates unique, available domain names using AI-powered suggestions.

## Features

- **Real-time availability checking** - Instantly verify if generated domains are available
- **AI-powered suggestions** - Uses advanced algorithms to generate creative domain names
- **Multiple TLD support** - Check availability across various top-level domains
- **Fast performance** - Backend optimized with multiple workers for quick responses

## Technical Implementation

The frontend is built with Next.js, providing a fast and responsive user experience. The backend uses FastAPI with Python, leveraging asynchronous programming for efficient domain availability checking.

The architecture uses multiple workers to handle concurrent requests, ensuring the application remains responsive even under heavy load.
    `,
  },
  {
    slug: "svelte-keyboard",
    title: "Svelte Mac Keyboard",
    description:
      "A virtual, fully interactive keyboard component built with Svelte and Tailwind CSS.",
    image: "https://static.timoweiss.me/Screenshot%202025-10-06%20at%2020.45.39.png",
    technologies: ["Svelte", "TypeScript", "Tailwind CSS"],
    externalLink: "https://svelte-keyboard.timoweiss.me",
    content: `
A beautiful, interactive Mac-style keyboard component for Svelte applications.

## Features

- **Realistic design** - Accurately mimics the Apple Magic Keyboard aesthetic
- **Full interactivity** - Keys respond to both clicks and keyboard input
- **Key highlighting** - Visual feedback for pressed keys
- **Customizable** - Easy to style and adapt to different themes

## Technical Implementation

Built entirely with Svelte and styled with Tailwind CSS, this component provides a lightweight yet visually impressive keyboard visualization. The component captures keyboard events and provides visual feedback in real-time.

Perfect for typing tutorials, keyboard shortcut demonstrations, or adding visual flair to documentation.
    `,
  },
  {
    slug: "box-grid",
    title: "Box Grid Generator",
    description:
      "Dynamically generate a grid of boxes for drawers or cabinets. Next.js with Three.js for the 3D visualization.",
    image: "https://static.timoweiss.me/box-generator-browser-screenshot.png",
    technologies: ["Next.js", "Three.js", "React Three Fiber", "Tailwind CSS"],
    externalLink: "https://box-grid.timoweiss.me",
    content: `
A 3D tool for generating customizable box grids perfect for organizing drawers and cabinets.

## Features

- **Interactive 3D preview** - Real-time visualization of your box grid
- **Customizable dimensions** - Set exact measurements for your drawer or cabinet
- **Flexible grid layout** - Adjust rows and columns to fit your needs
- **Export ready** - Generate files ready for 3D printing

## Technical Implementation

The application uses Next.js as the framework, with Three.js and React Three Fiber powering the 3D visualization. Users can manipulate the grid in real-time and see immediate updates to the 3D model.

The parametric design allows for easy customization while maintaining structural integrity for 3D printing.
    `,
  },
  {
    slug: "gotdoneapp",
    title: "Got Done",
    description:
      "Minimal To-Do & Habit Tracker. Track daily tasks, build streaks and see your progress. Built with Swift and SwiftUI.",
    image: "https://static.timoweiss.me/GotDone-1-5-Home-Hand.png",
    technologies: ["Swift", "SwiftUI", "iOS", "CloudKit"],
    externalLink: "https://gotdoneapp.com",
    content: `
A minimalist iOS app for tracking daily tasks and building habits through streaks.

## Features

- **Clean interface** - Distraction-free design focused on getting things done
- **Streak tracking** - Build momentum by maintaining daily streaks
- **Progress visualization** - See your accomplishments over time
- **Cloud sync** - Your data synced across all your devices

## Technical Implementation

Built natively for iOS using Swift and SwiftUI, the app follows Apple's Human Interface Guidelines for a familiar, intuitive experience. CloudKit integration ensures your data is always backed up and synced across devices.

The app emphasizes simplicity and speed, making it easy to quickly log completed tasks and maintain your productivity streaks.
    `,
  },
];

export function getProjects(): Project[] {
  return projects;
}

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

