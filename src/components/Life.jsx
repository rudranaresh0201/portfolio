import { motion } from 'framer-motion';
import { Trophy, Users, Brain, Zap, Network } from 'lucide-react';

const SKILL_GROUPS = [
  { label: 'Languages', color: '#818cf8', bg: 'rgba(129,140,248,0.08)', border: 'rgba(129,140,248,0.2)', skills: ['Python', 'C', 'C++', 'TypeScript'] },
  { label: 'AI / ML', color: '#22d3ee', bg: 'rgba(34,211,238,0.07)', border: 'rgba(34,211,238,0.18)', skills: ['PyTorch', 'Transformers', 'RAG', 'ChromaDB', 'Sentence-Transformers', 'BM25', 'CrewAI', 'LLM APIs'] },
  { label: 'Backend & DevOps', color: '#a78bfa', bg: 'rgba(167,139,250,0.07)', border: 'rgba(167,139,250,0.18)', skills: ['FastAPI', 'Docker', 'GitHub Actions', 'PostgreSQL', 'Supabase', 'Pydantic', 'ReportLab'] },
  { label: 'Web', color: '#34d399', bg: 'rgba(52,211,153,0.07)', border: 'rgba(52,211,153,0.18)', skills: ['React', 'Vite', 'Tailwind CSS', 'REST APIs', 'SSE'] },
];

const LEADERSHIP = [
  { role: 'Department Head', org: 'E-Cell VJTI', desc: 'Leading entrepreneurship initiatives, startup events, and speaker sessions for the student community at VJTI.', icon: Users, color: '#a78bfa' },
  { role: 'Chief Coordinator', org: 'Enthusia — VJTI Annual Fest', desc: "Coordinating cross-functional teams and managing large-scale logistics for VJTI's annual technical & cultural festival.", icon: Zap, color: '#34d399' },
];

const COMPETITIONS = [
  { name: 'Smart India Hackathon (SIH) 2025', result: 'Shortlisted', desc: 'Built an AI-based Web Application Firewall using transformer models with a real-time anomaly detection pipeline for web traffic.', icon: Trophy, color: '#f59e0b' },
];

const INTERESTS = [
  { label: 'Agentic AI Systems',      icon: Brain,   color: '#818cf8' },
  { label: 'RAG & Retrieval Systems', icon: Zap,     color: '#22d3ee' },
  { label: 'Multi-Agent Pipelines',   icon: Network, color: '#a78bfa' },
];

function PianoGraphic() {
  const bars = [4, 7, 11, 6, 9, 14, 8, 12, 5, 10, 13, 7, 9, 6, 8];
  return (
    <div className="relative w-full h-16 mb-4 overflow-hidden rounded-xl" style={{ background: 'rgba(244,114,182,0.06)' }}>
      <svg viewBox="0 0 160 28" className="absolute bottom-0 w-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        {[0,1,2,3,4,5,6].map((i) => <rect key={`w${i}`} x={i*22+2} y={0} width={20} height={27} rx={2} fill="rgba(255,255,255,0.6)" stroke="rgba(244,114,182,0.3)" strokeWidth={0.5}/>)}
        {[0,1,3,4,5].map((i) => <rect key={`b${i}`} x={i*22+14} y={0} width={13} height={17} rx={2} fill="#f472b6" opacity={0.8}/>)}
      </svg>
      <div className="absolute inset-x-3 top-2 flex items-end gap-0.5 h-9">
        {bars.map((h, i) => (
          <motion.div key={i} className="flex-1 rounded-full" style={{ backgroundColor: '#f472b6', minWidth: 2 }}
            animate={{ height: [`${(h/14)*100}%`, `${(h*0.45/14)*100}%`, `${(h/14)*100}%`] }}
            transition={{ duration: 1.1 + i * 0.09, repeat: Infinity, ease: 'easeInOut', delay: i * 0.05 }} />
        ))}
      </div>
      <div className="absolute top-2 right-3 font-mono text-[9px] text-pink-400 opacity-60 tracking-widest">♪ ARIJIT SINGH</div>
    </div>
  );
}

