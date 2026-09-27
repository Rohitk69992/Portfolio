import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { PROJECTS } from "@/data/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ArrowLeft, Layers } from "lucide-react";

export const metadata: Metadata = {
  title: "Projects & Systems | Rohit Portfolio",
  description: "Complete catalog of machine learning, combinatorial optimization, and NLP systems built by Rohit.",
};

export default function ProjectsDirectoryPage() {
  return (
    <div className="min-h-screen pt-28 pb-24 tech-grid-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center space-x-1.5 text-xs font-mono text-accent-cyan hover:text-cyan-300 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Portfolio Home</span>
          </Link>
        </div>

        {/* Header */}
        <div className="pb-8 border-b border-[#1c2230] mb-10">
          <div className="flex items-center space-x-2 font-mono text-xs text-accent-cyan uppercase tracking-wider mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>Systems Directory</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2">
            All Technical Systems & Case Studies
          </h1>
          <p className="text-sm text-slate-400 max-w-2xl">
            Detailed architectures, mathematical formulations, and engineering postmortems for all completed systems.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} priority={project.featured} />
          ))}
        </div>

      </div>
    </div>
  );
}
