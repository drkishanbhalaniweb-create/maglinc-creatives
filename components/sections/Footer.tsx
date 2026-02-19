"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function Philosophy() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });

    return (
        <section ref={ref} className="py-64 bg-black relative border-y border-white/10">
            <div className="absolute inset-0 grid-background opacity-10" />
            <div className="w-full max-w-[94%] mx-auto relative z-10">
                <motion.p
                    initial={{ opacity: 0, scale: 0.98, y: 20 }}
                    animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                    className="text-[clamp(2rem,6vw,5rem)] font-light tracking-tight max-w-5xl mx-auto leading-[1.1] text-center"
                >
                    We build the <span className="font-serif italic text-white/90">first real version</span> of your product. Focused on technical <span className="text-white/40">clarity</span> and creative <span className="text-white/40">intent</span>.
                </motion.p>
            </div>
        </section>
    );
}

export function CTA() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true });

    return (
        <footer ref={ref} className="py-32 md:py-64 bg-black relative overflow-hidden">
            <div className="w-full max-w-[94%] mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between gap-16 border-t border-white/10 pt-32">
                    <div className="space-y-8 text-center md:text-left">
                        <span className="text-label">Contact — 04</span>
                        <h2 className="text-display">
                            Have something <br /><span className="font-serif italic text-white/90">in mind?</span>
                        </h2>
                    </div>

                    <motion.button
                        data-cursor="open"
                        data-cursor-text="Project"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-16 py-8 bg-white text-black font-bold uppercase tracking-[0.2em] text-xs hover:bg-neutral-200 transition-colors"
                    >
                        Start a project
                    </motion.button>
                </div>

                <div className="mt-64 flex flex-col md:flex-row items-center justify-between text-label gap-12">
                    <p>© 2022 Maglinc Studio</p>
                    <div className="flex gap-12 lowercase italic tracking-normal font-serif text-white/30 text-base">
                        <a href="#" className="hover:text-white transition-all duration-500">X / Twitter</a>
                        <a href="https://www.linkedin.com/company/maglinc/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-all duration-500">LinkedIn</a>
                        <a href="#" className="hover:text-white transition-all duration-500">Read.cv</a>
                    </div>
                </div>
            </div>

            {/* Subtle light leak at bottom */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80vw] h-[40vh] bg-white/[0.02] blur-[120px] rounded-full -mb-[20vh] pointer-events-none" />
        </footer>
    );
}
