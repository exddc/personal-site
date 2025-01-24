'use client';

import { motion } from 'motion/react';

import ScrambleIn from './Fancy-Scramble-In';

const containerVariants = {
    hidden: {
        opacity: 0,
        y: -10,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            delay: 0,
            duration: 0.5,
            ease: 'easeInOut',
        },
    },
};

export default function Hero() {
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-2xl mx-auto"
            id="hero-container"
        >
            <div id="hero" className="mx-auto w-fit text-center">
                <h1 className="italic font-serif text-7xl">Timo Weiss</h1>
                <ScrambleIn
                    text="Software Developer at HMMC"
                    className="font-light tracking-tighter text-lg"
                />
            </div>
        </motion.div>
    );
}
