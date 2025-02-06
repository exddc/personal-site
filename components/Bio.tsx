'use client';

import React from 'react';
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

export function ShortBio() {
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-2xl mx-auto"
        >
            <section
                id="bio"
                className="text-center max-w-xl mx-auto flex flex-col gap-12 text-balance text-lg"
            >
                <h2 className="font-serif italic text-5xl">About Me</h2>
                <div className="flex flex-col gap-4">
                    <p>
                        Software Developer working on a wide spectrum of
                        Projects ranging from iOS and MacOS Apps to Websites and
                        Software with complex Backends, distributed services and
                        AI.
                    </p>
                </div>

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

export function Bio() {
    return (
        <div className="max-w-2xl mx-auto gap-24 flex flex-col items-center justify-center mt-24">
            <section
                id="bio"
                className="text-center max-w-xl mx-auto flex flex-col gap-12 text-balance text-lg"
            >
                <h2 className="font-serif italic text-5xl">About Me</h2>
                <div className="flex flex-col gap-4">
                    <p>
                        I&apos;m a Full Stack Software Developer with multiple
                        years of experience working on a wide spectrum of
                        Projects ranging from iOS and MacOS Apps to Websites and
                        Software with complex Backends, distributed services and
                        AI.
                    </p>
                    <p>
                        Beyond coding, I try to expand my horizon by working on
                        hardware and physical products.
                    </p>
                    <p>During all this gym and several sports keep me sane.</p>
                </div>
            </section>
        </div>
    );
}
