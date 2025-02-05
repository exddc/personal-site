'use client';

import CenterUnderline from '../Fancy-Underline-Center';
import Link from 'next/link';

export default function ProjectDisplay(props: {
    title: string;
    image: string;
    buildStack: string;
    link: string;
}) {
    return (
        <div className="flex flex-col justify-between items-center text-base tracking-tight text-black whitespace-nowrap border-[#908A7B]/50 border-solid border-[1px] backdrop-blur-sm rounded-xl p-[4px]">
            <div className="overflow-hidden rounded-lg hover:rounded-md hover:scale-[99%] transition-all duration-300 border-[1px] border-solid border-[#908A7B]/50 bg-[#F3F3F1] h-fit">
                <img
                    src={props.image}
                    alt={props.title + ' Showcase'}
                    className="hover:scale-105 transition-all duration-300"
                />
            </div>

            <div className="rounded-lg bg-[#F3F3F1] mt-[4px] text-sm p-2.5 w-full border-[1px] border-solid border-[#908A7B]/50 h-fit transition-all duration-500">
                <div className="flex flex-col sm:flex-row justify-between">
                    <Link href={props.link}>
                        <CenterUnderline
                            label={
                                props.title + ' ' + String.fromCharCode(8594)
                            }
                            underlineHeightRatio={0.05}
                            underlinePaddingRatio={-0.2}
                        />
                    </Link>
                    <p className="text-balance">{props.buildStack}</p>
                </div>
            </div>
        </div>
    );
}
