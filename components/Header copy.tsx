'use client';

import React from 'react';
import { motion } from 'motion/react';

const containerVariants = {
    hidden: {
        scaleX: 1,
        opacity: 0,
        originX: 0,
        y: -20,
    },
    visible: {
        scaleX: 1,
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.5,
            duration: 1.3,
            ease: 'easeInOut',
        },
    },
    scroll: {
        scaleX: 10,
    },
};

const navVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.2,
            delayChildren: 1.2,
        },
    },
};

const linkVariants = {
    hidden: {
        opacity: 0,
        y: -5,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: 'easeOut',
        },
    },
};

const linkClassName =
    'text-center pt-[2px] bg-[#F3F3F1] rounded-[25px] border-[1px] border-solid border-[#908A7B]/50 inset-shadow-[2px_4px_2px_rgba(256,256,256,1)] shadow-[2px_3px_3px_rgba(0,0,0,0.45)] w-[100px] h-[35px] text-base font-normal tracking-tight flex items-center justify-center text-[#76726A]';

export default function Header() {
    return (
        <header className="w-full mx-auto pt-4 top-0 sticky z-40 px-4 md:px-0">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-xl mx-auto bg-[#F3F3F1] p-[1px] rounded-[51px]"
            >
                <div className="gradual-backdrop-blur"></div>
                <motion.nav
                    variants={navVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-row justify-between items-center h-[52px] px-[8px] text-base tracking-tight text-black whitespace-nowrap border-[#E2E2E2] border-solid border-[1px] bg-[#D6D5D3] rounded-[50px] nav-noise inset-shadow-[2px_3px_3px_rgba(0,0,0,0.40)]"
                >
                    <motion.a
                        variants={linkVariants}
                        href="/"
                        className={linkClassName}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{
                            type: 'spring',
                            stiffness: 300,
                            damping: 15,
                        }}
                    >
                        Home
                    </motion.a>
                    <motion.a
                        variants={linkVariants}
                        href="/"
                        className={linkClassName}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{
                            type: 'spring',
                            stiffness: 300,
                            damping: 15,
                        }}
                    >
                        Projects
                    </motion.a>
                    <motion.a
                        variants={linkVariants}
                        href="/"
                        className={linkClassName}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{
                            type: 'spring',
                            stiffness: 300,
                            damping: 15,
                        }}
                    >
                        About
                    </motion.a>
                </motion.nav>
            </motion.div>
        </header>
    );
}