function CricketGraphic() {
  return (
    <div className="relative w-full h-16 mb-4 overflow-hidden rounded-xl" style={{ background: 'rgba(245,158,11,0.06)' }}>
      <svg viewBox="0 0 200 56" className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <line x1="0" y1="48" x2="200" y2="48" stroke="rgba(245,158,11,0.2)" strokeWidth="1"/>
        {[52, 62, 72].map((x) => (
          <g key={x}>
            <rect x={x} y={18} width={4} height={30} rx={1.5} fill="#f59e0b" opacity={0.7}/>
            <rect x={x-3} y={16} width={10} height={4} rx={1} fill="#f59e0b" opacity={0.5}/>
          </g>
        ))}
        <g transform="rotate(-30, 130, 30)">
          <rect x={127} y={8} width={7} height={30} rx={2} fill="rgba(245,158,11,0.5)"/>
          <rect x={124} y={30} width={13} height={18} rx={3} fill="rgba(245,158,11,0.35)"/>
        </g>
        <circle cx={155} cy={22} r={8} fill="rgba(245,158,11,0.25)" stroke="#f59e0b" strokeWidth="1" opacity="0.6"/>
        <text x="14" y="38" fontFamily="JetBrains Mono, monospace" fontSize="26" fill="rgba(245,158,11,0.18)" fontWeight="900">#7</text>
        <text x="14" y="52" fontFamily="JetBrains Mono, monospace" fontSize="7" fill="rgba(245,158,11,0.4)" letterSpacing="2">M S DHONI</text>
      </svg>
    </div>
  );
}

function BookGraphic() {
  return (
    <div className="relative w-full h-16 mb-4 overflow-hidden rounded-xl" style={{ background: 'rgba(52,211,153,0.06)' }}>
      <svg viewBox="0 0 200 56" className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {[{ x:12,y:36,w:38,h:10,c:'rgba(52,211,153,0.5)'},{x:16,y:25,w:30,h:10,c:'rgba(52,211,153,0.35)'},{x:14,y:14,w:34,h:10,c:'rgba(52,211,153,0.25)'}].map((b,i)=>(
          <g key={i}><rect x={b.x} y={b.y} width={b.w} height={b.h} rx={2} fill={b.c}/><line x1={b.x+5} y1={b.y+3} x2={b.x+5} y2={b.y+7} stroke="rgba(255,255,255,0.3)" strokeWidth="1"/></g>
        ))}
        <path d="M 70 14 Q 100 10 130 14 L 128 42 Q 100 38 72 42 Z" fill="rgba(52,211,153,0.12)" stroke="rgba(52,211,153,0.3)" strokeWidth="1"/>
        <line x1="100" y1="13" x2="100" y2="42" stroke="rgba(52,211,153,0.4)" strokeWidth="1"/>
        {[20,26,32,38].map((y)=>(<g key={y}><line x1="76" y1={y} x2="95" y2={y} stroke="rgba(52,211,153,0.25)" strokeWidth="1.5"/><line x1="105" y1={y} x2="124" y2={y} stroke="rgba(52,211,153,0.25)" strokeWidth="1.5"/></g>))}
        <text x="140" y="28" fontFamily="JetBrains Mono, monospace" fontSize="7" fill="rgba(52,211,153,0.4)" letterSpacing="1">CURRENTLY</text>
        <text x="140" y="38" fontFamily="JetBrains Mono, monospace" fontSize="7" fill="rgba(52,211,153,0.4)" letterSpacing="1">READING</text>
      </svg>
    </div>
  );
}

const PERSONAL = [
  { Graphic: PianoGraphic, color: '#f472b6', title: 'Music & Piano', desc: "Arijit Singh is basically my entire personality at this point. I also play piano — learning a piece feels exactly like debugging: frustrating for hours, then suddenly it clicks, and you wonder why it was ever hard." },
  { Graphic: CricketGraphic, color: '#f59e0b', title: 'Cricket & Table Tennis', desc: "Grew up watching Dhoni finish games nobody else could. Still believe the best engineers and the best finishers think the same way — stay calm when everything is on fire, back yourself, execute." },
  { Graphic: BookGraphic, color: '#34d399', title: 'Reading', desc: "Transformer architecture papers at 1am, which is either productivity or a problem — I haven't decided. Also fiction that bends how I see the world. Books are where I collect mental models." },
];

const fadeUp = (delay = 0) => ({ hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] } } });

