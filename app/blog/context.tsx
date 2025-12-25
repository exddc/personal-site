"use client";

import React, { createContext, useContext } from "react";
import type { BlogPost } from "@/lib/blog";

const BlogListContext = createContext<BlogPost[] | null>(null);

export function BlogListProvider({
  posts,
  children,
}: {
  posts: BlogPost[];
  children: React.ReactNode;
}) {
  return (
    <BlogListContext.Provider value={posts}>{children}</BlogListContext.Provider>
  );
}

export function useBlogPosts() {
  const context = useContext(BlogListContext);
  if (context === null) {
    throw new Error("useBlogPosts must be used within a BlogListProvider");
  }
  return context;
}

