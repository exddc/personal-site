// Libraries
import { getPost } from "@/lib/blog";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BlogPostProvider } from "@/lib/context/blog-context";

export const dynamic = "force-dynamic";

// Types
interface BlogPostLayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogPostLayoutProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const authorName = post.authorName || "Timo Weiss";

  return {
    title: `${post.title} | Timo Weiss`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [authorName],
      images: [{ url: "/opengraph-image.jpg", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      images: [{ url: "/opengraph-image.jpg", width: 1200, height: 630 }],
    },
  };
}

export default async function BlogPostLayout({
  children,
  params,
}: BlogPostLayoutProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return <BlogPostProvider post={post}>{children}</BlogPostProvider>;
}
