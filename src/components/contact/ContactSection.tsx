"use client";

import React, { useState } from "react";
import { PROFILE } from "@/data/profile";
import {
  Mail,
  Github,
  Linkedin,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  MessageSquare,
} from "lucide-react";

export function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    honeypot: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus("error");
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    if (form.message.trim().length < 10) {
      setStatus("error");
      setErrorMessage("Please enter a message of at least 10 characters.");
      return;
    }

    try {
      setStatus("loading");
      setErrorMessage("");

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "", honeypot: "" });
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Failed to submit message. Please try emailing directly.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setStatus("error");
      setErrorMessage("Network error occurred. Please try contacting via direct email.");
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#07080b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12 pb-6 border-b border-[#1b212e]">
          <div className="flex items-center space-x-2 font-mono text-xs text-accent-cyan uppercase tracking-wider mb-2">
            <Mail className="w-3.5 h-3.5" />
            <span>Section 07 &middot; Communication</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Get in Touch
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Open to discussing AI research, machine learning engineering internships, combinatorial optimization problems,
            or collaboration on data-intensive systems.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct channels */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h3 className="text-base font-bold text-white mb-2">
                Direct Communication Channels
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Feel free to reach out directly via email or explore ongoing commits and open-source discussions on GitHub.
              </p>
            </div>

            <div className="space-y-3">
              {/* Email Card */}
              <a
                href={`mailto:${PROFILE.socials.email}`}
                className="flex items-center space-x-3.5 p-4 rounded-xl border border-[#1b2231] bg-[#0c0f16] hover:border-cyan-500/50 transition-colors group"
              >
                <div className="p-2.5 rounded-lg bg-[#141924] border border-[#232b3d] text-accent-cyan group-hover:scale-105 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
                    Direct Email
                  </div>
                  <div className="text-xs font-semibold text-slate-200 group-hover:text-white">
                    {PROFILE.socials.email}
                  </div>
                </div>
              </a>

              {/* GitHub Card */}
              <a
                href={PROFILE.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3.5 p-4 rounded-xl border border-[#1b2231] bg-[#0c0f16] hover:border-cyan-500/50 transition-colors group"
              >
                <div className="p-2.5 rounded-lg bg-[#141924] border border-[#232b3d] text-slate-300 group-hover:scale-105 transition-transform">
                  <Github className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
                    GitHub Profile
                  </div>
                  <div className="text-xs font-semibold text-slate-200 group-hover:text-white">
                    github.com/{PROFILE.github.username}
                  </div>
                </div>
              </a>

              {/* Location Card */}
              <div className="p-4 rounded-xl border border-[#171d2a] bg-[#0a0d13] text-xs text-slate-400 space-y-1">
                <div className="font-mono text-[11px] text-slate-500 uppercase tracking-wider">
                  Academic Location
                </div>
                <div className="text-slate-300 font-medium">
                  {PROFILE.institution} &middot; {PROFILE.location}
                </div>
                <div className="text-[11px] text-slate-500">
                  Timezone: Indian Standard Time (IST / UTC+05:30)
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="rounded-xl border border-[#1e2536] bg-[#0c0f16] p-6 sm:p-8">
              <div className="flex items-center space-x-2 font-mono text-xs text-slate-300 mb-6 pb-3 border-b border-[#181f2d]">
                <MessageSquare className="w-4 h-4 text-accent-cyan" />
                <span>DISPATCH MESSAGE</span>
              </div>

              {/* Status alerts */}
              {status === "success" && (
                <div className="mb-6 p-4 rounded-lg bg-emerald-950/40 border border-emerald-800/60 text-emerald-300 text-xs flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 text-emerald-400 shrink-0" />
                  <div>
                    <span className="font-semibold block mb-0.5">Message Received</span>
                    Thank you. Your message has been safely logged. Rohit will review it promptly.
                  </div>
                </div>
              )}

              {status === "error" && (
                <div className="mb-6 p-4 rounded-lg bg-red-950/40 border border-red-800/60 text-red-300 text-xs flex items-start space-x-2.5">
                  <AlertCircle className="w-4 h-4 mt-0.5 text-red-400 shrink-0" />
                  <div>
                    <span className="font-semibold block mb-0.5">Submission Error</span>
                    {errorMessage}
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot field hidden from real users */}
                <input
                  type="text"
                  name="honeypot"
                  value={form.honeypot}
                  onChange={(e) => setForm({ ...form, honeypot: e.target.value })}
                  style={{ display: "none" }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Input */}
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">
                      Name <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g., Sarah Chen"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#111520] border border-[#202838] text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Email Input */}
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">
                      Email Address <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="e.g., sarah@example.com"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#111520] border border-[#202838] text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Subject Input */}
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder="e.g., Technical Opportunity / SIH Discussion"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#111520] border border-[#202838] text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition-colors"
                  />
                </div>

                {/* Message Input */}
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">
                    Message <span className="text-cyan-400">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Provide details about your query, proposal, or feedback..."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#111520] border border-[#202838] text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition-colors resize-y min-h-[120px]"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2 flex items-center justify-between">
                  <div className="text-[11px] font-mono text-slate-500">
                    Validated server-side &middot; Anti-spam protected
                  </div>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-lg text-xs font-semibold text-slate-950 bg-accent-cyan hover:bg-cyan-300 disabled:opacity-50 transition-all font-mono shadow-sm shadow-cyan-950"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Transmitting...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
