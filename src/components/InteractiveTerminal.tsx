"use client";

import React, { useState, useEffect, useRef } from "react";
import { Terminal, X, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CommandOutput {
  text: string;
  type: "input" | "system" | "error" | "success" | "ascii";
}

export default function InteractiveTerminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<CommandOutput[]>([
    { text: "Roshan Immanuel's Retro Shell [v1.0.4]", type: "system" },
    { text: "Type 'help' to see available commands.", type: "system" },
  ]);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const historyEndRef = useRef<HTMLDivElement>(null);

  // Focus input on click
  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Autoscroll terminal
  useEffect(() => {
    if (historyEndRef.current) {
      historyEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [history]);

  // Focus terminal when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(focusInput, 100);
    }
  }, [isOpen]);

  // Global shortcut (tilde key `~`)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "`" || e.key === "~") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleCommand = (cmd: string) => {
    const cleanCmd = cmd.trim().toLowerCase();
    if (!cleanCmd) return;

    const newHistory = [...history, { text: `> ${cmd}`, type: "input" as const }];

    switch (cleanCmd) {
      case "help":
        newHistory.push(
          { text: "Available commands:", type: "system" },
          { text: "  about    - Brief professional background", type: "system" },
          { text: "  skills   - List technical skills", type: "system" },
          { text: "  projects - List key portfolio projects", type: "system" },
          { text: "  contact  - Get contact details", type: "system" },
          { text: "  matrix   - Toggle retro green matrix rain overlay", type: "system" },
          { text: "  clear    - Clear terminal screen history", type: "system" }
        );
        break;
      case "about":
        newHistory.push({
          text: "Roshan Immanuel is an Information Technology professional specializing in Python, Full Stack Web Development, and system optimization. Known for being an independent problem solver who thrives under unstructured and highly challenging environments.",
          type: "success",
        });
        break;
      case "skills":
        newHistory.push(
          { text: "Python          [====================] 85%", type: "success" },
          { text: "JavaScript      [==================  ] 75%", type: "success" },
          { text: "TypeScript      [==============      ] 60%", type: "success" },
          { text: "React/Next.js   [=================   ] 70%", type: "success" },
          { text: "SQL             [===============     ] 65%", type: "success" }
        );
        break;
      case "projects":
        newHistory.push(
          { text: "1. Automated File Organizer (Python automation script)", type: "success" },
          { text: "2. Inventory Tracking System (Next.js full stack app)", type: "success" },
          { text: "3. Homestay Booking Platform (Web dev product)", type: "success" }
        );
        break;
      case "contact":
        newHistory.push(
          { text: "Email: roshanimmanuel.work@gmail.com", type: "success" },
          { text: "Loc: Mangalore, India", type: "success" }
        );
        break;
      case "clear":
        setHistory([]);
        setInput("");
        return;
      case "matrix":
        const canvas = document.getElementById("matrix-rain-canvas");
        if (canvas) {
          if (canvas.style.display === "none" || !canvas.style.display) {
            canvas.style.display = "block";
            newHistory.push({ text: "Matrix Digital Rain: ENABLED", type: "success" });
          } else {
            canvas.style.display = "none";
            newHistory.push({ text: "Matrix Digital Rain: DISABLED", type: "system" });
          }
        } else {
          newHistory.push({ text: "Error: Matrix module not initialized.", type: "error" });
        }
        break;
      default:
        newHistory.push({ text: `Unknown command: '${cmd}'. Type 'help' for command list.`, type: "error" });
    }

    setHistory(newHistory);
    setInput("");
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-900 transition-all duration-300 shadow-[0_0_15px_rgba(6,182,212,0.15)] flex items-center justify-center cursor-none group"
      >
        <Terminal className="w-5 h-5 group-hover:scale-110 transition-transform" />
      </button>

      {/* Terminal Drawer overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 50 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={focusInput}
            className="fixed bottom-24 right-6 z-50 w-full max-w-lg h-[400px] bg-black/90 backdrop-blur-xl border border-cyan-500/20 rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col font-mono text-sm text-cyan-400 cursor-none"
          >
            {/* Header bar */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-cyan-500/10 bg-cyan-950/20">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span className="text-xs uppercase tracking-widest text-cyan-400/80 font-black">roshan_immanuel@shell</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
                className="p-1 hover:bg-cyan-500/10 rounded text-cyan-400/50 hover:text-cyan-400 transition-colors cursor-none"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Terminal output stream */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-1.5 scrollbar-thin font-mono">
              {history.map((line, idx) => (
                <div
                  key={idx}
                  className={
                    line.type === "error"
                      ? "text-red-400"
                      : line.type === "success"
                      ? "text-cyan-200"
                      : line.type === "input"
                      ? "text-white"
                      : "text-cyan-400/70"
                  }
                >
                  {line.text}
                </div>
              ))}
              <div ref={historyEndRef} />
            </div>

            {/* Input prompt */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCommand(input);
              }}
              className="flex items-center gap-1 px-4 py-2 border-t border-cyan-500/10 bg-black/60 font-mono"
            >
              <ChevronRight className="w-4 h-4 text-cyan-400" />
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type 'help'..."
                className="flex-1 bg-transparent outline-none border-none text-white caret-cyan-400 font-mono text-sm placeholder-cyan-500/30"
              />
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
