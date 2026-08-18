import { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, FileCheck, ArrowUpRight } from 'lucide-react';
import { TiltCard } from './Motion';
import Modal from './Modal';

const TIMELINE = [
  {
    id: 1, current: true, icon: Briefcase, iconColor: '#e8542e',
    role: 'AI Automation Intern', company: 'Elevar Sports',
    period: 'June 2026 · Present', location: 'Mumbai, India',
    blurb: 'Building the entire ops-automation stack: data sync, courier logic, and an AI support layer.',
    bullets: [
      'Data layer: Google Apps Script syncs 7 sources (Shopify, Shiprocket, EasyEcom, Delhivery forward + reverse, ATS, Returns Prime, Amazon) into one master sheet nightly. Handled real vendor quirks like EasyEcom\'s dual-header auth + report-queue API shape, Returns Prime\'s webhook-only data flow, and an AWB-corruption bug fixed by keying on a normalized match-key while storing raw values.',
      'Infrastructure: single $12/mo DigitalOcean droplet, fully Dockerized (n8n, Chatwoot, Postgres/pgvector, Redis, Caddy) with GitHub Actions auto-deploy on push; diagnosed and fixed a production OOM crash-loop from under-provisioned memory.',
      'Automation core: 15+ n8n workflows across 4 phases, covering NDR detection, claims creation/tracking, courier-switching reship logic with a human-approval gate, and WhatsApp broadcast. Debugged against real production executions (item-count explosions, duplicate-reship races, wrong-column consent gates).',
      'AI support layer: Gemini-classified WhatsApp bot via Chatwoot with a 19-domain intent classifier built from mining real customer transcripts, every reply execution-traced back to source data, conversation-state tracking across 8 intents, extended to a second brand on the same shared infra.',
      'Field automation: Tampermonkey scripts that file courier claims by driving the real DOM on portals with no API. Confirmed working end-to-end on Delhivery (form fill + multi-photo upload).',
    ],
    tags: ['Google Apps Script', 'n8n', 'Docker', 'DigitalOcean', 'Postgres/pgvector', 'Redis', 'Chatwoot', 'Gemini', 'Tampermonkey'],
    highlight: true,
  },
  {
    id: 2, current: false, icon: Briefcase, iconColor: '#1f7d68',
    role: 'Backend Engineering Intern', company: 'OpenRAG',
    period: '2026 · Jun 2026', location: 'Remote',
    blurb: 'Fixed production RAG infrastructure bugs: chunk overwrites, cache cross-talk, streaming recovery.',
    bullets: [
      'Fixed a BM25 chunk-overwrite bug in a production multi-user RAG pipeline, where multi-file uploads silently deleted chunks; resolved with file-scoped UUID keying in MongoDB.',
      'Implemented Redis-backed FAISS cache eliminating cross-worker cache misses in a Gunicorn multi-process deployment; added L1 in-process TTL cache for hot users.',
      'Upgraded to SemanticChunker with A/B retrieval evaluation; built Redis semantic cache, SSE streaming error recovery, and load-balancer-safe per-user rate limiting.',
    ],
    tags: ['RAG', 'Redis', 'FAISS', 'MongoDB', 'FastAPI', 'SSE', 'Python'],
  },
  {
    id: 3, current: false, icon: Briefcase, iconColor: '#c1861a',
    role: 'Software Engineering Intern', company: '4seer Technologies',
    period: 'May 2026 · Jul 2026', location: 'Remote',
    blurb: 'FastAPI PDF-generation microservice, plus backend testing for an Australian client.',
    bullets: [
      'Built a production FastAPI microservice for automated PDF generation: layered architecture, HTTP routers → Pydantic schemas → service layer → ReportLab rendering, with structured logging and correlation ID middleware.',
      'End-to-end backend testing for Amplex (Australian client): app testing, cable management flows, and pricing engine validation across API endpoints.',
      'Built an internal dashboard for the Amplex app to surface live metrics and streamline ops visibility.',
      'Containerised via Docker; wrote pytest suite covering health checks, schema validation, and endpoint behaviour.',
    ],
    tags: ['FastAPI', 'Docker', 'ReportLab', 'pytest', 'Pydantic', 'React'],
    certUrl: `${import.meta.env.BASE_URL}certs/4seer-internship-certificate.pdf`,
    certLabel: 'Internship completion certificate',
  },
];

