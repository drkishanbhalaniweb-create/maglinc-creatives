"use client";

import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { useRef } from "react";
import { TextScramble } from "@/components/ui/text-scramble";

export function Hero() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const lineDraw: Variants = {
        hidden: { scaleX: 0, originX: 0 },
        show: { scaleX: 1, transition: { duration: 1.5, ease: "easeOut" } }
    };

    const lineDrawVertical: Variants = {
        hidden: { scaleY: 0, originY: 0 },
        show: { scaleY: 1, transition: { duration: 1.5, ease: "easeOut", delay: 0.2 } }
    };

    const yText = useTransform(scrollYProgress, [0, 1], [0, 50]);

    return (
        <section
            ref={ref}
            className="relative min-h-[110vh] flex flex-col justify-end pb-32 overflow-hidden bg-black"
        >
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
                    className="absolute top-[25%] left-0 right-0 h-px bg-white/10"
                />
            </div>

            <div className="w-full max-w-[94%] mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 relative z-10">
                {/* Asymmetrical Left Column */}
                <div className="hidden md:flex md:col-span-4 flex-col justify-between pt-4 pb-12 h-full">
                    <div className="space-y-12">
                        <TextScramble
                            className="text-label"
                            as="div"
                            characterSet="0123456789"
                        >
                            Est. 2022
                        </TextScramble>

                        <div className="text-label space-y-1">
                            <p>Creative</p>
                            <p>Engineering</p>
                            <p>Studio</p>
                        </div>
                    </div>


                </div>

                {/* Main Content Area */}
                <div className="md:col-span-8 flex flex-col">
                    <motion.div style={{ y: yText }} className="relative">
                        <motion.div
                            variants={lineDraw}
                            initial="hidden"
                            animate="show"
                            className="absolute -top-16 left-0 w-48 h-px bg-white/30"
                        />

                        <div className="mb-4">
                            <span className="text-label">Maglinc Studio — 01</span>
                        </div>

                        <h1 className="text-display mb-12">
                            MAGLINC
                        </h1>

                        <div className="flex flex-col md:flex-row gap-16 md:gap-32 md:items-start">
                            <div className="max-w-md space-y-6">
                                <p className="text-statement text-white/60">
                                    Where <TextScramble
                                        as="span"
                                        className="font-doto text-white inline-block cursor-default"
                                        characterSet="0123456789"
                                        scrambleOnHover={true}
                                    >
                                        code
                                    </TextScramble> meets <TextScramble
                                        as="span"
                                        className="font-serif text-white inline-block cursor-default"
                                        characterSet="0123456789"
                                        scrambleOnHover={true}
                                    >
                                        creativity
                                    </TextScramble>.
                                </p>
                                <TextScramble
                                    className="text-body block"
                                    duration={1.5}
                                    characterSet="01"
                                >
                                    Ideas are easy. Building is not.
                                </TextScramble>
                            </div>

                            <div className="grid grid-cols-1 gap-6 pt-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-1.5 h-1.5 bg-white/20 rounded-full" />
                                    <span className="text-label">Available Q2</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-1.5 h-1.5 bg-white/20 rounded-full" />
                                    <span className="text-label">Based in Gujrat, India</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
