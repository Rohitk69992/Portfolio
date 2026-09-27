import { Project } from "@/lib/types";

export const FEATURED_PROJECT_SLUGS = [
  "quantum-inspired-vehicle-routing-problem-solution",
  "bank-issue-intent-classifier",
  "uidai-gov-data-hackathon",
  "lora-fine-tune-a-tiny-chat-model-with-unsloth",
];

export const PROJECTS: Project[] = [
  {
    id: "proj-1",
    slug: "quantum-inspired-vehicle-routing-problem-solution",
    name: "Quantum-Inspired Intelligent Traffic Route Optimization",
    shortDescription:
      "Closed-loop dynamic fleet routing platform combining microscopic traffic simulation (Eclipse SUMO) with quantum-inspired metaheuristics (QPSO, QAOA, ALNS, HGS, HiGHS MILP).",
    problemSummary:
      "Commercial navigation tools only do point-to-point pathfinding without vehicle payload capacity awareness, causing secondary congestion and fleet underutilization in congested urban grids.",
    solutionSummary:
      "Engineered a dual-layer CVRP architecture coupling live microscopic simulation (3,559 nodes, 8,263 edges at 2 Hz) with combinatorial optimization and dynamic in-transit rerouting.",
    technologies: [
      "Python 3.11",
      "Eclipse SUMO",
      "TraCI",
      "NetworkX",
      "QPSO",
      "QAOA (Qiskit)",
      "ALNS",
      "HGS (Vidal Split)",
      "HiGHS MILP",
      "FastAPI",
      "WebSockets",
      "SQLite",
      "Leaflet",
    ],
    githubUrl: "https://github.com/Rohitk69992/Quantum-Inspired-Vehicle-Routing-Problem-Solution",
    featured: true,
    category: "Optimization",
    caseStudy: {
      overview:
        "Developed to address the Smart India Hackathon challenge (SIH26137: Quantum-Inspired Intelligent Traffic Route Optimization in Transportation Systems Using Metaheuristic Optimization), this platform bridges microscopic traffic physics and combinatorial optimization. It moves beyond toy Euclidean distance models by routing capacity-constrained fleets over a live, time-varying metropolitan road network.",
      problemStatement:
        "Modern urban logistics operators face a dual challenge: partitioning N delivery orders across K capacity-constrained vehicles (Capacitated Vehicle Routing Problem, CVRP) while traversing road networks where dynamic congestion shocks rapidly invalidate static shortest-path assumptions. CVRP is strongly NP-hard, scaling super-exponentially as O(K^N * (N/K)!^K), making exact techniques intractable for real-time fleet dispatching.",
      motivation:
        "Standard commercial navigation tools (Google Maps, Waze) perform selfish 1-to-1 pathfinding without vehicle capacity constraints or fleet-level coordination, which diverts entire fleets into the same corridors and creates secondary gridlock. Urban distribution requires system-optimal, capacity-aware fleet scheduling.",
      requirements: [
        "Ingest physical road networks (osm.net.xml.gz) with real lane counts, speed limits, and signalized junctions.",
        "Synchronize with Eclipse SUMO microscopic simulation via a bidirectional TraCI socket at 2 Hz.",
        "Maintain a dynamic directed graph G(t) where edge weights update based on live vehicle velocities: w_e(t) = L_e / max(v_e(t), 0.1).",
        "Enforce strict vehicle capacity invariants: sum(d_i) <= C_k for all vehicles k.",
        "Support multi-algorithm solver taxonomy: Exact MIP (HiGHS MTZ), QPSO, QAOA simulator, ALNS, and HGS.",
        "Detect traffic bottlenecks (congestion ratio > 1.5) and dynamically trigger in-transit rerouting without disrupting completed stops.",
        "Stream live telemetry over WebSockets to an operator dashboard and persist runs in SQLite for paired statistical evaluation.",
      ],
      systemArchitecture: {
        title: "Dual-Layer Closed-Loop Architecture",
        description:
          "The system separates combinatorial customer sequence partitioning (Layer 1) from dynamic road-level path synthesis (Layer 2) and live in-transit state management (Layer 3).",
        flowSteps: [
          {
            step: "Microscopic Ingestion & Simulation",
            detail: "Eclipse SUMO runs Krauss car-following and LC2013 lane-changing models over 3,559 nodes and 8,263 edges. TraCI exposes socket telemetry at 2 Hz.",
          },
          {
            step: "Dynamic Graph Construction G(t)",
            detail: "TraCI extracts edge velocities v_e(t) and occupancy, updating dynamic edge traversal weights w_e(t) across the NetworkX graph.",
          },
          {
            step: "Dynamic Metric Closures",
            detail: "All-pairs travel time matrix C_ij(t) is computed across customer nodes via vectorized Dijkstra sweeps over live road conditions.",
          },
          {
            step: "Combinatorial Fleet VRP Solver",
            detail: "The selected solver (QPSO, QAOA, ALNS, HGS, or HiGHS) partitions customer demands among K vehicles satisfying capacity limits.",
          },
          {
            step: "Microscopic Injection & Telemetry",
            detail: "Routes are synthesized into turn-by-turn lane trajectories and injected back into SUMO vehicles via traci.vehicle.setRoute.",
          },
          {
            step: "In-Transit Adaptive Rerouting",
            detail: "When an edge's congestion ratio exceeds 1.5, the DynamicRerouter locks completed deliveries and re-optimizes remaining pending stops using updated G(t).",
          },
        ],
      },
      mathematicalFormulations: [
        {
          title: "Capacitated Vehicle Routing Problem (CVRP) Objective",
          formula: "min J = alpha * Total_Travel_Time(t) + beta * Distance + gamma * Congestion_Penalty",
          explanation:
            "Minimizes a composite multi-objective cost function across all active vehicle routes subject to degree constraints, sub-tour elimination (Miller-Tucker-Zemlin MTZ), and vehicle capacity constraints.",
        },
        {
          title: "Quantum-Behaved PSO Position Update",
          formula: "X_i(t+1) = p_i(t) +/- alpha_qpso * |mbest(t) - X_i(t)| * ln(1 / u)",
          explanation:
            "In QPSO, particles move under a quantum delta-potential well rather than Newtonian velocity vectors. The wave function collapse allows particles to probabilistically tunnel out of local optima. Continuous coordinates are discretized using Ranked Order Value (ROV) mapping.",
        },
        {
          title: "Dynamic Edge Weight Formulation",
          formula: "w_e(t) = L_e / max(v_e(t), 0.1)",
          explanation:
            "Edge weights dynamically adjust based on live microscopic vehicle speed readings from TraCI, preventing division-by-zero during complete gridlock.",
        },
      ],
      algorithmsUsed: [
        {
          name: "HiGHS Exact Mixed Integer Linear Programming (MILP)",
          role: "Theoretical Ground Truth Baseline",
          rationale:
            "Solves the Miller-Tucker-Zemlin formulation with Branch-and-Cut for small instances (N <= 8) to establish the true global optimum for heuristic gap benchmarking.",
        },
        {
          name: "Quantum-Behaved Particle Swarm Optimization (QPSO)",
          role: "Quantum-Inspired Metaheuristic Solver",
          rationale:
            "Utilizes quantum delta-potential wave collapse to avoid premature convergence in high-dimensional permutation spaces.",
        },
        {
          name: "Quantum Approximate Optimization Algorithm (QAOA)",
          role: "Variational Quantum Circuit Formulation",
          rationale:
            "Maps CVRP to Quadratic Unconstrained Binary Optimization (QUBO) and an Ising Hamiltonian, simulated via Qiskit Statevector for small problem instances.",
        },
        {
          name: "Adaptive Large Neighborhood Search (ALNS)",
          role: "Real-Time In-Transit Reactive Engine",
          rationale:
            "Employs Shaw relatedness, worst-cost, and random destroy operators with greedy and regret-2 repair heuristics. Executes in sub-2ms, making it ideal for online incident rerouting.",
        },
        {
          name: "Hybrid Genetic Search (HGS / Vidal Split)",
          role: "High-Capacity Offline Fleet Dispatcher",
          rationale:
            "Represents tours as giant permutations without vehicle delimiters and extracts optimal route splits in O(N^2) time with biased fitness diversity.",
        },
      ],
      dataPipeline: {
        datasetName: "Metropolitan OpenStreetMap Road Network (Pune Region)",
        source: "OpenStreetMap exported to SUMO network format (osm.net.xml.gz)",
        processingSteps: [
          "Export road network geometry and intersection topologies via netconvert.",
          "Construct directed NetworkX multigraph preserving lane counts, speed limits, and traffic signal timings.",
          "Simulate synthetic delivery order distributions with stochastic payload demands (10 to 100 units).",
          "Continuously poll TraCI socket at 2 Hz to update dynamic edge attributes.",
        ],
      },
      engineeringDetails: [
        "Built modular Python backend with FastAPI and asynchronous event loop for TraCI socket polling.",
        "Implemented WebSocket broadcaster pushing 2 Hz vehicle coordinates, velocity vectors, and route polylines to frontend.",
        "Constructed in-transit state machine tracking vehicle state: IDLE -> EN_ROUTE -> SERVICING -> REROUTING -> COMPLETED.",
        "Stored experiment runs and latency telemetry in SQLite for statistical significance analysis.",
      ],
      evaluation: {
        metricsRecorded: [
          { label: "SUMO Network Scale", value: "3,559 Nodes / 8,263 Edges", note: "Physical directed urban graph" },
          { label: "TraCI Polling Frequency", value: "2 Hz (0.5s timesteps)", note: "Discrete microscopic simulation" },
          { label: "ALNS Execution Latency", value: "< 2 ms", note: "Sub-second reactive reroute capability" },
          { label: "Exact MILP Solvability", value: "N <= 8 orders", note: "Intractable beyond small scale due to NP-hardness" },
        ],
        observations: [
          "Under free-flow conditions, heuristic solvers (HGS, QPSO, ALNS) achieve solutions within 1-3% of the HiGHS exact lower bound on small benchmark instances.",
          "When traffic incidents were injected into arterial corridors, static routing resulted in severe vehicle delays, whereas dynamic closed-loop rerouting diverted downstream vehicles before entering congested shockwaves.",
        ],
      },
      challengesEncountered: [
        "TraCI socket synchronization overhead: Polling individual edges iteratively caused frame drops. Solved by bulk-reading edge subscriptions and caching dynamic graph weights.",
        "Subtour elimination in mixed-integer programming: MTZ formulations scale quadratically with N. Verified that exact MILP is only practical for establishing baseline bounds on small subproblems.",
      ],
      lessonsLearned: [
        "Combinatorial optimization must be tightly integrated with microscopic traffic dynamics; decoupling them produces solutions that fail in non-stationary traffic.",
        "No single algorithm dominates all dimensions: exact solvers provide rigorous bounds, ALNS provides sub-2ms reaction speed, and HGS provides superior solution quality for large instances.",
      ],
      futureImprovements: [
        "Incorporate multi-depot fleet configurations and electric vehicle (EV) state-of-charge battery constraints.",
        "Deploy distributed solver workers via Ray for larger-scale regional networks.",
      ],
    },
  },
  {
    id: "proj-2",
    slug: "bank-issue-intent-classifier",
    name: "Bank Issue Intent Classifier",
    shortDescription:
      "End-to-end NLP system classifying customer banking queries into fine-grained intent categories using TF-IDF and Multinomial Logistic Regression with Flask and SQLite.",
    problemSummary:
      "Customer banking support tickets cover high volumes of nuanced complaints (failed card payments, transfer delays, KYC failures) requiring automated classification and confidence logging.",
    solutionSummary:
      "Built a production NLP pipeline using Scikit-learn, TF-IDF feature engineering, and Logistic Regression with Top-K confidence scoring, Flask web UI, SQLite audit logging, and Render deployment.",
    technologies: [
      "Python",
      "Scikit-learn",
      "TF-IDF Vectorizer",
      "Logistic Regression",
      "Flask",
      "SQLite",
      "Pandas",
      "NumPy",
      "Gunicorn",
      "Render",
    ],
    githubUrl: "https://github.com/Rohitk69992/Bank-Issue-Intent-Classifier",
    liveUrl: "https://bank-issue-intent-classifier.vercel.app",
    featured: true,
    category: "NLP",
    caseStudy: {
      overview:
        "An end-to-end natural language processing web application designed to categorize customer banking queries into predefined intent categories. Built with Scikit-learn and deployed via Flask and Render, the system provides real-time intent classification with confidence scoring and persistent audit logging.",
      problemStatement:
        "Financial institutions receive thousands of customer queries daily across diverse domains—including card transactions, wire transfers, identity verification, and dispute resolution. Manual routing introduces operational latency, human triage error, and inconsistent response times.",
      motivation:
        "The goal was to build a complete, self-contained NLP serving application demonstrating how classical statistical NLP methods can deliver high-speed, interpretable inference with minimal computational footprint compared to bulky multi-gigabyte models.",
      requirements: [
        "Clean, normalize, and tokenize arbitrary user banking complaint text.",
        "Construct an optimized TF-IDF matrix capturing unigram and bigram signals.",
        "Train and evaluate a multi-class Logistic Regression classifier on customer support queries.",
        "Output top-K intent predictions with calibrated softmax probability confidence scores.",
        "Persist all incoming queries, predicted intents, confidence scores, and timestamps to an SQLite database.",
        "Provide a clean web UI for interactive query testing and CSV log export.",
      ],
      systemArchitecture: {
        title: "NLP Serving Pipeline Architecture",
        description:
          "User queries pass through text preprocessing, TF-IDF vectorization, Logistic Regression inference, confidence extraction, and simultaneous database logging.",
        flowSteps: [
          {
            step: "Client Input",
            detail: "User submits banking query via web frontend or HTTP POST endpoint.",
          },
          {
            step: "Text Preprocessing",
            detail: "Lowercasing, punctuation stripping, whitespace normalization, and stopword consideration.",
          },
          {
            step: "TF-IDF Vector Transformation",
            detail: "Pre-fitted TF-IDF vectorizer maps normalized text tokens into high-dimensional sparse numerical feature vector.",
          },
          {
            step: "Logistic Regression Inference",
            detail: "Multinomial Logistic Regression calculates class logits and applies softmax to generate intent probability distribution.",
          },
          {
            step: "Top-K Confidence Ranking",
            detail: "The top predicted intent and its confidence percentage are formatted alongside secondary candidate intents.",
          },
          {
            step: "Persistent Audit Logging",
            detail: "Prediction record is inserted into SQLite table (query, intent, confidence, timestamp) and appended to CSV audit log.",
          },
        ],
      },
      mathematicalFormulations: [
        {
          title: "TF-IDF Weighting",
          formula: "w_{t, d} = \\text{tf}(t, d) \\times \\ln\\left(\\frac{1 + N}{1 + \\text{df}(t)}\\right) + 1",
          explanation:
            "Penalizes ubiquitous conversational words while emphasizing terms with high discriminatory power for specific banking problems (e.g., 'chargeback', 'declined', 'PIN').",
        },
        {
          title: "Multinomial Logistic Regression Softmax",
          formula: "P(Y = k | x) = \\frac{\\exp(w_k^T x + b_k)}{\\sum_{j=1}^K \\exp(w_j^T x + b_j)}",
          explanation:
            "Maps the linear combination of TF-IDF feature weights to a calibrated probability simplex across all intent classes.",
        },
      ],
      algorithmsUsed: [
        {
          name: "TF-IDF Vectorizer",
          role: "Feature Extraction & Text Representation",
          rationale:
            "Fast, computationally lightweight, deterministic, and highly effective for domain-specific vocabulary classification without requiring GPU acceleration.",
        },
        {
          name: "Multinomial Logistic Regression",
          role: "Multi-Class Intent Classifier",
          rationale:
            "Provides convex optimization, rapid inference (< 5 ms), interpretable feature coefficients, and well-calibrated class probability estimates.",
        },
      ],
      dataPipeline: {
        datasetName: "Banking77 Dataset",
        source: "Hugging Face Datasets repository (77 fine-grained banking intent categories)",
        processingSteps: [
          "Imported customer query samples covering account services, cards, payments, and security.",
          "Applied text normalization: lowercasing, regex cleaning, and special character removal.",
          "Configured sublinear term frequency scaling and n-gram ranges (1, 2) to capture compound terms like 'card declined'.",
          "Partitioned into train and validation splits for model evaluation.",
        ],
      },
      engineeringDetails: [
        "Designed modular Flask project layout separating routing, ML pipeline serialization, and database models.",
        "Serialized trained Scikit-learn pipeline using joblib for zero-downtime serving.",
        "Implemented SQLite schema with indexing on timestamp and intent for fast historical querying.",
        "Configured Gunicorn WSGI server and Render deployment pipeline for public accessibility.",
      ],
      evaluation: {
        metricsRecorded: [
          { label: "Inference Latency", value: "< 10 ms", note: "CPU inference per query" },
          { label: "Intent Classes", value: "Banking77 Domain", note: "Fine-grained intent categorization" },
          { label: "Deployment Platform", value: "Vercel / Render", note: "Publicly accessible web application" },
        ],
        observations: [
          "TF-IDF with Logistic Regression demonstrated strong discriminatory ability on clear, keyword-dense banking queries.",
          "Ambiguous queries with overlapping terms (e.g., 'lost card' vs 'stolen identity') were captured through Top-K confidence scoring rather than hard single-class collapse.",
        ],
      },
      challengesEncountered: [
        "Handling out-of-vocabulary slang and domain typos: Addressed through character/sublinear n-gram configurations and confidence thresholding.",
        "SQLite concurrency under multiple simultaneous requests: Implemented proper connection lifecycle management per Flask request.",
      ],
      lessonsLearned: [
        "For narrow, domain-specific text classification, classical statistical NLP models (TF-IDF + Logistic Regression) offer immense inference speed and near-zero hosting costs compared to large transformer models.",
        "Auditing and logging predictions is essential for observing model drift and identifying queries where user confidence falls below operational thresholds.",
      ],
      futureImprovements: [
        "Add intent confidence threshold fallback to a human agent review queue when confidence drops below 60%.",
        "Benchmark against lightweight transformer distillations (e.g., DistilBERT) to evaluate latency-accuracy tradeoffs.",
      ],
    },
  },
  {
    id: "proj-3",
    slug: "uidai-gov-data-hackathon",
    name: "National Aadhaar Governance Risk & Strategy Dashboard",
    shortDescription:
      "Interactive data intelligence and geospatial risk dashboard analyzing 1M+ Aadhaar transaction records to optimize state and district-level operational execution.",
    problemSummary:
      "Public governance datasets contain millions of records across states and districts, making it difficult for policy operators to identify enrollment bottlenecks, regional discrepancies, and execution priorities.",
    solutionSummary:
      "Engineered an automated data processing pipeline and Streamlit dashboard using Plotly Express and India GeoJSON to visualize state strategies, district priorities, and execution queues.",
    technologies: [
      "Python",
      "Streamlit",
      "Plotly Express",
      "Pandas",
      "GeoJSON",
      "Requests",
      "Data Analytics",
    ],
    githubUrl: "https://github.com/Rohitk69992/UIDAI-GOV-DATA-HACKATHON",
    featured: true,
    category: "Data Analytics",
    caseStudy: {
      overview:
        "Built for the UIDAI Government Data Hackathon, this project delivers a data-driven governance risk dashboard. It processes large-scale transaction datasets exceeding 1,000,000 records to extract actionable state and district-level operational strategies.",
      problemStatement:
        "Managing nationwide identity operations involves monitoring hundreds of administrative districts across 36 states and union territories. Raw tabular logs obscure critical execution disparities, regional backlog surges, and resource allocation imbalances.",
      motivation:
        "To provide policy decision-makers with an operational intelligence tool that transforms raw transactional data into prioritized queues and interactive geospatial heatmaps.",
      requirements: [
        "Process multi-part datasets comprising over 1,000,000 Aadhaar operational records.",
        "Standardize and normalize heterogeneous state and union territory naming conventions across datasets.",
        "Calculate state-level activity distributions, risk percentiles, and operational priority scores.",
        "Generate concrete district-level strategic execution queues.",
        "Render an interactive choropleth map of India with GeoJSON polygon mapping for intuitive spatial analysis.",
      ],
      systemArchitecture: {
        title: "Governance Data Processing & Dashboard Architecture",
        description:
          "Tabular datasets are ingested in batches, normalized, enriched with risk metrics, and rendered across KPI cards, choropleth maps, and execution queues.",
        flowSteps: [
          {
            step: "Batch Ingestion",
            detail: "Ingested segmented CSV files (0-5L, 5L-10L, 10L+ records) totaling over 1,000,000 entries.",
          },
          {
            step: "Entity Normalization",
            detail: "Implemented map-safe state name normalizer mapping union territory variants to official GeoJSON feature names.",
          },
          {
            step: "Statistical Aggregation",
            detail: "Computed state activity summaries, district strategies, and backlog intensity metrics.",
          },
          {
            step: "Geospatial Polygon Mapping",
            detail: "Integrated India states GeoJSON with Plotly Express to visualize regional variance dynamically.",
          },
          {
            step: "Operational Execution Queue",
            detail: "Formatted high-priority district remediation actions into interactive Streamlit data tables.",
          },
        ],
      },
      algorithmsUsed: [
        {
          name: "Stratified Regional Aggregation",
          role: "Feature Aggregation & Summarization",
          rationale:
            "Enables rapid multi-level drill-down from national totals to state percentages and district-level action items.",
        },
        {
          name: "Geospatial Choropleth Mapping",
          role: "Spatial Visualization",
          rationale:
            "Allows immediate visual identification of contiguous geographic clusters experiencing operational friction.",
        },
      ],
      dataPipeline: {
        datasetName: "UIDAI Governance Operational Datasets",
        source: "Government Hackathon Data Portal (Aadhaar transaction logs)",
        processingSteps: [
          "Loaded partitioned CSV files totaling 1,006,029 records.",
          "Cleaned null values, resolved date string formats, and unified district identifiers.",
          "Synthesized derived metrics: state activity percentage, district strategic index, and execution queue rankings.",
          "Exported structured analytical tables: state_strategy.csv, district_strategy.csv, execution_queue.csv.",
        ],
      },
      engineeringDetails: [
        "Built responsive, multi-column Streamlit application configured for wide-screen operational display.",
        "Implemented safe external GeoJSON fetching with error handling and local caching fallback.",
        "Structured data outputs into modular CSV pipelines enabling independent dashboard updates without re-running data prep.",
      ],
      evaluation: {
        metricsRecorded: [
          { label: "Total Records Analyzed", value: "1,006,029 Records", note: "Processed across multi-part datasets" },
          { label: "Spatial Coverage", value: "All Indian States & UTs", note: "Normalized to GeoJSON boundaries" },
          { label: "Dashboard Framework", value: "Streamlit + Plotly", note: "Interactive analytical frontend" },
        ],
        observations: [
          "Standardizing string representations of states was critical for zero-loss geospatial rendering in GeoJSON choropleths.",
          "Decomposing national data into priority execution queues provided actionable operational recommendations rather than passive metrics.",
        ],
      },
      challengesEncountered: [
        "Memory management with million-row DataFrames: Partitioned processing into discrete notebooks and exported lightweight pre-aggregated strategy matrices.",
      ],
      lessonsLearned: [
        "Data science in public governance succeeds when it bridges the gap between raw statistical data and practical execution checklists for administrators.",
      ],
      futureImprovements: [
        "Integrate automated anomaly detection algorithms to flag statistical spikes in district transactions in real time.",
      ],
    },
  },
  {
    id: "proj-4",
    slug: "lora-fine-tune-a-tiny-chat-model-with-unsloth",
    name: "LoRA Fine-Tuning a Tiny Chat Model (Qwen2.5-0.5B)",
    shortDescription:
      "End-to-end Parameter-Efficient Fine-Tuning (PEFT) pipeline using LoRA and Unsloth to train a 4-bit quantized Qwen2.5-0.5B instruction chat model.",
    problemSummary:
      "Full fine-tuning of modern language models requires prohibitive GPU VRAM. Applying parameter-efficient techniques on quantized architectures enables customization on consumer-grade hardware.",
    solutionSummary:
      "Implemented a complete LoRA pipeline using Unsloth: loading 4-bit NF4 quantized base, targeting linear projection matrices, formatting instruction datasets, and running supervised fine-tuning.",
    technologies: [
      "Python",
      "Unsloth",
      "PyTorch",
      "Hugging Face",
      "LoRA / PEFT",
      "Qwen2.5-0.5B",
      "bitsandbytes",
    ],
    githubUrl: "https://github.com/Rohitk69992/lora-fine-tune-a-tiny-chat-model-with-unsloth",
    featured: true,
    category: "NLP",
    caseStudy: {
      overview:
        "Built an end-to-end parameter-efficient fine-tuning (PEFT) pipeline for a 4-bit quantized Qwen2.5-0.5B chat model using the Unsloth library. The workflow demonstrates how low-rank adaptation allows rapid model specialization with minimal memory overhead.",
      problemStatement:
        "Fine-tuning large language models via full parameter backpropagation requires massive GPU memory to store optimizer states, gradients, and model weights. Even small models become unwieldy without parameter-efficient quantization techniques.",
      motivation:
        "To explore cutting-edge open-source LLM optimization frameworks (Unsloth, bitsandbytes) and verify how low-rank matrix decomposition enables effective instruction fine-tuning on resource-constrained environments.",
      requirements: [
        "Load Qwen2.5-0.5B base model in 4-bit NormalFloat (NF4) quantization.",
        "Verify tokenizer configuration and ensure explicit pad token assignment.",
        "Attach low-rank adapter (LoRA) matrices to target attention and MLP projection layers.",
        "Format a chat instruction dataset using standard chat templates (roles: user, assistant).",
        "Execute a supervised fine-tuning (SFT) training loop and generate validation responses.",
      ],
      systemArchitecture: {
        title: "LoRA PEFT Fine-Tuning Pipeline",
        description:
          "The pipeline freezes the 4-bit quantized base model weights and trains low-rank adapter matrices (A and B) on target projection layers.",
        flowSteps: [
          {
            step: "Base Model & Tokenizer Ingestion",
            detail: "Unsloth loads Qwen2.5-0.5B with 4-bit bitsandbytes quantization, reducing memory footprint by ~70%.",
          },
          {
            step: "Quantization & Invariant Verification",
            detail: "Validates 4-bit linear layers and ensures pad_token and eos_token alignment.",
          },
          {
            step: "LoRA Adapter Attachment",
            detail: "Injects trainable low-rank matrices across q_proj, k_proj, v_proj, o_proj, gate_proj, up_proj, and down_proj.",
          },
          {
            step: "Chat Template Dataset Formatting",
            detail: "Maps instruction datasets into conversation turns with standardized system and assistant delimiters.",
          },
          {
            step: "Supervised Fine-Tuning (SFT)",
            detail: "Executes optimized forward and backward passes using Unsloth custom kernels for reduced activation memory.",
          },
          {
            step: "Inference & Generation",
            detail: "Generates autoregressive responses from the adapted model verifying adherence to target instruction styles.",
          },
        ],
      },
      mathematicalFormulations: [
        {
          title: "Low-Rank Adaptation (LoRA) Formulation",
          formula: "W' = W_0 + \\Delta W = W_0 + \\frac{\\alpha}{r} (B \\times A)",
          explanation:
            "Freezes pre-trained weights W_0 in R^{d x k} and represents the weight update Delta W as the product of two low-rank matrices B in R^{d x r} and A in R^{r x k} where rank r << min(d, k), slashing trainable parameter counts by over 95%.",
        },
      ],
      algorithmsUsed: [
        {
          name: "Low-Rank Adaptation (LoRA)",
          role: "Parameter-Efficient Training",
          rationale:
            "Restricts optimization to low-intrinsic-dimension adapter subspaces, preventing catastrophic forgetting and drastically reducing optimizer memory.",
        },
        {
          name: "4-bit NormalFloat (NF4) Quantization",
          role: "Weight Compression",
          rationale:
            "Theoretically optimal quantile-based information-theoretic quantization for normally distributed neural network weights.",
        },
      ],
      dataPipeline: {
        datasetName: "Tiny Instruction Chat Dataset",
        source: "Hugging Face formatted instruction conversation dataset",
        processingSteps: [
          "Tokenized conversational prompts with role-based formatting.",
          "Applied sequence length padding and attention masking.",
          "Masked prompt tokens during loss calculation so only assistant responses contribute to gradients.",
        ],
      },
      engineeringDetails: [
        "Structured modular scaffolding script (scaffold.py) with programmatic step-by-step verification checks.",
        "Configured Unsloth kernels to leverage fused cross-entropy and fast RoPE embeddings.",
      ],
      evaluation: {
        metricsRecorded: [
          { label: "Base Model", value: "Qwen2.5-0.5B Chat", note: "Compact transformer architecture" },
          { label: "Quantization Precision", value: "4-bit NF4", note: "Reduced precision weight representation" },
          { label: "Tuning Methodology", value: "LoRA Adapters", note: "Parameter-efficient fine-tuning" },
        ],
        observations: [
          "Unsloth custom CUDA/Triton kernels provided significant acceleration over naive Hugging Face PEFT implementations.",
          "The fine-tuned 0.5B model maintained chat fluency while successfully adopting specialized instruction patterns.",
        ],
      },
      challengesEncountered: [
        "Ensuring correct padding token configuration: Qwen tokenizers require explicit pad token handling to avoid infinite generation loops.",
      ],
      lessonsLearned: [
        "Modern PEFT methods democratize LLM research, allowing genuine fine-tuning experiments on commodity GPUs.",
      ],
      futureImprovements: [
        "Evaluate multi-task instruction datasets and benchmark perplexity on domain-specific benchmarks.",
      ],
    },
  },
  {
    id: "proj-5",
    slug: "handling-imbalanced-dataset-using-resampling-technique",
    name: "Fraud Detection: Resampling & Imbalanced Learning",
    shortDescription:
      "Systematic experimentation evaluating Random Upsampling, Random Downsampling, and SMOTE on highly skewed financial fraud detection datasets.",
    problemSummary:
      "In financial fraud datasets, legitimate transactions outnumber fraudulent events by orders of magnitude, causing naive classifiers to achieve high accuracy while failing to detect critical frauds.",
    solutionSummary:
      "Implemented a comparative evaluation framework exploring resampling strategies, confusion matrix trade-offs, and precision-recall metrics on skewed fraud data.",
    technologies: [
      "Python",
      "Scikit-learn",
      "Pandas",
      "NumPy",
      "SMOTE",
      "Imbalanced-Learn",
      "Matplotlib",
    ],
    githubUrl: "https://github.com/Rohitk69992/Handling-Imbalanced-Dataset-Using-Resampling-Technique",
    featured: false,
    category: "Machine Learning",
    caseStudy: {
      overview:
        "An applied machine learning study investigating how class imbalance affects classification decision boundaries. Using financial fraud datasets, this project benchmarks minority upsampling, majority downsampling, and synthetic minority over-sampling (SMOTE).",
      problemStatement:
        "Standard machine learning objective functions optimize global accuracy, which penalizes minority errors negligibly when fraud constitutes under 1% of the distribution. A trivial model predicting all non-fraud can achieve 99% accuracy while having 0% recall on fraud.",
      motivation:
        "To establish a repeatable, principled methodology for training and validating classifiers on severely imbalanced datasets without introducing data leakage.",
      requirements: [
        "Quantify class distribution ratios in transaction data.",
        "Implement baseline classification without resampling.",
        "Implement and evaluate Random Minority Upsampling.",
        "Implement and evaluate Random Majority Downsampling.",
        "Implement and evaluate SMOTE synthetic sampling.",
        "Measure true positive recall vs false positive trade-offs.",
      ],
      systemArchitecture: {
        title: "Imbalanced Learning Pipeline",
        description:
          "Data split -> Resampling applied ONLY to training fold -> Model training -> Evaluation on un-resampled test fold.",
        flowSteps: [
          {
            step: "Stratified Train-Test Split",
            detail: "Preserves the true minority-to-majority proportion in the validation holdout set to ensure unbiased evaluation.",
          },
          {
            step: "Resampling Pipeline",
            detail: "Applies resampling (Upsampling, Downsampling, or SMOTE) strictly on the training partition to prevent data leakage.",
          },
          {
            step: "Estimator Fitting",
            detail: "Trains classification estimators on balanced feature spaces.",
          },
          {
            step: "Metric Evaluation",
            detail: "Evaluates models using Precision-Recall curves, Recall, and F1-score rather than misleading overall accuracy.",
          },
        ],
      },
      algorithmsUsed: [
        {
          name: "SMOTE (Synthetic Minority Over-sampling Technique)",
          role: "Synthetic Data Generation",
          rationale:
            "Creates synthetic samples along feature-space line segments joining k-nearest minority neighbors, avoiding exact duplicate overfitting.",
        },
        {
          name: "Random Under/Over Sampling",
          role: "Heuristic Resampling Baseline",
          rationale:
            "Provides standard comparative baselines for measuring the marginal benefit of synthetic generation.",
        },
      ],
      dataPipeline: {
        datasetName: "Financial Fraud Detection Dataset",
        source: "Tabular transaction dataset with skewed binary fraud labels",
        processingSteps: [
          "Analyzed skewness and feature correlations.",
          "Standardized numerical continuous variables.",
          "Generated balanced training splits via respective resampling strategies.",
        ],
      },
      engineeringDetails: [
        "Structured reproducible Jupyter Notebooks detailing step-by-step methodology.",
        "Visualized decision boundary shifts and confusion matrix distributions.",
      ],
      evaluation: {
        metricsRecorded: [
          { label: "Focus Metric", value: "Recall & PR-AUC", note: "Accuracy is non-informative on imbalanced sets" },
          { label: "Resampling Evaluated", value: "Upsampling, Downsampling, SMOTE", note: "Comparative benchmark" },
        ],
        observations: [
          "Random downsampling reduced computational training time but discarded potentially valuable majority-class boundary information.",
          "SMOTE improved minority recall significantly while maintaining reasonable precision compared to naive duplication.",
        ],
      },
      challengesEncountered: [
        "Preventing data leakage: Synthetic samples generated before cross-validation corrupt test set validity. Enforced strict pipeline ordering.",
      ],
      lessonsLearned: [
        "In mission-critical domains like fraud detection, model evaluation metrics must align with business cost asymmetries: missing a fraudulent transaction is far costlier than investigating a false alarm.",
      ],
      futureImprovements: [
        "Explore cost-sensitive learning algorithms and focal loss formulations as alternatives to explicit data resampling.",
      ],
    },
  },
  {
    id: "proj-6",
    slug: "cnn-car-object-detection",
    name: "CNN Car Object Detection",
    shortDescription:
      "Deep learning pipeline using Convolutional Neural Networks for visual feature extraction and vehicle localization from imagery.",
    problemSummary:
      "Automated vehicle identification from image feeds requires robust feature representation invariant to varying lighting, scale, and background clutter.",
    solutionSummary:
      "Implemented a Convolutional Neural Network architecture designed for vehicle feature detection and spatial localization.",
    technologies: [
      "Python",
      "Convolutional Neural Networks",
      "Computer Vision",
      "Jupyter Notebook",
    ],
    githubUrl: "https://github.com/Rohitk69992/CNN-Car-Object-Detection",
    featured: false,
    category: "Computer Vision",
    caseStudy: {
      overview:
        "An exploration of convolutional architectures applied to urban vehicle detection. Explores how spatial convolutional kernels extract hierarchical visual features—from edges and textures to vehicle silhouettes.",
      problemStatement:
        "Urban vision systems need to identify vehicles reliably under diverse perspectives, occlusions, and background environments.",
      motivation:
        "To gain hands-on architectural understanding of 2D convolutions, pooling layers, and spatial feature maps in deep visual recognition.",
      requirements: [
        "Preprocess and normalize input image datasets.",
        "Design convolutional layers with appropriate receptive fields.",
        "Implement pooling operations for spatial downsampling and translation invariance.",
        "Evaluate detection performance across sample images.",
      ],
      systemArchitecture: {
        title: "CNN Vision Pipeline",
        description:
          "Input image -> Convolutional Feature Extractor -> Max Pooling -> Dense Classification / Localization head.",
        flowSteps: [
          {
            step: "Image Preprocessing",
            detail: "Resizing images to uniform resolution, normalizing pixel intensities to [0, 1].",
          },
          {
            step: "Hierarchical Convolution",
            detail: "Applies 3x3 filter kernels to extract low-level edges transitioning to high-level vehicle semantics.",
          },
          {
            step: "Spatial Downsampling",
            detail: "Max pooling layers reduce feature map dimensions while preserving dominant activations.",
          },
          {
            step: "Output Prediction",
            detail: "Dense layers output probability distribution for vehicle presence and spatial boundaries.",
          },
        ],
      },
      algorithmsUsed: [
        {
          name: "2D Convolutional Layers",
          role: "Spatial Feature Extraction",
          rationale:
            "Explores local connectivity and weight sharing to capture spatial hierarchies efficiently.",
        },
      ],
      dataPipeline: {
        datasetName: "Car Object Detection Dataset",
        source: "Vehicle imagery dataset",
        processingSteps: [
          "Image batch loading and color space standardization.",
          "Train/test partitioning.",
        ],
      },
      engineeringDetails: [
        "Structured in interactive Jupyter Notebook documenting layer outputs and activation patterns.",
      ],
      evaluation: {
        metricsRecorded: [
          { label: "Domain", value: "Computer Vision / CNN", note: "Deep learning experimentation" },
        ],
        observations: [
          "Convolutional architectures demonstrate superior parameter efficiency over fully-connected networks for image classification tasks.",
        ],
      },
      challengesEncountered: [
        "Balancing network depth with computational training time on limited hardware.",
      ],
      lessonsLearned: [
        "Spatial convolutions form the bedrock of modern autonomous driving perception and traffic surveillance systems.",
      ],
      futureImprovements: [
        "Experiment with modern one-stage object detection architectures (e.g., YOLO variants) for real-time bounding box regression.",
      ],
    },
  },
  {
    id: "proj-7",
    slug: "movie-recommendation-system",
    name: "Movie Recommendation System",
    shortDescription:
      "Content-based movie recommendation engine utilizing metadata feature extraction, TF-IDF vectorization, and cosine similarity calculations.",
    problemSummary:
      "Users face information overload across streaming catalogs, requiring automated content filtering based on genre, overview synopsis, and metadata similarity.",
    solutionSummary:
      "Developed a content-based recommendation engine to suggest similar movies using Python, Scikit-learn, TF-IDF vectorization, and cosine distance matrices.",
    technologies: [
      "Python",
      "Scikit-learn",
      "Pandas",
      "NumPy",
      "TF-IDF",
      "Cosine Similarity",
    ],
    githubUrl: "https://github.com/Rohitk69992",
    featured: false,
    category: "Machine Learning",
    caseStudy: {
      overview:
        "A content-based recommendation engine developed to suggest similar movies based on semantic feature matching across movie genres, overview descriptions, and metadata attributes.",
      problemStatement:
        "Large entertainment catalogs make manual discovery inefficient. Content-based filtering computes pairwise distances across high-dimensional feature vectors to surface relevant content.",
      motivation:
        "To explore vector space similarity models and understand the practical mechanics of content-based vs collaborative filtering.",
      requirements: [
        "Ingest and clean movie metadata dataset.",
        "Perform text normalization on overviews and genre tags.",
        "Construct numerical representation using TF-IDF or count vectorization.",
        "Compute cosine similarity matrix across catalog items.",
        "Return top-N recommended titles for any query film.",
      ],
      systemArchitecture: {
        title: "Recommendation Pipeline",
        description:
          "Metadata cleaning -> Feature bag creation -> TF-IDF vector matrix -> Cosine similarity index -> Top-K retrieval.",
        flowSteps: [
          {
            step: "Data Ingestion & Cleaning",
            detail: "Parse movie metadata, handle missing values, and extract genres and keywords.",
          },
          {
            step: "Feature Vectorization",
            detail: "Transform combined textual metadata into high-dimensional sparse TF-IDF vectors.",
          },
          {
            step: "Similarity Matrix Calculation",
            detail: "Compute dot-product cosine similarity across normalized vector spaces.",
          },
          {
            step: "Ranked Retrieval",
            detail: "Sort similarity scores and retrieve top-N closest items excluding self-match.",
          },
        ],
      },
      algorithmsUsed: [
        {
          name: "Cosine Similarity",
          role: "Pairwise Distance Metric",
          rationale:
            "Measures the cosine of the angle between two multi-dimensional feature vectors, normalizing for document length.",
        },
        {
          name: "TF-IDF Vectorizer",
          role: "Text Representation",
          rationale:
            "Weights distinctive descriptive terms higher while discounting common words.",
        },
      ],
      dataPipeline: {
        datasetName: "Movie Metadata Dataset",
        source: "Tabular movie catalog",
        processingSteps: [
          "Extracted genres, overview synopsis, and title strings.",
          "Merged textual features into a consolidated soup string per title.",
        ],
      },
      engineeringDetails: [
        "Constructed modular Python recommendation function with indexed similarity matrix lookup.",
      ],
      evaluation: {
        metricsRecorded: [
          { label: "Methodology", value: "Content-Based Filtering", note: "Cosine similarity matrix" },
        ],
        observations: [
          "Content-based filtering provides instant recommendations for newly added items without requiring user interaction history (cold start friendly).",
        ],
      },
      challengesEncountered: [
        "Memory scaling of full pairwise N x N similarity matrices for large catalogs. Solved by pruning vocabulary and computing top-K nearest neighbors.",
      ],
      lessonsLearned: [
        "Feature engineering quality in the metadata soup directly determines recommendation relevance.",
      ],
      futureImprovements: [
        "Incorporate hybrid collaborative filtering and neural embeddings for richer semantic similarity.",
      ],
    },
  },
];