function SkillGroup({ group, index }) {
  return (
    <motion.div variants={fadeUp(index * 0.07)} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} className="glass rounded-2xl p-5 glow-border">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full" style={{ background: group.color }} />
        <span className="font-mono text-xs font-semibold tracking-wide" style={{ color: group.color }}>{group.label}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {group.skills.map((skill) => (
          <span key={skill} className="text-xs font-medium px-3 py-1.5 rounded-lg font-mono"
            style={{ background: group.bg, color: group.color, border: `1px solid ${group.border}` }}>{skill}</span>
        ))}
      </div>
    </motion.div>
  );
}

function LeadershipCard({ item, index }) {
  const Icon = item.icon;
  return (
    <motion.div variants={fadeUp(index * 0.1)} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} className="glass rounded-2xl p-5 glass-hover glow-border">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: `${item.color}15`, border: `1px solid ${item.color}30` }}>
        <Icon size={18} style={{ color: item.color }} />
      </div>
      <p className="font-semibold text-white mb-0.5">{item.role}</p>
      <p className="text-sm font-medium mb-2" style={{ color: item.color }}>{item.org}</p>
      <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
    </motion.div>
  );
}

function CompetitionCard({ item }) {
  const Icon = item.icon;
  return (
    <motion.div variants={fadeUp()} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} className="glass rounded-2xl p-5 glow-border flex gap-4 items-start">
      <div className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `${item.color}15`, border: `1px solid ${item.color}30` }}>
        <Icon size={20} style={{ color: item.color }} />
      </div>
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <h4 className="font-semibold text-white text-sm">{item.name}</h4>
          <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: `${item.color}15`, color: item.color, border: `1px solid ${item.color}30` }}>{item.result}</span>
        </div>
        <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
      </div>
    </motion.div>
  );
}

export default function Life() {
  return (
    <section id="life" className="py-24 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }} className="mb-16">
          <p className="section-label mb-3">04. life</p>
          <h2 className="font-black tracking-tight text-white mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
            Beyond the <span className="gradient-text">Code</span>
          </h2>
          <p className="text-slate-400 text-base leading-relaxed max-w-2xl">
            Skills I've sharpened, teams I've led, things I've competed in — and the parts of life that have nothing to do with a terminal.
          </p>
        </motion.div>

        <div className="mb-16">
          <motion.h3 initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <span className="gradient-text">⌨</span> Technical Skills
          </motion.h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {SKILL_GROUPS.map((g, i) => <SkillGroup key={g.label} group={g} index={i} />)}
          </div>
        </div>

        <div className="mb-16">
          <motion.h3 initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <span className="gradient-text">🎯</span> Leadership
          </motion.h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl">
            {LEADERSHIP.map((l, i) => <LeadershipCard key={l.org} item={l} index={i} />)}
          </div>
        </div>

        <div className="mb-16">
          <motion.h3 initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <span className="gradient-text">🏆</span> Competitions
          </motion.h3>
          <div className="max-w-3xl">
            {COMPETITIONS.map((c) => <CompetitionCard key={c.name} item={c} />)}
          </div>
        </div>

        <div className="mb-16">
          <motion.h3 initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <span className="gradient-text">🔭</span> What I'm Exploring
          </motion.h3>
          <div className="flex flex-wrap gap-3">
            {INTERESTS.map((interest, i) => {
              const Icon = interest.icon;
              return (
                <motion.div key={interest.label} variants={fadeUp(i * 0.06)} initial="hidden" whileInView="visible" viewport={{ once: true }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass glow-border"
                  style={{ border: `1px solid ${interest.color}25` }} whileHover={{ scale: 1.04, y: -2 }}>
                  <Icon size={14} style={{ color: interest.color }} />
                  <span className="text-sm font-medium text-slate-300">{interest.label}</span>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div>
          <motion.h3 initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <span className="gradient-text">✦</span> Outside the IDE
          </motion.h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {PERSONAL.map((p, i) => {
              const Graphic = p.Graphic;
              return (
                <motion.div key={p.title} variants={fadeUp(i * 0.08)} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
                  className="glass rounded-2xl p-5 glow-border glass-hover" style={{ borderColor: `${p.color}18` }}>
                  <Graphic />
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