function ExperienceTile({ item, onOpen }) {
  const Icon = item.icon;
  return (
    <TiltCard maxTilt={6} className="group relative glass rounded-2xl glow-border">
      <motion.button
        onClick={() => onOpen(item)}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -4 }}
        className="text-left w-full p-5 flex flex-col h-full"
      >
        <div className="flex items-start justify-between mb-3">
          <div className="relative w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: `${item.iconColor}15`, border: `1px solid ${item.iconColor}30` }}>
            {item.current && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-teal-500 ring-2 ring-paper">
                <span className="absolute inset-0 rounded-full bg-teal-500 animate-ping opacity-75" />
              </span>
            )}
            <Icon size={16} style={{ color: item.iconColor }} />
          </div>
          <ArrowUpRight size={14} className="text-ink-300 group-hover:text-ink-700 transition-colors" />
        </div>
        <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
          {item.current && (
            <span className="font-mono text-[9px] font-bold px-2 py-0.5 rounded-full"
              style={{ background: '#1f7d6818', color: '#155f4d', border: '1px solid #1f7d6830' }}>CURRENT</span>
          )}
          {item.highlight && (
            <span className="font-mono text-[9px] font-bold px-2 py-0.5 rounded-full"
              style={{ background: '#e8542e18', color: '#c23c1b', border: '1px solid #e8542e30' }}>MAIN FOCUS</span>
          )}
        </div>
        <h3 className="font-semibold text-ink-900 leading-tight">{item.role}</h3>
        <p className="text-sm font-medium mb-1" style={{ color: item.iconColor }}>{item.company}</p>
        <p className="font-mono text-[10px] text-ink-300 mb-3">{item.period}</p>
        <p className="text-sm text-ink-500 leading-relaxed mt-auto">{item.blurb}</p>
      </motion.button>
    </TiltCard>
  );
}

function ExperienceDetail({ item }) {
  const Icon = item.icon;
  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: `${item.iconColor}15`, border: `1px solid ${item.iconColor}30` }}>
          <Icon size={18} style={{ color: item.iconColor }} />
        </div>
        <div>
          <h3 className="font-serif font-semibold text-xl text-ink-900 leading-tight">{item.role}</h3>
          <p className="text-sm font-medium" style={{ color: item.iconColor }}>{item.company} · {item.location}</p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-1.5 mb-5">
        <span className="font-mono text-xs text-ink-500 bg-ink-900/[0.04] px-3 py-1 rounded-full border border-ink-900/[0.07]">{item.period}</span>
        {item.current && (
          <span className="font-mono text-[9px] font-bold px-2 py-0.5 rounded-full"
            style={{ background: '#1f7d6818', color: '#155f4d', border: '1px solid #1f7d6830' }}>CURRENT</span>
        )}
        {item.highlight && (
          <span className="font-mono text-[9px] font-bold px-2 py-0.5 rounded-full"
            style={{ background: '#e8542e18', color: '#c23c1b', border: '1px solid #e8542e30' }}>MAIN FOCUS</span>
        )}
      </div>
      <ul className="space-y-2.5 mb-5">
        {item.bullets.map((b, i) => (
          <li key={i} className="flex gap-2 text-sm text-ink-500 leading-relaxed">
            <span className="mt-1 flex-shrink-0" style={{ color: item.iconColor }}>›</span>
            {b}
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-x-4 gap-y-1.5 mb-4">
        {item.tags.map((t) => <span key={t} className="tag">{t}</span>)}
      </div>
      {item.certUrl && (
        <a href={item.certUrl} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-mono text-xs pt-4 border-t border-ink-900/[0.08] w-full transition-colors"
          style={{ color: item.iconColor }}>
          <FileCheck size={13} />
          {item.certLabel} ↗
        </a>
      )}
    </div>
  );
}

export default function Experience() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="experience" className="py-24 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.55 }} className="mb-12">
          <p className="section-label mb-3">02. experience</p>
          <h2 className="font-serif font-semibold tracking-tight text-ink-900 mb-3" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
            Where I've <span className="gradient-text">Worked</span>
          </h2>
          <p className="text-ink-500 text-base">One active internship, full-time in production right now · plus two I wrapped up along the way. Click any card for the full story.</p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TIMELINE.map((t) => <ExperienceTile key={t.id} item={t} onOpen={setSelected} />)}
        </div>
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)}>
        {selected && <ExperienceDetail item={selected} />}
      </Modal>
    </section>
  );
}
