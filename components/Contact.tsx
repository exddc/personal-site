"use client";

import React from "react";

import CenterUnderline from "./Fancy-Underline-Center";

export function Contact() {
  return (
    <section
      id="contact"
      className="mx-auto flex max-w-xl flex-col gap-12 text-center text-lg text-balance"
    >
      <h2 className="font-serif text-5xl italic">Contact</h2>
      <div className="flex flex-col gap-2">
        <p>You can reach out to me via Email:</p>

        <a
          href="mailto:hi@timoweiss.me"
          className="mx-auto w-fit font-serif text-2xl text-[#660708] italic"
        >
          <CenterUnderline
            label="hi@timoweiss.me"
            underlineHeightRatio={0.05}
            underlinePaddingRatio={-0.2}
            transition={true}
          />
        </a>
      </div>
    </section>
  );
}
