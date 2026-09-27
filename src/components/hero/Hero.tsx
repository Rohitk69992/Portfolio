"use client";

import React from "react";
import Link from "next/link";
import { PROFILE } from "@/data/profile";
import { ComputationalGraph } from "./ComputationalGraph";
import { ArrowRight, Github, FileText, ArrowUpRight } from "lucide-react";

export function Hero() {
  return (
    <section
      id="home"
      className="relative pt-32 pb-20 md:pt-44 md:pb-32 border-b border-[#141822] bg-[#07080b] tech-grid-pattern overflow-hidden"
    >
      {/* Soft atmospheric radial illumination behind the hero */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[500px] bg-cyan-500/[0.035] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-0 left-1/3 w-[500px] h-[400px] bg-slate-500/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: Editorial Typography & Identity (approx 55%) */}
          <div className="lg:col-span-7 space-y-7">
            
            {/* 1. Minimal Inline Education Metadata */}
            <div className="inline-flex items-center space-x-2.5 text-[11px] sm:text-xs font-mono text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>ISBM College of Engineering</span>
              <span className="text-slate-600">&middot;</span>
              <span className="text-slate-300">B.E. 2027</span>
              <span className="text-slate-600">&middot;</span>
              <span className="text-slate-400">CGPA 8.67</span>
            </div>

            {/* 2. Refined Category Label */}
            <div className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.22em] text-cyan-400/90 font-medium">
              AI / MACHINE LEARNING / DATA SCIENCE
            </div>

            {/* 3. ROHIT — Commanding Visual Anchor (approx 80-110px on desktop) */}
            <div>
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[5.5rem] xl:text-[6.5rem] font-extrabold tracking-tight text-white leading-none">
                Rohit
              </h1>
            </div>

            {/* 4. Large Positioning Statement with Typographic Hierarchy */}
            <div className="space-y-1.5 max-w-2xl pt-1">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-slate-100 tracking-tight leading-snug">
                I build machine learning &amp; AI systems
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-slate-400 font-normal leading-relaxed">
                that turn data, algorithms, and engineering into usable software.
              </p>
            </div>

            {/* 5. Concise Supporting Statement */}
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl leading-relaxed">
              I work across machine learning, computer vision, NLP, and optimization &mdash; building projects from experimentation through APIs and deployable software.
            </p>

            {/* 6. CTA Hierarchy: Primary Dominates + Secondary + Subtle Contact */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-3">
              {/* Primary CTA (Dominates clearly) */}
              <a
                href="#projects"
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-md text-xs font-semibold text-slate-950 bg-accent-cyan hover:bg-cyan-300 transition-all font-mono shadow-sm shadow-cyan-950"
              >
                <span>View Selected Work</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              {/* Secondary CTAs */}
              <div className="flex items-center space-x-4">
                <a
                  href={PROFILE.github.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 text-xs font-mono text-slate-300 hover:text-white transition-colors"
                >
                  <Github className="w-3.5 h-3.5 text-slate-400" />
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500" />
                </a>

                <Link
                  href="/resume"
                  className="inline-flex items-center space-x-1.5 text-xs font-mono text-slate-300 hover:text-white transition-colors"
                >
                  <FileText className="w-3.5 h-3.5 text-slate-400" />
                  <span>Resume</span>
                </Link>

                <a
                  href="#contact"
                  className="text-xs font-mono text-slate-500 hover:text-slate-300 transition-colors pl-1"
                >
                  Contact
                </a>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Free-Floating Organic Computational Graph (approx 45%) */}
          <div className="lg:col-span-5 w-full flex items-center justify-center lg:justify-end">
            <div className="w-full max-w-[560px] lg:scale-105 xl:scale-110 lg:translate-x-4 transition-transform">
              <ComputationalGraph />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
