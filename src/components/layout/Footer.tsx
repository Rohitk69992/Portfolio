import React from "react";
import Link from "next/link";
import { PROFILE } from "@/data/profile";
import { Github, ArrowUp, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[#1a1f2b] bg-[#07080b] py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Column 1: Identity */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center space-x-2">
              <span className="w-6 h-6 rounded bg-[#151922] border border-[#272e41] flex items-center justify-center font-mono font-bold text-accent-cyan text-xs">
                R
              </span>
              <span className="font-semibold text-slate-200 text-sm">Rohit</span>
              <span className="text-slate-500">| B.E. AI & Data Science</span>
            </div>
            <p className="text-slate-400 max-w-md leading-relaxed">
              Student at ISBM College of Engineering (Graduating 2027, CGPA 8.67). Focused on combinatorial optimization,
              microscopic traffic simulation, NLP pipelines, and production model serving.
            </p>
            <div className="flex items-center space-x-2 text-[11px] text-emerald-400/90 pt-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Evidence-based portfolio. Zero fabricated metrics or unverified claims.</span>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="font-mono text-[11px] uppercase tracking-wider text-slate-300 font-semibold mb-3">
              Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/#projects" className="hover:text-cyan-400 transition-colors">
                  Selected Work
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-cyan-400 transition-colors">
                  About & Background
                </Link>
              </li>
              <li>
                <Link href="/#skills" className="hover:text-cyan-400 transition-colors">
                  Technical Skills
                </Link>
              </li>
              <li>
                <Link href="/#github" className="hover:text-cyan-400 transition-colors">
                  GitHub Repositories
                </Link>
              </li>
              <li>
                <Link href="/#proof" className="hover:text-cyan-400 transition-colors">
                  Proof of Work
                </Link>
              </li>
              <li>
                <Link href="/resume" className="hover:text-cyan-400 transition-colors">
                  Resume & Credentials
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Links */}
          <div>
            <h4 className="font-mono text-[11px] uppercase tracking-wider text-slate-300 font-semibold mb-3">
              Direct Links
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href={PROFILE.github.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 hover:text-cyan-400 transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub Profile</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${PROFILE.socials.email}`}
                  className="hover:text-cyan-400 transition-colors"
                >
                  {PROFILE.socials.email}
                </a>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-cyan-400 transition-colors">
                  Send Message via Form
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#151922] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} Rohit &middot; Built with Next.js, TypeScript, and Tailwind CSS.
          </div>
          <a
            href="#home"
            className="inline-flex items-center space-x-1 px-2.5 py-1 rounded bg-[#10131b] border border-[#1e2433] hover:border-[#38425d] text-slate-400 hover:text-slate-200 transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3 h-3" />
          </a>
        </div>
      </div>
    </footer>
  );
}
