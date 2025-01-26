'use client';

import { motion } from 'motion/react';

import LinkElement from './elements/LinkElement';

const containerVariants = {
    hidden: {
        opacity: 0.5,
        y: 20,
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

export default function Links() {
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mx-auto"
        >
            <section
                id="links"
                className="text-center mx-auto flex flex-col gap-6 text-balance text-lg"
            >
                <h2 className="font-serif italic text-5xl">Links</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <LinkElement
                        title="GitHub"
                        label="github.com/exddc"
                        link="https://github.com/exddc"
                    />
                    <LinkElement
                        title="X"
                        label="@timooweiss"
                        link="https://x.com/timooweiss"
                    />
                    <LinkElement
                        title="LinkedIn"
                        label="linkedin.com/timoweiss"
                        link="https://www.linkedin.com/in/timoweiss/"
                    />
                    <LinkElement
                        title="Instagram"
                        label="@tiimoweiss"
                        link="https://instagram.com/tiimoweiss"
                    />
                    <LinkElement
                        title="Printables"
                        label="@TimoWeiss_1549182"
                        link="https://www.printables.com/@TimoWeiss_1549182"
                    />
                    <LinkElement
                        title="E-Mail"
                        label="timo.weiss@pm.me"
                        link="mailto:timo.weiss@pm.me"
                    />
                </div>
            </section>
        </motion.div>
    );
}
