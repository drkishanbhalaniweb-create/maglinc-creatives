"use client";

import { Hero } from "@/components/sections/Hero";
import { Statement } from "@/components/sections/Statement";
import { WhatWeDo } from "@/components/sections/WhatWeDo";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { Philosophy, CTA } from "@/components/sections/Footer"; // Philosophy and CTA are in Footer.tsx

export default function Home() {
  return (
    <main className="relative bg-black text-white">
      {/* Global Navigation - Minimal */}
      <nav className="fixed top-0 left-0 w-full z-50 px-8 py-10 flex justify-between items-center mix-blend-difference pointer-events-none">
        <div className="text-label text-white font-bold pointer-events-auto">Maglinc.</div>
        <div className="hidden md:flex gap-16 text-label pointer-events-auto">
          <a href="#" className="hover:text-white transition-all duration-500">Work</a>
          <a href="#" className="hover:text-white transition-all duration-500">Studio</a>
          <a href="#" className="hover:text-white transition-all duration-500">Contact</a>
        </div>
      </nav>

      <Hero />
      <Statement />
      <WhatWeDo />
      <CaseStudies />
      <Philosophy />
      <CTA />
    </main>
  );
}
