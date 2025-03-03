"use client";

import React from "react";
import { Contact } from "@/components/Contact";
import { Check } from "lucide-react";

export default function Services() {
  return (
    <div className="grid grid-cols-1 gap-36">
      <section
        id="services"
        className="mx-auto mt-24 flex w-full max-w-[90rem] flex-col gap-36 text-center text-lg text-balance"
      >
        <div className="mx-auto flex max-w-xl flex-col gap-12 text-center text-lg text-balance">
          <h2 className="font-serif text-5xl italic">Services</h2>
          <p>
            As a full-stack developer, I offer several services to help you grow
            or start your business and projects. All services are a one-time
            payment and include a meeting to discuss your needs and wishes. The
            prices are starting prices and can vary depending on the complexity
            of the project.
          </p>
        </div>

        <div className="mx-auto grid w-full grid-cols-1 gap-4 text-left lg:grid-cols-3">
          <div className="mx-auto grid w-full grid-cols-1 gap-6 rounded-2xl border border-neutral-200 bg-white p-6 text-base">
            <h3 className="font-serif text-3xl italic">Basic</h3>
            <p>
              Simple static Website with a contact form. Perfect for small
              businesses to get started or showcasing their services.
            </p>
            <ul>
              <li className="flex items-center gap-2">
                <Check width={18} color="#0d542b" />
                <span>Static Website</span>
              </li>
              <li className="flex items-center gap-2">
                <Check width={18} color="#0d542b" />
                <span>Up to 5 Pages</span>
              </li>
              <li className="flex items-center gap-2">
                <Check width={18} color="#0d542b" />
                <span>Simple Interactivity like E-Mail Contact Form</span>
              </li>
              <li className="flex items-center gap-2">
                <Check width={18} color="#0d542b" />
                <span>Hosted on the Provider of your choice</span>
              </li>
            </ul>
            <p className="pt-24 text-2xl font-semibold">500 €</p>
          </div>

          <div className="mx-auto grid w-full grid-cols-1 gap-6 rounded-2xl border border-neutral-200 bg-white p-6 text-base">
            <h3 className="font-serif text-3xl italic">Premium</h3>
            <p>
              Advanced Website with more interactivity and integration of a
              Shop. Perfect for businesses that want to stand out and offer
              their products online.
            </p>
            <ul>
              <li className="flex items-center gap-2">
                <Check width={18} color="#0d542b" />
                <span>Website with a CMS</span>
              </li>
              <li className="flex items-center gap-2">
                <Check width={18} color="#0d542b" />
                <span>Up to 10 Pages</span>
              </li>
              <li className="flex items-center gap-2">
                <Check width={18} color="#0d542b" />
                <span>Contact Forms, Blog, Booking Tool and more</span>
              </li>
              <li className="flex items-center gap-2">
                <Check width={18} color="#0d542b" />
                <span>Integration of a Shop</span>
              </li>
              <li className="flex items-center gap-2">
                <Check width={18} color="#0d542b" />
                <span>Hosted on the Provider of your choice</span>
              </li>
            </ul>
            <p className="pt-24 text-2xl font-semibold">1.000 €</p>
          </div>

          <div className="mx-auto grid w-full grid-cols-1 gap-6 rounded-2xl border border-neutral-200 bg-white p-6 text-base">
            <h3 className="font-serif text-3xl italic">App Prototype</h3>
            <p>
              Prototype of an App to showcase the idea and get feedback from
              potential users. Perfect for startups to get started with their
              idea.
            </p>
            <ul>
              <li className="flex items-center gap-2">
                <Check width={18} color="#0d542b" />
                <span>iOS or Multiplatform</span>
              </li>
              <li className="flex items-center gap-2">
                <Check width={18} color="#0d542b" />
                <span>Up to 5 Pages</span>
              </li>
              <li className="flex items-center gap-2">
                <Check width={18} color="#0d542b" />
                <span>Simple Interaction</span>
              </li>
              <li className="flex items-center gap-2">
                <Check width={18} color="#0d542b" />
                <span>Full Code Ownership</span>
              </li>
            </ul>
            <p className="pt-24 text-2xl font-semibold">2.000 €</p>
          </div>
        </div>
      </section>
      <div className="mx-auto flex max-w-xl flex-col gap-12 text-center text-lg text-balance">
        <p>
          If you are interested in one of the services or have a custom request,
          feel free to contact me.
        </p>
      </div>
      <Contact />
    </div>
  );
}
