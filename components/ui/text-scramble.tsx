'use client';
import React, { type JSX, useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

type TextScrambleProps = {
    children: string;
    duration?: number;
    speed?: number;
    characterSet?: string;
    as?: React.ElementType;
    className?: string;
    trigger?: boolean;
    scrambleOnHover?: boolean;
    onScrambleComplete?: () => void;
    [key: string]: any;
};

const defaultChars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export function TextScramble({
    children,
    duration = 0.8,
    speed = 0.04,
    characterSet = defaultChars,
    className,
    as: Component = 'p',
    trigger = true,
    scrambleOnHover = false,
    onScrambleComplete,
    ...props
}: TextScrambleProps) {
    const [displayText, setDisplayText] = useState(children);
    const [isHovering, setIsHovering] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const textSnapshot = children;

    useEffect(() => {
        if (!trigger && !isHovering) {
            setDisplayText(textSnapshot);
            return;
        }

        let step = 0;
        const totalSteps = duration / speed;

        const startScramble = () => {
            intervalRef.current = setInterval(() => {
                let scrambled = '';
                const progress = step / totalSteps;

                for (let i = 0; i < textSnapshot.length; i++) {
                    if (textSnapshot[i] === ' ') {
                        scrambled += ' ';
                        continue;
                    }

                    const isRevealed = !isHovering && (progress * textSnapshot.length > i);

                    if (isRevealed) {
                        scrambled += textSnapshot[i];
                    } else {
                        scrambled +=
                            characterSet[Math.floor(Math.random() * characterSet.length)];
                    }
                }

                setDisplayText(scrambled);

                if (isHovering) {
                    step = 0; // Keep it scrambled
                } else {
                    step++;
                }

                if (step > totalSteps && !isHovering) {
                    if (intervalRef.current) clearInterval(intervalRef.current);
                    setDisplayText(textSnapshot);
                    onScrambleComplete?.();
                }
            }, speed * 1000);
        };

        startScramble();

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [trigger, isHovering, textSnapshot, duration, speed, characterSet, onScrambleComplete]);

    const handleMouseEnter = () => {
        if (scrambleOnHover) setIsHovering(true);
    };

    const handleMouseLeave = () => {
        if (scrambleOnHover) setIsHovering(false);
    };

    // Use motion.span as the wrapper instead of dynamic component
    return (
        <motion.span
            className={className}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            {...props}
        >
            {displayText}
        </motion.span>
    );
}
