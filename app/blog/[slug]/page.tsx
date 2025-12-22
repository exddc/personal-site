import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, getPosts } from "@/lib/blog";

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-6 py-24 sm:px-12">
      <Link href="/blog" className="font-mono text-sm text-gray-500 hover:text-foreground transition-colors">
        ← blog
      </Link>
      
      <header className="flex flex-col gap-4">
        <h1 className="text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
          {post.title}
        </h1>
        <time className="font-mono text-sm text-gray-500">{post.date}</time>
      </header>
      
      <div 
        className="prose prose-invert prose-lg max-w-none prose-headings:font-medium prose-a:text-accent hover:prose-a:text-foreground"
        dangerouslySetInnerHTML={{ __html: post.content }} 
      />
    </article>
  );
}

