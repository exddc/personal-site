"use client";

import { CmsBlogAdmin } from "litecms/admin";

export default function AdminBlogPage() {
  return (
    <CmsBlogAdmin
      postsEndpoint="/api/admin/blog/posts"
      defaultAuthorName="Timo Weiss"
      storage={{
        uploadEndpoint: "/api/storage/upload",
      }}
    />
  );
}
