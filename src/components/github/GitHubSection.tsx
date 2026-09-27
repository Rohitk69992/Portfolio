"use client";

import React, { useState, useEffect, useMemo } from "react";
import { GitHubRepo } from "@/lib/types";
import { FALLBACK_REPOSITORIES } from "@/data/fallback-repos";
import { PROFILE } from "@/data/profile";
import { formatDate } from "@/lib/utils";
import {
  Github,
  Star,
  GitFork,
  ExternalLink,
  Code,
  Calendar,
  Layers,
  Search,
} from "lucide-react";

export function GitHubSection() {
  const [repos, setRepos] = useState<GitHubRepo[]>(FALLBACK_REPOSITORIES);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("All");

  const EXCLUDED_REPOS = useMemo(() => new Set(["portfolio", "rohit-portfolio"]), []);

  useEffect(() => {
    async function loadRepos() {
      try {
        setLoading(true);
        const res = await fetch("/api/github");
        if (res.ok) {
          const json = await res.json();
          if (json.success && Array.isArray(json.data) && json.data.length > 0) {
            setRepos(
              json.data.filter(
                (repo: GitHubRepo) => !EXCLUDED_REPOS.has(repo.name.toLowerCase())
              )
            );
            return;
          }
        }
      } catch (err) {
        console.warn("Could not reach /api/github, falling back to cached snapshot", err);
      } finally {
        setLoading(false);
      }
    }

    loadRepos();
  }, [EXCLUDED_REPOS]);

  // Filter languages
  const availableLanguages = useMemo(() => {
    const langs = new Set<string>();
    repos
      .filter((r) => !EXCLUDED_REPOS.has(r.name.toLowerCase()))
      .forEach((r) => {
        if (r.language) langs.add(r.language);
      });
    return ["All", ...Array.from(langs)];
  }, [repos, EXCLUDED_REPOS]);

  // Filter repos based on search and language
  const filteredRepos = useMemo(() => {
    return repos.filter((repo) => {
      if (EXCLUDED_REPOS.has(repo.name.toLowerCase())) return false;

      const matchesSearch =
        searchQuery.trim() === "" ||
        repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (repo.description && repo.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        repo.topics.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesLang =
        selectedLanguage === "All" || repo.language === selectedLanguage;

      return matchesSearch && matchesLang;
    });
  }, [repos, searchQuery, selectedLanguage, EXCLUDED_REPOS]);

  return (
    <section id="github" className="py-20 md:py-28 border-b border-[#181d28] bg-[#08090c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-10 pb-6 border-b border-[#1b212e]">
          <div className="flex items-center space-x-2 font-mono text-xs text-accent-cyan uppercase tracking-wider mb-2">
            <Github className="w-3.5 h-3.5" />
            <span>Section 04 &middot; Source Repositories</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Open Source & GitHub Work
          </h2>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-8">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search repositories by name, topic, or keyword..."
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-[#0e121a] border border-[#202737] text-xs text-slate-200 placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition-colors"
            />
          </div>

          {/* Language Filter */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-mono text-slate-500 mr-1">Language:</span>
            {availableLanguages.map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLanguage(lang)}
                className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                  selectedLanguage === lang
                    ? "bg-accent-cyan text-slate-950 font-bold"
                    : "bg-[#121620] text-slate-400 hover:text-white border border-[#202736]"
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* Repositories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredRepos.map((repo) => (
            <div
              key={repo.id}
              className="rounded-xl border border-[#1c2230] bg-[#0c0f16] p-5 flex flex-col justify-between hover:border-[#2f394f] transition-all group"
            >
              <div>
                {/* Top Language & Visibility */}
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#161c28]">
                  <div className="flex items-center space-x-1.5 text-[11px] font-mono text-slate-400">
                    <Code className="w-3.5 h-3.5 text-accent-cyan" />
                    <span>{repo.language || "Config / Data"}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-[11px] font-mono text-slate-400">
                    <span className="flex items-center space-x-0.5">
                      <Star className="w-3 h-3 text-amber-400" />
                      <span>{repo.stargazers_count}</span>
                    </span>
                    <span className="flex items-center space-x-0.5">
                      <GitFork className="w-3 h-3 text-slate-500" />
                      <span>{repo.forks_count}</span>
                    </span>
                  </div>
                </div>

                {/* Repo Title */}
                <h3 className="text-sm font-bold text-white font-mono tracking-tight group-hover:text-accent-cyan transition-colors mb-2 break-words">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline flex items-center space-x-1"
                  >
                    <span>{repo.name}</span>
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </h3>

                {/* Description */}
                <p className="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-3">
                  {repo.description || "No public description documented."}
                </p>

                {/* Topics */}
                {repo.topics && repo.topics.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {repo.topics.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-[#141824] border border-[#22293b] text-cyan-300"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom Card Footer */}
              <div className="pt-3 border-t border-[#171d29] flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span className="flex items-center space-x-1">
                  <Calendar className="w-3 h-3" />
                  <span>Updated {formatDate(repo.pushed_at)}</span>
                </span>

                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-accent-cyan hover:text-cyan-300 font-semibold"
                >
                  View Code &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State if search matches nothing */}
        {filteredRepos.length === 0 && (
          <div className="text-center py-12 border border-[#202737] rounded-xl bg-[#0d1017]">
            <Layers className="w-8 h-8 mx-auto text-slate-600 mb-2" />
            <p className="text-sm text-slate-300 font-medium">No repositories match your filter</p>
            <p className="text-xs text-slate-500 mt-1">
              Try adjusting your search query or language selection.
            </p>
          </div>
        )}

        {/* Direct GitHub Link Callout */}
        <div className="mt-10 text-center">
          <a
            href={PROFILE.github.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-lg text-xs font-semibold text-slate-200 bg-[#12151f] hover:bg-[#1a1f2d] border border-[#232a3d] hover:border-[#384360] transition-all font-mono"
          >
            <Github className="w-4 h-4 text-slate-300" />
            <span>Explore all repositories on GitHub (@Rohitk69992) &rarr;</span>
          </a>
        </div>

      </div>
    </section>
  );
}
