import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { TiltCard } from './Motion';
import Modal from './Modal';

/**
 * Certifications section
 * Add new certs to the CERTS array — each renders automatically.
 */
const CERTS = [
  {
    id: 1,
    title: 'Introduction to Model Context Protocol',
    issuer: 'Anthropic',
    logo: 'anthropic',
    certNo: 'gg3nm2kasyoy',
    verifyUrl: 'https://verify.skilljar.com/c/gg3nm2kasyoy',
    verifyLabel: 'verify.skilljar.com ↗',
    accentColor: '#1f7d68',
    tags: ['MCP', 'AI Infrastructure', 'Anthropic'],
    description:
      'Covers the Model Context Protocol — the open standard for connecting LLMs to external tools, data sources, and systems. Directly applicable to production agentic AI pipelines.',
  },
  {
    id: 2,
    title: 'Accelerating End-to-End Data Science Workflows',
    issuer: 'NVIDIA',
    logo: 'nvidia',
    certNo: 'vl38RuWHSouN5HTav1-LwA',
    verifyUrl: 'https://learn.nvidia.com/certificates?id=vl38RuWHSouN5HTav1-LwA',
    verifyLabel: 'learn.nvidia.com ↗',
    accentColor: '#76b900',
    tags: ['Data Science', 'RAPIDS', 'GPU Acceleration'],
    description:
      'Certificate of Competency for accelerating full data science pipelines end-to-end on GPUs — issued by NVIDIA, signed by Howard Wright, VP.',
  },
];

/* Anthropic "A" logo as minimal SVG */
function AnthropicLogo({ size = 26 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M27.8 8L38 40H32.1L29.9 33H18.1L15.9 40H10L20.2 8H27.8ZM24 15.2L19.7 28.4H28.3L24 15.2Z"
        fill="currentColor"
      />
    </svg>
  );
}

/* NVIDIA eye-mark, simplified */
function NvidiaLogo({ size = 26 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 20C13 12 19 8 24 8c9 0 14 8 16 12-2 4-7 12-16 12-5 0-11-4-16-12z" stroke="currentColor" strokeWidth="3" fill="none" />
      <circle cx="24" cy="20" r="5" fill="currentColor" />
    </svg>
  );
}

function IssuerLogo({ cert, size = 26 }) {
  if (cert.logo === 'anthropic') return <AnthropicLogo size={size} />;
  if (cert.logo === 'nvidia') return <NvidiaLogo size={size} />;
  return <span className="font-mono text-sm font-bold">{cert.issuer.slice(0, 2).toUpperCase()}</span>;
}

function VerifiedBadge({ color }) {
  return (
    <span
      className="inline-flex items-center gap-1 font-mono text-[10px] font-bold px-2 py-0.5 rounded-full"
      style={{ background: `${color}15`, color, border: `1px solid ${color}30` }}
    >
      <ShieldCheck size={10} />
      Verified
    </span>
  );
}

/* Compact clickable tile */
function CertTile({ cert, index, onOpen }) {
  return (
    <TiltCard maxTilt={6} className="group glass rounded-2xl glow-border relative">
      <motion.button
        onClick={() => onOpen(cert)}
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -4 }}
        className="text-left w-full p-6 flex flex-col"
      >
        <div className="flex items-start justify-between gap-4 mb-4">
          <div
            className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ background: `${cert.accentColor}12`, border: `1px solid ${cert.accentColor}28`, color: cert.accentColor }}
          >
            <IssuerLogo cert={cert} />
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <VerifiedBadge color={cert.accentColor} />
            <ArrowUpRight size={14} className="text-ink-300 group-hover:text-ink-700 transition-colors" />
          </div>
        </div>
        <h3 className="font-semibold text-ink-900 text-base leading-snug mb-1">{cert.title}</h3>
        <p className="font-mono text-xs font-semibold" style={{ color: cert.accentColor }}>{cert.issuer}</p>
      </motion.button>
    </TiltCard>
  );
}

function CertDetail({ cert }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-5">
        <div
          className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center"
          style={{ background: `${cert.accentColor}12`, border: `1px solid ${cert.accentColor}28`, color: cert.accentColor }}
        >
          <IssuerLogo cert={cert} size={30} />
        </div>
        <div>
          <h3 className="font-serif font-semibold text-xl text-ink-900 leading-snug">{cert.title}</h3>
          <p className="font-mono text-xs font-semibold" style={{ color: cert.accentColor }}>{cert.issuer}</p>
        </div>
      </div>
      <VerifiedBadge color={cert.accentColor} />
      <p className="text-sm text-ink-500 leading-relaxed my-4">{cert.description}</p>
      <div className="flex flex-wrap gap-x-4 gap-y-1.5 mb-5">
        {cert.tags.map((t) => <span key={t} className="tag">{t}</span>)}
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-ink-900/[0.08]">
        <span className="font-mono text-[10px] text-ink-300"># {cert.certNo}</span>
        <a
          href={cert.verifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs flex items-center gap-1 font-semibold transition-colors"
          style={{ color: cert.accentColor }}
        >
          {cert.verifyLabel} <ExternalLink size={11} />
        </a>
      </div>
    </div>
  );
}

export default function Certifications() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="certifications" className="py-24 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-12"
        >
          <p className="section-label mb-3">06. certifications</p>
          <h2
            className="font-serif font-semibold tracking-tight text-ink-900 mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}
          >
            What I've{' '}
            <span className="gradient-text">Verified</span>
          </h2>
          <p className="text-ink-500 text-base leading-relaxed max-w-2xl">
            Credentials with actual verification links — not just screenshots.
            Click a card for the details. More incoming as I keep building.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CERTS.map((cert, i) => (
            <CertTile key={cert.id} cert={cert} index={i} onOpen={setSelected} />
          ))}
        </div>
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)}>
        {selected && <CertDetail cert={selected} />}
      </Modal>
    </section>
  );
}
