import React from "react";
import Link from "next/link";
import { getPosts } from "@/lib/blog";

export default async function BlogIndex() {
  const posts = await getPosts();

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-12 px-6 py-24 sm:px-12">
      <div className="flex flex-col gap-4">
        <Link href="/" className="font-mono text-sm text-gray-500 hover:text-foreground transition-colors">
          ← home
        </Link>
        <h1 className="text-4xl font-medium tracking-tight text-foreground">Blog</h1>
      </div>
      
      <div className="flex flex-col gap-10">
        {posts.map((post) => (
          <Link 
            key={post.slug} 
            href={`/blog/${post.slug}`}
            className="group flex flex-col gap-2 border-b border-white/10 pb-10 transition-colors hover:border-white/30"
          >
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <h2 className="text-2xl font-medium text-foreground group-hover:text-accent transition-colors">
                {post.title}
              </h2>
              <span className="font-mono text-sm text-gray-500">{post.date}</span>
            </div>
            <p className="text-gray-400 max-w-xl">{post.description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}

