import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { PROJECTS } from "@/data/projects";
import { ArchitectureDiagram } from "@/components/case-study/ArchitectureDiagram";
import {
  ArrowLeft,
  ArrowRight,
  Github,
  ExternalLink,
  Layers,
  Code2,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  FileText,
  Clock,
  ChevronRight,
} from "lucide-react";

interface PageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const project = PROJECTS.find((p) => p.slug === params.slug);
  if (!project) {
    return {
      title: "Project Not Found | Rohit Portfolio",
    };
  }
  return {
    title: `${project.name} | Case Study | Rohit`,
    description: project.shortDescription,
  };
}

export default function ProjectCaseStudyPage({ params }: PageProps) {
  const projectIndex = PROJECTS.findIndex((p) => p.slug === params.slug);
  if (projectIndex === -1) {
    notFound();
  }

  const project = PROJECTS[projectIndex];
  const caseStudy = project.caseStudy;
  const nextProject = PROJECTS[(projectIndex + 1) % PROJECTS.length];

  return (
    <article className="min-h-screen pt-28 pb-24 tech-grid-pattern">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center space-x-2 text-xs font-mono text-slate-400 mb-8">
          <Link href="/" className="hover:text-cyan-400 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <Link href="/#projects" className="hover:text-cyan-400 transition-colors">
            Projects
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <span className="text-slate-200 truncate">{project.name}</span>
        </div>

        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/#projects"
            className="inline-flex items-center space-x-1.5 text-xs font-mono text-accent-cyan hover:text-cyan-300 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Selected Work</span>
          </Link>
        </div>

        {/* Header Section */}
        <header className="pb-8 border-b border-[#1c2230] mb-10">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="px-2.5 py-0.5 rounded-full font-mono text-xs font-medium bg-[#141824] border border-[#22293c] text-cyan-400">
              {project.category}
            </span>
            {project.featured && (
              <span className="px-2.5 py-0.5 rounded-full font-mono text-xs uppercase tracking-wider bg-emerald-950/40 border border-emerald-800/50 text-emerald-400 font-semibold">
                Production-Grade System
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4 leading-tight">
            {project.name}
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl mb-6">
            {project.shortDescription}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-semibold text-slate-200 bg-[#141823] hover:bg-[#1d2333] border border-[#262e42] hover:border-[#3d4968] transition-all font-mono"
              >
                <Github className="w-4 h-4 text-slate-300" />
                <span>Inspect Repository Code</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-semibold text-slate-950 bg-accent-cyan hover:bg-cyan-300 transition-all font-mono shadow-sm"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Launch Live Application</span>
              </a>
            )}
          </div>

          {/* Technology Badges */}
          <div className="mt-8 pt-6 border-t border-[#161d2a] flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded text-xs font-mono bg-[#111520] border border-[#1f2738] text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </header>

        {/* Case Study Content Sections */}
        <div className="space-y-12 text-sm text-slate-300 leading-relaxed">
          
          {/* 1. Overview & Problem */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center space-x-2">
              <span className="font-mono text-accent-cyan text-sm">01.</span>
              <span>Overview & Problem Statement</span>
            </h2>
            <p className="text-slate-300 leading-relaxed">
              {caseStudy.overview}
            </p>
            <div className="p-4 rounded-xl border border-[#202737] bg-[#0d1017] border-l-4 border-l-cyan-500">
              <div className="font-mono text-xs text-slate-200 font-semibold mb-1">
                Core Problem
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {caseStudy.problemStatement}
              </p>
            </div>
            <p className="text-slate-300 leading-relaxed">
              {caseStudy.motivation}
            </p>
          </section>

          {/* 2. System Requirements */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center space-x-2">
              <span className="font-mono text-accent-cyan text-sm">02.</span>
              <span>System Invariants & Requirements</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {caseStudy.requirements.map((req, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-lg border border-[#1a2130] bg-[#0c0f16] flex items-start space-x-2.5"
                >
                  <CheckCircle2 className="w-4 h-4 text-accent-cyan shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-300 leading-normal">{req}</span>
                </div>
              ))}
            </div>
          </section>

          {/* 3. System Architecture & Diagram */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center space-x-2">
              <span className="font-mono text-accent-cyan text-sm">03.</span>
              <span>End-to-End System Architecture</span>
            </h2>
            <ArchitectureDiagram
              title={caseStudy.systemArchitecture.title}
              description={caseStudy.systemArchitecture.description}
              steps={caseStudy.systemArchitecture.flowSteps}
            />
          </section>

          {/* 4. Mathematical Formulations (if present) */}
          {caseStudy.mathematicalFormulations && (
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-white tracking-tight flex items-center space-x-2">
                <span className="font-mono text-accent-cyan text-sm">04.</span>
                <span>Mathematical Formulations</span>
              </h2>
              <div className="space-y-4">
                {caseStudy.mathematicalFormulations.map((form, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-xl border border-[#1e2535] bg-[#0d1017] space-y-2"
                  >
                    <h3 className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider">
                      {form.title}
                    </h3>
                    {form.formula && (
                      <div className="p-3 rounded bg-[#090b0f] border border-[#181f2c] font-mono text-xs text-cyan-300 overflow-x-auto">
                        {form.formula}
                      </div>
                    )}
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {form.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 5. Algorithm Roles & Taxonomy */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center space-x-2">
              <span className="font-mono text-accent-cyan text-sm">05.</span>
              <span>Optimization & Algorithmic Roles</span>
            </h2>
            <div className="space-y-3">
              {caseStudy.algorithmsUsed.map((algo, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl border border-[#1b2230] bg-[#0c0f16] flex flex-col sm:flex-row sm:items-start justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-white">{algo.name}</span>
                      <span className="font-mono text-[10px] text-cyan-400 px-1.5 py-0.5 rounded bg-cyan-950/50 border border-cyan-800/50">
                        {algo.role}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {algo.rationale}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 6. Data Pipeline */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center space-x-2">
              <span className="font-mono text-accent-cyan text-sm">06.</span>
              <span>Data Pipeline & Ingestion</span>
            </h2>
            <div className="p-5 rounded-xl border border-[#1c2332] bg-[#0c0f16] space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pb-3 border-b border-[#181e2b]">
                <div>
                  <span className="font-mono text-[11px] text-slate-500 block">Dataset Name:</span>
                  <span className="font-semibold text-slate-200">{caseStudy.dataPipeline.datasetName}</span>
                </div>
                <div>
                  <span className="font-mono text-[11px] text-slate-500 block">Source:</span>
                  <span className="font-semibold text-slate-200">{caseStudy.dataPipeline.source}</span>
                </div>
              </div>

              <div className="space-y-1.5 pt-1">
                <span className="font-mono text-[11px] text-slate-400 font-semibold uppercase tracking-wider block">
                  Processing Pipeline:
                </span>
                {caseStudy.dataPipeline.processingSteps.map((step, idx) => (
                  <div key={idx} className="flex items-start space-x-2 text-xs text-slate-400">
                    <span className="text-accent-cyan mt-0.5">&bull;</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 7. Empirical Results & Provenance */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center space-x-2">
              <span className="font-mono text-accent-cyan text-sm">07.</span>
              <span>Empirical Results & Verified Metrics</span>
            </h2>
            
            {caseStudy.evaluation.metricsRecorded && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                {caseStudy.evaluation.metricsRecorded.map((m, i) => (
                  <div key={i} className="p-3.5 rounded-lg border border-[#1e2535] bg-[#0e121a]">
                    <div className="text-[10px] font-mono text-slate-500 uppercase">{m.label}</div>
                    <div className="text-sm font-bold text-white font-mono my-0.5">{m.value}</div>
                    <div className="text-[10px] text-slate-400">{m.note}</div>
                  </div>
                ))}
              </div>
            )}

            <div className="p-4 rounded-xl border border-[#1b2230] bg-[#0c0f16] space-y-2">
              <div className="font-mono text-xs text-slate-300 font-semibold">Observations</div>
              {caseStudy.evaluation.observations.map((obs, i) => (
                <div key={i} className="flex items-start space-x-2 text-xs text-slate-400">
                  <span className="text-emerald-400 mt-0.5">&bull;</span>
                  <span>{obs}</span>
                </div>
              ))}
            </div>
          </section>

          {/* 8. Challenges & Engineering Tradeoffs */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center space-x-2">
              <span className="font-mono text-accent-cyan text-sm">08.</span>
              <span>Challenges & Technical Tradeoffs</span>
            </h2>
            <div className="space-y-3">
              {caseStudy.challengesEncountered.map((ch, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl border border-amber-900/30 bg-[#111015] flex items-start space-x-3 text-xs text-slate-300"
                >
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{ch}</span>
                </div>
              ))}
            </div>
          </section>

          {/* 9. Lessons Learned & Future Work */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center space-x-2">
              <span className="font-mono text-accent-cyan text-sm">09.</span>
              <span>Lessons Learned & Future Directions</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl border border-[#1e2535] bg-[#0c0f16] space-y-2">
                <div className="flex items-center space-x-2 font-mono text-xs text-slate-200 font-semibold">
                  <Lightbulb className="w-4 h-4 text-amber-400" />
                  <span>Key Engineering Takeaways</span>
                </div>
                {caseStudy.lessonsLearned.map((l, i) => (
                  <p key={i} className="text-xs text-slate-400 leading-relaxed">
                    {l}
                  </p>
                ))}
              </div>

              <div className="p-5 rounded-xl border border-[#1e2535] bg-[#0c0f16] space-y-2">
                <div className="flex items-center space-x-2 font-mono text-xs text-slate-200 font-semibold">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  <span>Future Roadmap</span>
                </div>
                {caseStudy.futureImprovements.map((f, i) => (
                  <p key={i} className="text-xs text-slate-400 leading-relaxed">
                    {f}
                  </p>
                ))}
              </div>
            </div>
          </section>

        </div>

        {/* Footer Navigation to Next Case Study */}
        <div className="mt-16 pt-8 border-t border-[#1c2230] flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/#projects"
            className="inline-flex items-center space-x-2 text-xs font-mono text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Portfolio Home</span>
          </Link>

          <Link
            href={`/projects/${nextProject.slug}`}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-semibold text-accent-cyan bg-[#131722] hover:bg-[#1a2030] border border-[#232b3e] transition-colors font-mono"
          >
            <span>Next Case Study: {nextProject.name}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </article>
  );
}
