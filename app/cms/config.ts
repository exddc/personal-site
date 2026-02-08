import { createCmsConfig, definePage } from "litecms/admin/config";
import { HomePageDef, SiteSettingsDef } from "./schema";
import {
  getHomePage,
  getSiteSettings,
  saveHomePage,
  saveSiteSettings,
} from "@/app/admin/actions";

export const cmsConfig = createCmsConfig({
  siteName: "Timo Weiss",
  adminTitle: "Content",
  basePath: "/admin",
  publicSiteUrl: "/",
  storage: {
    uploadEndpoint: "/api/storage/upload",
    listEndpoint: "/api/storage/list",
  },
  pages: [
    definePage({
      slug: "home",
      title: "Home Page",
      description: "Edit homepage content",
      definition: HomePageDef,
      action: saveHomePage,
      getData: getHomePage,
      order: 1,
      group: "Pages",
    }),
    definePage({
      slug: "settings",
      title: "Site Settings",
      description: "Edit hero, footer, and social links",
      definition: SiteSettingsDef,
      action: saveSiteSettings,
      getData: getSiteSettings,
      order: 2,
      group: "Settings",
    }),
  ],
});
