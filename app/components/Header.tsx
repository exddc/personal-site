'use client';

import { motion } from 'motion/react';

const containerVariants = {
    hidden: {
        scaleX: 0,
        opacity: 0,
        originX: 0.5,
        y: -50,
    },
    visible: {
        scaleX: 1,
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.5,
            duration: 1.2,
            ease: 'easeInOut',
        },
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
    'text-center pt-[2px] bg-white rounded-3xl border border-solid border-neutral-50 shadow-[1px_2px_2px_rgba(0,0,0,0.38)] w-[100px] h-[31px] text-base tracking-tighter';

export default function Header() {
    return (
        <header className="w-full mx-auto pt-4 top-0 sticky z-40">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-xl mx-auto bg-white p-[1px] rounded-[51px]"
            >
                <div className="gradual-backdrop-blur"></div>
                <motion.nav
                    variants={navVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-row justify-between items-center h-[43px] px-1.5 text-base tracking-tight text-black whitespace-nowrap border border-gray-200 border-solid bg-neutral-50 rounded-[50px] noise shadow-sm"
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
