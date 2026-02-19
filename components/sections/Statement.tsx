"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";

export function Statement() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-20%" });

    const container: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            },
        },
    };

    const item: Variants = {
        hidden: { opacity: 0, y: 30 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 1.5,
                ease: [0.22, 1, 0.36, 1],
            }
        },
    };

    const lineDraw: Variants = {
        hidden: { scaleX: 0, originX: 0 },
        show: { scaleX: 1, transition: { duration: 1.5, ease: "easeOut" } }
    };

    const lineDrawVertical: Variants = {
        hidden: { scaleY: 0, originY: 0 },
        show: { scaleY: 1, transition: { duration: 1.5, ease: "easeOut", delay: 0.2 } }
    };

    return (
        <section ref={ref} className="py-48 md:py-64 bg-black relative overflow-hidden">
            {/* Structural Grid lines */}
            <div className="absolute inset-0 pointer-events-none">
                <motion.div
                    variants={lineDrawVertical}
                    initial="hidden"
                    animate="show"
                    className="absolute top-0 bottom-0 left-[33.33%] w-px bg-white/10 hidden md:block"
                />
                <motion.div
                    variants={lineDraw}
                    initial="hidden"
                    animate="show"
                    className="absolute bottom-0 left-0 right-0 h-px bg-white/10"
                />
            </div>
            <div className="w-full max-w-[94%] mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">
                <div className="md:col-span-9 md:col-start-4">
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate={isInView ? "show" : "hidden"}
                        className="space-y-16"
                    >
                        <motion.div variants={item}>
                            <span className="text-label mb-8 block">Our Purpose</span>
                        </motion.div>

                        <motion.h2
                            variants={item}
                            className="text-headline max-w-4xl"
                        >
                            We partner with founders to bridge the gap between <span className="font-serif italic text-white/90">ambition</span> and <span className="font-serif italic text-white/90">reality</span> through high-fidelity creative engineering.
                        </motion.h2>

                        <motion.div
                            variants={item}
                            className="grid grid-cols-1 md:grid-cols-2 gap-16 pt-16 border-t border-white/10"
                        >
                            <p className="text-body max-w-sm">
                                Most products fail because they lack the technical depth to match their creative vision. We exist to ensure yours isn't one of them.
                            </p>
                            <p className="text-body max-w-sm">
                                From deep-tech infrastructure to pixel-perfect interfaces, we build with a focus on <span className="text-white">longevity</span> and <span className="text-white">scalability</span>.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
