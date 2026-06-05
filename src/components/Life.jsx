import { motion } from 'framer-motion';
import { Trophy, Users, Brain, Globe, Zap, Music, BookOpen, Dribbble } from 'lucide-react';

/* ── Data ────────────────────────────────────────────────────── */
const SKILL_GROUPS = [
  {
    label: 'Languages',
    color: '#818cf8',
    bg: 'rgba(129,140,248,0.08)',
    border: 'rgba(129,140,248,0.2)',
    skills: ['Python', 'C', 'C++', 'TypeScript'],
  },
  {
    label: 'AI / ML',
    color: '#22d3ee',
    bg: 'rgba(34,211,238,0.07)',
    border: 'rgba(34,211,238,0.18)',
    skills: [
      'PyTorch', 'Transformers', 'RAG', 'ChromaDB',
      'Sentence-Transformers', 'BM25', 'CrewAI', 'LLM APIs',
    ],
  },
  {
    label: 'Backend & DevOps',
    color: '#a78bfa',
    bg: 'rgba(167,139,250,0.07)',
    border: 'rgba(167,139,250,0.18)',
    skills: [
      'FastAPI', 'Docker', 'GitHub Actions',
      'PostgreSQL', 'Supabase', 'Pydantic', 'ReportLab',
    ],
  },
  {
    label: 'Web',
    color: '#34d399',
    bg: 'rgba(52,211,153,0.07)',
    border: 'rgba(52,211,153,0.18)',
    skills: ['React', 'Vite', 'Tailwind CSS', 'REST APIs', 'SSE'],
  },
];

const LEADERSHIP = [
  {
    role: 'Department Head',
    org: 'E-Cell VJTI',
    desc: 'Leading entrepreneurship initiatives, startup events, and speaker sessions for the student community at VJTI.',
    icon: Users,
    color: '#a78bfa',
  },
  {
    role: 'Chief Coordinator',
    org: 'Enthusia — VJTI Annual Fest',
    desc: 'Coordinating cross-functional teams and managing large-scale logistics for VJTI\'s annual technical & cultural festival.',
    icon: Zap,
    color: '#34d399',
  },
];

const COMPETITIONS = [
  {
    name: 'Smart India Hackathon (SIH) 2025',
    result: 'Shortlisted',
    desc: 'Built an AI-based Web Application Firewall using transformer models with a real-time anomaly detection pipeline for web traffic.',
    icon: Trophy,
    color: '#f59e0b',
  },
];

const INTERESTS = [
  { label: 'Agentic AI Systems',    icon: Brain,  color: '#818cf8' },
  { label: 'RAG & LLM Engineering', icon: Zap,    color: '#22d3ee' },
  { label: 'Full Stack Development', icon: Globe, color: '#34d399' },
];

const PERSONAL = [
  {
    icon: Music,
    color: '#f472b6',
    title: 'Music & Piano',
    desc: 'Music stirs something within me that little else can. I play the piano — there\'s a kind of focus in learning a piece that feels a lot like debugging a hard problem, except the reward hits different.',
  },
  {
    icon: Dribbble,
    color: '#fb923c',
    title: 'Cricket & Table Tennis',
    desc: 'Sports has been an integral part of my life. I\'ve played cricket and table tennis at a competitive level — both taught me how to read patterns fast, stay composed under pressure, and trust the process.',
  },
  {
    icon: BookOpen,
    color: '#34d399',
    title: 'Voracious Reader',
    desc: 'I read across genres — from technical papers on transformer architectures to fiction that bends how I see the world. Books are where I collect mental models.',
  },
];

