// Libraries
import React, { ViewTransition } from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";

// Styles
import "./globals.css";

// Components
import Script from "next/script";
import ClientLayout from "@/components/ClientLayout";
import { BlogListProvider } from "@/lib/context/blog-context";
import { getPosts } from "@/lib/blog";

// Fonts
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

// Metadata
export const metadata: Metadata = {
  title: "Timo Weiss",
  description: "I'm a full-stack developer at HMMC",
  openGraph: {
    title: "Timo Weiss",
    description: "I'm a full-stack developer at HMMC",
    url: "https://timoweiss.me",
    type: "website",
    images: [{ url: "/opengraph-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@timooweiss",
    images: [{ url: "/opengraph-image.jpg", width: 1200, height: 630 }],
  },
  icons: "/icon.png",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const posts = await getPosts();

  return (
    <html
      lang="en"
      className={`${PPMontreal.variable} ${PPMontrealMono.variable} h-full w-full antialiased`}
    >
      <body className="relative h-full w-full p-0 selection:bg-[var(--accent)] selection:text-white xl:p-24">
        <ViewTransition>
          <BlogListProvider posts={posts}>
            <ClientLayout>{children}</ClientLayout>
          </BlogListProvider>
        </ViewTransition>
      </body>
      <Script
        defer
        data-domain="timoweiss.me"
        src="https://plausible.io/js/script.js"
      ></Script>
    </html>
  );
}
