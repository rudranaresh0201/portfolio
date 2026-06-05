import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, ChevronDown, ChevronUp, Trophy } from 'lucide-react';

const PROJECTS = [
  {
    id: 1,
    title: 'ClinIQ',
    subtitle: 'Agentic Medical Intelligence Platform',
    description:
      'Multi-agent clinical workflow covering symptom extraction, differential diagnosis generation, India-specific epidemiology reranking, risk stratification, monitoring-plan creation, escalation handling, and doctor-facing patient timeline management.',
    highlights: [
      'DeepDive lab report analysis engine — ingests structured lab PDFs, generates clinician-grade interpretations.',
      'OpenRouter as LLM fallback layer for resilience across model providers.',
      'Supabase-backed persistence for patient sessions and doctor console state.',
      'Deployed on Render + Vercel with Docker CI/CD via GitHub Actions.',
    ],
    tags: ['Python', 'FastAPI', 'ChromaDB', 'Supabase', 'Groq', 'TypeScript'],
    category: 'AI/ML',
    github: 'https://github.com/rudranaresh0201',
    featured: true,
    accentColor: '#818cf8',
  },
  {
    id: 2,
    title: 'CrewAI CSV Analytics Agent',
    subtitle: '7-Agent Natural Language Analytics',
    description:
      'Production-grade multi-agent system for natural-language analytics over CSV/XLSX files: ingestion → schema profiling → cleaning → LLM query planning → AST-sandboxed execution → validation → insight generation.',
    highlights: [
      'Secure code-execution sandbox (safe_executor.py) using Python\'s ast module — blocks imports, dunder access, and dangerous builtins.',
      'Persona-aware answer generation (Risk Analyst, Compliance Officer, Student, General).',
      '3-attempt LLM retry loop via OpenRouter; full pytest suite and CLI entry point.',
    ],
    tags: ['Python', 'CrewAI', 'pandas', 'OpenRouter', 'AST'],
    category: 'AI/ML',
    github: 'https://github.com/rudranaresh0201',
    featured: true,
    accentColor: '#22d3ee',
  },
  {
    id: 3,
    title: 'RAG Knowledge Assistant',
    subtitle: 'Hybrid Dense + Sparse Retrieval',
    description:
      'End-to-end document ingestion pipeline using PyMuPDF, overlapping chunking (650-char windows, 100-char overlap), and dense embeddings via BAAI/bge-base-en-v1.5 persisted in ChromaDB.',
    highlights: [
      'Hybrid retrieval: dense vector search (cosine) + sparse BM25 (Okapi), fused with s = 1.4·s_vec + 1.0·s_BM25 + 0.35|Q∩T|.',
      'Post-filtered top-5 chunks with deduplication via Jaccard ≥ 0.85 and trigram-repeat detection.',
      'OpenRouter (primary) + TinyLlama-1.1B offline fallback; React frontend.',
    ],
    tags: ['Python', 'FastAPI', 'ChromaDB', 'BM25', 'Sentence-Transformers', 'React'],
    category: 'AI/ML',
    github: 'https://github.com/rudranaresh0201',
    featured: false,
    accentColor: '#a78bfa',
  },
  {
    id: 4,
    title: 'Loan Risk Intelligence System',
    subtitle: 'LSTM-Based Financial Risk Prediction',
    description:
      'Deep learning model for financial risk prediction with an LSTM architecture, a hybrid ML + rule-based decision framework, and an interactive React dashboard for real-time analytics.',
    highlights: [
      'LSTM-based deep learning model for sequential financial data.',
      'Hybrid ML + rule-based decision framework for loan risk scoring.',
      'Interactive dashboard for real-time risk analytics and visualisation.',
    ],
    tags: ['Python', 'PyTorch', 'LSTM', 'React'],
    category: 'AI/ML',
    github: 'https://github.com/rudranaresh0201',
    featured: false,
    accentColor: '#34d399',
  },
  {
    id: 6,
    title: 'AI Web Application Firewall',
    subtitle: 'Transformer-Based Anomaly Detection',
    description:
      'Transformer-based deep learning pipeline for web request classification and real-time anomaly detection for web traffic. Built for Smart India Hackathon 2025 — Shortlisted.',
    highlights: [
      'Transformer model fine-tuned for web traffic classification.',
      'Real-time anomaly detection pipeline for HTTP request streams.',
      'SIH 2025 — Shortlisted from thousands of national submissions.',
    ],
    tags: ['Python', 'Transformers', 'PyTorch', 'Deep Learning'],
    category: 'AI/ML',
    github: 'https://github.com/rudranaresh0201',
    featured: false,
    accentColor: '#f472b6',
    badge: 'SIH 2025 — Shortlisted',
  },
];

