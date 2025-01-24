'use client';
import { useState } from 'react';
import CenterUnderline from './Fancy-Underline-Center';
import ProjectDisplay from './elements/ProjectDisplay';

export default function LatestProjects() {
    return (
        <section
            id="latest-projects"
            className="max-w-[90rem] text-center w-full mx-auto flex flex-col gap-6 text-balance text-lg"
        >
            <h2 className="font-serif text-5xl">Latest Projects</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ProjectDisplay
                    title="Got Done"
                    link="https://gotdoneapp.com"
                    buildStack="iOS App - Swift & SwiftUI"
                    image="https://static.timoweiss.me/16.jpg"
                />
                <ProjectDisplay
                    title="Animated Blurry Blob Background Generator"
                    link="https://blurry-blob-background.timoweiss.me"
                    buildStack="Web App - TypeScript & Next.js"
                    image="https://static.timoweiss.me/website-showcase-3.jpg"
                />

                <ProjectDisplay
                    title="Got Done"
                    link="https://gotdoneapp.com"
                    buildStack="iOS App - Swift & SwiftUI"
                    image="https://static.timoweiss.me/16.jpg"
                />
                <ProjectDisplay
                    title="Animated Blurry Blob Background Generator"
                    link="https://blurry-blob-background.timoweiss.me"
                    buildStack="Web App - TypeScript & Next.js"
                    image="https://static.timoweiss.me/website-showcase-3.jpg"
                />
            </div>
            <a href="/projects" className="font-serif text-2xl w-fit mx-auto">
                <CenterUnderline
                    label="See more"
                    underlineHeightRatio={0.05}
                    underlinePaddingRatio={-0.2}
                    transition={true}
                />
            </a>
        </section>
    );
}
