'use client';

import ProjectDisplay from '@/components/elements/ProjectDisplay';
import CenterUnderline from '@/components/Fancy-Underline-Center';
import Link from 'next/link';

export default function Projects() {
    return (
        <div className="grid grid-cols-1 gap-36 pt-24 px-8 xl:px-0">
            <section
                id="projects"
                className="max-w-[90rem] text-center w-full mx-auto flex flex-col gap-36 text-balance text-lg"
            >
                <h2 className="font-serif italic text-5xl">Projects</h2>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    <div className="flex flex-col justify-between items-center text-base tracking-tight text-black whitespace-nowrap border-[#908A7B]/50 border-solid border-[1px] backdrop-blur-sm rounded-xl p-[4px]">
                        <div className="overflow-hidden rounded-lg hover:scale-[99%] transition-all duration-300 border-[1px] border-solid border-[#908A7B]/50 bg-[#F3F3F1] h-fit">
                            <img
                                src="https://static.timoweiss.me/16.jpg"
                                alt="Got Done Showcase"
                                className="hover:scale-105 transition-all duration-300"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 justify-center items-center px-4">
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
                        <div className="overflow-hidden rounded-lg hover:scale-[99%] transition-all duration-300 border-[1px] border-solid border-[#908A7B]/50 bg-[#F3F3F1] h-fit">
                            <img
                                src="https://static.timoweiss.me/16.jpg"
                                alt="Got Done Showcase"
                                className="hover:scale-105 transition-all duration-300"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 justify-center items-center px-4">
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

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    <div className="flex flex-col justify-between items-center text-base tracking-tight text-black whitespace-nowrap border-[#908A7B]/50 border-solid border-[1px] backdrop-blur-sm rounded-xl p-[4px]">
                        <div className="overflow-hidden rounded-lg hover:scale-[99%] transition-all duration-300 border-[1px] border-solid border-[#908A7B]/50 bg-[#F3F3F1] h-fit">
                            <img
                                src="https://static.timoweiss.me/16.jpg"
                                alt="Got Done Showcase"
                                className="hover:scale-105 transition-all duration-300"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 justify-center items-center px-4">
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
                        <div className="overflow-hidden rounded-lg hover:scale-[99%] transition-all duration-300 border-[1px] border-solid border-[#908A7B]/50 bg-[#F3F3F1] h-fit">
                            <img
                                src="https://static.timoweiss.me/16.jpg"
                                alt="Got Done Showcase"
                                className="hover:scale-105 transition-all duration-300"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 justify-center items-center px-4">
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
            </section>
        </div>
    );
}
