import { SkillGroup } from "@/lib/types";

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "Programming & Languages",
    description: "Core languages used for algorithm implementation, scripting, and data pipelines.",
    skills: [
      { name: "Python", context: "Primary language for ML, optimization algorithms, and backend services (Python 3.11+)", highlight: true },
      { name: "SQL", context: "Relational data modeling, schema definition, and analytical queries", highlight: true },
    ],
  },
  {
    category: "Data Processing & Analytics",
    description: "Libraries for vector manipulation, tabular data wrangling, and statistical visualization.",
    skills: [
      { name: "Pandas", context: "Data cleaning, feature transformation, aggregation, and time-series manipulation" },
      { name: "NumPy", context: "Vectorized linear algebra, numerical array operations, and matrix calculations" },
      { name: "Matplotlib", context: "Plotting experimental loss curves, route topologies, and distribution charts" },
      { name: "Seaborn", context: "Statistical correlation heatmaps, pairplots, and distribution visualizations" },
    ],
  },
  {
    category: "Machine Learning",
    description: "Classical and statistical ML methods, feature engineering, and validation.",
    skills: [
      { name: "Scikit-learn", context: "Estimators, transformers, cross-validation, and metrics evaluation", highlight: true },
      { name: "Classification", context: "Multi-class intent detection, fraud classification, logistic regression, decision boundaries" },
      { name: "Feature Engineering", context: "TF-IDF matrix construction, text preprocessing, scaling, and categorical encoding" },
      { name: "Model Evaluation", context: "Confusion matrices, Top-K confidence metrics, Precision-Recall curves, F1-scores" },
      { name: "Imbalanced Learning", context: "SMOTE, Random Upsampling, Random Downsampling on skewed distributions" },
      { name: "Clustering & RecSys", context: "Unsupervised grouping and similarity-based recommendation systems" },
    ],
  },
  {
    category: "Deep Learning & Computer Vision",
    description: "Neural network architectures for spatial representation and visual recognition.",
    skills: [
      { name: "Convolutional Neural Networks (CNN)", context: "Feature extraction, pooling, convolution layers for spatial pattern recognition" },
      { name: "Computer Vision", context: "Image preprocessing, bounding box localization, car object detection" },
      { name: "Object Detection", context: "Vehicle localization and detection from imagery datasets" },
    ],
  },
  {
    category: "Natural Language Processing & LLMs",
    description: "Techniques for text vectorization, intent understanding, and parameter-efficient fine-tuning.",
    skills: [
      { name: "TF-IDF Vectorization", context: "N-gram sub-linear term frequency and inverse document frequency matrices" },
      { name: "Intent Classification", context: "Banking77 customer query classification with confidence thresholding", highlight: true },
      { name: "LoRA & PEFT", context: "Parameter-Efficient Fine-Tuning with Unsloth on 4-bit quantized Qwen2.5-0.5B", highlight: true },
      { name: "Text Preprocessing", context: "Tokenization, stopword filtering, punctuation stripping, and lemmatization" },
    ],
  },
  {
    category: "Combinatorial Optimization & Simulation",
    description: "Metaheuristics, quantum-inspired algorithms, and microscopic traffic modeling.",
    skills: [
      { name: "QPSO (Quantum-Behaved PSO)", context: "Quantum delta-potential continuous search with ROV discrete discretization", highlight: true },
      { name: "QAOA (Quantum Approximate Optimization)", context: "QUBO / Ising Hamiltonian mapping for CVRP formulation exploration" },
      { name: "ALNS (Adaptive Large Neighborhood Search)", context: "Roulette-wheel destroy & repair operators with Simulated Annealing" },
      { name: "HGS (Hybrid Genetic Search)", context: "Vidal Split algorithm for giant tours with biased fitness diversity" },
      { name: "Eclipse SUMO & TraCI", context: "Microscopic traffic simulation (3,559 nodes, 8,263 edges) with live socket control", highlight: true },
      { name: "Dynamic Graph Theory", context: "Time-dependent edge weight updates w_e(t) = L_e / v_e(t) over directed road graphs" },
    ],
  },
  {
    category: "Backend & System Engineering",
    description: "Architectures for serving machine learning models and real-time state synchronization.",
    skills: [
      { name: "FastAPI", context: "Asynchronous REST endpoints, Pydantic request validation, WebSocket broadcasting", highlight: true },
      { name: "Flask", context: "Production WSGI service for model inference serving with Gunicorn" },
      { name: "REST APIs & WebSockets", context: "Real-time telemetry streaming (2 Hz) and synchronous inference endpoints" },
      { name: "SQLite & PostgreSQL", context: "Relational persistence for prediction audit logs, simulation experiments, and telemetry" },
      { name: "Git & GitHub", context: "Version control, branching workflows, pull requests, open-source documentation" },
    ],
  },
];
