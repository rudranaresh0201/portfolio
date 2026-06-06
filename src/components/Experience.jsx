import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Users, Zap } from 'lucide-react';

const TIMELINE = [
  {
    id: 1, current: true, icon: Briefcase, iconColor: '#22d3ee',
    role: 'Backend Engineering Intern', company: 'OpenRAG',
    period: '2026 — Present', location: 'Remote',
    bullets: [
      '7-agent CrewAI system for DocDynamo: ingestion → schema profiling → cleaning → LLM query planning → AST-sandboxed execution → validation → insight generation.',
      'Optimising SSE streaming pipeline to cut time-to-first-token and deliver real-time tokens to the frontend.',
      'Building conversation memory with a vector store for contextual continuity across multi-turn sessions.',
    ],
    tags: ['CrewAI', 'FastAPI', 'SSE', 'Vector Store', 'Python'],
  },
  {
    id: 2, current: true, icon: Briefcase, iconColor: '#818cf8',
    role: 'Software Engineering Intern', company: '4seer Technologies',
    period: '2026 — Present', location: 'Remote',
    bullets: [
      'FastAPI microservice for automated PDF generation (quotations, invoices) for the Amplex project.',
      'Layered architecture: HTTP routers → Pydantic schemas → service layer → ReportLab rendering, with structured logging, correlation ID middleware, and rate limiting.',
      'Containerised with Docker; pytest suite covering health checks, schema validation, and endpoint behaviour.',
    ],
    tags: ['FastAPI', 'Docker', 'ReportLab', 'pytest', 'Pydantic'],
  },
  {
    id: 3, current: false, icon: GraduationCap, iconColor: '#f472b6',
    role: 'B.Tech Electronics Engineering', company: 'VJTI Mumbai',
    period: 'Aug 2024 — Present', location: 'Mumbai, India',
    bullets: [
      'Minor in Artificial Intelligence & Machine Learning · CGPA 8.37 / 10.',
      'Active across E-Cell, Enthusia, and technical clubs.',
    ],
    tags: ['Electronics', 'AI/ML Minor', 'CGPA 8.37'],
  },
  {
    id: 4, current: false, icon: Users, iconColor: '#a78bfa',
    role: 'Department Head', company: 'E-Cell VJTI',
    period: '2024 — Present', location: 'VJTI Mumbai',
    bullets: ['Leading entrepreneurship initiatives, startup events, and speaker sessions.'],
    tags: ['Leadership', 'Entrepreneurship'],
  },
  {
    id: 5, current: false, icon: Zap, iconColor: '#34d399',
    role: 'Chief Coordinator', company: 'Enthusia',
    period: '2024 — Present', location: 'VJTI Mumbai',
    bullets: ["Cross-functional coordination for VJTI's annual technical and cultural festival."],
    tags: ['Event Management', 'Coordination'],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

function TimelineItem({ item }) {
  const Icon = item.icon;
  return (
    <motion.div variants={fadeUp} initial="hidden" whileInView="visible"
      viewport={{ once: true, margin: '-80px' }} className="relative pl-14">
      <div className="timeline-line" />
      <div className="absolute left-0 w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: `${item.iconColor}15`, border: `1px solid ${item.iconColor}30` }}>
        {item.current && (
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-green-400 ring-2 ring-[#07070f]">
            <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-75" />
          </span>
        )}
        <Icon size={16} style={{ color: item.iconColor }} />
      </div>

      <div className="glass rounded-2xl p-5 mb-6 transition-all duration-300"
        style={item.current ? { borderColor: `${item.iconColor}30`, boxShadow: `0 0 0 1px ${item.iconColor}18, 0 8px 32px ${item.iconColor}08` } : {}}>
        <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-white">{item.role}</h3>
              {item.current && (
                <span className="font-mono text-[9px] font-bold px-2 py-0.5 rounded-full"
                  style={{ background: '#22c55e18', color: '#4ade80', border: '1px solid #22c55e30' }}>
                  CURRENT
                </span>
              )}
            </div>
            <div className="text-sm mt-0.5">
              <span className="font-medium" style={{ color: item.iconColor }}>{item.company}</span>
              <span className="text-slate-500"> · {item.location}</span>
            </div>
          </div>
          <span className="font-mono text-xs text-slate-500 bg-white/[0.04] px-3 py-1 rounded-full border border-white/[0.07] whitespace-nowrap">
            {item.period}
          </span>
        </div>
        <ul className="space-y-2 mb-4">
          {item.bullets.map((b, i) => (
            <li key={i} className="flex gap-2 text-sm text-slate-400 leading-relaxed">
              <span className="mt-1 flex-shrink-0" style={{ color: item.iconColor }}>›</span>
              {b}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-1.5">
          {item.tags.map((t) => <span key={t} className="tag">{t}</span>)}
        </div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-5 sm:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.55 }} className="mb-14">
          <p className="section-label mb-3">02. experience</p>
          <h2 className="font-black tracking-tight text-white mb-3" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
            Where I've <span className="gradient-text">Worked</span>
          </h2>
          <p className="text-slate-400 text-base">Two active internships · building production AI in parallel.</p>
        </motion.div>
        <div className="relative">
          {TIMELINE.map((t) => <TimelineItem key={t.id} item={t} />)}
        </div>
      </div>
    </section>
  );
}
