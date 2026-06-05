import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Users, Zap } from 'lucide-react';

const TIMELINE = [
  {
    id: 1,
    type: 'work',
    icon: Briefcase,
    iconColor: '#22d3ee',
    iconBg: 'rgba(34,211,238,0.12)',
    role: 'Backend Engineering Intern',
    company: 'OpenRAG',
    period: '2026 — Present',
    location: 'Remote',
    bullets: [
      'Built a production-grade multi-agent CSV/XLSX analytics system for DocDynamo — 7 specialist CrewAI agents: ingestion, schema profiling, cleaning, LLM query planning, AST-sandboxed execution, validation, and insight generation.',
      'Optimising backend SSE streaming pipeline to reduce time-to-first-token and enable real-time token delivery to the DocDynamo frontend.',
      'Implementing conversation memory via a vector store for contextual continuity across multi-turn analytical sessions.',
    ],
    tags: ['CrewAI', 'FastAPI', 'SSE', 'Vector Store', 'Python'],
  },
  {
    id: 2,
    type: 'work',
    icon: Briefcase,
    iconColor: '#818cf8',
    iconBg: 'rgba(129,140,248,0.12)',
    role: 'Software Engineering Intern',
    company: '4seer Technologies',
    period: '2026 — Present',
    location: 'Remote',
    bullets: [
      'Building a production-grade FastAPI microservice for automated PDF generation (quotations, invoices) for the Amplex project.',
      'Designed a clean layered architecture: HTTP routers → Pydantic schemas → service layer → ReportLab rendering, with structured logging, correlation ID middleware, and rate limiting.',
      'Containerised the service via Docker; wrote a pytest suite covering health checks, schema validation, and endpoint behaviour.',
    ],
    tags: ['FastAPI', 'Docker', 'ReportLab', 'pytest', 'Pydantic'],
  },
  {
    id: 3,
    type: 'education',
    icon: GraduationCap,
    iconColor: '#f472b6',
    iconBg: 'rgba(244,114,182,0.12)',
    role: 'B.Tech Electronics Engineering',
    company: 'VJTI Mumbai',
    period: 'Aug 2024 — Present',
    location: 'Mumbai, India',
    bullets: [
      'Minor in Artificial Intelligence & Machine Learning.',
      'CGPA: 8.37 / 10.',
      'Active in technical clubs, entrepreneurship cell, and college fests.',
    ],
    tags: ['Electronics', 'AI/ML Minor', 'CGPA 8.37'],
  },
  {
    id: 4,
    type: 'leadership',
    icon: Users,
    iconColor: '#a78bfa',
    iconBg: 'rgba(167,139,250,0.12)',
    role: 'Department Head',
    company: 'E-Cell VJTI',
    period: '2024 — Present',
    location: 'VJTI Mumbai',
    bullets: [
      'Leading a department within the Entrepreneurship Cell at VJTI.',
      'Organising startup events, workshops, and speaker sessions for the student community.',
    ],
    tags: ['Leadership', 'Entrepreneurship', 'Events'],
  },
  {
    id: 5,
    type: 'leadership',
    icon: Zap,
    iconColor: '#34d399',
    iconBg: 'rgba(52,211,153,0.12)',
    role: 'Chief Coordinator',
    company: 'Enthusia',
    period: '2024 — Present',
    location: 'VJTI Mumbai',
    bullets: [
      'Chief Coordinator at Enthusia, VJTI\'s annual technical and cultural festival.',
      'Coordinating cross-functional teams, managing logistics, and driving event planning for large-scale college events.',
    ],
    tags: ['Event Management', 'Coordination', 'Leadership'],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

function TimelineItem({ item: t, index }) {
  const Icon = t.icon;
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className="relative pl-14"
    >
      {/* Connector line (not on last item) */}
      <div className="timeline-line" />

      {/* Icon dot */}
      <div
        className="absolute left-0 w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: t.iconBg, border: `1px solid ${t.iconColor}30` }}
      >
        <Icon size={16} style={{ color: t.iconColor }} />
      </div>

      {/* Card */}
      <div className="glass glow-border rounded-2xl p-5 mb-6 glass-hover">
        <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
          <div>
            <h3 className="font-semibold text-white text-base">{t.role}</h3>
            <span className="text-sm font-medium" style={{ color: t.iconColor }}>
              {t.company}
            </span>
            <span className="text-slate-500 text-sm"> · {t.location}</span>
          </div>
          <span className="font-mono text-xs text-slate-500 bg-white/[0.04] px-3 py-1 rounded-full border border-white/[0.07] whitespace-nowrap">
            {t.period}
          </span>
        </div>

        <ul className="space-y-2 mb-4">
          {t.bullets.map((b, i) => (
            <li key={i} className="flex gap-2 text-sm text-slate-400 leading-relaxed">
              <span style={{ color: t.iconColor }} className="mt-1 flex-shrink-0">›</span>
              {b}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-1.5">
          {t.tags.map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-5 sm:px-8">
      <div className="max-w-3xl mx-auto">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-14"
        >
          <p className="section-label mb-3">02. experience</p>
          <h2
            className="font-black tracking-tight text-white mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}
          >
            Where I've{' '}
            <span className="gradient-text">Worked & Studied</span>
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            Building production AI systems, leading teams, and shipping code that matters.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {TIMELINE.map((t, i) => (
            <TimelineItem key={t.id} item={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
