import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowDown, Phone } from 'lucide-react';
import { useTypewriter } from '../hooks/useTypewriter';

const ROLES = [
  'AI Systems Builder',
  'Backend Engineer',
  'RAG & Agentic AI Dev',
  'Full Stack Developer',
  'Multi-Agent Pipeline Dev',
];

const SOCIALS = [
  {
    icon: Github,
    href: 'https://github.com/rudranaresh0201',
    label: 'GitHub',
  },
  {
    icon: Linkedin,
    href: 'https://linkedin.com/in/rudra-naresh-790751321',
    label: 'LinkedIn',
  },
  {
    icon: Mail,
    href: 'mailto:rudranaresh2018@gmail.com',
    label: 'Email',
  },
  {
    icon: Phone,
    href: 'tel:+919167563916',
    label: 'Phone',
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.25 } },
};
const item = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

/* Floating terminal card on the right */
function TerminalCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative hidden lg:block"
    >
      {/* Glow behind card */}
      <div
        className="absolute inset-0 rounded-3xl blur-3xl opacity-30"
        style={{ background: 'radial-gradient(circle at 50% 50%, #6366f1, transparent 70%)' }}
      />

      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="relative glass rounded-2xl p-5 w-72"
        style={{ border: '1px solid rgba(129,140,248,0.2)' }}
      >
        {/* Traffic lights */}
        <div className="flex items-center gap-1.5 mb-4">
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <span className="w-3 h-3 rounded-full bg-green-500/70" />
          <span className="ml-2 font-mono text-xs text-slate-500">rudra.py</span>
        </div>

        {/* Code */}
        <div className="font-mono text-[11px] leading-5 space-y-0.5">
          <div>
            <span className="text-indigo-400">class</span>{' '}
            <span className="text-cyan-300">RudraNaresh</span>
            <span className="text-slate-400">:</span>
          </div>
          <div className="pl-4 text-slate-400">
            university <span className="text-slate-500">=</span>{' '}
            <span className="text-green-400">"VJTI"</span>
          </div>
          <div className="pl-4 text-slate-400">
            cgpa <span className="text-slate-500">=</span>{' '}
            <span className="text-yellow-300">8.37</span>
          </div>
          <div className="pl-4 text-slate-400">
            focus <span className="text-slate-500">=</span>{' '}
            <span className="text-green-400">"Agentic AI"</span>
          </div>
          <div className="pl-4 text-slate-400">
            stack <span className="text-slate-500">=</span> [
          </div>
          {['FastAPI', 'RAG', 'CrewAI', 'LangGraph'].map((s) => (
            <div key={s} className="pl-8 text-green-400">
              "{s}",
            </div>
          ))}
          <div className="pl-4 text-slate-400">]</div>
          <div className="pl-4 mt-1">
            <span className="text-slate-500"># currently building →</span>
          </div>
          <div className="pl-4 text-indigo-300">production AI</div>
        </div>
      </motion.div>

      {/* Floating badges */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
        className="absolute -right-10 top-8 glass rounded-xl px-3 py-2 text-xs font-mono"
        style={{ border: '1px solid rgba(34,211,238,0.25)', color: '#22d3ee' }}
      >
        🤖 Agentic AI
      </motion.div>
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
        className="absolute -left-10 bottom-12 glass rounded-xl px-3 py-2 text-xs font-mono"
        style={{ border: '1px solid rgba(129,140,248,0.25)', color: '#a5b4fc' }}
      >
        🔗 Multi-Agent
      </motion.div>
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
        className="absolute -right-6 bottom-4 glass rounded-xl px-3 py-2 text-xs font-mono"
        style={{ border: '1px solid rgba(52,211,153,0.25)', color: '#6ee7b7' }}
      >
        📄 RAG
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  const typedText = useTypewriter(ROLES, { speed: 75, deleteSpeed: 38, pauseDelay: 2200 });

  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* ── Background orbs ───────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="orb-1 absolute rounded-full"
          style={{
            width: 700,
            height: 700,
            top: -180,
            left: -200,
            background: 'radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 65%)',
          }}
        />
        <div
          className="orb-2 absolute rounded-full"
          style={{
            width: 600,
            height: 600,
            bottom: -150,
            right: -150,
            background: 'radial-gradient(circle, rgba(6,182,212,0.14) 0%, transparent 65%)',
          }}
        />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
      </div>

      {/* ── Content ───────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 pt-24 pb-16 w-full">
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-16">

          {/* Left: text */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="flex-1 text-center lg:text-left max-w-2xl"
          >
            {/* Greeting chip */}
            <motion.div variants={item} className="mb-5 inline-flex items-center gap-2">
              <span
                className="section-label"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              >
                &gt; hello world, I'm
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              variants={item}
              className="font-black tracking-tight leading-none mb-3"
              style={{ fontSize: 'clamp(3rem, 10vw, 6.5rem)' }}
            >
              <span className="gradient-text">Rudra</span>
              <br />
              <span className="text-slate-100">Naresh.</span>
            </motion.h1>

            {/* Typewriter */}
            <motion.div variants={item} className="h-9 flex items-center justify-center lg:justify-start mb-6">
              <span className="font-mono text-base sm:text-xl text-cyan-400">
                {typedText}
              </span>
              <span className="font-mono text-xl text-indigo-400 animate-blink ml-0.5">
                |
              </span>
            </motion.div>

            {/* Bio */}
            <motion.p
              variants={item}
              className="text-slate-400 text-base sm:text-lg leading-relaxed mb-8"
            >
              B.Tech{' '}
              <span className="text-slate-200 font-medium">Electronics Engineering</span> @ VJTI
              Mumbai · Minor in AI/ML · CGPA{' '}
              <span className="text-indigo-400 font-mono font-semibold">8.37</span>.
              <br className="hidden sm:block" />
              Building production{' '}
              <span className="text-indigo-300">Agentic AI</span>,{' '}
              <span className="text-cyan-300">RAG pipelines</span> and{' '}
              <span className="text-violet-300">backend systems</span>. Interning at{' '}
              <span className="text-slate-200 font-medium">OpenRAG</span> &{' '}
              <span className="text-slate-200 font-medium">4seer Technologies</span>.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              variants={item}
              className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8"
            >
              <button onClick={scrollToProjects} className="btn-primary">
                View Projects
              </button>
              <button onClick={scrollToContact} className="btn-ghost">
                Get In Touch
              </button>
            </motion.div>

            {/* Social links */}
            <motion.div
              variants={item}
              className="flex items-center gap-3 justify-center lg:justify-start"
            >
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={label !== 'Phone' && label !== 'Email' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-xl glass flex items-center justify-center text-slate-400 hover:text-white transition-colors duration-200 glow-border"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.93 }}
                >
                  <Icon size={16} />
                </motion.a>
              ))}

              <div className="h-5 w-px bg-white/10 mx-1" />
              <span className="font-mono text-xs text-slate-600">VJTI · Mumbai</span>
            </motion.div>
          </motion.div>

          {/* Right: terminal card */}
          <TerminalCard />
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[10px] text-slate-600 tracking-widest uppercase">
            scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown size={14} className="text-slate-600" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
