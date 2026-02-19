"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";

const services = [
    {
        title: "Websites",
        description: "High-performance, editorial digital experiences that tell your story with precision.",
        details: ["Next.js", "Framer Motion", "Premium UI"]
    },
    {
        title: "SaaS MVPs",
        description: "Building the first real version of your product. Fast, scalable, and focused.",
        details: ["Product Strategy", "Fullstack Auth", "Database Architecture"]
    },
    {
        title: "Platforms & Tools",
        description: "Internal tools and complex dashboards that simplify overcomplicated systems.",
        details: ["Custom Workflows", "Data Visualization", "Performance Optimization"]
    }
];

export function WhatWeDo() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-20%" });

    return (
        <section ref={ref} className="py-48 bg-black overflow-hidden border-b border-white/10">
            <div className="w-full max-w-[94%] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-32">
                    <div className="md:col-span-4">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <span className="text-label mb-8 block">Services — 02</span>
                            <h2 className="text-headline">Our core <br /><span className="font-serif italic text-white/90">specialization</span>.</h2>
                        </motion.div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    {services.map((service, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 1.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                            className="md:col-span-4 group h-full flex flex-col justify-between border-l border-white/10 pl-8 pt-4 pb-12"
                        >
                            <div>
                                <span className="text-label text-white/20 mb-12 block">0{i + 1}</span>
                                <h3 className="text-display text-[4vw] mb-8 font-light group-hover:pl-4 transition-all duration-700">{service.title}</h3>
                                <p className="text-body mb-16 max-w-sm">
                                    {service.description}
                                </p>
                            </div>

                            <ul className="space-y-3">
                                {service.details.map((detail, j) => (
                                    <li key={j} className="text-label text-white/20 flex items-center gap-4 transition-colors group-hover:text-white/40">
                                        <div className="w-1 h-1 bg-white/20 rounded-full" />
                                        {detail}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
