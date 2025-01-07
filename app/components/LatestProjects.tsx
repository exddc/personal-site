'use client';
import CenterUnderline from './Fancy-Underline-Center';

export default function LatestProjects() {
    return (
        <section
            id="latest-projects"
            className="text-center max-w-xl mx-auto flex flex-col gap-4 text-balance text-lg my-24"
        >
            <h2 className="font-serif text-4xl">Latest Projects</h2>
            <div className="border border-[#DADADA] rounded-xl p-1 ">
                <div className="overflow-hidden rounded-lg">
                    <img
                        src="https://static.timoweiss.me/15.jpg"
                        alt="Got Done Preview"
                        className="hover:scale-110 transition-all duration-300"
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
        </section>
    );
}
