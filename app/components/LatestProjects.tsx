'use client';
import CenterUnderline from './Fancy-Underline-Center';

export default function LatestProjects() {
    return (
        <section
            id="latest-projects"
            className="text-center w-full mx-auto flex flex-col gap-4 text-balance text-lg"
        >
            <h2 className="font-serif text-4xl">Latest Projects</h2>
            <div className="grid grid-cols-2 gap-4">
                <div className="border border-[#DADADA] rounded-xl p-1">
                    <div className="overflow-hidden rounded-lg hover:scale-[99%] transition-all duration-300">
                        <img
                            src="https://static.timoweiss.me/15.jpg"
                            alt="Got Done Preview"
                            className="hover:scale-105 transition-all duration-300"
                        />
                    </div>

                    <div className="rounded-lg bg-[#E3E1E1] mt-1 text-sm flex justify-between h-[40px] p-2.5">
                        <a href="https://gotdoneapp.com">
                            <CenterUnderline
                                label={'Got Done ' + String.fromCharCode(8594)}
                                underlineHeightRatio={0.05}
                                underlinePaddingRatio={-0.2}
                            />
                        </a>
                        <p>iOS App - Swift & SwiftUI</p>
                    </div>
                </div>
                <div className="border border-[#DADADA] rounded-xl p-1">
                    <div className="overflow-hidden rounded-lg hover:scale-[99%] transition-all duration-300">
                        <img
                            src="https://static.timoweiss.me/Website%20showcase.jpg"
                            alt="Animated Blurry Blob Background Generator"
                            className="hover:scale-105 transition-all duration-300"
                        />
                    </div>

                    <div className="rounded-lg bg-[#E3E1E1] mt-1 text-sm flex justify-between h-[40px] p-2.5">
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
                <div className="border border-[#DADADA] rounded-xl p-1">
                    <div className="overflow-hidden rounded-lg hover:scale-[99%] transition-all duration-300">
                        <img
                            src="https://static.timoweiss.me/Website%20showcase.jpg"
                            alt="Animated Blurry Blob Background Generator"
                            className="hover:scale-105 transition-all duration-300"
                        />
                    </div>

                    <div className="rounded-lg bg-[#E3E1E1] mt-1 text-sm flex justify-between h-[40px] p-2.5">
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
                <div className="border border-[#DADADA] rounded-xl p-1">
                    <div className="overflow-hidden rounded-lg hover:scale-[99%] transition-all duration-300">
                        <img
                            src="https://static.timoweiss.me/Website%20showcase.jpg"
                            alt="Animated Blurry Blob Background Generator"
                            className="hover:scale-105 transition-all duration-300"
                        />
                    </div>

                    <div className="rounded-lg bg-[#E3E1E1] mt-1 text-sm flex justify-between h-[40px] p-2.5">
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
            </div>
        </section>
    );
}
