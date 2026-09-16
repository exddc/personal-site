import type { ReactNode } from "react";
import Script from "next/script";

import ClientLayout from "@/components/ClientLayout";

export default function SiteLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="relative h-full w-full p-0 selection:bg-(--accent) selection:text-white xl:p-6">
      <ClientLayout>{children}</ClientLayout>
      <Script
        defer
        data-domain="timoweiss.me"
        src="https://plausible.io/js/script.js"
      ></Script>
      <Script
        defer
        src="https://analytics.timoweiss.me/script.js"
        data-website-id="e5c42cb6-aadc-4b68-8681-80a290c92765"
      ></Script>
    </div>
  );
}
