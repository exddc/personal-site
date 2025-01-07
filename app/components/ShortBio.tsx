'use client';
import CenterUnderline from './Fancy-Underline-Center';

export default function ShortBio() {
    return (
        <section
            id="short-bio"
            className="text-center max-w-xl mx-auto flex flex-col gap-4 text-balance text-lg"
        >
            <p>
                In the digital world I'm building a wide spectrum of Projects
                ranging from iOS and MacOS Apps to Websites and Webapps with
                complex backends that incorporate multiple Pipelines, AI systems
                and distributed services.
            </p>
            <p>
                In the physical world I love Projects that involve 3D Printing,
                electrical engineering or tool making.
            </p>
            <a href="/about" className="font-serif text-xl">
                <CenterUnderline
                    label="Learn more"
                    underlineHeightRatio={0.05}
                    underlinePaddingRatio={-0.2}
                />
            </a>
        </section>
    );
}
