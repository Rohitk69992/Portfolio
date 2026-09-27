import React from "react";
import Link from "next/link";
import { Project } from "@/lib/types";
import { Github, ExternalLink, ArrowRight, GitBranch } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
}

export function ProjectCard({ project, priority = false }: ProjectCardProps) {
  return (
    <div
      className={`group relative flex flex-col justify-between rounded-lg border bg-[#0a0c12] transition-all duration-200 hover:-translate-y-0.5 ${
        priority
          ? "border-[#222b3e] hover:border-cyan-500/50 shadow-lg shadow-cyan-950/10"
          : "border-[#161a25] hover:border-[#252e42]"
      } p-6`}
    >
      {/* Subtle top indicator for primary/featured systems */}
      {priority && (
        <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
      )}

      <div>
        {/* Top Metadata Row */}
        <div className="flex items-center justify-between gap-2 mb-3.5">
          <span className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded font-mono text-[10px] uppercase tracking-wider bg-[#10141e] border border-[#1d2332] text-slate-300">
            <GitBranch className="w-2.5 h-2.5 text-accent-cyan" />
            <span>{project.category}</span>
          </span>

          {project.featured && (
            <span className="font-mono text-[10px] uppercase tracking-widest text-cyan-400/90 font-medium">
              Featured System
            </span>
          )}
        </div>

        {/* Project Name */}
        <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-accent-cyan transition-colors mb-2">
          <Link href={`/projects/${project.slug}`}>{project.name}</Link>
        </h3>

        {/* Short Description */}
        <p className="text-xs text-slate-300 mb-3 leading-relaxed">
          {project.shortDescription}
        </p>

        {/* Technical Problem Callout */}
        <div className="text-[11px] text-slate-400 bg-[#0f121a] border-l-2 border-cyan-500/50 p-2.5 rounded-r mb-5 leading-normal">
          <span className="font-semibold text-slate-200 font-mono text-[10px] uppercase tracking-wide mr-1">
            Problem:
          </span>
          {project.problemSummary}
        </div>

        {/* Technology Chips */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.technologies.slice(0, 6).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#11141e] border border-[#1b2230] text-slate-300"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 6 && (
            <span className="px-1.5 py-0.5 rounded text-[10px] font-mono text-slate-500">
              +{project.technologies.length - 6}
            </span>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-4 border-t border-[#141822] flex items-center justify-between gap-2">
        <div className="flex items-center space-x-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded text-xs font-mono font-medium text-slate-300 bg-[#11141e] hover:bg-[#181d2a] border border-[#1f2636] transition-colors"
              aria-label={`GitHub repository for ${project.name}`}
            >
              <Github className="w-3.5 h-3.5" />
              <span>Code</span>
            </a>
          )}

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded text-xs font-mono font-medium text-emerald-400 bg-emerald-950/20 hover:bg-emerald-950/50 border border-emerald-800/40 transition-colors"
              aria-label={`Live application demo for ${project.name}`}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live</span>
            </a>
          )}
        </div>

        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center space-x-1 text-xs font-mono font-semibold text-accent-cyan hover:text-cyan-300 transition-colors"
        >
          <span>Case Study</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}
