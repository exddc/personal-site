"use client";

import React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CenterUnderline from "./Fancy-Underline-Center";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

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
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [isHome]);

  return (
    <header className="sticky top-0 z-50">
      <div
        className={
          `border-b px-8 py-4 transition-all duration-700` +
          (showBorder
            ? " bg-opacity-60 border-neutral-200 bg-transparent backdrop-blur-lg"
            : " border-transparent")
        }
      >
        <div className="flex flex-row justify-between">
          <Link
            href="/"
            className={
              "flex items-center justify-center font-serif text-xl font-normal italic transition-all duration-700" +
              (showTitle ? " text-black" : " text-transparent")
            }
          >
            Timo Weiss
          </Link>
          <div className="flex flex-row gap-4 text-base font-normal tracking-tight text-[#660708]">
            <Link href="/">
              <CenterUnderline
                label="Home"
                underlineHeightRatio={0.05}
                underlinePaddingRatio={-0.2}
              />
            </Link>
            <Link href="/projects">
              <CenterUnderline
                label="Projects"
                underlineHeightRatio={0.05}
                underlinePaddingRatio={-0.2}
              />
            </Link>
            <Link href="/about">
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
