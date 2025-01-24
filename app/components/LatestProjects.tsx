'use client';
import { useState } from 'react';
import CenterUnderline from './Fancy-Underline-Center';

export default function LatestProjects() {
    const [gotDoneOpen, setGotDoneOpen] = useState(false);

    return (
        <section
            id="latest-projects"
            className="max-w-[90rem] text-center w-full mx-auto flex flex-col gap-4 text-balance text-lg"
        >
            <h2 className="font-serif text-4xl">Latest Projects</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="grid grid-cols-1 gap-6">
                    <div className="flex flex-col justify-between items-center text-base tracking-tight text-black whitespace-nowrap border-[#E2E2E2] border-solid border-[1px] bg-[#D6D5D3] rounded-xl nav-noise inset-shadow-[2px_3px_3px_rgba(0,0,0,0.40)] p-[12px]">
                        <div className="overflow-hidden rounded-lg hover:scale-[99%] transition-all duration-300 border-[1px] border-solid border-[#908A7B]/50  shadow-[2px_3px_3px_rgba(0,0,0,0.45)] bg-[#F3F3F1]">
                            <img
                                src="https://static.timoweiss.me/16.jpg"
                                alt="Got Done Preview"
                                className="hover:scale-105 transition-all duration-300"
                            />
                        </div>

                        <div
                            className={
                                'rounded-lg bg-[#F3F3F1] mt-[12px] text-sm  p-2.5 w-full border-[1px] border-solid border-[#908A7B]/50 shadow-[2px_3px_3px_rgba(0,0,0,0.45)] h-[40px] transition-all duration-500 ' +
                                (gotDoneOpen ? 'h-[200px]' : '')
                            }
                        >
                            <div className="flex justify-between">
                                <a href="https://gotdoneapp.com">
                                    <CenterUnderline
                                        label={
                                            'Got Done ' +
                                            String.fromCharCode(8594)
                                        }
                                        underlineHeightRatio={0.05}
                                        underlinePaddingRatio={-0.2}
                                    />
                                </a>
                                <button
                                    onClick={() => setGotDoneOpen(!gotDoneOpen)}
                                    className="w-6 cursor-pointer"
                                >
                                    {gotDoneOpen
                                        ? String.fromCharCode(8593)
                                        : String.fromCharCode(8595)}
                                </button>
                                <p>iOS App - Swift & SwiftUI</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-between items-center text-base tracking-tight text-black whitespace-nowrap border-[#E2E2E2] border-solid border-[1px] bg-[#D6D5D3] rounded-xl nav-noise inset-shadow-[2px_3px_3px_rgba(0,0,0,0.40)] p-[12px] h-fit">
                        <div className="overflow-hidden rounded-lg hover:scale-[99%] transition-all duration-300 border-[1px] border-solid border-[#908A7B]/50  shadow-[2px_3px_3px_rgba(0,0,0,0.45)] bg-[#F3F3F1]">
                            <img
                                src="https://static.timoweiss.me/website-showcase-3.jpg"
                                alt="Animated Blurry Blob Background Generator"
                                className="hover:scale-105 transition-all duration-300"
                            />
                        </div>

                        <div className="rounded-lg bg-[#F3F3F1] mt-[12px] text-sm flex justify-between h-[40px] p-2.5 w-full border-[1px] border-solid border-[#908A7B]/50  shadow-[2px_3px_3px_rgba(0,0,0,0.45)]">
                            <a href="https://blurry-blob-background.timoweiss.me">
                                <CenterUnderline
                                    label={
                                        'Animated Blurry Blob Background Generator ' +
                                        String.fromCharCode(8594)
                                    }
                                    underlineHeightRatio={0.05}
                                    underlinePaddingRatio={-0.2}
                                />
                            </a>
                            <p>Web App - TypeScript & Next.js</p>
                        </div>
                    </div>

                    <div className="h-auto"></div>
                </div>
                <div className="grid grid-cols-1 gap-6">
                    <div className="flex flex-col justify-between items-center text-base tracking-tight text-black whitespace-nowrap border-[#E2E2E2] border-solid border-[1px] bg-[#D6D5D3] rounded-xl nav-noise inset-shadow-[2px_3px_3px_rgba(0,0,0,0.40)] p-[12px] h-fit">
                        <div className="overflow-hidden rounded-lg hover:scale-[99%] transition-all duration-300 border-[1px] border-solid border-[#908A7B]/50  shadow-[2px_3px_3px_rgba(0,0,0,0.45)] bg-[#F3F3F1]">
                            <img
                                src="https://static.timoweiss.me/16.jpg"
                                alt="Got Done Preview"
                                className="hover:scale-105 transition-all duration-300"
                            />
                        </div>

                        <div
                            className={
                                'rounded-lg bg-[#F3F3F1] mt-[12px] text-sm  p-2.5 w-full border-[1px] border-solid border-[#908A7B]/50 shadow-[2px_3px_3px_rgba(0,0,0,0.45)] h-[40px] transition-all duration-500 '
                            }
                        >
                            <div className="flex justify-between">
                                <a href="https://gotdoneapp.com">
                                    <CenterUnderline
                                        label={
                                            'Got Done ' +
                                            String.fromCharCode(8594)
                                        }
                                        underlineHeightRatio={0.05}
                                        underlinePaddingRatio={-0.2}
                                    />
                                </a>
                                <button
                                    onClick={() => setGotDoneOpen(!gotDoneOpen)}
                                    className="w-6 cursor-pointer"
                                >
                                    {gotDoneOpen
                                        ? String.fromCharCode(8593)
                                        : String.fromCharCode(8595)}
                                </button>
                                <p>iOS App - Swift & SwiftUI</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-between items-center text-base tracking-tight text-black whitespace-nowrap border-[#E2E2E2] border-solid border-[1px] bg-[#D6D5D3] rounded-xl nav-noise inset-shadow-[2px_3px_3px_rgba(0,0,0,0.40)] p-[12px]">
                        <div className="overflow-hidden rounded-lg hover:scale-[99%] transition-all duration-300 border-[1px] border-solid border-[#908A7B]/50  shadow-[2px_3px_3px_rgba(0,0,0,0.45)] bg-[#F3F3F1]">
                            <img
                                src="https://static.timoweiss.me/website-showcase-3.jpg"
                                alt="Animated Blurry Blob Background Generator"
                                className="hover:scale-105 transition-all duration-300"
                            />
                        </div>

                        <div className="rounded-lg bg-[#F3F3F1] mt-[12px] text-sm flex justify-between h-[40px] p-2.5 w-full border-[1px] border-solid border-[#908A7B]/50  shadow-[2px_3px_3px_rgba(0,0,0,0.45)]">
                            <a href="https://blurry-blob-background.timoweiss.me">
                                <CenterUnderline
                                    label={
                                        'Animated Blurry Blob Background Generator ' +
                                        String.fromCharCode(8594)
                                    }
                                    underlineHeightRatio={0.05}
                                    underlinePaddingRatio={-0.2}
                                />
                            </a>
                            <p>Web App - TypeScript & Next.js</p>
                        </div>
                    </div>
                    <div className="h-auto"></div>
                </div>
            </div>
        </section>
    );
}
