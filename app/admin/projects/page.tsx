"use client";

import * as LiteCmsAdmin from "litecms/admin";

type CmsProjectsAdminComponent = typeof LiteCmsAdmin.CmsProjectsAdmin;

const liteCmsAdmin = LiteCmsAdmin as {
  CmsProjectsAdmin?: CmsProjectsAdminComponent;
  CmsCollectionAdmin?: CmsProjectsAdminComponent;
};

function getProjectsAdminComponent(): CmsProjectsAdminComponent {
  if (liteCmsAdmin.CmsProjectsAdmin) {
    return liteCmsAdmin.CmsProjectsAdmin;
  }

  const legacyComponent = liteCmsAdmin.CmsCollectionAdmin;
  if (legacyComponent) {
    return legacyComponent;
  }

  throw new Error(
    "Missing litecms admin component: expected CmsProjectsAdmin or CmsCollectionAdmin.",
  );
}

const CmsProjectsAdmin = getProjectsAdminComponent();

export default function AdminProjectsPage() {
  return (
    <CmsProjectsAdmin
      projectsEndpoint="/api/admin/projects"
      storage={{
        uploadEndpoint: "/api/storage/upload",
      }}
    />
  );
}
