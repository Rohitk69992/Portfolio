import React from "react";
import Link from "next/link";
import { ShieldCheck, ExternalLink, ArrowRight, GitCommit, FileCode, CheckCircle2 } from "lucide-react";

export function ProofOfWork() {
  const proofs = [
    {
      id: "proof-1",
      category: "Combinatorial Optimization & Simulation",
      title: "SIH26137: Dynamic Microscopic Closed-Loop CVRP Platform",
      claim:
        "Engineered dual-layer Capacitated Vehicle Routing platform integrating Eclipse SUMO with QPSO, QAOA, ALNS, Vidal Split HGS, and HiGHS MILP baselines.",
      evidence: [
        "Repository with 61KB detailed technical README, full solver implementations, and TraCI 2 Hz socket synchronization.",
        "3,559 nodes and 8,263 edges in microscopic urban road network (osm.net.xml.gz).",
        "Miller-Tucker-Zemlin mixed integer linear program exact ground truth bound.",
      ],
      link: {
        text: "View SIH Repository",
        url: "https://github.com/Rohitk69992/Quantum-Inspired-Vehicle-Routing-Problem-Solution",
      },
      caseStudySlug: "quantum-inspired-vehicle-routing-problem-solution",
    },
    {
      id: "proof-2",
      category: "NLP & Model Deployment",
      title: "Banking77 Intent Classifier with Persistent Audit Logging",
      claim:
        "Built production NLP serving architecture on Banking77 dataset using TF-IDF and Multinomial Logistic Regression with Top-K confidence outputs and SQLite logging.",
      evidence: [
        "Live public web application deployed and running.",
        "Prediction logging schema in SQLite with CSV historical audit export.",
        "Sub-10ms CPU inference latency.",
      ],
      link: {
        text: "Launch Live Web App",
        url: "https://bank-issue-intent-classifier.vercel.app",
      },
      caseStudySlug: "bank-issue-intent-classifier",
    },
    {
      id: "proof-3",
      category: "Data Analytics & Public Governance",
      title: "National Aadhaar Governance Risk Intelligence Dashboard",
      claim:
        "Analyzed 1,006,029 transactional records from government datasets to identify state and district operational friction.",
      evidence: [
        "Partitioned data processing across 4 high-volume datasets.",
        "Engineered operational strategy queues (state_strategy.csv, execution_queue.csv).",
        "Streamlit geospatial dashboard integrated with official India GeoJSON polygons.",
      ],
      link: {
        text: "View Hackathon Project",
        url: "https://github.com/Rohitk69992/UIDAI-GOV-DATA-HACKATHON",
      },
      caseStudySlug: "uidai-gov-data-hackathon",
    },
    {
      id: "proof-4",
      category: "LLM Fine-Tuning & Quantization",
      title: "4-bit LoRA Fine-Tuning Pipeline for Qwen2.5-0.5B",
      claim:
        "Implemented end-to-end Parameter-Efficient Fine-Tuning (PEFT) on 4-bit quantized base model using Unsloth custom kernels.",
      evidence: [
        "Programmatic scaffolding with verification checks for pad tokens and 4-bit precision.",
        "LoRA adapter matrices attached to linear projection layers.",
        "Supervised fine-tuning execution pipeline without catastrophic forgetting.",
      ],
      link: {
        text: "Inspect Fine-Tuning Script",
        url: "https://github.com/Rohitk69992/lora-fine-tune-a-tiny-chat-model-with-unsloth",
      },
      caseStudySlug: "lora-fine-tune-a-tiny-chat-model-with-unsloth",
    },
  ];

  return (
    <section id="proof" className="py-20 md:py-28 border-b border-[#181d28] bg-[#090b0f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#1b212e] gap-4">
          <div>
            <div className="flex items-center space-x-2 font-mono text-xs text-emerald-400 uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Section 05 &middot; Verifiable Artifacts</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Proof of Work
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              Every major claim supported by code, live deployments, mathematical formulations, or repository data. No
              unsupported generalizations.
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs font-mono text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Audited Against Public Repositories</span>
          </div>
        </div>

        {/* Proof Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {proofs.map((item, idx) => (
            <div
              key={item.id}
              className="rounded-xl border border-[#1e2536] bg-[#0c0f16] p-6 flex flex-col justify-between hover:border-[#323d56] transition-all"
            >
              <div>
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#181f2d]">
                  <span className="font-mono text-[11px] text-accent-cyan font-semibold uppercase tracking-wider">
                    {item.category}
                  </span>
                  <span className="font-mono text-[10px] text-slate-500">
                    Artifact 0{idx + 1}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-2 tracking-tight">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {item.claim}
                </p>

                {/* Evidence points */}
                <div className="space-y-2 mb-6">
                  <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
                    Documented Evidence:
                  </div>
                  {item.evidence.map((ev, i) => (
                    <div key={i} className="flex items-start space-x-2 text-xs text-slate-400">
                      <span className="text-accent-cyan mt-0.5">&bull;</span>
                      <span className="leading-normal">{ev}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Links */}
              <div className="pt-4 border-t border-[#181f2c] flex items-center justify-between gap-3 text-xs">
                <a
                  href={item.link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 text-slate-300 hover:text-white font-mono transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  <span>{item.link.text}</span>
                </a>

                {item.caseStudySlug && (
                  <Link
                    href={`/projects/${item.caseStudySlug}`}
                    className="inline-flex items-center space-x-1 text-accent-cyan hover:text-cyan-300 font-semibold transition-colors"
                  >
                    <span>Read Deep-Dive</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
