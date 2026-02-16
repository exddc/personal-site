import React from "react";
import { CmsAdminLanding, CmsModuleIcons } from "litecms/admin";
import { extractLandingProps } from "litecms/admin/config";
import { cmsConfig } from "../cms/config";
import { getCurrentSession, isAdminRole } from "../lib/authz";

export default async function AdminIndexPage() {
  const session = await getCurrentSession();
  const role =
    (session?.user as { role?: string | null } | undefined)?.role ?? null;
  const isAdmin = isAdminRole(role);

  return (
    <CmsAdminLanding
      {...extractLandingProps(cmsConfig)}
      modules={[
        {
          id: "projects",
          title: "Projects",
          description: "Manage portfolio projects",
          icon: CmsModuleIcons.analytics,
          href: "/admin/projects",
        },
        {
          id: "blog",
          title: "Blog",
          description: "Write and manage blog posts",
          icon: CmsModuleIcons.blog,
          href: "/admin/blog",
        },
        ...(isAdmin
          ? [
              {
                id: "users",
                title: "Users",
                description: "Manage CMS users and invites",
                icon: CmsModuleIcons.email,
                href: "/admin/users",
              },
            ]
          : []),
      ]}
    />
  );
}
