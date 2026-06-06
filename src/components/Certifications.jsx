import { motion } from 'framer-motion';
import { ExternalLink, ShieldCheck, Clock } from 'lucide-react';

/**
 * Certifications section
 * Add new certs to the CERTS array — each renders automatically.
 */
const CERTS = [
  {
    id: 1,
    title: 'Introduction to Model Context Protocol',
    issuer: 'Anthropic',
    issuerLogo: 'ANTHROPIC',   // text logo fallback
    certNo: 'gg3nm2kasyoy',
    verifyUrl: 'https://verify.skilljar.com/c/gg3nm2kasyoy',
    status: 'Verified',
    accentColor: '#818cf8',
    tags: ['MCP', 'AI Infrastructure', 'Anthropic'],
    description:
      'Covers the Model Context Protocol — the open standard for connecting LLMs to external tools, data sources, and systems. Directly applicable to production agentic AI pipelines.',
  },
  // Add more certs here as you earn them:
  // {
  //   id: 2,
  //   title: 'Your Next Cert',
  //   issuer: 'Issuer Name',
  //   certNo: 'CERT-ID',
  //   verifyUrl: 'https://...',
  //   status: 'Verified',
  //   accentColor: '#22d3ee',
  //   tags: ['tag1', 'tag2'],
  //   description: '...',
  // },
];

/* Anthropic "A" logo as minimal SVG */
function AnthropicLogo({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M27.8 8L38 40H32.1L29.9 33H18.1L15.9 40H10L20.2 8H27.8ZM24 15.2L19.7 28.4H28.3L24 15.2Z"
        fill="currentColor"
      />
    </svg>
  );
}

/* Decorative verified badge */
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

/* Single certificate card */
function CertCard({ cert, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="glass rounded-2xl overflow-hidden glow-border group glass-hover"
    >
      {/* Gradient top bar */}
      <div
        className="h-0.5 w-full opacity-70 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, ${cert.accentColor}, transparent)` }}
      />

      <div className="p-6">
        {/* Header row */}
        <div className="flex items-start justify-between gap-4 mb-4">
          {/* Issuer logo */}
          <div
            className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ background: `${cert.accentColor}12`, border: `1px solid ${cert.accentColor}25`, color: cert.accentColor }}
          >
            <AnthropicLogo size={26} />
          </div>

          {/* Right: verified + external */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <VerifiedBadge color={cert.accentColor} />
            <motion.a
              href={cert.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Verify certificate"
              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-white transition-colors"
              style={{ background: 'rgba(255,255,255,0.05)' }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.93 }}
            >
              <ExternalLink size={13} />
            </motion.a>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-bold text-white text-base leading-snug mb-1">
          {cert.title}
        </h3>

        {/* Issuer */}
        <p className="font-mono text-xs font-semibold mb-3" style={{ color: cert.accentColor }}>
          {cert.issuer}
        </p>

        {/* Description */}
        <p className="text-sm text-slate-400 leading-relaxed mb-4">
          {cert.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {cert.tags.map((t) => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>

        {/* Cert number + verify link */}
        <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
          <span className="font-mono text-[10px] text-slate-600">
            # {cert.certNo}
          </span>
          <a
            href={cert.verifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[10px] flex items-center gap-1 transition-colors"
            style={{ color: cert.accentColor, opacity: 0.8 }}
          >
            verify.skilljar.com ↗
          </a>
        </div>
      </div>
    </motion.div>
  );
}

/* Coming soon placeholder card */
function ComingSoonCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: 0.15 }}
      className="glass rounded-2xl p-6 border border-dashed"
      style={{ borderColor: 'rgba(255,255,255,0.08)' }}
    >
      <div className="flex items-center gap-3 mb-3">
        <Clock size={16} className="text-slate-600" />
        <span className="font-mono text-xs text-slate-600 tracking-wide">INCOMING</span>
      </div>
      <p className="text-slate-600 text-sm leading-relaxed italic">
        More certifications loading… currently breaking things in production
        to earn them faster.
      </p>
    </motion.div>
  );
}

export default function Certifications() {
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
          <p className="section-label mb-3">05. certifications</p>
          <h2
            className="font-black tracking-tight text-white mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}
          >
            What I've{' '}
            <span className="gradient-text">Verified</span>
          </h2>
          <p className="text-slate-400 text-base leading-relaxed max-w-2xl">
            Credentials with actual verification links — not just screenshots.
            More incoming as I keep building.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CERTS.map((cert, i) => (
            <CertCard key={cert.id} cert={cert} index={i} />
          ))}
          <ComingSoonCard />
        </div>
      </div>
    </section>
  );
}
