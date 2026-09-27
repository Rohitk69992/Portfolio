"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PROFILE } from "@/data/profile";
import { Github, FileText, Menu, X, ArrowUpRight } from "lucide-react";

const NAV_ITEMS = [
  { label: "Home", href: "/#home" },
  { label: "Selected Work", href: "/#projects" },
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "GitHub", href: "/#github" },
  { label: "Proof of Work", href: "/#proof" },
  { label: "Experience", href: "/#experience" },
  { label: "Resume", href: "/resume" },
  { label: "Contact", href: "/#contact" },
];

export function Navbar() {
  const [activeSection, setActiveSection] = useState<string>("home");
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Section tracking when on homepage
      if (pathname === "/") {
        const sections = ["home", "projects", "about", "skills", "github", "proof", "experience", "contact"];
        for (const section of sections) {
          const el = document.getElementById(section);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 140 && rect.bottom >= 140) {
              setActiveSection(section);
              break;
            }
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? "bg-[#08090c]/90 backdrop-blur-md border-b border-[#1c212d] py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Monogram */}
          <Link
            href="/"
            className="group flex items-center space-x-2.5 font-mono text-sm tracking-tight text-slate-200 hover:text-white"
          >
            <span className="w-7 h-7 rounded bg-[#151922] border border-[#272e41] flex items-center justify-center font-bold text-accent-cyan group-hover:border-accent-cyan/60 transition-colors">
              R
            </span>
            <span className="font-semibold text-slate-100">Rohit</span>
            <span className="hidden sm:inline-block text-xs text-slate-500 font-normal">
              / AI & Data Science
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 text-xs font-medium">
            {NAV_ITEMS.map((item) => {
              const isResume = item.href === "/resume";
              const isActive = isResume
                ? pathname === "/resume"
                : pathname === "/" && activeSection === item.href.replace("/#", "");

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`px-3 py-1.5 rounded-md transition-colors ${
                    isActive
                      ? "text-accent-cyan bg-cyan-950/30 border border-cyan-900/40"
                      : "text-slate-400 hover:text-slate-200 hover:bg-[#151922]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center space-x-2.5">
            <a
              href={PROFILE.github.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-slate-300 bg-[#12151d] hover:bg-[#1a1f2b] border border-[#23293a] hover:border-[#38425d] transition-all"
              aria-label="Rohit's GitHub Profile"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
              <ArrowUpRight className="w-3 h-3 text-slate-500" />
            </a>

            <Link
              href="/resume"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-cyan-300 bg-cyan-950/40 hover:bg-cyan-950/70 border border-cyan-800/60 transition-all"
            >
              <FileText className="w-3.5 h-3.5 text-accent-cyan" />
              <span>Resume</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-slate-400 hover:text-white bg-[#12151d] border border-[#23293a]"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0a0c10] border-b border-[#1c212d] px-4 pt-3 pb-6 space-y-2 mt-2">
          <div className="grid grid-cols-2 gap-1.5 pb-3 border-b border-[#1c212d]">
            {NAV_ITEMS.map((item) => {
              const isResume = item.href === "/resume";
              const isActive = isResume
                ? pathname === "/resume"
                : pathname === "/" && activeSection === item.href.replace("/#", "");

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded text-xs font-medium ${
                    isActive
                      ? "text-accent-cyan bg-cyan-950/40 border border-cyan-900/50"
                      : "text-slate-300 hover:bg-[#151922]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="pt-2 flex items-center space-x-2">
            <a
              href={PROFILE.github.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center space-x-1.5 py-2 rounded text-xs font-medium text-slate-300 bg-[#151922] border border-[#23293a]"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <Link
              href="/resume"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 flex items-center justify-center space-x-1.5 py-2 rounded text-xs font-medium text-cyan-300 bg-cyan-950/50 border border-cyan-800/60"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
