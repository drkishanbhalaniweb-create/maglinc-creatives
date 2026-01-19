"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export function CaseStudies() {
    const ref = useRef<HTMLDivElement>(null);

    return (
        <section ref={ref} className="py-48 bg-black">
            <div className="w-full max-w-[94%] mx-auto">
                {/* Section Header */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-48">
                    <div className="md:col-span-4">
                        <span className="text-label mb-8 block">Selected Work — 03</span>
                        <h2 className="text-headline">Evidence of <br /><span className="font-serif italic text-white/90">execution</span>.</h2>
                    </div>
                </div>

                <div className="space-y-64">
                    {/* Project 1: Dominant / Cinematic */}
                    <ProjectOne />

                    {/* Project 2: Structured / Technical */}
                    <ProjectTwo />
                </div>
            </div>
        </section>
    );
}

function ProjectOne() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);

    return (
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-12 gap-8 group">
            {/* Left Info Column */}
            <div className="md:col-span-4 space-y-12 pr-12">
                <div className="space-y-4">
                    <span className="text-label text-white/20">01</span>
                    <h3 className="text-display text-[6vw]">Mevoq</h3>
                </div>
                <p className="text-body max-w-sm">
                    A premium digital identity for a next-gen creative collective.
                    Defined by <span className="font-serif italic text-white/80 line-through decoration-white/30">silence</span> and scale.
                </p>
                <div className="flex flex-wrap gap-x-8 gap-y-2">
                    {["Strategy", "Design", "Development"].map((tag) => (
                        <span key={tag} className="text-label text-white/20 lowercase tracking-normal font-sans italic">{tag}</span>
                    ))}
                </div>
            </div>

            {/* Right Image Area - Spans wide */}
            <div data-cursor="view" className="md:col-span-8 relative aspect-[16/10] overflow-hidden bg-neutral-900 border border-white/5">
                <motion.div style={{ y }} className="absolute inset-0">
                    <Image
                        src="/images/mevoq.png"
                        alt="Mevoq"
                        fill
                        className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[1.5s] ease-[0.22, 1, 0.36, 1]"
                    />
                </motion.div>
                {/* Decoration */}
                <div className="absolute bottom-0 right-0 p-8 border-l border-t border-white/10 bg-black/40 backdrop-blur-sm group-hover:bg-white group-hover:text-black transition-colors duration-500">
                    <span className="text-label transition-colors">Details →</span>
                </div>
            </div>
        </div>
    )
}

function ProjectTwo() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
    const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

    return (
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-12 gap-8 relative group items-center">
            {/* Image Area - Organic Layered Mockups */}
            <a
                href="https://militarydisabilitynexus.com"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="view"
                data-cursor-text="Visit"
                className="md:col-start-1 md:col-span-8 relative order-2 md:order-1 pt-24 pb-24 block cursor-none"
            >
                {/* Back Layer: Admin Panel - Fixed as the height driver */}
                <motion.div
                    style={{ y: y1 }}
                    className="relative w-[85%] z-0"
                >
                    <Image
                        src="/images/nexus-admin.png"
                        alt="Nexus Admin"
                        width={1200}
                        height={800}
                        className="w-full h-auto drop-shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
                    />
                </motion.div>

                {/* Front Layer: Landing Page - Floating over */}
                <motion.div
                    style={{ y: y2 }}
                    className="absolute right-0 bottom-12 w-[80%] z-10"
                >
                    <Image
                        src="/images/nexus-landing.png"
                        alt="Nexus Landing"
                        width={1200}
                        height={800}
                        className="w-full h-auto drop-shadow-[0_40px_100px_rgba(0,0,0,0.9)]"
                    />
                </motion.div>
            </a>

            {/* Right Info Area */}
            <div className="md:col-span-4 md:col-start-9 pt-12 space-y-16 order-1 md:order-2">
                <div className="space-y-6">
                    <div className="flex justify-between items-baseline mb-4">
                        <span className="text-label text-white/20">02</span>
                    </div>
                    <h3 className="text-headline">Military Disability <br /><span className="font-serif italic text-white/90">Nexus</span></h3>
                </div>

                <div className="space-y-12">
                    <p className="text-body max-w-sm">
                        Simplifying complex claims through authoritative and structured design.
                        Function over form, but form with <span className="text-white">intent</span>.
                    </p>
                    <div className="grid grid-cols-1 gap-4 pt-12 border-t border-white/10">
                        <span className="text-label">Platform Design</span>
                        <span className="text-label">Data Architecture</span>
                        <span className="text-label">Admin Infrastructure</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
