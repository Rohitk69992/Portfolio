# Rohit — Personal Portfolio & AI / Data Science Systems Showcase

A modern, production-ready, dark-first technical portfolio website for **Rohit**, an AI & Data Science engineering student at **ISBM College of Engineering** (B.E. Class of 2027, CGPA 8.67, GitHub: [`Rohitk69992`](https://github.com/Rohitk69992)).

Designed and built specifically for technical hiring managers, AI startup founders, and ML engineers. It emphasizes mathematical formulations, system invariants, empirical results, and verified source code rather than generic templates or exaggerated claims.

---

## 🚀 Key Features

- **Evidence-Based Systems Architecture**:
  - Every project links directly to its GitHub repository, documented datasets, or live deployment.
  - Zero fabricated metrics, fake percentages, or unverified claims.
- **Dynamic GitHub REST API Service**:
  - Automatically fetches and normalizes public repositories for `@Rohitk69992`.
  - Built-in ISR caching (1-hour revalidation) and resilient static fallback snapshot for offline/rate-limited environments.
- **In-Depth Case Study Engine (`/projects/[slug]`)**:
  - Dedicated technical routes for all major systems:
    - *SIH26137 Quantum-Inspired Intelligent Traffic Route Optimization Platform* (Eclipse SUMO microscopic simulation, QPSO, QAOA, ALNS, HGS, HiGHS MILP, TraCI 2 Hz socket).
    - *Bank Issue Intent Classifier* (Banking77, TF-IDF, Logistic Regression, SQLite logging, Vercel/Render deployment).
    - *National Aadhaar Governance Risk Dashboard* (1M+ records, Streamlit, Plotly GeoJSON).
    - *LoRA Fine-Tuning with Unsloth* (Qwen2.5-0.5B 4-bit PEFT pipeline).
    - *Imbalanced Fraud Detection* (SMOTE, precision-recall trade-offs).
    - *CNN Car Object Detection* (Convolutional vision localization).
- **Interactive System Dataflow Taxonomy**:
  - Dynamic pipeline in the Hero section visualizing data ingestion, dynamic graphs, combinatorial optimization, microscopic simulation, and closed-loop feedback telemetry.
- **Printable Curriculum Vitae (`/resume`)**:
  - Clean, dedicated resume document with browser print/PDF export styling.
- **Secure Contact API Endpoint (`/api/contact`)**:
  - Server-side email format and string length validation, in-memory rate limiting, and honeypot spam prevention.
- **SEO & Accessibility**:
  - Semantic HTML5, ARIA labels, visible keyboard focus indicators, dynamic sitemap (`/sitemap.xml`), and search crawler directives (`/robots.txt`).

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | Next.js 14+ (App Router) |
| **Language** | TypeScript (Strict mode, typed schemas) |
| **Styling** | Tailwind CSS, PostCSS, Custom Dark Tokens |
| **Icons** | Lucide React |
| **Backend / API** | Next.js Edge / Node Server Routes (`/api/github`, `/api/contact`) |
| **Deployment Target** | Vercel |

---

## 📂 Project Architecture

```
portfolio/
├── src/
│   ├── app/
│   │   ├── layout.tsx                # Global SEO metadata, viewport, Navbar, Footer
│   │   ├── page.tsx                  # Complete homepage (Hero -> Work -> About -> Skills -> GitHub -> Proof -> Experience -> Contact)
│   │   ├── resume/
│   │   │   └── page.tsx              # Interactive Resume page with print preview
│   │   ├── projects/
│   │   │   ├── page.tsx              # Projects directory
│   │   │   └── [slug]/
│   │   │       └── page.tsx          # Technical Case Study template
│   │   ├── api/
│   │   │   ├── contact/
│   │   │   │   └── route.ts          # Validated contact form endpoint with rate limiter
│   │   │   └── github/
│   │   │       └── route.ts          # Server-cached GitHub API proxy
│   │   ├── sitemap.ts                # Dynamic sitemap generator
│   │   ├── robots.ts                 # Search crawler rules
│   │   └── globals.css               # Dark-first technical styling and focus rings
│   ├── components/
│   │   ├── layout/                   # Navbar, Footer
│   │   ├── hero/                     # Hero section with interactive system pipeline
│   │   ├── projects/                 # ProjectCard, SelectedWorkSection
│   │   ├── case-study/               # ArchitectureDiagram, CaseStudy layout
│   │   ├── github/                   # GitHubSection with language & search filters
│   │   ├── about/                    # AboutSection with academic foundations
│   │   ├── skills/                   # SkillsSection with contextual descriptions
│   │   ├── proof/                    # ProofOfWork verified claims
│   │   ├── timeline/                 # TimelineSection (education & hackathons)
│   │   ├── contact/                  # ContactSection with form & status alerts
│   │   └── resume/                   # ResumeViewer with print styles
│   ├── data/
│   │   ├── profile.ts                # Verified profile constants
│   │   ├── projects.ts               # Structured projects database & case studies
│   │   ├── skills.ts                 # Categorized skills
│   │   ├── timeline.ts               # Chronological milestones
│   │   └── fallback-repos.ts         # Static snapshot for offline / rate-limited GitHub API
│   └── lib/
│       ├── github.ts                 # Server-side GitHub API client & normalizer
│       ├── types.ts                  # TypeScript interfaces
│       └── utils.ts                  # Classname merging and date formatters
├── public/                           # Static assets
├── tailwind.config.ts                # Custom palette, fonts, keyframes
├── tsconfig.json                     # Strict TypeScript config
└── next.config.mjs                   # Next.js optimization config
```

---

## 💻 Local Development

### 1. Prerequisites
- **Node.js**: v18.17+ or v20+ (tested on Node v24)
- **npm**: v9+ (or pnpm / yarn)

### 2. Installation
```bash
git clone https://github.com/Rohitk69992/portfolio.git
cd portfolio
npm install
```

### 3. Environment Variables (Optional)
Copy the example environment file:
```bash
cp .env.example .env.local
```
- `GITHUB_TOKEN`: (Optional) GitHub personal access token to raise API rate limits from 60 to 5,000 req/hr.

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Production Build
```bash
npm run build
npm run start
```

---

## 🚢 Deployment to Vercel

1. Push your repository to GitHub (`Rohitk69992/portfolio`).
2. Go to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import the repository.
4. Set Framework Preset to **Next.js**.
5. (Optional) Add `GITHUB_TOKEN` under Environment Variables.
6. Click **Deploy**.

---

## 🔒 Security & Verification

- Zero client-side API token leakage.
- Strict input length checks, email regex validation, and honeypot bot trap on `/api/contact`.
- In-memory rate limiting preventing denial-of-service spam on API routes.
- Fully typed interfaces with strict TypeScript (`noImplicitAny`, strict null checks).
