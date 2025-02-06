"use client";

import React from "react";
import { motion } from "motion/react";

import CenterUnderline from "./Fancy-Underline-Center";

const containerVariants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 1.5,
      duration: 1.5,
      ease: "easeInOut",
    },
  },
};

export function ShortBio() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mx-auto max-w-2xl"
    >
      <section
        id="bio"
        className="mx-auto flex max-w-xl flex-col gap-12 text-center text-lg text-balance"
      >
        <h2 className="font-serif text-5xl italic">About Me</h2>
        <div className="flex flex-col gap-4">
          <p>
            Software Developer working on a wide spectrum of Projects ranging
            from iOS and MacOS Apps to Websites and Software with complex
            Backends, distributed services and AI.
          </p>
        </div>

        <a
          href="/about"
          className="mx-auto w-fit font-serif text-2xl text-[#660708] italic"
        >
          <CenterUnderline
            label="Learn more"
            underlineHeightRatio={0.05}
            underlinePaddingRatio={-0.2}
            transition={true}
          />
        </a>
      </section>
    </motion.div>
  );
}

export function Bio() {
  return (
    <div className="mx-auto mt-24 flex max-w-2xl flex-col items-center justify-center gap-24">
      <section
        id="bio"
        className="mx-auto flex max-w-xl flex-col gap-12 text-center text-lg text-balance"
      >
        <h2 className="font-serif text-5xl italic">About Me</h2>
        <div className="flex flex-col gap-4">
          <p>
            I&apos;m a Full Stack Software Developer with multiple years of
            experience working on a wide spectrum of Projects ranging from iOS
            and MacOS Apps to Websites and Software with complex Backends,
            distributed services and AI.
          </p>
          <p>
            Beyond coding, I try to expand my horizon by working on hardware and
            physical products.
          </p>
          <p>During all this gym and several sports keep me sane.</p>
        </div>
      </section>
    </div>
  );
}
