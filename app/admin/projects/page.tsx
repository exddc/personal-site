"use client";

import { CmsCollectionAdmin } from "litecms/admin";

export default function AdminProjectsPage() {
  return (
    <CmsCollectionAdmin
      projectsEndpoint="/api/admin/projects"
      storage={{
        uploadEndpoint: "/api/storage/upload",
      }}
    />
  );
}
