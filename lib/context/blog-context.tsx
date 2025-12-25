"use client";

// Libraries
import React, { createContext, useContext } from "react";
import type { BlogPost } from "@/lib/blog";

// Contexts
const BlogPostContext = createContext<BlogPost | null>(null);
const BlogListContext = createContext<BlogPost[] | null>(null);

// Types
interface BlogPostProviderProps {
  post: BlogPost;
  children: React.ReactNode;
}

interface BlogListProviderProps {
  posts: BlogPost[];
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

export function BlogListProvider({ posts, children }: BlogListProviderProps) {
  return (
    <BlogListContext.Provider value={posts}>
      {children}
    </BlogListContext.Provider>
  );
}

export function useBlogPosts() {
  const context = useContext(BlogListContext);
  if (context === null) {
    throw new Error("useBlogPosts must be used within a BlogListProvider");
  }
  return context;
}
