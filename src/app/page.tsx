import React from "react";
import { Hero } from "@/components/hero/Hero";
import { SelectedWorkSection } from "@/components/projects/SelectedWorkSection";
import { AboutSection } from "@/components/about/AboutSection";
import { SkillsSection } from "@/components/skills/SkillsSection";
import { GitHubSection } from "@/components/github/GitHubSection";
import { ProofOfWork } from "@/components/proof/ProofOfWork";
import { TimelineSection } from "@/components/timeline/TimelineSection";
import { ContactSection } from "@/components/contact/ContactSection";
import Link from "next/link";
import { FileText, ArrowRight, ShieldCheck } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Selected Work (Projects) */}
      <SelectedWorkSection />

      {/* 3. About Section */}
      <AboutSection />

      {/* 4. Technical Skills */}
      <SkillsSection />

      {/* 5. GitHub Work & Explorer */}
      <GitHubSection />

      {/* 6. Proof of Work */}
      <ProofOfWork />

      {/* 7. Experience & Timeline */}
      <TimelineSection />

      {/* 8. Resume Callout Banner */}
      <section className="py-14 border-b border-[#181d28] bg-[#0b0e15]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 rounded-2xl border border-[#212a3d] bg-gradient-to-r from-[#0e121a] via-[#10141f] to-[#0c0f16] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-1.5 text-center md:text-left">
              <div className="inline-flex items-center space-x-1.5 text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
                <FileText className="w-3.5 h-3.5" />
                <span>Curriculum Vitae</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Review Official Academic & Technical Resume
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
                Single-page printable view containing verified coursework, technical skill competencies, system highlights, and academic GPA.
              </p>
            </div>

            <div className="flex items-center space-x-3 shrink-0">
              <Link
                href="/resume"
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-lg text-xs font-semibold text-slate-950 bg-accent-cyan hover:bg-cyan-300 transition-all font-mono shadow-sm"
              >
                <span>Open Resume View</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Contact Section */}
      <ContactSection />
    </div>
  );
}
