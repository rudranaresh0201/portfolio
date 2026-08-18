import { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowDown, ArrowUpRight, Phone } from 'lucide-react';
import { useTypewriter } from '../hooks/useTypewriter';
import { TiltCard, Magnetic } from './Motion';

const ROLES = ['RAG Systems Engineer', 'Multi-Agent Pipeline Dev', 'MCP Infrastructure Builder', 'Agentic AI Builder'];

const SOCIALS = [
  { icon: Github,   href: 'https://github.com/rudranaresh0201',             label: 'GitHub'   },
  { icon: Linkedin, href: 'https://linkedin.com/in/rudra-naresh-790751321', label: 'LinkedIn' },
  { icon: Mail,     href: 'mailto:rudranaresh2018@gmail.com',               label: 'Email'    },
  { icon: Phone,    href: 'tel:+919167563916',                              label: 'Phone'    },
];

const STATS = ['1 Active Internship', '5 Projects', 'Anthropic MCP Certified'];

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.25 } } };
const item = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } } };

/* Minimal underline text-link with arrow, used instead of filled buttons */
function TextLink({ children, onClick, href, external }) {
  const Tag = href ? 'a' : 'button';
  return (
    <Magnetic strength={0.3}>
      <Tag
        onClick={onClick}
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className="group inline-flex items-center gap-1.5 font-semibold text-ink-900 text-sm pb-1 border-b-2 border-ink-900/15 hover:border-coral-500 transition-colors duration-200"
      >
        {children}
        <ArrowUpRight size={14} className="text-coral-500 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </Tag>
    </Magnetic>
  );
}

function ProfilePortrait() {
  const [imgFailed, setImgFailed] = useState(false);
  const src = `${import.meta.env.BASE_URL}profile.jpg`;

  return (
    <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative hidden lg:block">
      <div className="absolute inset-0 -m-6 rounded-[2rem] blur-3xl opacity-40"
        style={{ background: 'radial-gradient(circle at 50% 40%, #e8542e, transparent 70%)' }} />

      <TiltCard maxTilt={7} className="group relative w-72 h-80 scallop-frame"
        style={{ filter: 'drop-shadow(0 20px 34px rgba(24,20,15,0.28)) drop-shadow(0 6px 10px rgba(24,20,15,0.18))' }}>
        {!imgFailed ? (
          <img
            src={src}
            alt="Rudra Naresh"
            onError={() => setImgFailed(true)}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: '50% 20%' }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, rgba(232,84,46,0.12), rgba(193,134,26,0.12))' }}>
            <span className="font-black text-6xl gradient-text" style={{ fontFamily: 'JetBrains Mono, monospace' }}>RN</span>
          </div>
        )}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 55%, rgba(24,20,15,0.35) 100%)' }} />
        <div className="absolute bottom-0 inset-x-0 px-5 pt-4 pb-6">
          <p className="font-mono text-[10px] text-white/80 tracking-widest uppercase">VJTI Mumbai · Est. 2024</p>
        </div>
      </TiltCard>

      <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
        className="absolute -right-8 top-6 glass rounded-xl px-3 py-2 text-xs font-mono"
        style={{ border: '1px solid rgba(31,125,104,0.3)', color: '#155f4d' }}>Agentic AI</motion.div>
      <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
        className="absolute -left-10 bottom-24 glass rounded-xl px-3 py-2 text-xs font-mono"
        style={{ border: '1px solid rgba(232,84,46,0.3)', color: '#c23c1b' }}>MCP</motion.div>
      <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
        className="absolute -right-6 bottom-2 glass rounded-xl px-3 py-2 text-xs font-mono"
        style={{ border: '1px solid rgba(193,134,26,0.3)', color: '#996a11' }}>RAG</motion.div>
    </motion.div>
  );
}

export default function Hero() {
  const typedText = useTypewriter(ROLES, { speed: 75, deleteSpeed: 38, pauseDelay: 2200 });

  return (
    <section id="about" className="relative min-h-[88vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="orb-1 absolute rounded-full"
          style={{ width: 700, height: 700, top: -180, left: -200, background: 'radial-gradient(circle, rgba(232,84,46,0.10) 0%, transparent 65%)' }} />
        <div className="orb-2 absolute rounded-full"
          style={{ width: 600, height: 600, bottom: -150, right: -150, background: 'radial-gradient(circle, rgba(31,125,104,0.08) 0%, transparent 65%)' }} />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(rgba(24,20,15,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(24,20,15,0.15) 1px, transparent 1px)', backgroundSize: '64px 64px' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 pt-10 pb-16 w-full">
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-16">
          <motion.div variants={container} initial="hidden" animate="visible"
            className="flex-1 text-center lg:text-left max-w-2xl">
            <motion.div variants={item} className="mb-5 inline-flex items-center gap-2">
              <span className="section-label" style={{ fontFamily: 'JetBrains Mono, monospace' }}>01 · hello world, I'm</span>
            </motion.div>
            <motion.h1 variants={item} className="font-serif font-semibold tracking-tight leading-none mb-3"
              style={{ fontSize: 'clamp(3rem, 10vw, 6.5rem)' }}>
              <span className="gradient-text">Rudra</span><br /><span className="text-ink-900">Naresh.</span>
            </motion.h1>
            <motion.div variants={item} className="h-9 flex items-center justify-center lg:justify-start mb-4">
              <span className="font-mono text-base sm:text-xl text-teal-500">{typedText}</span>
              <span className="font-mono text-xl text-coral-500 animate-blink ml-0.5">|</span>
            </motion.div>
            <motion.p variants={item} className="text-ink-500 text-sm leading-relaxed mb-6">
              Electronics engineering student building RAG systems, autonomous agents, and the
              infrastructure that verifies them. ·{' '}
              <span className="text-ink-700 font-medium">VJTI Mumbai</span> · AI/ML Minor ·
              CGPA <span className="text-coral-600 font-mono font-semibold">8.37</span>
            </motion.p>
            <motion.p variants={item} className="font-mono text-xs text-ink-500 mb-7">
              {STATS.join('   ·   ')}
            </motion.p>
            <motion.div variants={item} className="flex flex-wrap gap-8 justify-center lg:justify-start mb-8">
              <TextLink onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}>
                See the work
              </TextLink>
              <TextLink onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}>
                Say hi
              </TextLink>
            </motion.div>
            <motion.div variants={item} className="flex items-center gap-3 justify-center lg:justify-start">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <Magnetic key={label} strength={0.5}>
                  <a href={href}
                    target={label !== 'Phone' && label !== 'Email' ? '_blank' : undefined}
                    rel="noopener noreferrer" aria-label={label}
                    className="w-10 h-10 rounded-xl glass flex items-center justify-center text-ink-500 hover:text-ink-900 transition-colors duration-200 glow-border">
                    <Icon size={16} />
                  </a>
                </Magnetic>
              ))}
              <div className="h-5 w-px bg-ink-900/10 mx-1" />
              <span className="font-mono text-xs text-ink-300">VJTI · Mumbai</span>
            </motion.div>
          </motion.div>
          <ProfilePortrait />
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="font-mono text-[10px] text-ink-300 tracking-widest uppercase">scroll</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}>
            <ArrowDown size={14} className="text-ink-300" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
