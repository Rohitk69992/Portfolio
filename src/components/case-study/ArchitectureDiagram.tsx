import React from "react";
import { ArrowRight, CheckCircle2, Cpu, Database, Activity, GitBranch } from "lucide-react";

interface Step {
  step: string;
  detail: string;
}

interface ArchitectureDiagramProps {
  title: string;
  description: string;
  steps: Step[];
}

export function ArchitectureDiagram({ title, description, steps }: ArchitectureDiagramProps) {
  return (
    <div className="rounded-xl border border-[#222a3b] bg-[#0c0f16] p-6 sm:p-8">
      <div className="mb-6">
        <div className="font-mono text-xs text-accent-cyan uppercase tracking-wider mb-1">
          System Dataflow Architecture
        </div>
        <h3 className="text-lg font-bold text-white tracking-tight">{title}</h3>
        <p className="text-xs text-slate-400 mt-1 leading-relaxed">{description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {steps.map((item, idx) => (
          <div
            key={idx}
            className="p-4 rounded-lg border border-[#1b2230] bg-[#10141e] hover:border-[#2f3a50] transition-colors relative flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/60 text-cyan-300">
                  Step 0{idx + 1}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              </div>

              <h4 className="text-xs font-bold text-slate-200 mb-1.5 leading-snug">
                {item.step}
              </h4>

              <p className="text-[11px] text-slate-400 leading-relaxed">
                {item.detail}
              </p>
            </div>

            {idx < steps.length - 1 && (
              <div className="hidden lg:block absolute -right-2.5 top-1/2 -translate-y-1/2 z-10 text-slate-600">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
