"use client";

import { useEffect, useRef } from "react";

interface SoundToggleProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
}

export default function SoundToggle({ videoRef }: SoundToggleProps) {
  const btnRef    = useRef<HTMLButtonElement>(null);
  const mutedRef  = useRef(true);

  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;

    const onClick = () => {
      const vid = videoRef.current;
      if (!vid) return;

      mutedRef.current = !mutedRef.current;
      vid.muted  = mutedRef.current;
      vid.volume = 0.65;

      btn.setAttribute("data-muted", String(mutedRef.current));
      btn.setAttribute("aria-label", mutedRef.current ? "Unmute" : "Mute");
    };

    btn.addEventListener("click", onClick);
    return () => btn.removeEventListener("click", onClick);
  }, [videoRef]);

  return (
    <button
      ref={btnRef}
      data-muted="true"
      aria-label="Unmute"
      className="
        fixed bottom-6 right-6 z-[60]
        flex items-center gap-2
        px-4 py-2.5 rounded-full
        border border-white/10 bg-black/50 backdrop-blur-md
        text-white/40 hover:text-white hover:border-white/25
        transition-colors duration-200
        group
      "
    >
      <svg
        className="block group-[[data-muted=false]]:hidden"
        width="13" height="13" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round"
      >
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        <line x1="23" y1="9" x2="17" y2="15" />
        <line x1="17" y1="9" x2="23" y2="15" />
      </svg>

      <svg
        className="hidden group-[[data-muted=false]]:block"
        width="13" height="13" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round"
      >
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
      </svg>

      <span className="text-[9px] uppercase tracking-widest font-medium">
        <span className="group-[[data-muted=false]]:hidden">Sound</span>
        <span className="hidden group-[[data-muted=false]]:inline">Mute</span>
      </span>
    </button>
  );
}
