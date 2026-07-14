"use client";

import dynamic from "next/dynamic";
import ScrollSections from "@/components/ScrollSections";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import InteractiveTerminal from "@/components/InteractiveTerminal";
import MatrixRain from "@/components/MatrixRain";
import ParticleTrail from "@/components/ParticleTrail";

// Dynamically import the 3D scene to prevent SSR issues with Three.js
const Scene = dynamic(() => import("@/components/Scene"), { ssr: false });

export default function Home() {
  return (
    <main className="relative w-full bg-background selection:bg-primary selection:text-white">
      {/* 3D Canvas Background fixed behind the scrollable content */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Scene />
      </div>

      {/* Matrix rain canvas background effect (toggled from CLI shell) */}
      <MatrixRain />

      {/* Mouse particle trail */}
      <ParticleTrail />

      {/* Fixed Navbar */}
      <Navbar />

      {/* Custom cursor (desktop only — CSS targets pointer devices) */}
      <CustomCursor />

      {/* Foreground Scrollable Content */}
      <div className="relative z-10 w-full">
        <ScrollSections />
      </div>

      {/* Retro CLI terminal shell */}
      <InteractiveTerminal />
    </main>
  );
}