const FILTERS = ['All', 'AI/ML'];

function ProjectCard({ project }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 24 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="glass rounded-2xl overflow-hidden flex flex-col glow-border group"
      style={{ borderColor: 'rgba(255,255,255,0.07)' }}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
    >
      {/* Accent top bar */}
      <div
        className="h-0.5 w-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, ${project.accentColor}, transparent)` }}
      />

      <div className="p-5 flex flex-col flex-1">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1">
            {project.badge && (
              <div className="flex items-center gap-1.5 mb-2">
                <Trophy size={11} className="text-yellow-400" />
                <span className="font-mono text-[10px] text-yellow-400 font-semibold tracking-wide">
                  {project.badge}
                </span>
              </div>
            )}
            <h3 className="font-bold text-white text-base leading-tight">{project.title}</h3>
            <p className="text-xs mt-0.5" style={{ color: project.accentColor }}>
              {project.subtitle}
            </p>
          </div>

          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-white transition-colors"
            style={{ background: 'rgba(255,255,255,0.05)' }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.93 }}
          >
            <Github size={14} />
          </motion.a>
        </div>

        {/* Description */}
        <p className="text-slate-400 text-sm leading-relaxed mb-3">
          {project.description}
        </p>

        {/* Highlights (collapsible) */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.ul
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="space-y-1.5 mb-3 overflow-hidden"
            >
              {project.highlights.map((h, i) => (
                <li key={i} className="flex gap-2 text-xs text-slate-400 leading-relaxed">
                  <span style={{ color: project.accentColor }} className="flex-shrink-0 mt-0.5">
                    ›
                  </span>
                  {h}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>

        {/* Toggle highlights */}
        <button
          onClick={() => setExpanded((p) => !p)}
          className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-300 transition-colors mb-4"
        >
          {expanded ? (
            <>
              <ChevronUp size={12} /> Hide details
            </>
          ) : (
            <>
              <ChevronDown size={12} /> Show details
            </>
          )}
        </button>

        {/* Tags */}
        <div className="mt-auto flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered =
    activeFilter === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="py-24 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-12"
        >
          <p className="section-label mb-3">03. projects</p>
          <h2
            className="font-black tracking-tight text-white mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}
          >
            Things I've{' '}
            <span className="gradient-text">Built</span>
          </h2>
          <p className="text-slate-400 text-base leading-relaxed max-w-2xl">
            From multi-agent AI systems and RAG pipelines to self-balancing robots —
            each project ships real, working code.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="flex items-center gap-2 mb-10 flex-wrap"
        >
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeFilter === f
                  ? 'text-white'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
              style={
                activeFilter === f
                  ? { background: 'linear-gradient(135deg,rgba(99,102,241,0.3),rgba(6,182,212,0.2))', border: '1px solid rgba(129,140,248,0.3)' }
                  : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }
              }
            >
              {f}
              <span className="ml-1.5 font-mono text-xs opacity-60">
                {f === 'All' ? PROJECTS.length : PROJECTS.filter((p) => p.category === f).length}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Cards grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mt-14"
        >
          <a
            href="https://github.com/rudranaresh0201"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 btn-ghost"
          >
            <Github size={15} />
            View all repos on GitHub
            <ExternalLink size={12} className="opacity-60" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
