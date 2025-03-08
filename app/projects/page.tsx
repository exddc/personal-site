"use client";

import React from "react";
import CenterUnderline from "@/components/Fancy-Underline-Center";
import { Contact } from "@/components/Contact";
import Link from "next/link";

export default function Projects() {
  return (
    <div className="grid grid-cols-1 gap-36 pt-24">
      <section
        id="projects"
        className="mx-auto flex w-full max-w-[90rem] flex-col gap-36 text-center text-lg text-balance"
      >
        <h2 className="font-serif text-5xl italic">Projects</h2>
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2" dir="rtl">
          <div className="flex flex-col items-center justify-between rounded-xl border-[1px] border-solid border-[#908A7B]/50 p-[4px] text-base tracking-tight whitespace-nowrap text-black backdrop-blur-sm">
            <div className="h-fit overflow-hidden rounded-lg border-[1px] border-solid border-[#908A7B]/50 bg-[#F3F3F1] transition-all duration-300 hover:scale-[99%] hover:rounded-md">
              <img
                src="https://static.timoweiss.me/website-showcase-3.jpg"
                alt="Box Grid Generator"
                className="transition-all duration-300 hover:scale-105"
              />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex flex-col">
              <h3 className="mx-auto w-fit font-serif text-3xl italic">
                Box Grid Generator
              </h3>
              <p className="text-sm font-light">
                Web App - TypeScript, Next.js & Three.js
              </p>
            </div>
            <p>
              App to fill a Space with a 3D printable Grid of Boxes. The Grid is
              customizable and has a interactive 3D Viewer. The Model can be
              downloaded as STL for 3D Printing or shared as a Link.
            </p>
            <p>
              Built with TypeScript, Next.js and Three.js. The 3D Model is
              generated with Three.js and the STL File is generated with
              Three.js-STL-Exporter.
            </p>
            <Link
              href="https://box-grid.timoweiss.me"
              className="mx-auto w-fit font-serif text-xl text-[#660708] italic"
            >
              <CenterUnderline
                label="Check it out"
                underlineHeightRatio={0.05}
                underlinePaddingRatio={-0.2}
              />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <div className="flex flex-col items-center justify-between rounded-xl border-[1px] border-solid border-[#908A7B]/50 p-[4px] text-base tracking-tight whitespace-nowrap text-black backdrop-blur-sm">
            <div className="h-fit overflow-hidden rounded-lg border-[1px] border-solid border-[#908A7B]/50 bg-[#F3F3F1] transition-all duration-300 hover:scale-[99%] hover:rounded-md">
              <img
                src="https://static.timoweiss.me/16.jpg"
                alt="Got Done Showcase"
                className="transition-all duration-300 hover:scale-105"
              />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex flex-col">
              <h3 className="mx-auto w-fit font-serif text-3xl italic">
                Got Done
              </h3>
              <p className="text-sm font-light">iOS App - Swift & SwiftUI</p>
            </div>
            <p>
              A minimal To-Do & Habit Tracker for focused productivity without
              distractions that helps you be proud of all the things you Got
              Done today. Available on the App Store.
            </p>
            <p>
              Built with Swift & SwiftUI and with clear intentions to not store
              any data on any server to ensure the highest privacy possible. The
              Design is kept as minimal as possible to not distract the user
              from their tasks or habits theiy want to get done.
            </p>
            <Link
              href="https://gotdoneapp.com"
              className="mx-auto w-fit font-serif text-xl text-[#660708] italic"
            >
              <CenterUnderline
                label="Check it out"
                underlineHeightRatio={0.05}
                underlinePaddingRatio={-0.2}
              />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2" dir="rtl">
          <div className="flex flex-col items-center justify-between rounded-xl border-[1px] border-solid border-[#908A7B]/50 p-[4px] text-base tracking-tight whitespace-nowrap text-black backdrop-blur-sm">
            <div className="h-fit overflow-hidden rounded-lg border-[1px] border-solid border-[#908A7B]/50 bg-[#F3F3F1] transition-all duration-300 hover:scale-[99%] hover:rounded-md">
              <img
                src="https://static.timoweiss.me/domain-generator-showcase.jpg"
                alt="Domain Generator Showcase"
                className="transition-all duration-300 hover:scale-105"
              />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex flex-col">
              <h3 className="mx-auto w-fit font-serif text-3xl italic">
                Domain Generator
              </h3>
              <p className="text-sm font-light">
                Web App - TypeScript, Next.js, Python & FastAPI
              </p>
            </div>
            <p>
              A simple Domain Name Generator that helps you find the perfect
              domain name for your next project or business. It generates domain
              name suggestions with various TLDs and checks their availability.
            </p>
            <p>
              The Frontend is built with TypeScript and Next.js, the Backend is
              a Python FastAPI Server connected to a PostgreSQL Database and
              several Services to generate suggestions and check their
              availability. The Feedback on the generated suggestions is used to
              fine-tune the LLM Model generating the suggestions.
            </p>
            <Link
              href="https://domain-generator.timoweiss.me"
              className="mx-auto w-fit font-serif text-xl text-[#660708] italic"
            >
              <CenterUnderline
                label="Check it out"
                underlineHeightRatio={0.05}
                underlinePaddingRatio={-0.2}
              />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <div className="flex flex-col items-center justify-between rounded-xl border-[1px] border-solid border-[#908A7B]/50 p-[4px] text-base tracking-tight whitespace-nowrap text-black backdrop-blur-sm">
            <div className="h-fit overflow-hidden rounded-lg border-[1px] border-solid border-[#908A7B]/50 bg-[#F3F3F1] transition-all duration-300 hover:scale-[99%] hover:rounded-md">
              <img
                src="https://static.timoweiss.me/blurry-blob-background-showcase.jpg"
                alt="Animated Blurry Blob Background Generator Showcase"
                className="transition-all duration-300 hover:scale-105"
              />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex flex-col">
              <h3 className="mx-auto w-fit font-serif text-3xl italic">
                Animated Blurry Blob Background Generator
              </h3>
              <p className="text-sm font-light">
                Web App - TypeScript & Next.js
              </p>
            </div>
            <p>
              Simple Tool to generate Animated Blurry Blob Backgrounds for Hero
              Sections or other Backgrounds on Websites. You can customize the
              colors, the amount of blobs and their size and the animation
              speed. The Code can be exported for React and Vue.
            </p>
            <p>
              Built with TypeScript and Next.js. The Blobs are generated with
              CSS and the Animation is done with CSS Keyframes.
            </p>
            <Link
              href="https://blurry-blob-background.timoweiss.me"
              className="mx-auto w-fit font-serif text-xl text-[#660708] italic"
            >
              <CenterUnderline
                label="Check it out"
                underlineHeightRatio={0.05}
                underlinePaddingRatio={-0.2}
              />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2" dir="rtl">
          <div className="flex flex-col items-center justify-between rounded-xl border-[1px] border-solid border-[#908A7B]/50 p-[4px] text-base tracking-tight whitespace-nowrap text-black backdrop-blur-sm">
            <div className="h-fit overflow-hidden rounded-lg border-[1px] border-solid border-[#908A7B]/50 bg-[#F3F3F1] transition-all duration-300 hover:scale-[99%] hover:rounded-md">
              <img
                src="https://static.timoweiss.me/virtualchime-showcase.jpg"
                alt="Virtual Chime Showcase"
                className="transition-all duration-300 hover:scale-105"
              />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex flex-col">
              <h3 className="mx-auto w-fit font-serif text-3xl italic">
                virtual chime
              </h3>
              <p className="text-sm font-light">
                Hardware and Software - Python, MQTT, Raspberry Pi, 3D Printing
              </p>
            </div>
            <p>
              virtual chime is an Open Source Doorbell System built for the
              Raspberry Pi and self-hosting in mind. It combines a high end
              Doorbell with a privacy focused self-hosted Server and Web
              Interface.
            </p>
            <p>
              The Hardware is based on a Raspberry Pi Zero and a 3D printed
              modular case. The Software is written in Python and uses MQTT for
              communication between the Doorbell and the Server. The Server is
              built with Python and FastAPI.
            </p>
            <Link
              href="https://virtualchime.com"
              className="mx-auto w-fit font-serif text-xl text-[#660708] italic"
            >
              <CenterUnderline
                label="Check it out"
                underlineHeightRatio={0.05}
                underlinePaddingRatio={-0.2}
              />
            </Link>
          </div>
        </div>
      </section>
      <Contact />
    </div>
  );
}
