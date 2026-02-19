"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

interface SceneProps {
    progress: MotionValue<number>;
}

export function Scene1Hero({ progress }: SceneProps) {
    // Parallax and fade logic
    // Scene 1 is visible from 0 to 0.6 (mostly)
    // At 0.6, Scene 2 starts covering it.

    // Text moves up slightly: 0 -> -10%
    const y = useTransform(progress, [0, 0.6], ["0%", "-10%"]);
    // Opacity fades out slightly before it's covered?
    const opacity = useTransform(progress, [0, 0.4, 0.6], [1, 1, 0.5]);

    return (
        <motion.div
            className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-neutral-100 text-neutral-900"
            style={{ opacity }}
        >
            <motion.div style={{ y }} className="text-center px-6 max-w-4xl mx-auto">
                <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-[0.9]">
                    Where code meets creativity.
                </h1>
                <p className="text-xl md:text-2xl font-light text-neutral-500 tracking-wide">
                    Ideas are easy. Building is not.
                </p>
            </motion.div>
        </motion.div>
    );
}
