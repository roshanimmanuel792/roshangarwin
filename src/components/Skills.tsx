"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// ─── Data ─────────────────────────────────────────────────────────────────────

const SKILL_CATEGORIES = [
  {
    label: "Languages & Scripting",
    skills: [
      { name: "Python",       level: 72 },
      { name: "JavaScript",   level: 65 },
      { name: "TypeScript",   level: 60 },
      { name: "SQL",          level: 58 },
    ],
  },
  {
    label: "Web Development",
    skills: [
      { name: "HTML/CSS",     level: 78 },
      { name: "React",        level: 68 },
      { name: "Next.js",      level: 62 },
      { name: "Tailwind CSS", level: 75 },
    ],
  },
  {
    label: "Tools & Concepts",
    skills: [
      { name: "Git/GitHub",    level: 80 },
      { name: "Debugging",     level: 85 },
      { name: "Version Control", level: 78 },
      { name: "REST APIs",     level: 65 },
    ],
  },
];

const TECH_BADGES = [
  "Python", "JavaScript", "HTML/CSS", "React", "Next.js", "Git", "GitHub",
  "Tailwind CSS", "Debugging", "APIs", "Figma", "Photoshop",
];

// ─── Animated skill bar ───────────────────────────────────────────────────────
function SkillBar({
  name,
  level,
  index,
  inView,
}: {
  name: string;
  level: number;
  index: number;
  inView: boolean;
}) {
  return (
    <div className="mb-5">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-medium uppercase tracking-widest text-white/60">
          {name}
        </span>
        <motion.span
          className="text-[10px] font-mono text-white/30"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.4 + index * 0.1 }}
        >
          {level}%
        </motion.span>
      </div>

      {/* track */}
      <div className="relative h-px w-full bg-white/10">
        {/* fill */}
        <motion.div
          className="absolute top-0 left-0 h-full bg-white/40"
          initial={{ width: "0%" }}
          animate={inView ? { width: `${level}%` } : { width: "0%" }}
          transition={{ duration: 1.2, delay: 0.3 + index * 0.08, ease: "easeOut" }}
        />
        {/* tip dot */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white"
          initial={{ left: "0%" }}
          animate={inView ? { left: `calc(${level}% - 3px)` } : { left: "0%" }}
          transition={{ duration: 1.2, delay: 0.3 + index * 0.08, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView     = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-28 px-6 md:px-16 lg:px-24 overflow-hidden bg-black"
    >
      {/* watermark */}
      <div
        aria-hidden
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
      >
        <span className="text-[22vw] font-black uppercase tracking-tighter text-white/[0.015] whitespace-nowrap leading-none">
          SKILLS
        </span>
      </div>

      {/* header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="relative z-10 mb-16"
      >
        <p className="text-[9px] tracking-[0.4em] uppercase text-white/25 font-medium mb-3">
          Technical Arsenal
        </p>
        <h2 className="text-5xl md:text-7xl font-black uppercase leading-tight text-white">
          My Skills
        </h2>
        <p className="text-white/30 mt-4 max-w-md text-sm leading-relaxed">
          Hands-on expertise across programming, web development, and systems troubleshooting.
        </p>
      </motion.div>

      {/* skill columns */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {SKILL_CATEGORIES.map((cat, catIdx) => (
          <motion.div
            key={cat.label}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: catIdx * 0.12 }}
            className="relative rounded-xl p-6 border border-white/[0.06] bg-white/[0.02]"
          >
            {/* category label */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-white/30 flex-shrink-0" />
              <span className="text-[9px] tracking-[0.35em] uppercase font-medium text-white/35">
                {cat.label}
              </span>
            </div>

            {cat.skills.map((skill, skillIdx) => (
              <SkillBar
                key={skill.name}
                name={skill.name}
                level={skill.level}
                index={skillIdx}
                inView={inView}
              />
            ))}

            {/* top line */}
            <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </motion.div>
        ))}
      </div>

      {/* tech badge cloud */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.45 }}
        className="relative z-10"
      >
        <p className="text-[9px] tracking-[0.4em] uppercase text-white/20 font-medium mb-6 text-center">
          Full Stack
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {TECH_BADGES.map((name, i) => (
            <motion.span
              key={name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.35, delay: 0.55 + i * 0.04, ease: "backOut" }}
              whileHover={{ scale: 1.08, y: -2 }}
              className="px-4 py-2 rounded-full text-[10px] font-medium uppercase tracking-wider
                         border border-white/[0.09] text-white/40 bg-white/[0.03] cursor-default select-none
                         hover:border-white/20 hover:text-white/70 transition-colors duration-200"
            >
              {name}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