/* ── Helpers ─────────────────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
  },
});

/* ── Sub-components ──────────────────────────────────────────── */
function SkillGroup({ group, index }) {
  return (
    <motion.div
      variants={fadeUp(index * 0.07)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className="glass rounded-2xl p-5 glow-border"
    >
      <div className="flex items-center gap-2 mb-4">
        <div
          className="w-2 h-2 rounded-full"
          style={{ background: group.color }}
        />
        <span
          className="font-mono text-xs font-semibold tracking-wide"
          style={{ color: group.color }}
        >
          {group.label}
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {group.skills.map((skill) => (
          <span
            key={skill}
            className="text-xs font-medium px-3 py-1.5 rounded-lg font-mono"
            style={{
              background: group.bg,
              color: group.color,
              border: `1px solid ${group.border}`,
            }}
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

function LeadershipCard({ item, index }) {
  const Icon = item.icon;
  return (
    <motion.div
      variants={fadeUp(index * 0.1)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className="glass rounded-2xl p-5 glass-hover glow-border"
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
        style={{
          background: `${item.color}15`,
          border: `1px solid ${item.color}30`,
        }}
      >
        <Icon size={18} style={{ color: item.color }} />
      </div>
      <p className="font-semibold text-white mb-0.5">{item.role}</p>
      <p className="text-sm font-medium mb-2" style={{ color: item.color }}>
        {item.org}
      </p>
      <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
    </motion.div>
  );
}

function CompetitionCard({ item }) {
  const Icon = item.icon;
  return (
    <motion.div
      variants={fadeUp()}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className="glass rounded-2xl p-5 glow-border flex gap-4 items-start"
    >
      <div
        className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
        style={{
          background: `${item.color}15`,
          border: `1px solid ${item.color}30`,
        }}
      >
        <Icon size={20} style={{ color: item.color }} />
      </div>
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <h4 className="font-semibold text-white text-sm">{item.name}</h4>
          <span
            className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-full"
            style={{ background: `${item.color}15`, color: item.color, border: `1px solid ${item.color}30` }}
          >
            {item.result}
          </span>
        </div>
        <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
      </div>
    </motion.div>
  );
}

/* ── Main section ────────────────────────────────────────────── */
export default function Life() {
  return (
    <section id="life" className="py-24 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-16"
        >
          <p className="section-label mb-3">04. life</p>
          <h2
            className="font-black tracking-tight text-white mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}
          >
            Beyond the{' '}
            <span className="gradient-text">Code</span>
          </h2>
          <p className="text-slate-400 text-base leading-relaxed max-w-2xl">
            Skills I've sharpened, teams I've led, things I've competed in — and the
            parts of life that have nothing to do with a terminal.
          </p>
        </motion.div>

        {/* ── Skills ── */}
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-lg font-bold text-white mb-6 flex items-center gap-2"
          >
            <span className="gradient-text">⌨</span> Technical Skills
          </motion.h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {SKILL_GROUPS.map((g, i) => (
              <SkillGroup key={g.label} group={g} index={i} />
            ))}
          </div>
        </div>

        {/* ── Leadership ── */}
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-lg font-bold text-white mb-6 flex items-center gap-2"
          >
            <span className="gradient-text">🎯</span> Leadership
          </motion.h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl">
            {LEADERSHIP.map((l, i) => (
              <LeadershipCard key={l.org} item={l} index={i} />
            ))}
          </div>
        </div>

        {/* ── Competitions ── */}
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-lg font-bold text-white mb-6 flex items-center gap-2"
          >
            <span className="gradient-text">🏆</span> Competitions
          </motion.h3>
          <div className="max-w-3xl">
            {COMPETITIONS.map((c) => (
              <CompetitionCard key={c.name} item={c} />
            ))}
          </div>
        </div>

        {/* ── Interests ── */}
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-lg font-bold text-white mb-6 flex items-center gap-2"
          >
            <span className="gradient-text">🔭</span> What I'm Exploring
          </motion.h3>
          <div className="flex flex-wrap gap-3">
            {INTERESTS.map((interest, i) => {
              const Icon = interest.icon;
              return (
                <motion.div
                  key={interest.label}
                  variants={fadeUp(i * 0.06)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass glow-border"
                  style={{ border: `1px solid ${interest.color}25` }}
                  whileHover={{ scale: 1.04, y: -2 }}
                >
                  <Icon size={14} style={{ color: interest.color }} />
                  <span className="text-sm font-medium text-slate-300">{interest.label}</span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── Personal ── */}
        <div>
          <motion.h3
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-lg font-bold text-white mb-6 flex items-center gap-2"
          >
            <span className="gradient-text">✦</span> Outside the IDE
          </motion.h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {PERSONAL.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.title}
                  variants={fadeUp(i * 0.08)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-60px' }}
                  className="glass rounded-2xl p-5 glow-border glass-hover"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `${p.color}12`, border: `1px solid ${p.color}28` }}
                  >
                    <Icon size={18} style={{ color: p.color }} />
                  </div>
                  <p className="font-semibold text-white mb-2">{p.title}</p>
                  <p className="text-sm text-slate-400 leading-relaxed">{p.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
