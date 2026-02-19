"use client";

import { useEffect, useRef, useState } from "react";
import {
    motion,
    useMotionValue,
    useSpring,
    AnimatePresence,
} from "framer-motion";
import { useCursor } from "@/components/ui/cursor-provider";

export function MagneticCursor() {
    const { cursorType, setCursorType, cursorText, setCursorText } = useCursor();

    const springConfig = { damping: 35, stiffness: 600, mass: 0.4 };
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const smoothX = useSpring(mouseX, springConfig);
    const smoothY = useSpring(mouseY, springConfig);

    const [activeElement, setActiveElement] = useState<HTMLElement | null>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);

            const elements = document.querySelectorAll<HTMLElement>('[data-cursor], a, button, h1, h2, h3, h4, h5, h6, p, span, li, label');
            let found = false;
            let nearest: HTMLElement | null = null;
            let minDistance = Infinity;

            elements.forEach((el) => {
                const rect = el.getBoundingClientRect();
                const isText = ["H1", "H2", "H3", "H4", "H5", "H6", "P", "SPAN", "LI", "LABEL"].includes(el.tagName);
                const padding = isText ? 30 : 100;

                const isInside =
                    e.clientX >= rect.left - padding &&
                    e.clientX <= rect.right + padding &&
                    e.clientY >= rect.top - padding &&
                    e.clientY <= rect.bottom + padding;

                if (isInside) {
                    const dx = Math.max(rect.left - e.clientX, 0, e.clientX - rect.right);
                    const dy = Math.max(rect.top - e.clientY, 0, e.clientY - rect.bottom);
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < minDistance) {
                        minDistance = distance;
                        nearest = el;
                        found = true;
                    }
                }
            });

            if (found && nearest) {
                const target = nearest as HTMLElement;
                const type = target.getAttribute("data-cursor") ||
                    (["A", "BUTTON"].includes(target.tagName) ? "cta" :
                        (["H1", "H2", "H3", "H4", "H5", "H6", "P", "SPAN", "LI", "LABEL"].includes(target.tagName) ? "text" : "cta"));
                const text = target.getAttribute("data-cursor-text");

                setCursorType(type as any);
                if (text) setCursorText(text);
                else if (type === "view") setCursorText("View");
                else if (type === "open") setCursorText("Open");
                else setCursorText("");

                setActiveElement(target);
            } else {
                setCursorType("default");
                setCursorText("");
                setActiveElement(null);
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [setCursorType, setCursorText, mouseX, mouseY]);

    const variants = {
        default: {
            width: 12,
            height: 12,
            borderRadius: "50%",
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            backdropFilter: "invert(100%)",
        },
        cta: {
            width: 66,
            height: 66,
            borderRadius: "50%",
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255, 255, 255, 0.5)",
            backdropFilter: "invert(100%) brightness(1.2)",
        },
        view: {
            width: 100,
            height: 100,
            borderRadius: "50%",
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255, 255, 255, 0.5)",
            backdropFilter: "invert(100%) blur(2px) brightness(1.2)",
        },
        text: {
            width: 4,
            height: 32,
            borderRadius: "4px",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            border: "none",
            backdropFilter: "invert(100%) contrast(1.5)",
        }
    };

    return (
        <>
            <style jsx global>{`
                body, a, button, [role="button"], [data-cursor] { cursor: none !important; }
                .cursor-text-shadow {
                    color: black !important;
                    text-shadow: 0 0 10px rgba(255,255,255,0.8);
                }
            `}</style>

            <div className="fixed top-0 left-0 z-[9999] pointer-events-none">
                <motion.div
                    style={{
                        x: smoothX,
                        y: smoothY,
                        translateX: "-50%",
                        translateY: "-50%"
                    }}
                    animate={cursorType === "view" || cursorType === "open" ? "view" : cursorType}
                    variants={variants}
                    transition={{ type: "spring", stiffness: 600, damping: 35, mass: 0.4 }}
                    className="flex items-center justify-center pointer-events-none overflow-hidden"
                >
                    <AnimatePresence>
                        {cursorText && (
                            <motion.span
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                className="text-[11px] uppercase font-black tracking-[0.2em] z-20 cursor-text-shadow"
                            >
                                {cursorText}
                            </motion.span>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Secondary trailing lag ring for more depth and visibility */}
                <motion.div
                    style={{
                        x: smoothX,
                        y: smoothY,
                        translateX: "-50%",
                        translateY: "-50%"
                    }}
                    animate={{
                        width: cursorType === "default" ? 32 : 140,
                        height: cursorType === "default" ? 32 : 140,
                        opacity: cursorType === "default" ? 0.3 : 0.15,
                    }}
                    transition={{ type: "spring", stiffness: 120, damping: 25 }}
                    className="absolute top-0 left-0 rounded-full border-[1.5px] border-white/40 pointer-events-none"
                />
            </div>
        </>
    );
}
