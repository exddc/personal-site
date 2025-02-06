"use client";
import React from "react";
import CenterUnderline from "../Fancy-Underline-Center";
import Link from "next/link";

export default function LinkElement(props: {
  title: string;
  label: string;
  link: string;
}) {
  return (
    <div className="flex items-center justify-center rounded-xl border-[1px] border-solid border-[#908A7B]/50 p-[4px] text-base tracking-tight whitespace-nowrap text-black backdrop-blur-sm">
      <Link
        href={props.link}
        className="h-[40px] w-[400px] cursor-pointer rounded-lg border-[1px] border-solid border-[#908A7B]/50 bg-[#F3F3F1] p-2.5 text-base font-light transition-all duration-500 hover:scale-[99%]"
      >
        <div className="mt-[-2px] flex justify-between">
          <p className="font-medium">{props.title}</p>

          <CenterUnderline
            label={props.label + " " + String.fromCharCode(8594)}
            underlineHeightRatio={0.05}
            underlinePaddingRatio={-0.2}
          />
        </div>
      </Link>
    </div>
  );
}
