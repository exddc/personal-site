import { CmsAdminLanding, CmsModuleIcons } from "litecms/admin";
import { extractLandingProps } from "litecms/admin/config";
import { cmsConfig } from "../cms/config";

export default function AdminIndexPage() {
  return (
    <CmsAdminLanding
      {...extractLandingProps(cmsConfig)}
      modules={[
        {
          id: "blog",
          title: "Blog",
          description: "Write and manage blog posts",
          icon: CmsModuleIcons.blog,
          href: `${cmsConfig.basePath ?? "/admin"}/blog`,
        },
        {
          id: "projects",
          title: "Projects",
          description: "Create and manage projects",
          icon: CmsModuleIcons.pages,
          href: `${cmsConfig.basePath ?? "/admin"}/projects`,
        },
      ]}
    />
  );
}
