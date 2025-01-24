'use client';
import CenterUnderline from '../Fancy-Underline-Center';

export default function LinkElement(props: {
    title: string;
    label: string;
    link: string;
}) {
    return (
        <div className="flex justify-center items-center p-[12px] text-base tracking-tight text-black whitespace-nowrap border-[#E2E2E2] border-solid border-[1px] bg-[#D6D5D3] rounded-xl nav-noise inset-shadow-[2px_3px_3px_rgba(0,0,0,0.40)]">
            <div className="rounded-lg bg-[#F3F3F1] text-base p-2.5 border-[1px] border-solid border-[#908A7B]/50 shadow-[2px_3px_3px_rgba(0,0,0,0.45)] h-[40px] transition-all duration-500 font-light w-[400px]">
                <div className="flex justify-between mt-[-2px]">
                    <p className="font-medium">{props.title}</p>
                    <a href={props.link}>
                        <CenterUnderline
                            label={
                                props.label + ' ' + String.fromCharCode(8594)
                            }
                            underlineHeightRatio={0.05}
                            underlinePaddingRatio={-0.2}
                        />
                    </a>
                </div>
            </div>
        </div>
    );
}
