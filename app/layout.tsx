import React from "react";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

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
  title: "Timo Weiss",
  description: "Software Developer working on a wide spectrum of Projects",
  openGraph: {
    title: "Timo Weiss",
    description: "Software Developer working on a wide spectrum of Projects",
    url: "https://timoweiss.me",
    type: "website",
    images: [
      {
        url: "https://timoweiss.me/og-image.jpg",
        width: 1200,
        height: 600,
        alt: "Timo Weiss",
      },
    ],
  },
  twitter: {
    title: "Timo Weiss",
    description: "Software Developer working on a wide spectrum of Projects",
    images: ["https://timoweiss.me/og-image.jpg"],
    card: "summary_large_image",
    creator: "@timooweiss",
  },
  icons: "/icon.png",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${PPMontreal.variable} ${PPMontrealMono.variable} h-full w-full bg-[#EDEDED] antialiased`}
    >
      <body className="bg-[#EDEDED] p-0 xl:p-24">{children}</body>
      <Script
        defer
        data-domain="timoweiss.me"
        src="https://plausible.io/js/script.js"
      ></Script>
    </html>
  );
}
