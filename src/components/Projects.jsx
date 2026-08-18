import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, ChevronDown, ChevronUp, Trophy, BookOpen } from 'lucide-react';
import { TiltCard } from './Motion';

/* ── Architecture diagram components ────────────────────────── */

function Arrow() {
  return (
    <svg width="8" height="8" viewBox="0 0 8 8">
      <path d="M1 4 L7 4 M5 2 L7 4 L5 6" stroke="rgba(24,20,15,0.22)" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PRGuardDiagram() {
  const nodes = [
    { label: 'Triage', color: '#c1861a' },
    { label: 'Security', color: '#c23c1b' },
    { label: 'Docs', color: '#1f7d68' },
    { label: 'Bug\nDetect', color: '#c2528f' },
    { label: 'API\nChange', color: '#e8542e' },
    { label: 'Critical\nFile Audit', color: '#155f4d' },
    { label: 'CodeRAG\nIndex', color: '#996a11' },
    { label: 'Checks\nAPI', color: '#e0a52c' },
  ];
  return (
    <div className="mt-3 mb-4 rounded-xl overflow-hidden" style={{ background: 'rgba(232,84,46,0.04)', border: '1px solid rgba(232,84,46,0.15)' }}>
      <div className="px-3 pt-2.5 pb-1 flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-coral-400" />
        <span className="font-mono text-[9px] text-ink-500 tracking-widest">8-NODE LANGGRAPH PIPELINE</span>
      </div>
      <div className="px-3 pb-3 flex items-center gap-1 flex-wrap">
        <div className="text-[9px] font-mono text-ink-500 px-2 py-1 rounded-md"
          style={{ background: 'rgba(24,20,15,0.04)', border: '1px solid rgba(24,20,15,0.08)' }}>
          PR Event
        </div>
        {nodes.map((n, i) => (
          <div key={i} className="flex items-center gap-0.5">
            <Arrow />
            <div className="text-[9px] font-mono px-1.5 py-0.5 rounded whitespace-pre-line text-center leading-tight"
              style={{ background: `${n.color}12`, border: `1px solid ${n.color}30`, color: n.color }}>
              {n.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AriaDiagram() {
  const agents = ['Gmail', 'GitHub', 'Calendar', 'Code Exec', 'Data Analysis', '+ 5 more'];
  return (
    <div className="mt-3 mb-4 rounded-xl overflow-hidden" style={{ background: 'rgba(31,125,104,0.04)', border: '1px solid rgba(31,125,104,0.15)' }}>
      <div className="px-3 pt-2.5 pb-1 flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
        <span className="font-mono text-[9px] text-ink-500 tracking-widest">MULTI-AGENT ORCHESTRATION</span>
      </div>
      <div className="px-3 pb-3 space-y-2">
        <div className="flex items-center gap-1 flex-wrap">
          <span className="font-mono text-[8px] text-ink-300 w-20 flex-shrink-0">PIPELINE</span>
          {['Orchestrator', 'Synthesis', 'Critic', 'HiTL Approval'].map((n, i) => (
            <div key={i} className="flex items-center gap-0.5">
              {i > 0 && <Arrow />}
              <div className="text-[9px] font-mono px-1.5 py-0.5 rounded"
                style={{ background: 'rgba(31,125,104,0.1)', border: '1px solid rgba(31,125,104,0.28)', color: '#155f4d' }}>
                {n}
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-1 flex-wrap">
          <span className="font-mono text-[8px] text-ink-300 w-20 flex-shrink-0">RETRIEVAL</span>
          {['HyDE Expand', 'Dense Vec', 'BM25', 'RRF Fuse', 'Cross-Enc Rerank'].map((n, i) => (
            <div key={i} className="flex items-center gap-0.5">
              {i > 0 && <Arrow />}
              <div className="text-[9px] font-mono px-1.5 py-0.5 rounded"
                style={{ background: 'rgba(193,134,26,0.08)', border: '1px solid rgba(193,134,26,0.24)', color: '#996a11' }}>
                {n}
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-1 flex-wrap">
          <span className="font-mono text-[8px] text-ink-300 w-20 flex-shrink-0">AGENTS</span>
          {agents.map((n, i) => (
            <div key={i} className="text-[9px] font-mono px-1.5 py-0.5 rounded"
              style={{ background: 'rgba(194,82,143,0.08)', border: '1px solid rgba(194,82,143,0.24)', color: '#a5406f' }}>
              {n}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MCPDiagram() {
  return (
    <div className="mt-3 mb-4 rounded-xl overflow-hidden" style={{ background: 'rgba(193,134,26,0.04)', border: '1px solid rgba(193,134,26,0.15)' }}>
      <div className="px-3 pt-2.5 pb-1 flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
        <span className="font-mono text-[9px] text-ink-500 tracking-widest">TRANSPARENT VERIFICATION PROXY</span>
      </div>
      <div className="px-3 pb-3 space-y-2">
        <div className="flex items-center gap-1 flex-wrap">
          <span className="font-mono text-[8px] text-ink-300 w-14 flex-shrink-0">STDIO</span>
          <div className="text-[9px] font-mono px-2 py-1 rounded-md"
            style={{ background: 'rgba(24,20,15,0.04)', border: '1px solid rgba(24,20,15,0.08)', color: '#332c22' }}>
            MCP Host
          </div>
          <Arrow />
          <div className="text-[9px] font-mono px-2 py-1 rounded-md"
            style={{ background: 'rgba(193,134,26,0.1)', border: '1px solid rgba(193,134,26,0.3)', color: '#996a11' }}>
            verimcp
          </div>
          <Arrow />
          <div className="text-[9px] font-mono px-2 py-1 rounded-md"
            style={{ background: 'rgba(31,125,104,0.08)', border: '1px solid rgba(31,125,104,0.26)', color: '#155f4d' }}>
            devmcp (git/CI)
          </div>
        </div>
        <div className="flex items-center gap-1 flex-wrap">
          <span className="font-mono text-[8px] text-ink-300 w-14 flex-shrink-0">CHECKS</span>
          {['pre-check: dedupe retries', 'post-check: verify claims', 'policy gates', 'OTel spans'].map((n, i) => (
            <div key={i} className="text-[9px] font-mono px-1.5 py-0.5 rounded"
              style={{ background: 'rgba(232,84,46,0.08)', border: '1px solid rgba(232,84,46,0.22)', color: '#c23c1b' }}>
              {n}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ClinIQDiagram() {
  const nodes = [
    { label: 'Symptom\nExtract', color: '#8a4a2e' },
    { label: 'Differential\nDx', color: '#c2528f' },
    { label: 'Epidemiology\nRerank', color: '#1f7d68' },
    { label: 'Risk\nStratify', color: '#c1861a' },
    { label: 'Doctor\nDashboard', color: '#155f4d' },
  ];
  return (
    <div className="mt-3 mb-4 rounded-xl overflow-hidden" style={{ background: 'rgba(138,74,46,0.04)', border: '1px solid rgba(138,74,46,0.15)' }}>
      <div className="px-3 pt-2.5 pb-1 flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#8a4a2e' }} />
        <span className="font-mono text-[9px] text-ink-500 tracking-widest">MULTI-AGENT PIPELINE</span>
      </div>
      <div className="px-3 pb-3 flex items-center gap-1 flex-wrap">
        <div className="text-[9px] font-mono text-ink-500 px-2 py-1 rounded-md"
          style={{ background: 'rgba(24,20,15,0.04)', border: '1px solid rgba(24,20,15,0.08)' }}>
          Patient Input
        </div>
        {nodes.map((n, i) => (
          <div key={i} className="flex items-center gap-1">
            <Arrow />
            <div className="text-[9px] font-mono px-2 py-1 rounded-md whitespace-pre-line text-center leading-tight"
              style={{ background: `${n.color}12`, border: `1px solid ${n.color}30`, color: n.color }}>
              {n.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ComputerUseDiagram() {
  return (
    <div className="mt-3 mb-4 rounded-xl overflow-hidden" style={{ background: 'rgba(194,82,143,0.04)', border: '1px solid rgba(194,82,143,0.15)' }}>
      <div className="px-3 pt-2.5 pb-1 flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-[#c2528f]" />
        <span className="font-mono text-[9px] text-ink-500 tracking-widest">PERCEIVE → DECIDE → ACT LOOP</span>
      </div>
      <div className="px-3 pb-3 space-y-2">
        <div className="flex items-center gap-1 flex-wrap">
          <span className="font-mono text-[8px] text-ink-300 w-16 flex-shrink-0">PERCEIVE</span>
          {['Windows UIA tree', 'Vision fallback (screenshot)'].map((n, i) => (
            <div key={i} className="flex items-center gap-0.5">
              {i > 0 && <Arrow />}
              <div className="text-[9px] font-mono px-1.5 py-0.5 rounded"
                style={{ background: 'rgba(194,82,143,0.09)', border: '1px solid rgba(194,82,143,0.26)', color: '#a5406f' }}>
                {n}
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-1 flex-wrap">
          <span className="font-mono text-[8px] text-ink-300 w-16 flex-shrink-0">DECIDE</span>
          {['Scripted brain', 'Local VLM', 'Hosted model', 'Qwen2-VL-2B + LoRA'].map((n, i) => (
            <div key={i} className="flex items-center gap-0.5">
              {i > 0 && <Arrow />}
              <div className="text-[9px] font-mono px-1.5 py-0.5 rounded"
                style={{ background: 'rgba(193,134,26,0.08)', border: '1px solid rgba(193,134,26,0.24)', color: '#996a11' }}>
                {n}
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-1 flex-wrap">
          <span className="font-mono text-[8px] text-ink-300 w-16 flex-shrink-0">ACT</span>
          <div className="text-[9px] font-mono px-1.5 py-0.5 rounded"
            style={{ background: 'rgba(31,125,104,0.08)', border: '1px solid rgba(31,125,104,0.24)', color: '#155f4d' }}>
            click / type / scroll on real OS
          </div>
          <Arrow />
          <div className="text-[9px] font-mono px-1.5 py-0.5 rounded"
            style={{ background: 'rgba(24,20,15,0.04)', border: '1px solid rgba(24,20,15,0.1)', color: '#332c22' }}>
            loop until goal met
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Data ─────────────────────────────────────────────────────── */
const PROJECTS = [
  {
    id: 1,
    title: 'PRGuard',
    subtitle: 'Autonomous PR Governance Agent',
    hook: 'Pull requests reviewed by a pipeline that never sleeps, never misses a vuln, and actually reads the whole codebase, not just the diff.',
    description: 'Autonomous PR governance via an 8-node LangGraph pipeline (triage, security, documentation, bug detection, API change detection, critical file audit). Reviews PRs across any language with zero human involvement.',
    Diagram: PRGuardDiagram,
    highlights: [
      'AST-indexed CodeRAG indexes codebases at function level, enabling architecture violation and duplication detection that diff-only tools cannot achieve.',
      '100% recall, 94.12% precision on a 16-vulnerability suite (Python, Solidity, Bash, Dockerfile).',
      'GitHub App auth with Checks API merge blocking; /prguard fix pushes corrected code to the PR branch on approval.',
    ],
    stats: ['8-Node LangGraph', '100% Recall', '94.12% Precision'],
    tags: ['LangGraph', 'FastAPI', 'ChromaDB', 'Groq', 'PyGitHub', 'ONNX'],
    github: 'https://github.com/rudranaresh0201',
    accentColor: '#e8542e',
  },
  {
    id: 2,
    title: 'Aria',
    subtitle: 'Agentic RAG · Multi-Agent Assistant with HiTL',
    hook: 'Every write action (email, code commit, calendar event) shows you an editable approval card. Nothing executes without your say.',
    description: 'Production-grade agentic RAG assistant with a Human-in-the-Loop approval layer. LangGraph StateGraph orchestrates 10+ specialist write-agents behind a single Orchestrator → Synthesis → Critic pipeline, grounded by hybrid retrieval.',
    Diagram: AriaDiagram,
    highlights: [
      'Hybrid RAG retrieval via HyDE query expansion + BM25 fused with dense vectors and cross-encoder reranking; tunable similarity threshold blocks hallucinated answers when no relevant context exists.',
      'Per-user multi-tenant isolation across vector store, episodic memory, and OAuth credentials.',
      '10+ specialist write-agents: Gmail, GitHub, Calendar, code execution, data analysis, all gated behind the approval layer.',
    ],
    stats: ['10+ Agents', 'HiTL Approval', 'HyDE + BM25 RAG'],
    tags: ['LangGraph', 'FastAPI', 'React', 'ChromaDB', 'Groq'],
    github: 'https://github.com/rudranaresh0201',
    accentColor: '#1f7d68',
  },
  {
    id: 3,
    title: 'ClinIQ',
    subtitle: 'Agentic Medical Intelligence Platform',
    hook: 'What if a junior doctor had infinite memory, never got tired, and actually read the PubMed papers? Built that.',
    description: 'Multi-agent clinical workflow: symptom extraction → differential diagnosis → India-specific epidemiology reranking → risk stratification → monitoring plan → doctor-facing patient timeline.',
    Diagram: ClinIQDiagram,
    highlights: [
      'DeepDive lab report analysis engine that ingests structured PDFs and generates clinician-grade interpretations.',
      'OpenRouter LLM fallback layer for resilience across model providers.',
      'Supabase-backed persistence; deployed on Render + Vercel with Docker CI/CD via GitHub Actions.',
    ],
    stats: ['7 Specialist Agents', 'Render + Vercel', 'Docker CI/CD'],
    tags: ['Python', 'FastAPI', 'ChromaDB', 'Supabase', 'Groq', 'TypeScript'],
    github: 'https://github.com/rudranaresh0201',
    accentColor: '#8a4a2e',
  },
  {
    id: 4,
    title: 'verimcp + devmcp',
    subtitle: 'A Trusted Agent Stack for MCP',
    hook: 'MCP tool calls are trusted by default: a server that says "commit succeeded" might be lying, and nothing stops a retried call from firing twice. Built the proxy that catches both.',
    description: 'A transparent stdio proxy that sits between any MCP Host and backend server. It independently re-derives the real outcome of a tool call and compares it against what the backend claimed, and answers safe retries from a verified cache instead of re-executing side effects. devmcp is the real MCP server built to prove it against, with tool-call surface across git (commit, branch, status, log), CI (run_ci_pipeline), the filesystem (write_file), Docker (build_image, run_container), and SQLite (create_table, insert_row), because a proxy is only as convincing as what it\'s shown catching.',
    Diagram: MCPDiagram,
    highlights: [
      'Correctness verifiers re-check claims against real state (disk hash-compare for writes, re-derived git log for commits, self-consistency + safe re-execution for CI), a pluggable system via importlib.metadata.entry_points, the same mechanism pytest/Black use.',
      'On a 12-scenario adversarial claim-acceptance benchmark, an unprotected Host accepts 100% of fabricated results; verimcp catches 75%, with the remaining gaps named explicitly in the benchmark output rather than hidden.',
      'verify-before-retry (--idempotent-replay) cuts duplicate side effects from 5/5 to 0/5 on realistic non-idempotent actions (counter bumps, notifications, invoices); adapted from arXiv:2608.02645 and moved to the proxy layer so it works for any Host/backend pair.',
      'Published on PyPI (verimcp, devmcp-server) and listed on the official MCP Registry; 138 tests over real subprocess pipes and a real git repo, no mocks, plus real bugs caught by MCP Inspector and VS Code Copilot Chat that the test suite itself missed.',
    ],
    stats: ['PyPI + MCP Registry', '75% Claim-Catch', '0% Duplicate Actions'],
    tags: ['MCP', 'Python', 'OpenTelemetry', 'Docker', 'pytest', 'PyPI'],
    github: 'https://github.com/rudranaresh0201/mcp',
    blogPath: '/blog/verimcp',
    accentColor: '#c1861a',
  },
  {
    id: 5,
    title: 'computer-use',
    subtitle: 'Autonomous Windows Desktop Agent',
    status: 'wip',
    statusNote: "In active development. Dataset validated (3,163 rows, 0 integrity errors), LoRA fine-tuning pipeline built, currently training Qwen2-VL-2B with the 4-arm eval harness up next.",
    hook: "Anthropic's computer-use architecture, but scoped to the whole OS instead of just a browser, with three falsifiable hypotheses pre-registered before I touched any data, so I can't quietly redefine success after the fact.",
    description: 'A goal-driven Windows desktop agent that loops perceive → decide → act until done. Hybrid perception fuses Windows UI Automation (structured, primary) with vision as fallback/ground truth; a LangGraph state machine drives the loop behind a pluggable decision backend: scripted, local VLM, hosted model, or a self-fine-tuned Qwen2-VL-2B.',
    Diagram: ComputerUseDiagram,
    highlights: [
      'Pre-registered three falsifiable hypotheses before touching data: does fine-tuning beat zero-shot on native Windows apps, does hybrid UIA+vision grounding beat either pure strategy alone, and does it generalize to apps never seen in training.',
      'Built the full dataset pipeline from scratch: an orchestrator walks 14 real Windows apps and auto-labels click targets straight from the UI Automation tree, no manual annotation, then fine-tunes Qwen2-VL-2B via LoRA, all on free-tier Kaggle/Colab GPUs to keep the project at $0 spend.',
      'Real debugging, not a clean run: a Windows UIPI/process-integrity bug where a standard-privilege collector literally could not see an auto-elevated window like Task Manager; an fp16 underflow bug where LoRA weight updates were silently rounding to zero while loss still looked fine; and a data-integrity bug where 36% of a "validated" dataset turned out to be labels from the wrong app, caught only by rendering bounding boxes onto screenshots and looking.',
      'Caught and fixed three separate real PII leaks before any data left the machine: a single-instance app reusing a window with stale tab content, a Windows session-restore mechanism, and an OS page rendering the signed-in username.',
      'Every architecture decision written up as an ADR, every session logged in a dev-log, 150+ passing unit tests so far.',
    ],
    stats: ['3,163-Row Dataset', '14 Windows Apps', '$0 Budget'],
    tags: ['LangGraph', 'Qwen2-VL', 'LoRA', 'Windows UIA', 'PyTorch', 'Computer Use'],
    github: 'https://github.com/rudranaresh0201',
    accentColor: '#c2528f',
  },
];

/* ── Card ─────────────────────────────────────────────────────── */
function ProjectCard({ project }) {
  const [expanded, setExpanded] = useState(false);
  const Diagram = project.Diagram;

  return (
    <TiltCard
      maxTilt={5}
      className="glass rounded-2xl overflow-hidden flex flex-col group relative"
      style={{ border: '1px solid rgba(24,20,15,0.08)' }}
    >
      <motion.div
        layout
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -4, transition: { duration: 0.22 } }}
        className="flex flex-col flex-1"
      >
        <div className="h-0.5 w-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: `linear-gradient(90deg, ${project.accentColor}, transparent)` }} />

        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex-1 min-w-0">
              <span className="font-mono text-[10px] text-ink-300 tracking-widest">0{project.id}</span>
              {project.badge && (
                <div className="flex items-center gap-1 mb-1.5">
                  <Trophy size={10} className="text-gold-500 flex-shrink-0" />
                  <span className="font-mono text-[9px] text-gold-600 font-semibold tracking-wide">{project.badge}</span>
                </div>
              )}
              {project.status === 'wip' && (
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: project.accentColor }} />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ background: project.accentColor }} />
                  </span>
                  <span className="font-mono text-[9px] font-semibold tracking-wide" style={{ color: project.accentColor }}>BUILDING RIGHT NOW</span>
                </div>
              )}
              <h3 className="font-bold text-ink-900 leading-tight">{project.title}</h3>
              <p className="text-xs mt-0.5" style={{ color: project.accentColor }}>{project.subtitle}</p>
            </div>
            <motion.a href={project.github} target="_blank" rel="noopener noreferrer"
              className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-ink-500 hover:text-ink-900 transition-colors"
              style={{ background: 'rgba(24,20,15,0.05)' }}
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.93 }}>
              <Github size={13} />
            </motion.a>
          </div>

          <p className="text-xs italic mb-2 leading-relaxed"
            style={{ color: project.accentColor, opacity: 0.9 }}>
            "{project.hook}"
          </p>

          <p className="text-ink-500 text-sm leading-relaxed mb-3">{project.description}</p>

          <div className="flex flex-wrap gap-1.5 mb-3">
            {project.stats.map((s) => (
              <span key={s} className="font-mono text-[9px] px-2 py-0.5 rounded-full"
                style={{ background: `${project.accentColor}0d`, color: project.accentColor, border: `1px solid ${project.accentColor}25` }}>
                {s}
              </span>
            ))}
          </div>

          {project.statusNote && (
            <p className="text-xs text-ink-500 leading-relaxed mb-3 pl-3 border-l-2" style={{ borderColor: `${project.accentColor}40` }}>
              {project.statusNote}
            </p>
          )}

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
                    <li key={i} className="flex gap-2 text-xs text-ink-500 leading-relaxed">
                      <span className="flex-shrink-0 mt-0.5" style={{ color: project.accentColor }}>›</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center gap-3 mb-4">
            <button onClick={() => setExpanded((p) => !p)}
              className="flex items-center gap-1 text-xs text-ink-500 hover:text-ink-700 transition-colors">
              {expanded
                ? <><ChevronUp size={11} /> Hide details</>
                : <><ChevronDown size={11} /> Architecture + details</>}
            </button>
            {project.blogPath && (
              <Link to={project.blogPath}
                className="flex items-center gap-1 text-xs font-medium transition-colors"
                style={{ color: project.accentColor }}>
                <BookOpen size={11} /> Read the writeup
              </Link>
            )}
          </div>

          <div className="mt-auto flex flex-wrap gap-1.5">
            {project.tags.map((t) => <span key={t} className="tag">{t}</span>)}
          </div>
        </div>
      </motion.div>
    </TiltCard>
  );
}

/* ── Section ──────────────────────────────────────────────────── */
export default function Projects() {
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
          <h2 className="font-serif font-semibold tracking-tight text-ink-900 mb-3"
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
            Things I've <span className="gradient-text">Built</span>
          </h2>
          <p className="text-ink-500 text-base max-w-xl">
            The ones I'd actually stand behind, including the one I'm elbow-deep in right now. Click "Architecture + details" on any card for the pipeline diagram and deep technical notes.
          </p>
        </motion.div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {PROJECTS.map((p) => <ProjectCard key={p.id} project={p} />)}
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
