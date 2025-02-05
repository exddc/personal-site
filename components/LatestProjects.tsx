'use client';
import Link from 'next/link';
import { motion } from 'motion/react';
import CenterUnderline from './Fancy-Underline-Center';
import ProjectDisplay from './elements/ProjectDisplay';

const containerVariants = {
    hidden: {
        opacity: 0.5,
        y: 50,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            delay: 0,
            duration: 1.5,
            ease: 'easeInOut',
        },
    },
};

export default function LatestProjects() {
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mx-auto"
        >
            <section
                id="latest-projects"
                className="max-w-[90rem] text-center w-full mx-auto flex flex-col gap-12 text-balance text-lg"
            >
                <h2 className="font-serif italic text-5xl">Latest Projects</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <ProjectDisplay
                        title="Got Done"
                        link="https://gotdoneapp.com"
                        buildStack="iOS App - Swift & SwiftUI"
                        image="https://static.timoweiss.me/16.jpg"
                    />

                    <ProjectDisplay
                        title="Domain Generator"
                        link="https://domain-generator.timoweiss.me"
                        buildStack="Web App - TypeScript, Next.js, Python & FastAPI"
                        image="https://static.timoweiss.me/domain-generator-showcase.jpg"
                    />

                    <ProjectDisplay
                        title="Animated Blurry Blob Background Generator"
                        link="https://blurry-blob-background.timoweiss.me"
                        buildStack="Web App - TypeScript & Next.js"
                        image="https://static.timoweiss.me/blurry-blob-background-showcase.jpg"
                    />

                    <ProjectDisplay
                        title="virtual chime"
                        link="https://virtualchime.com"
                        buildStack="Hardware and Software - Python, MQTT, Raspberry Pi, 3D Printing"
                        image="https://static.timoweiss.me/virtualchime-showcase.jpg"
                    />
                </div>
                <Link
                    href="/projects"
                    className="font-serif italic text-2xl w-fit mx-auto"
                >
                    <CenterUnderline
                        label="See more"
                        underlineHeightRatio={0.05}
                        underlinePaddingRatio={-0.2}
                        transition={true}
                    />
                </Link>
            </section>
        </motion.div>
    );
}
