import React from "react";
import { PROFILE } from "@/data/profile";
import { User, Award, BookOpen, Terminal, CheckCircle2 } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-28 border-b border-[#181d28] bg-[#08090c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-10 pb-6 border-b border-[#1b212e]">
          <div className="flex items-center space-x-2 font-mono text-xs text-accent-cyan uppercase tracking-wider mb-2">
            <User className="w-3.5 h-3.5" />
            <span>Section 02 &middot; Engineering Identity</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            About & Engineering Philosophy
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Undergraduate background, technical grounding, and approach to designing algorithmic systems.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Narrative */}
          <div className="lg:col-span-7 space-y-5 text-sm text-slate-300 leading-relaxed">
            {PROFILE.about.paragraphs.map((para, i) => (
              <p key={i} className="text-slate-300 text-sm leading-relaxed">
                {para}
              </p>
            ))}

            {/* Academic Fact Box */}
            <div className="mt-8 p-5 rounded-xl border border-[#212839] bg-[#0e121a] space-y-3">
              <div className="flex items-center space-x-2 font-mono text-xs text-slate-200 font-semibold">
                <BookOpen className="w-4 h-4 text-accent-cyan" />
                <span>ACADEMIC FOUNDATION & METRICS</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs pt-1">
                <div>
                  <div className="text-slate-500 font-mono text-[11px]">Degree & Major</div>
                  <div className="text-slate-200 font-medium">B.E. AI & Data Science</div>
                </div>
                <div>
                  <div className="text-slate-500 font-mono text-[11px]">Institution</div>
                  <div className="text-slate-200 font-medium">ISBM College of Engg.</div>
                </div>
                <div>
                  <div className="text-slate-500 font-mono text-[11px]">Cumulative GPA</div>
                  <div className="text-emerald-400 font-mono font-bold">8.67 / 10.0</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Engineering Principles */}
          <div className="lg:col-span-5 space-y-4">
            <div className="font-mono text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2 flex items-center space-x-2">
              <Terminal className="w-3.5 h-3.5 text-accent-cyan" />
              <span>Core Working Principles</span>
            </div>

            {PROFILE.about.principles.map((p, idx) => (
              <div
                key={p.title}
                className="p-4 rounded-xl border border-[#1d2332] bg-[#0c0f16] hover:border-[#2d374d] transition-all"
              >
                <div className="flex items-center space-x-2.5 mb-2">
                  <span className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/60 text-cyan-300 font-bold">
                    0{idx + 1}
                  </span>
                  <h3 className="text-xs font-bold text-white tracking-tight">
                    {p.title}
                  </h3>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {p.description}
                </p>
              </div>
            ))}

            <div className="p-4 rounded-xl border border-[#1a2336] bg-[#0b0e15] text-xs text-slate-400 space-y-2">
              <div className="flex items-center space-x-2 text-slate-200 font-semibold font-mono text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Engineering Standard</span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-400">
                &ldquo;Every model requires an evaluation baseline, every routing algorithm requires proof of capacity invariants, and every API requires robust error boundaries.&rdquo;
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
