"use client";

import React, { useState } from "react";
import { Printer, Download, Copy, Check, FileCode, ExternalLink } from "lucide-react";

export function ResumeViewer() {
  const [copied, setCopied] = useState<boolean>(false);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLatex = async () => {
    try {
      const res = await fetch("/resume.tex");
      const text = await res.text();
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error("Failed to copy LaTeX code:", err);
    }
  };

  const handleDownloadTex = () => {
    const link = document.createElement("a");
    link.href = "/resume.tex";
    link.download = "Rohit_Resume.tex";
    link.click();
  };

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="print:hidden p-4 rounded-xl border border-[#202738] bg-[#0c0f16] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
        <div className="space-y-0.5 text-center sm:text-left">
          <div className="text-xs font-semibold text-slate-200 flex items-center space-x-2">
            <span>Official Academic Resume</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950/60 border border-cyan-800/60 text-cyan-300">
              LaTeX Typeset
            </span>
          </div>
          <p className="text-[11px] text-slate-400">
            Typeset with LaTeX academic standards. Print to PDF or download the compilable .tex source.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleCopyLatex}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-[#141823] hover:bg-[#1d2333] border border-[#242b3d] transition-colors font-mono"
            title="Copy LaTeX source code"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied .tex</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>Copy .tex</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownloadTex}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-[#141823] hover:bg-[#1d2333] border border-[#242b3d] transition-colors font-mono"
            title="Download LaTeX source file"
          >
            <Download className="w-3.5 h-3.5 text-slate-400" />
            <span>Download .tex</span>
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold text-slate-950 bg-accent-cyan hover:bg-cyan-300 transition-colors font-mono shadow-sm"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>

      {/* LaTeX Styled Paper Document */}
      <div
        id="resume-document"
        className="rounded-lg border border-[#273042] bg-[#ffffff] text-[#111827] p-8 sm:p-14 shadow-2xl font-serif max-w-[800px] mx-auto print:border-none print:p-0 print:shadow-none print:max-w-none"
      >
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold tracking-normal text-black mb-1">
            Rohit
          </h1>
          <div className="text-base text-gray-800 mb-2">
            AI &amp; Data Science Student
          </div>
          <div className="text-xs text-gray-700 flex flex-wrap justify-center items-center gap-x-2 gap-y-1 font-sans">
            <span>+91-9373028882</span>
            <span>|</span>
            <a
              href="mailto:rohitkorade69@gmail.com"
              className="text-blue-800 hover:underline"
            >
              rohitkorade69@gmail.com
            </a>
            <span>|</span>
            <a
              href="https://www.linkedin.com/in/rohit-korade-85452a3a3"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-800 hover:underline"
            >
              www.linkedin.com/in/rohit-korade-85452a3a3
            </a>
            <span>|</span>
            <a
              href="https://github.com/Rohitk69992"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-800 hover:underline"
            >
              https://github.com/Rohitk69992
            </a>
          </div>
        </div>

        {/* Section: Education */}
        <section className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-wider text-black pb-0.5 border-b border-black mb-2">
            Education
          </h2>
          <div className="text-xs space-y-0.5">
            <div className="flex justify-between items-baseline font-bold text-black">
              <span>ISBM College of Engineering</span>
              <span>Expected Graduation: 2027</span>
            </div>
            <div className="text-gray-900">
              Bachelor of Engineering (B.E.) in Artificial Intelligence &amp; Data Science
            </div>
            <div className="italic text-gray-800">
              CGPA: 8.5/10
            </div>
          </div>
        </section>

        {/* Section: Professional Summary */}
        <section className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-wider text-black pb-0.5 border-b border-black mb-2">
            Professional Summary
          </h2>
          <p className="text-xs leading-relaxed text-gray-900 text-justify">
            AI &amp; Data Science undergraduate with strong foundations in Machine Learning, Data Analysis, NLP, and Backend Development. Experienced in building end-to-end ML applications using Python, Scikit-Learn, Flask, FastAPI, and Streamlit. Passionate about solving real-world problems through data-driven solutions.
          </p>
        </section>

        {/* Section: Technical Skills */}
        <section className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-wider text-black pb-0.5 border-b border-black mb-2">
            Technical Skills
          </h2>
          <div className="text-xs space-y-1 text-gray-900">
            <div>
              <span className="font-bold text-black">Programming Languages:</span> Python, SQL
            </div>
            <div>
              <span className="font-bold text-black">Data Science Libraries:</span> Pandas, NumPy, Matplotlib, Seaborn
            </div>
            <div>
              <span className="font-bold text-black">Machine Learning:</span> Supervised Learning, Unsupervised Learning, Model Evaluation, Feature Engineering, Hyperparameter Tuning
            </div>
            <div>
              <span className="font-bold text-black">Frameworks &amp; Tools:</span> Flask, FastAPI, Streamlit, Git, GitHub
            </div>
            <div>
              <span className="font-bold text-black">Databases:</span> SQLite, MySQL, PostgreSQL
            </div>
          </div>
        </section>

        {/* Section: Projects (NO QPSO as requested) */}
        <section className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-wider text-black pb-0.5 border-b border-black mb-2">
            Projects
          </h2>
          <div className="space-y-3.5 text-xs text-gray-900">
            {/* Project 1 */}
            <div>
              <div className="flex justify-between items-baseline mb-1">
                <span className="font-bold text-black">Bank Issue Intent Classifier</span>
                <span className="font-sans text-[11px] text-blue-800 space-x-1">
                  <a
                    href="https://github.com/Rohitk69992/Bank-Issue-Intent-Classifier"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    GitHub
                  </a>
                  <span>|</span>
                  <a
                    href="https://bank-issue-intent-classifier.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    Live Demo
                  </a>
                </span>
              </div>
              <ul className="list-disc list-inside space-y-0.5 text-gray-800 pl-1">
                <li>Developed an NLP-based intent classification system for banking-related customer issues.</li>
                <li>Utilized text preprocessing, TF-IDF vectorization, and machine learning algorithms for intent prediction.</li>
              </ul>
            </div>

            {/* Project 2 */}
            <div>
              <div className="flex justify-between items-baseline mb-1">
                <span className="font-bold text-black">Movie Recommendation System</span>
                <span className="font-sans text-[11px] text-blue-800">
                  <a
                    href="https://github.com/Rohitk69992"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    GitHub
                  </a>
                </span>
              </div>
              <ul className="list-disc list-inside space-y-0.5 text-gray-800 pl-1">
                <li>Developed a content-based recommendation engine to suggest similar movies.</li>
                <li>Performed data cleaning, feature extraction, and similarity calculations.</li>
                <li>Implemented recommendation logic using Python and machine learning techniques.</li>
              </ul>
            </div>

            {/* Project 3 */}
            <div>
              <div className="flex justify-between items-baseline mb-1">
                <span className="font-bold text-black">CNN Car Object Detection</span>
                <span className="font-sans text-[11px] text-blue-800">
                  <a
                    href="https://github.com/Rohitk69992/CNN-Car-Object-Detection"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    GitHub
                  </a>
                </span>
              </div>
              <ul className="list-disc list-inside space-y-0.5 text-gray-800 pl-1">
                <li>Built a Convolutional Neural Network (CNN) model for car object detection tasks.</li>
                <li>Applied image preprocessing, augmentation, and deep learning techniques.</li>
                <li>Evaluated model performance using classification metrics and validation datasets.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section: Certifications */}
        <section>
          <h2 className="text-sm font-bold uppercase tracking-wider text-black pb-0.5 border-b border-black mb-2">
            Certifications
          </h2>
          <ul className="list-disc list-inside text-xs text-gray-800 pl-1">
            <li>Data Science Bootcamp Certification &mdash; Krish Naik (Udemy)</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
