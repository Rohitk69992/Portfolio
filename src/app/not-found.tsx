import React from "react";
import Link from "next/link";
import { ArrowLeft, Terminal } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 tech-grid-pattern">
      <div className="max-w-md w-full p-8 rounded-2xl border border-[#20283a] bg-[#0c0f16] text-center space-y-4">
        <div className="w-12 h-12 rounded-xl bg-[#141924] border border-[#263147] flex items-center justify-center mx-auto text-accent-cyan">
          <Terminal className="w-6 h-6" />
        </div>
        <div className="font-mono text-xs uppercase tracking-widest text-slate-500 font-semibold">
          Error 404 &middot; Route Invariant Failed
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Page Not Found
        </h1>
        <p className="text-xs text-slate-400 leading-relaxed">
          The requested system route or case study does not exist or has been relocated.
        </p>
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-semibold text-slate-950 bg-accent-cyan hover:bg-cyan-300 transition-colors font-mono"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Portfolio Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
