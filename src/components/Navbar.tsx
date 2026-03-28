"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMagnetic } from "@/hooks/useMagnetic";

const NAV_LINKS = [
  { label: "About",      href: "#about"      },
  { label: "Projects",   href: "#projects"   },
  { label: "Skills",     href: "#skills"     },
  { label: "Experience", href: "#experience" },
  { label: "Contact",    href: "#contact"    },
];

export default function Navbar() {
  const [scrolled,      setScrolled]      = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen,      setMenuOpen]      = useState(false);
  const hireMeRef = useMagnetic<HTMLAnchorElement>(12, 75);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = ["about", "projects", "skills", "experience", "contact"];
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.25 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500
        ${scrolled
          ? "bg-black/70 backdrop-blur-xl border-b border-white/[0.05]"
          : "bg-transparent border-b border-transparent"
        }`}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">

        {/* Logo */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          className="relative group"
          aria-label="Back to top"
        >
          <span className="text-xl font-black tracking-tighter text-white">HC.</span>
          <span className="absolute -bottom-0.5 left-0 h-px w-0 group-hover:w-full transition-all duration-300 bg-white/40" />
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ label, href }) => {
            const sectionId = href.replace("#", "");
            const isActive  = activeSection === sectionId;
            return (
              <li key={label}>
                <a
                  href={href}
                  onClick={(e) => handleNav(e, href)}
                  className="relative text-[10px] uppercase tracking-[0.25em] font-medium transition-colors duration-200 group"
                  style={{ color: isActive ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.35)" }}
                >
                  {label}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-px bg-white transition-all duration-300
                      ${isActive ? "w-full opacity-40" : "w-0 opacity-20 group-hover:w-full"}`}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        {/* CTA */}
        <a
          ref={hireMeRef}
          href="#contact"
          onClick={(e) => handleNav(e, "#contact")}
          className="hidden md:inline-flex px-5 py-2 rounded-full text-[10px] uppercase tracking-widest font-medium
                     border border-white/15 text-white/50 hover:border-white/40 hover:text-white
                     transition-all duration-300"
        >
          Let's Talk
        </a>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          className="md:hidden flex flex-col justify-center items-end gap-[5px] w-8 h-8"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="block h-px bg-white/60 rounded-full transition-all duration-300 origin-right"
              style={{
                width: i === 1 ? (menuOpen ? "100%" : "55%") : "100%",
                opacity: menuOpen && i === 1 ? 0 : 1,
                transform:
                  menuOpen && i === 0 ? "rotate(-45deg)" :
                  menuOpen && i === 2 ? "rotate(45deg)"  : "none",
              }}
            />
          ))}
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-white/[0.06] px-6 py-8 flex flex-col gap-6"
          >
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={(e) => handleNav(e, href)}
                className="text-xs uppercase tracking-[0.3em] font-medium text-white/40 hover:text-white transition-colors duration-200"
              >
                {label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => handleNav(e, "#contact")}
              className="self-start px-5 py-2.5 rounded-full text-[10px] uppercase tracking-widest font-medium
                         border border-white/15 text-white/50 hover:border-white/40 hover:text-white
                         transition-all duration-300 mt-2"
            >
              Let's Talk
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
