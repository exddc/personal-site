import React from "react";
import Hero from "@/components/Hero";
import { ShortBio } from "@/components/Bio";
import LatestProjects from "@/components/LatestProjects";
import Links from "@/components/Links";
import { Contact } from "@/components/Contact";
import Services from "@/components/Services";

export default function Home() {
  return (
    <div className="grid grid-cols-1 gap-64">
      <div className="flex h-[95vh] flex-col items-center justify-center gap-[20vh]">
        <Hero />
        <ShortBio />
      </div>
      <LatestProjects />
      <Links />
      <Services />
      <Contact />
    </div>
  );
}
