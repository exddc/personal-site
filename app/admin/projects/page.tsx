"use client";

import * as LiteCmsAdmin from "litecms/admin";
import type { ComponentType } from "react";

type CmsProjectsAdminProps = {
  projectsEndpoint: string;
  storage: {
    uploadEndpoint: string;
  };
};

type CmsProjectsAdminComponent = ComponentType<CmsProjectsAdminProps>;

const liteCmsAdmin = LiteCmsAdmin as Record<string, unknown>;
const nextComponent = liteCmsAdmin.CmsProjectsAdmin as
  | CmsProjectsAdminComponent
  | undefined;
const legacyComponent = liteCmsAdmin.CmsCollectionAdmin as
  | CmsProjectsAdminComponent
  | undefined;

function getProjectsAdminComponent(): CmsProjectsAdminComponent {
  if (nextComponent) {
    return nextComponent;
  }

  if (legacyComponent) {
    return legacyComponent;
  }

  return function MissingProjectsAdmin() {
    return (
      <div className="p-6 text-sm text-red-600">
        Missing litecms admin component for projects.
      </div>
    );
  };
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
