import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { ResumeViewer } from "@/components/resume/ResumeViewer";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Resume & Credentials | Rohit",
  description: "Curriculum Vitae and verified technical background of Rohit, AI & Data Science Student at ISBM College of Engineering.",
};

export default function ResumePage() {
  return (
    <div className="min-h-screen pt-28 pb-24 tech-grid-pattern">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation */}
        <div className="mb-6 print:hidden">
          <Link
            href="/"
            className="inline-flex items-center space-x-1.5 text-xs font-mono text-accent-cyan hover:text-cyan-300 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Portfolio Home</span>
          </Link>
        </div>

        {/* Resume Sheet */}
        <ResumeViewer />

      </div>
    </div>
  );
}
