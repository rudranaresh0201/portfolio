import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, ChevronDown, ChevronUp, Trophy } from 'lucide-react';

/* ── Architecture diagram components ────────────────────────── */

function ClinIQDiagram() {
  const nodes = [
    { label: 'Symptom\nExtract', color: '#818cf8' },
    { label: 'Differential\nDx', color: '#a78bfa' },
    { label: 'Epidemiology\nRerank', color: '#22d3ee' },
    { label: 'Risk\nStratify', color: '#f472b6' },
    { label: 'Doctor\nDashboard', color: '#34d399' },
  ];
  return (
    <div className="mt-3 mb-4 rounded-xl overflow-hidden" style={{ background: 'rgba(129,140,248,0.04)', border: '1px solid rgba(129,140,248,0.1)' }}>
      <div className="px-3 pt-2.5 pb-1 flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
        <span className="font-mono text-[9px] text-slate-500 tracking-widest">MULTI-AGENT PIPELINE</span>
      </div>
      <div className="px-3 pb-3 flex items-center gap-1 flex-wrap">
        <div className="text-[9px] font-mono text-slate-500 px-2 py-1 rounded-md"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
          Patient Input
        </div>
        {nodes.map((n, i) => (
          <div key={i} className="flex items-center gap-1">
            <svg width="10" height="10" viewBox="0 0 10 10">
              <path d="M2 5 L8 5 M6 3 L8 5 L6 7" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div className="text-[9px] font-mono px-2 py-1 rounded-md whitespace-pre-line text-center leading-tight"
              style={{ background: `${n.color}10`, border: `1px solid ${n.color}30`, color: n.color }}>
              {n.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RAGDiagram() {
  const ingest = ['PDF', 'PyMuPDF', 'Chunk\n650/100', 'BAAI\nEmbed', 'ChromaDB'];
  const retrieve = ['Query', 'Dense\ncosine', 'BM25\nOkapi', 'RRF\nFusion', 'LLM\nResponse'];
  const Row = ({ label, nodes, color }) => (
    <div className="flex items-center gap-1 flex-wrap">
      <span className="font-mono text-[8px] text-slate-600 w-12 flex-shrink-0">{label}</span>
      {nodes.map((n, i) => (
        <div key={i} className="flex items-center gap-0.5">
          {i > 0 && (
            <svg width="8" height="8" viewBox="0 0 8 8">
              <path d="M1 4 L7 4 M5 2 L7 4 L5 6" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
          <div className="text-[8px] font-mono px-1.5 py-0.5 rounded whitespace-pre-line text-center leading-tight"
            style={{ background: `${color}10`, border: `1px solid ${color}25`, color }}>
            {n}
          </div>
        </div>
      ))}
    </div>
  );
  return (
    <div className="mt-3 mb-4 rounded-xl overflow-hidden" style={{ background: 'rgba(34,211,238,0.03)', border: '1px solid rgba(34,211,238,0.1)' }}>
      <div className="px-3 pt-2.5 pb-1 flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
        <span className="font-mono text-[9px] text-slate-500 tracking-widest">HYBRID RETRIEVAL PIPELINE</span>
      </div>
      <div className="px-3 pb-3 space-y-2">
        <Row label="INGEST" nodes={ingest} color="#22d3ee" />
        <Row label="QUERY" nodes={retrieve} color="#818cf8" />
      </div>
    </div>
  );
}

function CrewAIDiagram() {
  const nodes = ['Ingest', 'Schema\nProfile', 'Clean', 'LLM\nPlan', 'AST\nExec', 'Validate', 'Insights'];
  return (
    <div className="mt-3 mb-4 rounded-xl overflow-hidden" style={{ background: 'rgba(34,211,238,0.03)', border: '1px solid rgba(34,211,238,0.1)' }}>
      <div className="px-3 pt-2.5 pb-1 flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
        <span className="font-mono text-[9px] text-slate-500 tracking-widest">7-AGENT PIPELINE</span>
      </div>
      <div className="px-3 pb-3 flex items-center gap-1 flex-wrap">
        {nodes.map((n, i) => (
          <div key={i} className="flex items-center gap-0.5">
            {i > 0 && (
              <svg width="8" height="8" viewBox="0 0 8 8">
                <path d="M1 4 L7 4 M5 2 L7 4 L5 6" stroke="rgba(255,255,255,0.15)" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
            <div className="text-[9px] font-mono px-1.5 py-0.5 rounded whitespace-pre-line text-center leading-tight"
              style={{ background: 'rgba(34,211,238,0.08)', border: '1px solid rgba(34,211,238,0.2)', color: '#67e8f9' }}>
              {n}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Data ─────────────────────────────────────────────────────── */
const PROJECTS = [
  {
    id: 1,
    title: 'ClinIQ',
    subtitle: 'Agentic Medical Intelligence Platform',
    hook: 'What if a junior doctor had infinite memory, never got tired, and actually read the PubMed papers? Built that.',
    description: 'Multi-agent clinical workflow: symptom extraction → differential diagnosis → India-specific epidemiology reranking → risk stratification → monitoring plan → doctor-facing patient timeline.',
    Diagram: ClinIQDiagram,
    highlights: [
      'DeepDive lab report analysis engine — ingests structured PDFs, generates clinician-grade interpretations.',
      'OpenRouter LLM fallback layer for resilience across model providers.',
      'Supabase-backed persistence; deployed on Render + Vercel with Docker CI/CD via GitHub Actions.',
    ],
    stats: ['7 Specialist Agents', 'Render + Vercel', 'Docker CI/CD'],
    tags: ['Python', 'FastAPI', 'ChromaDB', 'Supabase', 'Groq', 'TypeScript'],
    category: 'AI/ML',
    github: 'https://github.com/rudranaresh0201',
    accentColor: '#818cf8',
  },
  {
    id: 2,
    title: 'CrewAI CSV Analytics Agent',
    subtitle: '7-Agent Natural Language Analytics',
    hook: 'Seven agents, one CSV, zero hallucinated pandas code. The AST sandbox physically cannot let the LLM do anything dangerous.',
    description: 'Natural-language analytics over CSV/XLSX: ingestion → schema profiling → cleaning → LLM query planning → AST-sandboxed execution → validation → insight generation.',
    Diagram: CrewAIDiagram,
    highlights: [
      'Secure code-execution sandbox (safe_executor.py) — AST validates every LLM-generated pandas snippet before execution.',
      'Persona-aware output (Risk Analyst, Compliance Officer, Student, General) with 3-attempt OpenRouter retry loop.',
      'Full pytest suite and CLI entry point.',
    ],
    stats: ['7 Agents', 'AST Sandboxed', '3-Attempt Retry'],
    tags: ['Python', 'CrewAI', 'pandas', 'OpenRouter', 'AST'],
    category: 'AI/ML',
    github: 'https://github.com/rudranaresh0201',
    accentColor: '#22d3ee',
  },
  {
    id: 3,
    title: 'RAG Knowledge Assistant',
    subtitle: 'Hybrid Dense + Sparse Retrieval',
    hook: 'Built because I was tired of LLMs confidently making things up. Now it cannot — hallucination guard blocks generation when retrieval confidence falls below threshold.',
    description: 'End-to-end document intelligence: PyMuPDF ingestion, overlapping chunking (650/100 chars), BAAI/bge-base-en-v1.5 embeddings into ChromaDB. Retrieval fuses dense vector search and BM25 via Reciprocal Rank Fusion.',
    Diagram: RAGDiagram,
    highlights: [
      'RRF fusion: s = 1.4·s_vec + 1.0·s_BM25 + 0.35|Q∩T| with length-quality penalties and keyword-hit bonuses.',
      'Post-filtered top-5 chunks: Jaccard ≥ 0.85 dedup, trigram-repeat detection.',
      '8 production bugs fixed — including a data-loss race condition on re-upload and a hallucination baked into the fallback path.',
    ],
    stats: ['RRF Fusion', 'Jaccard Dedup', '2 LLM Providers'],
    tags: ['Python', 'FastAPI', 'ChromaDB', 'BM25', 'Sentence-Transformers', 'React'],
    category: 'AI/ML',
    github: 'https://github.com/rudranaresh0201',
    accentColor: '#a78bfa',
  },
  {
    id: 4,
    title: 'Loan Risk Intelligence System',
    subtitle: 'LSTM-Based Financial Risk Prediction',
    hook: 'Banks use rules written in Excel. I used an LSTM. The LSTM won.',
    description: 'LSTM deep learning model for financial risk prediction with a hybrid ML + rule-based decision framework and a React dashboard for real-time analytics.',
    highlights: [
      'LSTM architecture for sequential financial data modelling.',
      'Hybrid ML + rule-based scoring framework.',
      'Interactive React dashboard for real-time risk analytics.',
    ],
    stats: ['LSTM Model', 'Hybrid Framework', 'React Dashboard'],
    tags: ['Python', 'PyTorch', 'LSTM', 'React'],
    category: 'AI/ML',
    github: 'https://github.com/rudranaresh0201',
    accentColor: '#34d399',
  },
  {
    id: 5,
    title: 'AI Web Application Firewall',
    subtitle: 'Transformer-Based Anomaly Detection',
    hook: 'Turned a transformer — the thing that writes poetry — into a bouncer that reads HTTP requests and decides who gets kicked out.',
    description: 'Transformer-based deep learning pipeline for web request classification and real-time anomaly detection. Built for Smart India Hackathon 2025.',
    highlights: [
      'Transformer model fine-tuned for web traffic classification.',
      'Real-time anomaly detection pipeline for HTTP request streams.',
    ],
    stats: ['Transformer Model', 'Real-Time Detection', 'SIH 2025'],
    tags: ['Python', 'Transformers', 'PyTorch', 'Deep Learning'],
    category: 'AI/ML',
    github: 'https://github.com/rudranaresh0201',
    accentColor: '#f472b6',
    badge: 'SIH 2025 — Shortlisted',
  },
];

const FILTERS = ['All', 'AI/ML'];

/* ── Card ─────────────────────────────────────────────────────── */
function ProjectCard({ project }) {
  const [expanded, setExpanded] = useState(false);
  const Diagram = project.Diagram;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="glass rounded-2xl overflow-hidden flex flex-col group"
      style={{ border: '1px solid rgba(255,255,255,0.07)' }}
      whileHover={{ y: -4, transition: { duration: 0.22 } }}
    >
      <div className="h-0.5 w-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, ${project.accentColor}, transparent)` }} />

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex-1 min-w-0">
            {project.badge && (
              <div className="flex items-center gap-1 mb-1.5">
                <Trophy size={10} className="text-yellow-400 flex-shrink-0" />
                <span className="font-mono text-[9px] text-yellow-400 font-semibold tracking-wide">{project.badge}</span>
              </div>
            )}
            <h3 className="font-bold text-white leading-tight">{project.title}</h3>
            <p className="text-xs mt-0.5" style={{ color: project.accentColor }}>{project.subtitle}</p>
          </div>
          <motion.a href={project.github} target="_blank" rel="noopener noreferrer"
            className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-white transition-colors"
            style={{ background: 'rgba(255,255,255,0.05)' }}
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.93 }}>
            <Github size={13} />
          </motion.a>
        </div>

        <p className="text-xs italic mb-2 leading-relaxed"
          style={{ color: project.accentColor, opacity: 0.8 }}>
          "{project.hook}"
        </p>

        <p className="text-slate-400 text-sm leading-relaxed mb-3">{project.description}</p>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.stats.map((s) => (
            <span key={s} className="font-mono text-[9px] px-2 py-0.5 rounded-full"
              style={{ background: `${project.accentColor}0d`, color: project.accentColor, border: `1px solid ${project.accentColor}20` }}>
              {s}
            </span>
          ))}
        </div>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              {Diagram && <Diagram />}
              <ul className="space-y-1.5 mb-3">
                {project.highlights.map((h, i) => (
                  <li key={i} className="flex gap-2 text-xs text-slate-400 leading-relaxed">
                    <span className="flex-shrink-0 mt-0.5" style={{ color: project.accentColor }}>›</span>
                    {h}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        <button onClick={() => setExpanded((p) => !p)}
          className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-300 transition-colors mb-4">
          {expanded
            ? <><ChevronUp size={11} /> Hide details</>
            : <><ChevronDown size={11} /> Architecture + details</>}
        </button>

        <div className="mt-auto flex flex-wrap gap-1.5">
          {project.tags.map((t) => <span key={t} className="tag">{t}</span>)}
        </div>
      </div>
    </motion.div>
  );
}

/* ── Section ──────────────────────────────────────────────────── */
export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const filtered = activeFilter === 'All' ? PROJECTS : PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="py-24 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-12"
        >
          <p className="section-label mb-3">03. projects</p>
          <h2 className="font-black tracking-tight text-white mb-3"
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
            Things I've <span className="gradient-text">Built</span>
          </h2>
          <p className="text-slate-400 text-base max-w-xl">
            Click "Architecture + details" on any card to see the pipeline diagram and deep technical notes.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2 mb-10 flex-wrap"
        >
          {FILTERS.map((f) => (
            <button key={f} onClick={() => setActiveFilter(f)}
              className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
              style={activeFilter === f
                ? { background: 'linear-gradient(135deg,rgba(99,102,241,0.3),rgba(6,182,212,0.2))', border: '1px solid rgba(129,140,248,0.3)', color: 'white' }
                : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', color: '#64748b' }}>
              {f}
              <span className="ml-1.5 font-mono text-xs opacity-60">
                {f === 'All' ? PROJECTS.length : PROJECTS.filter((p) => p.category === f).length}
              </span>
            </button>
          ))}
        </motion.div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => <ProjectCard key={p.id} project={p} />)}
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="text-center mt-14"
        >
          <a href="https://github.com/rudranaresh0201" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 btn-ghost">
            <Github size={14} />
            View all repos
            <ExternalLink size={11} className="opacity-50" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
