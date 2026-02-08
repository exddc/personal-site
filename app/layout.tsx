import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";

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
  description:
    "Full-stack developer at HMMC with several years of experience building web applications, automotive interfaces and tooling. I love building in the digital and physical world and try to push my abilities by starting projects outside of my scope.",
  openGraph: {
    title: "Timo Weiss",
    description:
      "Full-stack developer at HMMC with several years of experience building web applications, automotive interfaces and tooling.",
    url: "https://timoweiss.me",
    type: "website",
    images: [{ url: "/opengraph-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@timooweiss",
    images: [{ url: "/opengraph-image.jpg", width: 1200, height: 630 }],
  },
  icons: "/icon.jpg",
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
      <body className="h-full w-full">{children}</body>
    </html>
  );
}
