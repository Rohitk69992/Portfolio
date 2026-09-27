"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { PROJECTS } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { Layers, ArrowRight, Filter } from "lucide-react";

const CATEGORIES = [
  "All",
  "Optimization",
  "NLP",
  "Data Analytics",
  "Machine Learning",
  "Computer Vision",
] as const;

type CategoryFilter = (typeof CATEGORIES)[number];

export function SelectedWorkSection() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("All");

  const filteredProjects = useMemo(() => {
    if (selectedCategory === "All") {
      return PROJECTS;
    }
    return PROJECTS.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section id="projects" className="py-20 md:py-28 border-b border-[#181d28] bg-[#090b0f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-[#1b212e] gap-4">
          <div>
            <div className="flex items-center space-x-2 font-mono text-xs text-accent-cyan uppercase tracking-wider mb-2">
              <Layers className="w-3.5 h-3.5" />
              <span>Section 01 &middot; Architecture & Systems</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Selected Technical Work
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              Systems designed, implemented, and verified from first principles. Each system includes an in-depth
              technical case study covering mathematical formulations, architectures, and empirical evaluation.
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
            <span>Showing {filteredProjects.length} of {PROJECTS.length} Systems</span>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <div className="flex items-center space-x-1.5 text-xs text-slate-500 font-mono mr-2">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter:</span>
          </div>
          {CATEGORIES.map((cat) => {
            const count =
              cat === "All"
                ? PROJECTS.length
                : PROJECTS.filter((p) => p.category === cat).length;

            if (count === 0) return null;

            const isSelected = selectedCategory === cat;

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium font-mono transition-all ${
                  isSelected
                    ? "bg-accent-cyan text-slate-950 font-semibold shadow-sm"
                    : "bg-[#131722] text-slate-400 hover:text-slate-200 border border-[#212838] hover:border-[#333e56]"
                }`}
              >
                {cat} <span className="opacity-70 text-[10px]">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              priority={project.featured}
            />
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 p-6 rounded-xl border border-[#1d2332] bg-[#0c0f16] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-semibold text-slate-200">
              Need technical deep-dives into algorithms and architectures?
            </div>
            <p className="text-xs text-slate-400">
              Explore the dedicated case studies with Miller-Tucker-Zemlin formulations, Vidal Split algorithms, and Unsloth LoRA workflows.
            </p>
          </div>
          <Link
            href="/projects/quantum-inspired-vehicle-routing-problem-solution"
            className="inline-flex items-center space-x-2 text-xs font-semibold text-accent-cyan hover:text-cyan-300 font-mono whitespace-nowrap"
          >
            <span>Read Featured Case Study</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </section>
  );
}
