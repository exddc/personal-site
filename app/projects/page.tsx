'use client';

import CenterUnderline from '@/components/Fancy-Underline-Center';
import Link from 'next/link';

export default function Projects() {
    return (
        <div className="grid grid-cols-1 gap-36 pt-24">
            <section
                id="projects"
                className="max-w-[90rem] text-center w-full mx-auto flex flex-col gap-36 text-balance text-lg"
            >
                <h2 className="font-serif italic text-5xl">Projects</h2>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    <div className="flex flex-col justify-between items-center text-base tracking-tight text-black whitespace-nowrap border-[#908A7B]/50 border-solid border-[1px] backdrop-blur-sm rounded-xl p-[4px]">
                        <div className="overflow-hidden rounded-lg hover:scale-[99%] transition-all duration-300 border-[1px] border-solid border-[#908A7B]/50 bg-[#F3F3F1] h-fit hover:rounded-md">
                            <img
                                src="https://static.timoweiss.me/16.jpg"
                                alt="Got Done Showcase"
                                className="hover:scale-105 transition-all duration-300"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 justify-center items-center">
                        <div className="flex flex-col">
                            <h3 className="font-serif italic text-3xl w-fit mx-auto">
                                Got Done
                            </h3>
                            <p className="text-sm font-light">
                                iOS App - Swift & SwiftUI
                            </p>
                        </div>
                        <p>
                            A minimal To-Do & Habit Tracker for focused
                            productivity without distractions that helps you be
                            proud of all the things you Got Done today.
                            Available on the App Store.
                        </p>
                        <p>
                            Built with Swift & SwiftUI and with clear intentions
                            to not store any data on any server to ensure the
                            highest privacy possible. The Design is kept as
                            minimal as possible to not distract the user from
                            their tasks or habits theiy want to get done.
                        </p>
                        <Link
                            href="https://gotdoneapp.com"
                            className="font-serif italic text-xl w-fit mx-auto"
                        >
                            <CenterUnderline
                                label="Check it out"
                                underlineHeightRatio={0.05}
                                underlinePaddingRatio={-0.2}
                            />
                        </Link>
                    </div>
                </div>

                <div
                    className="grid grid-cols-1 xl:grid-cols-2 gap-6"
                    dir="rtl"
                >
                    <div className="flex flex-col justify-between items-center text-base tracking-tight text-black whitespace-nowrap border-[#908A7B]/50 border-solid border-[1px] backdrop-blur-sm rounded-xl p-[4px]">
                        <div className="overflow-hidden rounded-lg hover:rounded-md hover:scale-[99%] transition-all duration-300 border-[1px] border-solid border-[#908A7B]/50 bg-[#F3F3F1] h-fit">
                            <img
                                src="https://static.timoweiss.me/domain-generator-showcase.jpg"
                                alt="Domain Generator Showcase"
                                className="hover:scale-105 transition-all duration-300"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 justify-center items-center">
                        <div className="flex flex-col">
                            <h3 className="font-serif italic text-3xl w-fit mx-auto">
                                Domain Generator
                            </h3>
                            <p className="text-sm font-light">
                                Web App - TypeScript, Next.js, Python & FastAPI
                            </p>
                        </div>
                        <p>
                            A simple Domain Name Generator that helps you find
                            the perfect domain name for your next project or
                            business. It generates domain name suggestions with
                            various TLDs and checks their availability.
                        </p>
                        <p>
                            The Frontend is built with TypeScript and Next.js,
                            the Backend is a Python FastAPI Server connected to
                            a PostgreSQL Database and several Services to
                            generate suggestions and check their availability.
                            The Feedback on the generated suggestions is used to
                            fine-tune the LLM Model generating the suggestions.
                        </p>
                        <Link
                            href="https://domain-generator.timoweiss.me"
                            className="font-serif italic text-xl w-fit mx-auto"
                        >
                            <CenterUnderline
                                label="Check it out"
                                underlineHeightRatio={0.05}
                                underlinePaddingRatio={-0.2}
                            />
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    <div className="flex flex-col justify-between items-center text-base tracking-tight text-black whitespace-nowrap border-[#908A7B]/50 border-solid border-[1px] backdrop-blur-sm rounded-xl p-[4px]">
                        <div className="overflow-hidden rounded-lg hover:rounded-md hover:scale-[99%] transition-all duration-300 border-[1px] border-solid border-[#908A7B]/50 bg-[#F3F3F1] h-fit">
                            <img
                                src="https://static.timoweiss.me/blurry-blob-background-showcase.jpg"
                                alt="Animated Blurry Blob Background Generator Showcase"
                                className="hover:scale-105 transition-all duration-300"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 justify-center items-center">
                        <div className="flex flex-col">
                            <h3 className="font-serif italic text-3xl w-fit mx-auto">
                                Animated Blurry Blob Background Generator
                            </h3>
                            <p className="text-sm font-light">
                                Web App - TypeScript & Next.js
                            </p>
                        </div>
                        <p>
                            Simple Tool to generate Animated Blurry Blob
                            Backgrounds for Hero Sections or other Backgrounds
                            on Websites. You can customize the colors, the
                            amount of blobs and their size and the animation
                            speed. The Code can be exported for React and Vue.
                        </p>
                        <p>
                            Built with TypeScript and Next.js. The Blobs are
                            generated with CSS and the Animation is done with
                            CSS Keyframes.
                        </p>
                        <Link
                            href="https://blurry-blob-background.timoweiss.me"
                            className="font-serif italic text-xl w-fit mx-auto"
                        >
                            <CenterUnderline
                                label="Check it out"
                                underlineHeightRatio={0.05}
                                underlinePaddingRatio={-0.2}
                            />
                        </Link>
                    </div>
                </div>

                <div
                    className="grid grid-cols-1 xl:grid-cols-2 gap-6"
                    dir="rtl"
                >
                    <div className="flex flex-col justify-between items-center text-base tracking-tight text-black whitespace-nowrap border-[#908A7B]/50 border-solid border-[1px] backdrop-blur-sm rounded-xl p-[4px]">
                        <div className="overflow-hidden rounded-lg hover:rounded-md hover:scale-[99%] transition-all duration-300 border-[1px] border-solid border-[#908A7B]/50 bg-[#F3F3F1] h-fit">
                            <img
                                src="https://static.timoweiss.me/virtualchime-showcase.jpg"
                                alt="Virtual Chime Showcase"
                                className="hover:scale-105 transition-all duration-300"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 justify-center items-center">
                        <div className="flex flex-col">
                            <h3 className="font-serif italic text-3xl w-fit mx-auto">
                                virtual chime
                            </h3>
                            <p className="text-sm font-light">
                                Hardware and Software - Python, MQTT, Raspberry
                                Pi, 3D Printing
                            </p>
                        </div>
                        <p>
                            virtual chime is an Open Source Doorbell System
                            built for the Raspberry Pi and self-hosting in mind.
                            It combines a high end Doorbell with a privacy
                            focused self-hosted Server and Web Interface.
                        </p>
                        <p>
                            The Hardware is based on a Raspberry Pi Zero and a
                            3D printed modular case. The Software is written in
                            Python and uses MQTT for communication between the
                            Doorbell and the Server. The Server is built with
                            Python and FastAPI.
                        </p>
                        <Link
                            href="https://virtualchime.com"
                            className="font-serif italic text-xl w-fit mx-auto"
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
        </div>
    );
}
