"use client";
import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import CenterUnderline from "./Fancy-Underline-Center";
import ProjectDisplay from "./elements/ProjectDisplay";

const containerVariants = {
  hidden: {
    opacity: 0.5,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0,
      duration: 1.5,
      ease: "easeInOut",
    },
  },
};

export default function LatestProjects() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="mx-auto"
    >
      <section
        id="latest-projects"
        className="mx-auto flex w-full max-w-[90rem] flex-col gap-12 text-center text-lg text-balance"
      >
        <h2 className="font-serif text-5xl italic">Latest Projects</h2>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ProjectDisplay
            title="Got Done"
            link="https://gotdoneapp.com"
            buildStack="iOS App - Swift & SwiftUI"
            image="https://static.timoweiss.me/16.jpg"
          />

          <ProjectDisplay
            title="Domain Generator"
            link="https://domain-generator.timoweiss.me"
            buildStack="Web App - TypeScript, Next.js, Python & FastAPI"
            image="https://static.timoweiss.me/domain-generator-showcase.jpg"
          />

          <ProjectDisplay
            title="Animated Blurry Blob Background Generator"
            link="https://blurry-blob-background.timoweiss.me"
            buildStack="Web App - TypeScript & Next.js"
            image="https://static.timoweiss.me/blurry-blob-background-showcase.jpg"
          />

          <ProjectDisplay
            title="virtual chime"
            link="https://virtualchime.com"
            buildStack="Hardware and Software - Python, MQTT, Raspberry Pi, 3D Printing"
            image="https://static.timoweiss.me/virtualchime-showcase.jpg"
          />
        </div>
        <Link
          href="/projects"
          className="mx-auto w-fit font-serif text-2xl text-[#660708] italic"
        >
          <CenterUnderline
            label="See more"
            underlineHeightRatio={0.05}
            underlinePaddingRatio={-0.2}
            transition={true}
          />
        </Link>
      </section>
    </motion.div>
  );
}
