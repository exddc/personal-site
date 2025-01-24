'use client';
import CenterUnderline from './Fancy-Underline-Center';

export default function Links() {
    return (
        <section
            id="links"
            className="text-center max-w-md mx-auto flex flex-col gap-4 text-balance text-lg"
        >
            <h2 className="font-serif text-4xl">Links</h2>
            <div className="flex justify-between">
                <p className="font-serif text-xl">Github</p>
                <a href="https://github.com/exddc">
                    <CenterUnderline
                        label="github.com/exddc"
                        underlineHeightRatio={0.05}
                        underlinePaddingRatio={-0.2}
                    />
                </a>
            </div>
            <div className="flex justify-between">
                <p className="font-serif text-xl">𝕏</p>
                <a href="https://x.com/timooweiss">
                    <CenterUnderline
                        label="x.com/timooweiss"
                        underlineHeightRatio={0.05}
                        underlinePaddingRatio={-0.2}
                    />
                </a>
            </div>
            <div className="flex justify-between">
                <p className="font-serif text-xl">Instagram</p>
                <a href="https://instagram.com/tiimoweiss">
                    <CenterUnderline
                        label="instagram.com/tiimoweiss"
                        underlineHeightRatio={0.05}
                        underlinePaddingRatio={-0.2}
                    />
                </a>
            </div>
            <div className="flex justify-between">
                <p className="font-serif text-xl">LinkedIn</p>
                <a href="https://www.linkedin.com/in/timoweiss/">
                    <CenterUnderline
                        label="linkedin.com/in/timoweiss/"
                        underlineHeightRatio={0.05}
                        underlinePaddingRatio={-0.2}
                    />
                </a>
            </div>
            <a
                href="/"
                className="text-center pt-[2px] bg-white rounded-3xl border border-solid border-neutral-50 shadow-[1px_2px_2px_rgba(0,0,0,0.38)] w-[100px] h-[31px] text-base tracking-tighter"
            >
                Github
            </a>
            <div className="border border-[#DADADA] rounded-xl p-1">
                <p className="font-serif text-xl">LinkedIn</p>
            </div>
            <div className="border border-[#DADADA] rounded-xl p-1 bg-white">
                <p className="font-serif text-xl">LinkedIn</p>
            </div>
            <div className="border border-[#DADADA] rounded-xl p-1 bg-white">
                <p className="">LinkedIn</p>
            </div>
            <div className="rounded-lg bg-[#E3E1E1] mt-1 text-sm flex justify-between h-[40px] p-2.5">
                <p className="">LinkedIn</p>
            </div>
            <div className="border border-[#DADADA] rounded-xl bg-[#E3E1E1] text-sm text-center h-[40px] p-2.5">
                <p className="">LinkedIn</p>
            </div>
            <div className="border border-[#c7c7c7] rounded-xl bg-[#E3E1E1] text-sm text-center h-[40px] p-2.5">
                <p className="">LinkedIn</p>
            </div>
        </section>
    );
}
