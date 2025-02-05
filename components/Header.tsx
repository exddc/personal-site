'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import CenterUnderline from './Fancy-Underline-Center';

export default function Header() {
    const pathname = usePathname();
    const isHome = pathname === '/';

    const [showBorder, setShowBorder] = useState(!isHome);
    const [showTitle, setShowTitle] = useState(!isHome);

    useEffect(() => {
        if (!isHome) {
            setShowTitle(true);
            setShowBorder(true);
        } else {
            function handleScroll() {
                if (window.scrollY > 50) {
                    setShowBorder(true);
                    setShowTitle(true);
                } else {
                    setShowBorder(false);
                    setShowTitle(false);
                }
            }
            window.addEventListener('scroll', handleScroll);
            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        }
    }, [isHome]);

    return (
        <header className="sticky top-0 z-50">
            <div
                className={
                    `px-8 py-4 transition-all duration-700 border-b` +
                    (showBorder
                        ? ' border-neutral-200 bg-transparent backdrop-blur-lg  bg-opacity-60'
                        : ' border-transparent')
                }
            >
                <div className="flex flex-row justify-between">
                    <Link
                        href="/"
                        className={
                            'font-normal font-serif italic text-xl justify-center items-center flex transition-all duration-700' +
                            (showTitle ? ' text-black' : ' text-transparent')
                        }
                    >
                        Timo Weiss
                    </Link>
                    <div className="flex flex-row font-normal text-base gap-4 tracking-tight">
                        <Link href="/" className="text-black">
                            <CenterUnderline
                                label="Home"
                                underlineHeightRatio={0.05}
                                underlinePaddingRatio={-0.2}
                            />
                        </Link>
                        <Link href="/projects" className="text-black">
                            <CenterUnderline
                                label="Projects"
                                underlineHeightRatio={0.05}
                                underlinePaddingRatio={-0.2}
                            />
                        </Link>
                        <Link href="/about" className="text-black">
                            <CenterUnderline
                                label="About"
                                underlineHeightRatio={0.05}
                                underlinePaddingRatio={-0.2}
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
