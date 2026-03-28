"use client";

import { useEffect, useRef, forwardRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Projects data ───────────────────────────────────────────────────────────
const PROJECTS = [
  {
    id: 1,
    period: "2024",
    title: "Automated File Organizer",
    subtitle: "Python Scripting",
    description:
      "Developed a Python script that automatically organizes system files by type and directory structure. Designed for continuous personal use, improving file management efficiency and reducing manual organization overhead.",
    tags: ["Python", "Automation", "System"],
  },
  {
    id: 2,
    period: "2024",
    title: "Inventory Tracking System",
    subtitle: "Full Stack",
    description:
      "Built a basic inventory management solution for a grocery store, replacing manual record keeping. Structured data using spreadsheets and introduced a minimal UI for improved usability and daily operations.",
    tags: ["Data Management", "UI", "Backend"],
  },
  {
    id: 3,
    period: "2023",
    title: "Homestay Booking Website",
    subtitle: "Web Development",
    description:
      "Assisted in setting up a functional booking website for a small homestay. Contributed to UI fixes and minor backend adjustments to ensure smooth functionality in an unstructured development environment.",
    tags: ["Web Design", "Backend", "UI Fix"],
  },
  {
    id: 4,
    period: "2023",
    title: "Network Security Group Project",
    subtitle: "Team Collaboration",
    description:
      "Participated in a team project focused on network security fundamentals. Contributed to implementation and debugging of core components. Gained exposure to collaborative development and security best practices.",
    tags: ["Security", "Debugging", "Team"],
  },
];

// ─── Main Component ────────────────────────────────────────────────────────────
const Projects = forwardRef<HTMLVideoElement>(function Projects(_, videoRef) {
  const blockRef    = useRef<HTMLDivElement>(null);
  const wrapRef     = useRef<HTMLDivElement>(null);
  const entryRefs   = useRef<(HTMLDivElement | null)[]>([]);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const block   = blockRef.current;
    const wrap    = wrapRef.current;
    const entries = entryRefs.current.filter(Boolean) as HTMLDivElement[];

    if (!block || !wrap || entries.length === 0) return;

    // ── Wrapper entrance parallax ────────────────────────────────────
    gsap.from(wrap, {
      yPercent: -8,
      ease: "none",
      scrollTrigger: {
        trigger: block,
        start: "top bottom",
        end: "top top",
        scrub: true,
      },
    });

    // ── Master scroll timeline ─────────────────────────────────────────
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: block,
        start: "top 15%",
        end: "bottom bottom",
        scrub: 1.5,
        onUpdate: (self) => {
          if (progressRef.current) {
            progressRef.current.style.transform = `scaleX(${self.progress})`;
          }
        },
      },
    });

    entries.forEach((entry, i) => {
      gsap.set(entry, { y: "100vh", opacity: 0 });

      tl.to(
        entry,
        { y: "0vh", opacity: 1, ease: "power2.out", duration: 0.55 },
        `e${i}-in`
      );

      if (i < entries.length - 1) {
        tl.to(
          entry,
          { y: "-100vh", opacity: 0, ease: "power2.in", duration: 0.45 },
          `e${i}-out`
        );
      }
    });

    return () => { ScrollTrigger.getAll().forEach((t) => t.kill()); };
  }, []);

  return (
    <div
      id="projects"
      ref={blockRef}
      style={{ height: `${PROJECTS.length * 120}vh` }}
      className="relative"
    >
      {/* sticky 100vh wrapper */}
      <div
        ref={wrapRef}
        className="sticky top-0 h-screen w-full overflow-hidden flex"
      >
        {/* ── PROGRESS BAR ── */}
        <div className="absolute top-0 left-0 right-0 h-px bg-white/[0.06] z-20 overflow-hidden">
          <div
            ref={progressRef}
            className="h-full bg-white/30 origin-left"
            style={{ transform: "scaleX(0)" }}
          />
        </div>

        {/* ── LEFT: section label ── */}
        <div className="relative w-1/2 h-full overflow-hidden flex-shrink-0 flex flex-col justify-center items-start px-12 lg:px-20 border-r border-white/[0.06]">
          <p className="text-[9px] tracking-[0.45em] uppercase text-white/25 font-medium mb-6">
            Portfolio
          </p>
          <h2 className="text-4xl md:text-5xl font-black uppercase text-white leading-tight mb-4">
            My<br />Projects
          </h2>
          <p className="text-sm text-white/30 max-w-xs">
            {String(PROJECTS.length).padStart(2, "0")} projects showcasing practical problem-solving and technical growth.
          </p>
        </div>

        {/* ── RIGHT: scrolling project stage ── */}
        <div className="relative flex-1 h-full overflow-hidden bg-black flex items-center justify-center">
          {/* faint vertical center line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-white/[0.04]" />

          {PROJECTS.map((proj, i) => (
            <div
              key={proj.id}
              ref={(el) => { entryRefs.current[i] = el; }}
              className="absolute w-full px-10 md:px-14 lg:px-16 will-change-transform"
            >
              {/* index */}
              <p className="text-[9px] tracking-[0.4em] uppercase text-white/20 font-mono mb-6">
                {String(i + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}
              </p>

              {/* period */}
              <p className="text-[10px] tracking-[0.35em] uppercase text-white/30 font-medium mb-3">
                {proj.period}
              </p>

              {/* title */}
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase text-white leading-tight mb-2 tracking-tight">
                {proj.title}
              </h3>

              {/* subtitle */}
              <p className="text-sm text-white/30 uppercase tracking-[0.25em] font-medium mb-8 border-l border-white/10 pl-4">
                {proj.subtitle}
              </p>

              {/* description */}
              <p className="text-white/50 text-sm md:text-base leading-relaxed max-w-md mb-8">
                {proj.description}
              </p>

              {/* tags */}
              <div className="flex flex-wrap gap-2">
                {proj.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-[9px] font-medium uppercase tracking-wider
                               border border-white/[0.08] text-white/30 bg-white/[0.02]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* bottom line */}
              <div className="mt-12 w-12 h-px bg-white/10" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

Projects.displayName = "Projects";
export default Projects;
