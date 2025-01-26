'use client';

import { motion } from 'motion/react';

import CenterUnderline from './Fancy-Underline-Center';

const containerVariants = {
    hidden: {
        opacity: 0,
        y: 50,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            delay: 1.5,
            duration: 1.5,
            ease: 'easeInOut',
        },
    },
};

export default function ShortBio() {
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-2xl mx-auto"
        >
            <section
                id="bio"
                className="text-center max-w-xl mx-auto flex flex-col gap-6 text-balance text-lg"
            >
                <h2 className="font-serif italic text-5xl">About Me</h2>
                <p>
                    In the digital world I'm building a wide spectrum of
                    Projects ranging from iOS and MacOS Apps to Websites and
                    Webapps with complex backends that incorporate multiple
                    Pipelines, AI systems and distributed services.
                </p>
                <p>
                    In the physical world I love Projects that involve 3D
                    Printing, electrical engineering or tool making.
                </p>
                <a
                    href="/about"
                    className="font-serif italic text-2xl w-fit mx-auto"
                >
                    <CenterUnderline
                        label="Learn more"
                        underlineHeightRatio={0.05}
                        underlinePaddingRatio={-0.2}
                        transition={true}
                    />
                </a>
            </section>
        </motion.div>
    );
}
