import React from "react";
import { SKILL_GROUPS } from "@/data/skills";
import { Code2 } from "lucide-react";

export function SkillsSection() {
  return (
    <section id="skills" className="py-20 md:py-28 border-b border-[#181d28] bg-[#090b0f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#1b212e] gap-4">
          <div>
            <div className="flex items-center space-x-2 font-mono text-xs text-accent-cyan uppercase tracking-wider mb-2">
              <Code2 className="w-3.5 h-3.5" />
              <span>Section 03 &middot; Technical Stack</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Skills & Engineering Competencies
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              Technologies and algorithmic concepts actively applied across projects. Zero arbitrary percentage meters—only
              concrete implementation context.
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>Applied & Documented in Repositories</span>
          </div>
        </div>

        {/* Skill Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_GROUPS.map((group) => (
            <div
              key={group.category}
              className="rounded-xl border border-[#1c2230] bg-[#0c0f16] p-5 flex flex-col justify-between hover:border-[#2f394e] transition-colors"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#181f2c] mb-3">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
                    {group.category}
                  </h3>
                  <span className="font-mono text-[10px] text-slate-500">
                    {group.skills.length} tools
                  </span>
                </div>

                <p className="text-[11px] text-slate-400 mb-4 leading-relaxed">
                  {group.description}
                </p>

                {/* Skill List with Context */}
                <div className="space-y-2.5">
                  {group.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="p-2.5 rounded-lg bg-[#111520] border border-[#1d2433] hover:border-[#2b354b] transition-colors"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-white flex items-center space-x-1.5">
                          {skill.highlight && (
                            <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan" />
                          )}
                          <span>{skill.name}</span>
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-normal">
                        {skill.context}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className="mt-4 pt-3 border-t border-[#161d2a] flex items-center justify-between text-[10px] font-mono text-slate-500">
                <span>Verified in code</span>
                <span className="text-accent-cyan">Active</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
