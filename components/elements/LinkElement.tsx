'use client';
import CenterUnderline from '../Fancy-Underline-Center';
import Link from 'next/link';

export default function LinkElement(props: {
    title: string;
    label: string;
    link: string;
}) {
    return (
        <div className="flex justify-center items-center p-[4px] text-base tracking-tight text-black whitespace-nowrap border-[#908A7B]/50 border-solid border-[1px] backdrop-blur-sm rounded-xl">
            <Link
                href={props.link}
                className="rounded-lg bg-[#F3F3F1] text-base p-2.5 border-[1px] border-solid border-[#908A7B]/50 h-[40px] transition-all duration-500 font-light w-[400px] cursor-pointer  hover:scale-[99%]"
            >
                <div className="flex justify-between mt-[-2px]">
                    <p className="font-medium">{props.title}</p>

                    <CenterUnderline
                        label={props.label + ' ' + String.fromCharCode(8594)}
                        underlineHeightRatio={0.05}
                        underlinePaddingRatio={-0.2}
                    />
                </div>
            </Link>
        </div>
    );
}
