import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";

import { SiteFooter } from "@/components/site-footer";
import { SiteNavigation } from "@/components/site-navigation";
import { siteConfig } from "@/lib/site-config";

import "./globals.css";

const PPMontreal = localFont({
  variable: "--font-ppmontreal",
  src: [
    {
      path: "./fonts/PPNeueMontreal-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/PPNeueMontreal-Medium.ttf",
      weight: "500",
      style: "normal",
    },
  ],
});

const PPMontrealMono = localFont({
  variable: "--font-ppmontreal-mono",
  src: [
    {
      path: "./fonts/PPNeueMontrealMono-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/PPNeueMontrealMono-Medium.ttf",
      weight: "500",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.name,
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
    images: [{ url: "/opengraph-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    creator: "@timooweiss",
    images: [{ url: "/opengraph-image.jpg", width: 1200, height: 630 }],
  },
  icons: { icon: "/icon.jpg", apple: "/icon.png" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${PPMontreal.variable} ${PPMontrealMono.variable} h-full w-full antialiased`}
    >
      <body className="h-full w-full">
        <div className="relative h-full w-full p-0 selection:bg-(--accent) selection:text-white xl:p-6">
          <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-12 p-6 sm:p-12 lg:p-24 xl:gap-16 xl:pt-12">
            <SiteNavigation />
            <div className="flex-1 pb-24">{children}</div>
            <SiteFooter />
          </main>
          <Script
            strategy="lazyOnload"
            data-domain="timoweiss.me"
            src="https://plausible.io/js/script.js"
          />
          <Script
            strategy="lazyOnload"
            src="https://analytics.timoweiss.me/script.js"
            data-website-id="e5c42cb6-aadc-4b68-8681-80a290c92765"
          />
        </div>
      </body>
    </html>
  );
}
