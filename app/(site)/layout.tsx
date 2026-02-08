// Libraries
import React, { ViewTransition } from "react";
import Script from "next/script";

// Components
import ClientLayout from "@/components/ClientLayout";
import { BlogListProvider } from "@/lib/context/blog-context";
import { HomePageProvider } from "@/lib/context/home-context";
import { ProjectsListProvider } from "@/lib/context/projects-context";
import { SiteSettingsProvider } from "@/lib/context/site-context";
import { getPosts } from "@/lib/blog";
import { getProjects } from "@/lib/projects";
import { getHomePage, getSiteSettings } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const posts = await getPosts();
  const projects = await getProjects();
  const siteSettings = await getSiteSettings();
  const homePage = await getHomePage();

  return (
    <div className="relative h-full w-full p-0 selection:bg-[var(--accent)] selection:text-white xl:p-24">
      <ViewTransition>
        <SiteSettingsProvider settings={siteSettings}>
          <HomePageProvider settings={homePage}>
            <ProjectsListProvider projects={projects}>
              <BlogListProvider posts={posts}>
                <ClientLayout>{children}</ClientLayout>
              </BlogListProvider>
            </ProjectsListProvider>
          </HomePageProvider>
        </SiteSettingsProvider>
      </ViewTransition>
      <Script
        defer
        data-domain="timoweiss.me"
        src="https://plausible.io/js/script.js"
      ></Script>
    </div>
  );
}
