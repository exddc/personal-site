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
          title: "Projekte",
          description: "Portfolio-Projekte verwalten",
          icon: CmsModuleIcons.analytics,
          href: "/admin/projects",
        },
        {
          id: "blog",
          title: "Blog",
          description: "Blogbeiträge schreiben und verwalten",
          icon: CmsModuleIcons.blog,
          href: "/admin/blog",
        },
        {
          id: "account",
          title: "Konto",
          description: "Eigenes Passwort ändern",
          icon: CmsModuleIcons.pages,
          href: "/admin/account",
        },
        ...(isAdmin
          ? [
              {
                id: "users",
                title: "Benutzer",
                description: "CMS-Benutzer und Einladungen verwalten",
                icon: CmsModuleIcons.email,
                href: "/admin/users",
              },
            ]
          : []),
      ]}
    />
  );
}
