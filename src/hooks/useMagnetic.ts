"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * useMagnetic — attaches a magnetic pull effect to a DOM element.
 *
 * On pointer entry: the element lerps toward the cursor (capped at `strength` px).
 * On pointer leave: springs back to origin.
 *
 * Uses gsap.quickSetter for zero-overhead per-frame updates.
 * Zero React state — safe to use on buttons/anchors that also have React handlers.
 *
 * @param strength  Max pixel offset in any direction (default 14)
 * @param radius    Activation radius in px — outside this the effect is off (default 80)
 */
export function useMagnetic<T extends HTMLElement>(
  strength = 14,
  radius   = 80
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Bail on touch-primary devices — magnetic effect is pointer-only UX
    if (window.matchMedia("(hover: none)").matches) return;

    const setX = gsap.quickSetter(el, "x", "px");
    const setY = gsap.quickSetter(el, "y", "px");

    let rafId = 0;
    let curX  = 0;
    let curY  = 0;
    let active = false;

    const onMove = (e: PointerEvent) => {
      const rect   = el.getBoundingClientRect();
      const cx     = rect.left + rect.width  / 2;
      const cy     = rect.top  + rect.height / 2;
      const dx     = e.clientX - cx;
      const dy     = e.clientY - cy;
      const dist   = Math.sqrt(dx * dx + dy * dy);

      if (dist < radius) {
        active = true;
        const factor = (1 - dist / radius) * strength;
        curX = (dx / dist) * factor;
        curY = (dy / dist) * factor;
      } else if (active) {
        active = false;
        curX   = 0;
        curY   = 0;
      }
    };

    const tick = () => {
      setX(curX);
      setY(curY);
      rafId = requestAnimationFrame(tick);
    };

    const onLeave = () => {
      active = false;
      curX   = 0;
      curY   = 0;
      // Spring back smoothly
      gsap.to(el, { x: 0, y: 0, duration: 0.55, ease: "elastic.out(1, 0.45)" });
      // Stop the rAF loop after spring settles
      setTimeout(() => cancelAnimationFrame(rafId), 600);
    };

    const onEnter = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(tick);
    };

    el.addEventListener("pointermove", onMove  as EventListener);
    el.addEventListener("pointerenter", onEnter as EventListener);
    el.addEventListener("pointerleave", onLeave as EventListener);

    return () => {
      cancelAnimationFrame(rafId);
      el.removeEventListener("pointermove", onMove  as EventListener);
      el.removeEventListener("pointerenter", onEnter as EventListener);
      el.removeEventListener("pointerleave", onLeave as EventListener);
      gsap.set(el, { x: 0, y: 0 });
    };
  }, [strength, radius]);

  return ref;
}
