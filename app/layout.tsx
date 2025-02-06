import React from 'react';
import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Script from 'next/script';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const PPMigraItalic = localFont({
    variable: '--font-ppmigra-italic',
    src: [
        {
            path: './fonts/PPMigra-BlackItalic.ttf',
            weight: '900',
            style: 'italic',
        },
        {
            path: './fonts/PPMigra-ExtraboldItalic.ttf',
            weight: '800',
            style: 'italic',
        },
        {
            path: './fonts/PPMigra-ExtralightItalic.ttf',
            weight: '200',
            style: 'italic',
        },
        {
            path: './fonts/PPMigra-Italic.ttf',
            weight: '400',
            style: 'italic',
        },
    ],
});

export const metadata: Metadata = {
    title: 'Timo Weiss',
    description: 'Software Developer working on a wide spectrum of Projects',
    openGraph: {
        title: 'Timo Weiss',
        description:
            'Software Developer working on a wide spectrum of Projects',
        url: 'https://timoweiss.me',
        type: 'website',
        images: [
            {
                url: 'https://timoweiss.me/og-image.jpg',
                width: 1200,
                height: 600,
                alt: 'Timo Weiss',
            },
        ],
    },
    twitter: {
        title: 'Timo Weiss',
        description:
            'Software Developer working on a wide spectrum of Projects',
        images: ['https://timoweiss.me/og-image.jpg'],
        card: 'summary_large_image',
        creator: '@timooweiss',
    },
    icons: '/icon.png',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`${geistSans.variable} ${PPMigraItalic.variable} antialiased bg-[#f8f8f8] w-full h-full tracking-tight`}
        >
            <body className="w-full mx-auto">
                <Header />
                <main className="w-full mx-auto px-4">{children}</main>
                <Footer />
            </body>
            <Script
                defer
                data-domain="timoweiss.me"
                src="https://plausible.io/js/script.js"
            ></Script>
        </html>
    );
}
