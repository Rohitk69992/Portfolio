export interface ProjectCaseStudy {
  overview: string;
  problemStatement: string;
  motivation: string;
  requirements: string[];
  systemArchitecture: {
    title: string;
    description: string;
    flowSteps: { step: string; detail: string }[];
  };
  mathematicalFormulations?: {
    title: string;
    formula?: string;
    explanation: string;
  }[];
  algorithmsUsed: {
    name: string;
    role: string;
    rationale: string;
  }[];
  dataPipeline: {
    datasetName: string;
    source: string;
    processingSteps: string[];
    features?: string[];
  };
  engineeringDetails: string[];
  evaluation: {
    metricsRecorded?: { label: string; value: string; note: string }[];
    observations: string[];
  };
  challengesEncountered: string[];
  lessonsLearned: string[];
  futureImprovements: string[];
}

export interface Project {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  problemSummary: string;
  solutionSummary: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
  category: "Optimization" | "NLP" | "Computer Vision" | "Machine Learning" | "Data Analytics" | "Backend";
  caseStudy: ProjectCaseStudy;
}

export interface SkillItem {
  name: string;
  context: string;
  highlight?: boolean;
}

export interface SkillGroup {
  category: string;
  description: string;
  skills: SkillItem[];
}

export interface TimelineItem {
  id: string;
  period: string;
  title: string;
  subtitle: string;
  organization: string;
  type: "education" | "hackathon" | "project" | "certification";
  description: string;
  evidenceLink?: {
    text: string;
    url: string;
  };
  tags: string[];
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  pushed_at: string;
  topics: string[];
  homepage: string | null;
  visibility: string;
  archived: boolean;
  default_branch: string;
}

export interface ContactFormInput {
  name: string;
  email: string;
  subject: string;
  message: string;
  honeypot?: string;
}
