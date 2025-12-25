// Libraries
import { Suspense } from "react";
import { getPosts } from "@/lib/blog";

// Components
import PageHeader from "@/components/PageHeader";
import AnimatedList from "./AnimatedList";

export default async function Blog() {
  const posts = await getPosts();
  return (
    <div className="flex flex-col gap-24 xl:gap-32">
      <PageHeader title="Writing" />

      <section id="posts">
        <Suspense fallback={null}>
          <AnimatedList posts={posts} />
        </Suspense>
      </section>
    </div>
  );
}
