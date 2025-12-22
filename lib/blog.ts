export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  content: string; // HTML or Markdown content
}

export const posts: BlogPost[] = [
  {
    slug: "hello-world",
    title: "Hello World",
    date: "2024-03-21",
    description: "The first post on my new blog.",
    content: `
      <p>Welcome to my new blog. I've decided to start writing about my experiences in software development, design, and everything in between.</p>
      <p>Stay tuned for more updates!</p>
    `,
  },
  {
    slug: "design-engineering",
    title: "The Intersection of Design and Engineering",
    date: "2024-04-05",
    description: "Why the line between designer and developer is blurring.",
    content: `
      <p>In modern web development, the distinction between design and engineering is becoming increasingly irrelevant. The best products are built by people who understand both.</p>
      <p>This site is an exploration of that intersection.</p>
    `,
  },
];

export async function getPosts(): Promise<BlogPost[]> {
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPost(slug: string): Promise<BlogPost | undefined> {
  return posts.find((post) => post.slug === slug);
}

