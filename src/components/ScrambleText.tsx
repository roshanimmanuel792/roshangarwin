"use client";

import { useState, useRef, useEffect } from "react";

// A highly curated, tech/cinematic character set for a premium feel
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$*+<>[]{}";

interface ScrambleTextProps {
  text: string;
  className?: string;
  scrambleOnMount?: boolean;
}

export default function ScrambleText({ text, className = "", scrambleOnMount = false }: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const triggerScramble = () => {
    let iteration = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);

    // Slower interval and smaller increment for a much smoother, lingering cinematic reveal
    intervalRef.current = setInterval(() => {
      setDisplayText((prev) =>
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            if (letter === " ") return " ";
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(intervalRef.current!);
      }

      iteration += 1 / 4; // slower progression
    }, 50); // slower frame rate for a very cool, deliberate effect
  };

  useEffect(() => {
    if (scrambleOnMount) {
      triggerScramble();
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrambleOnMount, text]);

  return (
    <span 
      onMouseEnter={triggerScramble} 
      className={`inline-block ${className}`}
      suppressHydrationWarning
    >
      {displayText}
    </span>
  );
}
