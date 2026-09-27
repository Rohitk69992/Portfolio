import React from "react";
import { TIMELINE_ITEMS } from "@/data/timeline";
import { History, ExternalLink, GraduationCap, Trophy, Code, Award } from "lucide-react";

export function TimelineSection() {
  const getIcon = (type: string) => {
    switch (type) {
      case "education":
        return GraduationCap;
      case "hackathon":
        return Trophy;
      case "certification":
        return Award;
      default:
        return Code;
    }
  };

  return (
    <section id="experience" className="py-20 md:py-28 border-b border-[#181d28] bg-[#08090c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#1b212e] gap-4">
          <div>
            <div className="flex items-center space-x-2 font-mono text-xs text-accent-cyan uppercase tracking-wider mb-2">
              <History className="w-3.5 h-3.5" />
              <span>Section 06 &middot; Milestones</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Education & Engineering Milestones
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              Chronological history of academic coursework, national hackathons, technical research, and system deployments.
            </p>
          </div>

          <div className="text-xs font-mono text-slate-400">
            <span>2023 &mdash; 2027 (Expected)</span>
          </div>
        </div>

        {/* Timeline Stream */}
        <div className="relative border-l border-[#1f2738] ml-4 md:ml-6 space-y-10 pl-6 md:pl-8">
          {TIMELINE_ITEMS.map((item) => {
            const Icon = getIcon(item.type);

            return (
              <div key={item.id} className="relative group">
                {/* Timeline node icon */}
                <div className="absolute -left-[37px] md:-left-[45px] top-1.5 w-8 h-8 rounded-full bg-[#0d1017] border border-[#232b3e] group-hover:border-cyan-500/70 flex items-center justify-center text-slate-400 group-hover:text-accent-cyan transition-colors">
                  <Icon className="w-4 h-4" />
                </div>

                {/* Content Box */}
                <div className="rounded-xl border border-[#1b2231] bg-[#0c0f16] p-5 hover:border-[#2d374d] transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                    <span className="font-mono text-xs text-accent-cyan font-semibold">
                      {item.period}
                    </span>
                    <span className="font-mono text-[11px] text-slate-500 uppercase tracking-wider">
                      {item.organization}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white tracking-tight mb-1">
                    {item.title}
                  </h3>

                  <div className="text-xs font-medium text-slate-300 mb-3">
                    {item.subtitle}
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#121622] border border-[#1f2738] text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Evidence Link if applicable */}
                  {item.evidenceLink && (
                    <div className="pt-3 border-t border-[#161d2a]">
                      <a
                        href={item.evidenceLink.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-mono"
                      >
                        <span>{item.evidenceLink.text}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
