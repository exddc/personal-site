import { getPosts } from "@/lib/blog";
import { BlogListProvider } from "./context";

export default async function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const posts = await getPosts();

  return <BlogListProvider posts={posts}>{children}</BlogListProvider>;
}

