"use client";

// Libraries
import React, { createContext, useContext } from "react";
import type { BlogPost } from "@/lib/blog";

const BlogPostContext = createContext<BlogPost | null>(null);

interface BlogPostProviderProps {
  post: BlogPost;
  children: React.ReactNode;
}

export function BlogPostProvider({ post, children }: BlogPostProviderProps) {
  return (
    <BlogPostContext.Provider value={post}>{children}</BlogPostContext.Provider>
  );
}

export function useBlogPost() {
  const context = useContext(BlogPostContext);
  if (!context) {
    throw new Error("useBlogPost must be used within a BlogPostProvider");
  }
  return context;
}
