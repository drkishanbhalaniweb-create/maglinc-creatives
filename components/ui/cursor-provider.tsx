"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type CursorType = "default" | "text" | "view" | "read" | "open" | "drag" | "cta";

interface CursorContextType {
    cursorType: CursorType;
    setCursorType: (type: CursorType) => void;
    cursorText: string;
    setCursorText: (text: string) => void;
    stickyElement: HTMLElement | null;
    setStickyElement: (element: HTMLElement | null) => void;
}

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export function CursorProvider({ children }: { children: ReactNode }) {
    const [cursorType, setCursorType] = useState<CursorType>("default");
    const [cursorText, setCursorText] = useState("");
    const [stickyElement, setStickyElement] = useState<HTMLElement | null>(null);

    // Helper for generic ease-of-use via hooks if needed later
    const value = {
        cursorType,
        setCursorType,
        cursorText,
        setCursorText,
        stickyElement,
        setStickyElement,
    };

    return <CursorContext.Provider value={value}>{children}</CursorContext.Provider>;
}

export function useCursor() {
    const context = useContext(CursorContext);
    if (context === undefined) {
        throw new Error("useCursor must be used within a CursorProvider");
    }
    return context;
}
