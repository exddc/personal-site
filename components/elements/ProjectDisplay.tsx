"use client";

import React from "react";
import CenterUnderline from "../Fancy-Underline-Center";
import Link from "next/link";

export default function ProjectDisplay(props: {
  title: string;
  image: string;
  buildStack: string;
  link: string;
}) {
  return (
    <div className="flex flex-col items-center justify-between rounded-xl border-[1px] border-solid border-[#908A7B]/50 p-[4px] text-base tracking-tight whitespace-nowrap text-black backdrop-blur-sm">
      <div className="h-fit overflow-hidden rounded-lg border-[1px] border-solid border-[#908A7B]/50 bg-[#F3F3F1] transition-all duration-300 hover:scale-[99%] hover:rounded-md">
        <img
          src={props.image}
          alt={props.title + " Showcase"}
          className="transition-all duration-300 hover:scale-105"
        />
      </div>

      <div className="mt-[4px] h-fit w-full rounded-lg border-[1px] border-solid border-[#908A7B]/50 bg-[#F3F3F1] p-2.5 text-sm transition-all duration-500">
        <div className="flex flex-col justify-between sm:flex-row">
          <Link href={props.link}>
            <CenterUnderline
              label={props.title + " " + String.fromCharCode(8594)}
              underlineHeightRatio={0.05}
              underlinePaddingRatio={-0.2}
            />
          </Link>
          <p className="text-balance">{props.buildStack}</p>
        </div>
      </div>
    </div>
  );
}
