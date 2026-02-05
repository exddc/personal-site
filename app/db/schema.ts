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

export type ProjectStatus = "draft" | "published";

export const projects = pgTable("projects", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  image: text("image"),
  technologies: jsonb("technologies").$type<string[]>().default([]),
  externalLink: text("external_link").notNull(),
  repositoryLink: text("repository_link"),
  appStoreLink: text("app_store_link"),
  content: text("content").notNull(),
  status: text("status").$type<ProjectStatus>().notNull().default("draft"),
  publishedAt: timestamp("published_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;
