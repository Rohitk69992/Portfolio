import { TimelineItem } from "@/lib/types";

export const TIMELINE_ITEMS: TimelineItem[] = [
  {
    id: "edu-be",
    period: "2023 — Present (Expected 2027)",
    title: "Bachelor of Engineering (B.E.) in AI & Data Science",
    subtitle: "Current CGPA: 8.67",
    organization: "ISBM College of Engineering",
    type: "education",
    description:
      "Rigorous coursework in Data Structures, Algorithms, Linear Algebra, Probability & Statistics, Machine Learning, Deep Learning, Database Management Systems, and Artificial Intelligence.",
    tags: ["B.E. AI & DS", "CGPA: 8.67", "Algorithms", "Linear Algebra", "Machine Learning"],
  },
  {
    id: "hackathon-sih",
    period: "2026",
    title: "Quantum-Inspired Intelligent Traffic Route Optimization (SIH26137)",
    subtitle: "Smart India Hackathon Technical Solution",
    organization: "Egreen Quanta &middot; Smart Vehicles & ITS Domain",
    type: "hackathon",
    description:
      "Formulated and implemented a closed-loop dynamic Capacitated Vehicle Routing Problem (CVRP) platform. Coupled microscopic traffic simulation (Eclipse SUMO with 3,559 nodes and 8,263 edges via TraCI at 2 Hz) with combinatorial metaheuristics (QPSO, QAOA, ALNS, HGS, HiGHS MILP).",
    evidenceLink: {
      text: "View GitHub Repository",
      url: "https://github.com/Rohitk69992/Quantum-Inspired-Vehicle-Routing-Problem-Solution",
    },
    tags: ["SIH26137", "Eclipse SUMO", "TraCI", "QPSO", "QAOA", "ALNS", "VRP"],
  },
  {
    id: "hackathon-uidai",
    period: "2026",
    title: "National Aadhaar Governance Risk Dashboard",
    subtitle: "UIDAI Government Data Hackathon",
    organization: "Government Data Analytics Initiative",
    type: "hackathon",
    description:
      "Processed over 1,000,000 public governance transaction records to evaluate state activity disparities, district execution bottlenecks, and regional risk indices. Built an operational Streamlit dashboard with interactive Plotly choropleth maps.",
    evidenceLink: {
      text: "View Hackathon Repository",
      url: "https://github.com/Rohitk69992/UIDAI-GOV-DATA-HACKATHON",
    },
    tags: ["UIDAI Hackathon", "1M+ Records", "Streamlit", "Plotly", "GeoJSON"],
  },
  {
    id: "proj-bank",
    period: "2026",
    title: "Bank Issue Intent Classifier Production Deployment",
    subtitle: "End-to-End NLP Serving System",
    organization: "Open Source Project",
    type: "project",
    description:
      "Designed and deployed a production NLP serving system on Banking77 data using Scikit-learn, TF-IDF feature engineering, and Logistic Regression. Features real-time intent ranking, confidence calibration, SQLite audit logging, and Render/Vercel hosting.",
    evidenceLink: {
      text: "View Live Deployment",
      url: "https://bank-issue-intent-classifier.vercel.app",
    },
    tags: ["NLP", "Banking77", "TF-IDF", "Flask", "SQLite", "Production"],
  },
  {
    id: "proj-lora",
    period: "2026",
    title: "LoRA Parameter-Efficient Fine-Tuning Pipeline",
    subtitle: "LLM Fine-Tuning with Unsloth",
    organization: "Independent Research",
    type: "project",
    description:
      "Constructed an end-to-end LoRA instruction fine-tuning pipeline for 4-bit quantized Qwen2.5-0.5B using Unsloth. Configured linear adapter projections, chat templates, and low-latency response generation.",
    evidenceLink: {
      text: "View Repository",
      url: "https://github.com/Rohitk69992/lora-fine-tune-a-tiny-chat-model-with-unsloth",
    },
    tags: ["LLMs", "LoRA", "Unsloth", "PEFT", "Qwen2.5-0.5B"],
  },
  {
    id: "cert-ds",
    period: "Verified Coursework",
    title: "Data Science & Machine Learning Specialization",
    subtitle: "Comprehensive Applied ML Curriculum",
    organization: "Udemy / Krish Naik",
    type: "certification",
    description:
      "In-depth practical curriculum covering end-to-end data science: exploratory data analysis with Pandas and NumPy, statistical hypothesis testing, Scikit-learn machine learning algorithms, model evaluation techniques, and deployment workflows.",
    tags: ["Data Science", "Scikit-learn", "Python", "Exploratory Data Analysis"],
  },
];
