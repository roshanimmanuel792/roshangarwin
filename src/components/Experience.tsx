"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollCubeIndicator from "./ScrollCube";

gsap.registerPlugin(ScrollTrigger);

// Dynamic require for client-side Three.js
let Suspense: any;
try {
  Suspense = require("react").Suspense;
} catch (e) {
  Suspense = null;
}

// ─── Experience data ───────────────────────────────────────────────────────────
const EXPERIENCE_DATA = [
  {
    id: 1,
    title: "Freelance Technical Support",
    subtitle: "Self-employed • 2023 — Present",
    description:
      "Resolving UI issues and implementing minor backend fixes across multiple small-scale projects. Assisting individuals in debugging and completing web-based applications with minimal supervision and varying requirements.",
    tags: ["UI Fixes", "Debugging", "Backend"],
  },
  {
    id: 2,
    title: "Freelance Web Developer",
    subtitle: "Multiple Projects • 2024",
    description:
      "Contributing to small-scale web development projects including booking systems and inventory platforms. Delivered functional solutions in unstructured development environments with hands-on problem-solving.",
    tags: ["Web Dev", "Problem Solving", "Delivery"],
  },
];

// ─── Main Component ────────────────────────────────────────────────────────────
export default function Experience() {
  const experienceBlockRef = useRef<HTMLDivElement>(null);
  const stickyWrapRef      = useRef<HTMLDivElement>(null);
  const cardRefs           = useRef<(HTMLDivElement | null)[]>([]);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const block   = experienceBlockRef.current;
    const wrapper = stickyWrapRef.current;
    const cards   = cardRefs.current.filter(Boolean) as HTMLDivElement[];

    if (!block || !wrapper || cards.length === 0) return;

    // ── Parallax entrance for wrapper ──────────────────────────────────────
    gsap.from(wrapper, {
      yPercent: -30,
      ease: "none",
      scrollTrigger: {
        trigger: block,
        start: "top bottom",
        end: "top top",
        scrub: true,
      },
    });

    // ── Scroll progress tracker for cube ──────────────────────────────────
    gsap.to({}, {
      scrollTrigger: {
        trigger: block,
        start: "top 10%",
        end: "bottom bottom",
        onUpdate: (self) => setScrollProgress(self.progress),
        scrub: true,
      },
    });

    // ── Master timeline for card animations ───────────────────────────────
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: block,
        start: "top 10%",
        end: "bottom bottom",
        scrub: 1.2,
      },
    });

    // ── Animate each card: enter from right → hold → exit left ────────────
    cards.forEach((card, i) => {
      // Start off-screen to the right with scale down
      gsap.set(card, { x: "110%", opacity: 0, scale: 0.94 });

      // Slide in from right with scale up
      tl.to(
        card,
        { x: "0%", opacity: 1, scale: 1, ease: "power3.out", duration: 0.6 },
        `card-${i}-enter`
      );

      // Slide out to left (except last card)
      if (i < cards.length - 1) {
        tl.to(
          card,
          { x: "-110%", opacity: 0, scale: 0.94, ease: "power3.in", duration: 0.5 },
          `card-${i}-exit`
        );
      }
    });

    return () => { ScrollTrigger.getAll().forEach((t) => t.kill()); };
  }, []);

  return (
    <div
      id="experience"
      ref={experienceBlockRef}
      style={{ height: `${EXPERIENCE_DATA.length * 130}vh` }}
      className="relative"
    >
      {/* sticky horizontal scroll wrapper */}
      <div
        ref={stickyWrapRef}
        className="sticky top-0 h-screen w-full overflow-hidden bg-black flex relative"
      >
        {/* LEFT: label column */}
        <div className="hidden md:flex flex-col justify-start items-start w-[38%] h-full px-12 lg:px-20 flex-shrink-0 border-r border-white/[0.06] relative z-10">
          <span className="absolute text-[18vw] font-black uppercase tracking-tighter text-white/[0.02] leading-none select-none pointer-events-none left-6 top-1/2 -translate-y-1/2">
            WORK
          </span>

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[9px] tracking-[0.4em] uppercase text-white/25 font-medium mb-4">
              Professional Journey
            </p>
            <h2 className="text-5xl lg:text-6xl font-black uppercase leading-tight text-white mb-6">
              The<br />Experience
            </h2>
            <p className="text-white/35 text-sm leading-relaxed max-w-xs">
              Scroll to explore each role. Every position represents growth and hands-on problem-solving.
            </p>

            {/* index dots */}
            <div className="flex gap-3 mt-10 mb-12">
              {EXPERIENCE_DATA.map((_, i) => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-white/20 border border-white/10"
                />
              ))}
            </div>

            {/* 3D Rubik's Cube Scroll Indicator */}
            <div className="relative w-52 h-52 mx-auto">
              <ScrollCubeIndicator progress={scrollProgress} />
            </div>

            {/* Progress indicator text */}
            <div className="mt-8 text-center">
              <p className="text-[10px] tracking-[0.3em] uppercase font-bold text-white/30">
                Scroll to Scramble
              </p>
            </div>
          </motion.div>
        </div>

        {/* RIGHT: card stage */}
        <div className="relative flex-1 h-full flex items-center justify-center overflow-hidden px-6 md:px-10">
          <div className="absolute top-8 left-6 z-20 md:hidden">
            <p className="text-[9px] tracking-[0.4em] uppercase text-white/25 font-medium">
              The Experience
            </p>
          </div>

          {EXPERIENCE_DATA.map((experience, i) => (
            <div
              key={experience.id}
              ref={(el) => { cardRefs.current[i] = el; }}
              className="absolute w-full max-w-xl lg:max-w-2xl rounded-2xl overflow-hidden
                         bg-white/[0.03] flex flex-col justify-between p-8 lg:p-12
                         will-change-transform border border-white/[0.07]"
              style={{ minHeight: "480px" }}
            >
              {/* top row */}
              <div className="flex items-start justify-between">
                <div className="flex flex-wrap gap-2">
                  {experience.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] tracking-[0.3em] uppercase font-medium px-3 py-1 rounded-full border border-white/10 text-white/40"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="text-6xl font-black text-white/[0.06]">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              {/* content */}
              <div>
                <p className="font-mono text-[10px] tracking-widest uppercase mb-3 text-white/30">
                  {experience.subtitle}
                </p>
                <h3 className="text-4xl lg:text-5xl font-black uppercase text-white mb-4 leading-tight tracking-tight">
                  {experience.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed mb-8 max-w-sm">
                  {experience.description}
                </p>
              </div>

              {/* top glow line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
