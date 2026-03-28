"use client";

import { useEffect, useRef } from "react";

/**
 * Custom cursor: outer ring (lagged) + inner dot (exact).
 * Uses requestAnimationFrame + lerp — zero state updates, zero re-renders.
 * Hides the native cursor site-wide via CSS injected once on mount.
 */
export default function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const dotRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ── Hide native cursor globally ─────────────────────────────────────────
    const styleEl = document.createElement("style");
    styleEl.textContent = "*, *::before, *::after { cursor: none !important; }";
    document.head.appendChild(styleEl);

    const outer = outerRef.current;
    const dot   = dotRef.current;
    if (!outer || !dot) return;

    // Current exact mouse position
    let mx = -200, my = -200;
    // Lerped position for the outer ring
    let ox = -200, oy = -200;

    // State for interactive hover
    let isHover = false;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const onEnter = () => { isHover = true; };
    const onLeave = () => { isHover = false; };

    window.addEventListener("mousemove", onMove, { passive: true });

    // Delegate hover detection to any interactive element
    const interactives = "a, button, [role='button'], input, textarea, select, label";
    document.querySelectorAll<HTMLElement>(interactives).forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    // Also watch future DOM nodes with a MutationObserver
    const mo = new MutationObserver(() => {
      document.querySelectorAll<HTMLElement>(interactives).forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    // ── rAF loop ────────────────────────────────────────────────────────────
    let raf: number;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      // snap dot
      dot.style.transform   = `translate(${mx - 4}px, ${my - 4}px)`;

      // lerp outer ring
      ox = lerp(ox, mx, 0.12);
      oy = lerp(oy, my, 0.12);

      const outerSize = isHover ? 52 : 36;
      const halfOuter = outerSize / 2;
      outer.style.width  = `${outerSize}px`;
      outer.style.height = `${outerSize}px`;
      outer.style.transform = `translate(${ox - halfOuter}px, ${oy - halfOuter}px)`;
      outer.style.borderColor = isHover ? "#06B6D4" : "rgba(59,130,246,0.7)";
      outer.style.opacity = isHover ? "0.9" : "0.6";

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      mo.disconnect();
      document.head.removeChild(styleEl);
    };
  }, []);

  return (
    <>
      {/* Outer lagged ring */}
      <div
        ref={outerRef}
        aria-hidden
        className="fixed top-0 left-0 rounded-full border-2 pointer-events-none z-[9999] transition-[width,height,border-color,opacity] duration-150"
        style={{
          width: 36,
          height: 36,
          borderColor: "rgba(59,130,246,0.7)",
          boxShadow: "0 0 10px rgba(59,130,246,0.3)",
          willChange: "transform",
        }}
      />

      {/* Inner exact dot */}
      <div
        ref={dotRef}
        aria-hidden
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999]"
        style={{
          background: "#06B6D4",
          boxShadow: "0 0 6px 2px rgba(6,182,212,0.6)",
          willChange: "transform",
        }}
      />
    </>
  );
}
