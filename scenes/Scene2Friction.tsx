"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

interface SceneProps {
    progress: MotionValue<number>;
}

export function Scene2Friction({ progress }: SceneProps) {
    // Top-down slide logic
    // 0.6 -> 1.0: y goes from -100% to 0%
    const y = useTransform(progress, [0.6, 1], ["-100%", "0%"]);

    // Content animation
    // Text could fade in slightly as it settles
    const textOpacity = useTransform(progress, [0.8, 1], [0, 1]);
    const textY = useTransform(progress, [0.8, 1], [20, 0]);

    return (
        <motion.div
            className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-neutral-900 text-white"
            style={{ y }}
        >
            <div className="text-left max-w-5xl mx-auto px-6 w-full">
                <motion.h2
                    className="text-7xl md:text-9xl font-bold tracking-tighter mb-12"
                    style={{ opacity: textOpacity, y: textY }}
                >
                    Things get stuck.
                </motion.h2>

                <div className="space-y-4">
                    {["Half-built products", "Overcomplicated systems", "Endless 'almost ready' loops"].map((line, i) => (
                        <motion.p
                            key={i}
                            className="text-2xl md:text-3xl font-light text-neutral-400"
                            style={{
                                opacity: textOpacity,
                                y: textY,
                                transition: `opacity 0.5s ease ${i * 0.1}s` // dynamic delay via Framer if needed, but simple transform for now
                            }}
                        >
                            {line}
                        </motion.p>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
