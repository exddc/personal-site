import { pgTable, text, timestamp, jsonb } from "drizzle-orm/pg-core";

export const cmsDocuments = pgTable("cms_documents", {
  key: text("key").primaryKey(),
  data: jsonb("data").notNull(),
  content: text("content"),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedBy: text("updated_by"),
});

export type BlogPostStatus = "draft" | "published";

export const blogPosts = pgTable("blog_posts", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt"),
  coverImage: text("cover_image"),
  content: text("content").notNull(),
  tags: jsonb("tags").$type<string[]>().default([]),
  authorName: text("author_name").notNull(),
  status: text("status").$type<BlogPostStatus>().notNull().default("draft"),
  publishedAt: timestamp("published_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type BlogPost = typeof blogPosts.$inferSelect;
export type NewBlogPost = typeof blogPosts.$inferInsert;
