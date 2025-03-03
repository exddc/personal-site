"use client";

import React from "react";
import CenterUnderline from "./Fancy-Underline-Center";
import Link from "next/link";

export default function Services() {
  return (
    <section
      id="services-landing"
      className="mx-auto flex w-full max-w-[90rem] flex-col gap-12 text-center text-lg text-balance"
    >
      <h2 className="font-serif text-5xl italic">Services</h2>
      <p>I provide a variety of development services to suit your needs:</p>
      <div className="mx-auto grid w-full grid-cols-1 gap-4 text-left lg:grid-cols-3">
        <div className="mx-auto grid w-full grid-cols-1 gap-6 rounded-2xl border border-neutral-200 bg-white p-6 text-base">
          <h3 className="font-serif text-3xl italic">Basic</h3>
          <p>Simple, static site to get your business online.</p>
        </div>
        <div className="mx-auto grid w-full grid-cols-1 gap-6 rounded-2xl border border-neutral-200 bg-white p-6 text-base">
          <h3 className="font-serif text-3xl italic">Premium</h3>
          <p>
            Advanced site with CMS, interactivity, and e-commerce capabilities.
          </p>
        </div>
        <div className="mx-auto grid w-full grid-cols-1 gap-6 rounded-2xl border border-neutral-200 bg-white p-6 text-base">
          <h3 className="font-serif text-3xl italic">App Prototype</h3>
          <p>Functional prototype to showcase and test your app idea.</p>
        </div>
      </div>
      <Link
        href="/services"
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
  );
}
