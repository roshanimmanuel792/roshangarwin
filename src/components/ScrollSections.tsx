"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import SoundToggle from "@/components/SoundToggle";
import { useMagnetic } from "@/hooks/useMagnetic";

gsap.registerPlugin(ScrollTrigger);

// ─── Lenis smooth scroll init ────────────────────────────────────────────────
function useLenis() {
  useEffect(() => {
    let lenis: any;

    import("lenis").then(({ default: Lenis }) => {
      lenis = new Lenis({ lerp: 0.08, wheelMultiplier: 1.3 });
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time: number) => { lenis.raf(time * 1000); });
      gsap.ticker.lagSmoothing(0);
    });

    return () => {
      if (lenis) lenis.destroy();
      gsap.ticker.remove(ScrollTrigger.update);
    };
  }, []);
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ScrollSections() {
  useLenis();

  const videoRef        = useRef<HTMLVideoElement>(null);
  const contactBtnRef   = useMagnetic<HTMLButtonElement>(14, 80);

  return (
    <div className="w-full text-white font-sans tracking-wide">

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="min-h-screen flex flex-col justify-center items-center px-4 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-center"
        >
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-4 leading-none text-white">
            <span className="block">HARISH</span>
            <span className="block text-white/90">COSTA</span>
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-sm md:text-base text-white/30 mt-6 max-w-xl mx-auto tracking-[0.4em] font-light uppercase"
          >
            Full Stack Developer • Problem Solver • System Architect
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="text-xs md:text-sm text-white/25 mt-3 tracking-widest font-light"
          >
            Mangalore, India
          </motion.p>
        </motion.div>

        {/* scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[9px] tracking-[0.4em] uppercase text-white/25 font-medium">
            Scroll
          </span>
          <div className="w-px h-10 bg-gradient-to-b from-white/20 to-transparent" />
        </motion.div>
      </section>

      {/* ── ABOUT ─────────────────────────────────────────────────────────── */}
      <section id="about" className="min-h-screen flex flex-col justify-center items-start px-8 md:px-24 relative">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-4xl"
        >
          {/* eyebrow */}
          <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 font-medium mb-6">
            About Me
          </p>
          <h2 className="text-5xl md:text-8xl font-black uppercase mb-10 text-white leading-tight border-l-[3px] border-white/20 pl-8">
            Who I Am
          </h2>
          <p className="text-xl md:text-2xl leading-relaxed font-light text-white/60 mb-8 max-w-2xl">
            Information Technology graduate with hands-on experience in Python, web development, and system troubleshooting. I thrive in solving technical challenges through self-directed learning and practical problem-solving.
          </p>
          <p className="text-base md:text-lg leading-relaxed text-white/35 italic border-l border-white/10 pl-6 max-w-xl">
            &ldquo;A go-to problem solver with a deep focus on independent, high-productivity work environments. Strong inclination toward debugging, building practical solutions, and improving workflows.&rdquo;
          </p>

          {/* Key stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {[
              { label: "Projects", value: "4+" },
              { label: "Languages", value: "Python, JS" },
              { label: "Experience", value: "1+ Years" },
              { label: "Location", value: "Mangalore" },
            ].map((stat) => (
              <div key={stat.label} className="border-l border-white/10 pl-4">
                <p className="text-[9px] tracking-[0.3em] uppercase text-white/40 font-medium mb-2">
                  {stat.label}
                </p>
                <p className="text-xl md:text-2xl font-black text-white">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── PROJECTS ──────────────────────────────────────────────────────– */}
      <Projects ref={videoRef} />

      {/* ── SKILLS ────────────────────────────────────────────────────────── */}
      <div id="skills">
        <Skills />
      </div>

      {/* ── EXPERIENCE ────────────────────────────────────────────────────– */}
      <Experience />

      {/* ── CONTACT + FOOTER ──────────────────────────────────────────────── */}
      <section
        id="contact"
        className="relative w-full py-28 px-6 md:px-16 lg:px-24 bg-black overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-white/[0.02] via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto">
          {/* header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8 }}
            className="mb-14 text-center"
          >
            <p className="text-[9px] tracking-[0.4em] uppercase text-white/25 font-medium mb-4">
              Get In Touch
            </p>
            <h2 className="text-5xl md:text-8xl font-black uppercase leading-tight text-white">
              Let&apos;s Connect
            </h2>
            <p className="text-white/35 mt-4 max-w-md mx-auto text-sm md:text-base">
              Interested in collaborating or discussing web development opportunities? Feel free to reach out.
            </p>
          </motion.div>

          {/* Decorative Image */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="mb-16 flex justify-center"
          >
            <div className="relative w-full max-w-lg">
              {/* Glow effect behind image */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-cyan-500/30 to-blue-500/20 blur-2xl rounded-2xl -z-10" />
              
              {/* Image container with border */}
              <div className="relative rounded-2xl overflow-hidden border border-white/10 backdrop-blur-sm">
                <img
                  src="/lets-connect-image.webp"
                  alt="Let's Connect"
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                />
                {/* Overlay gradient for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </motion.div>


          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10"
          >
            <div className="relative rounded-xl p-6 border border-white/[0.06] bg-white/[0.02]">
              <p className="text-[9px] uppercase tracking-[0.3em] font-medium text-white/25 mb-3">Email</p>
              <a
                href="mailto:harish.costa@example.com"
                className="text-lg md:text-xl font-medium text-white hover:text-white/70 transition-colors break-all"
              >
                harish.costa@email.com
              </a>
            </div>

            <div className="relative rounded-xl p-6 border border-white/[0.06] bg-white/[0.02]">
              <p className="text-[9px] uppercase tracking-[0.3em] font-medium text-white/25 mb-3">Location</p>
              <p className="text-lg md:text-xl font-medium text-white">
                Mangalore, India
              </p>
            </div>
          </motion.div>

          {/* GitHub + Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-8 py-3 rounded-full text-[10px] uppercase tracking-widest font-medium
                         border border-white/20 text-white/70 hover:text-white hover:border-white/50
                         transition-all duration-300"
            >
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700
                             bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-full" />
              <span className="relative z-10">GitHub</span>
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-8 py-3 rounded-full text-[10px] uppercase tracking-widest font-medium
                         border border-white/20 text-white/70 hover:text-white hover:border-white/50
                         transition-all duration-300"
            >
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700
                             bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-full" />
              <span className="relative z-10">LinkedIn</span>
            </a>
          </motion.div>

          {/* Contact form */}
          <motion.form
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            onSubmit={(e) => {
              e.preventDefault();
              const data = new FormData(e.currentTarget);
              window.location.href = `mailto:harish.costa@email.com?subject=Portfolio%20Contact%20from%20${encodeURIComponent(data.get("name") as string)}&body=${encodeURIComponent(data.get("message") as string)}`;
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="flex flex-col gap-2">
              <label className="text-[9px] uppercase tracking-[0.3em] font-medium text-white/25">Name</label>
              <input
                name="name" required type="text" placeholder="Your Name"
                className="bg-white/[0.03] border border-white/[0.08] rounded-xl px-5 py-4 text-sm text-white placeholder-white/20
                           focus:outline-none focus:border-white/25 transition-all duration-200"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[9px] uppercase tracking-[0.3em] font-medium text-white/25">Email</label>
              <input
                name="email" required type="email" placeholder="your@email.com"
                className="bg-white/[0.03] border border-white/[0.08] rounded-xl px-5 py-4 text-sm text-white placeholder-white/20
                           focus:outline-none focus:border-white/25 transition-all duration-200"
              />
            </div>

            <div className="md:col-span-2 flex flex-col gap-2">
              <label className="text-[9px] uppercase tracking-[0.3em] font-medium text-white/25">Message</label>
              <textarea
                name="message" required rows={5} placeholder="Tell me about your project or opportunity..."
                className="bg-white/[0.03] border border-white/[0.08] rounded-xl px-5 py-4 text-sm text-white placeholder-white/20 resize-none
                           focus:outline-none focus:border-white/25 transition-all duration-200"
              />
            </div>

            <div className="md:col-span-2 flex justify-center mt-2">
              <button
                ref={contactBtnRef}
                type="submit"
                className="group relative px-10 py-4 rounded-full text-[10px] uppercase tracking-widest font-black
                           border border-white/20 text-white overflow-hidden
                           hover:bg-white hover:text-black transition-all duration-300"
              >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700
                               bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                <span className="relative z-10">Send Message</span>
              </button>
            </div>
          </motion.form>

          {/* mini footer */}
          <div className="mt-20 pt-8 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-white/20 uppercase tracking-widest">
            <span>© {new Date().getFullYear()} Harish Costa — All rights reserved.</span>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/50 transition-colors duration-200"
            >
              GitHub Portfolio
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
