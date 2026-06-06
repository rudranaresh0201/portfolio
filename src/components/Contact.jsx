import { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Phone, Copy, Check } from 'lucide-react';

const EMAIL = 'rudranaresh2018@gmail.com';

const LINKS = [
  { icon: Github,   label: 'GitHub',    value: 'rudranaresh0201',  href: 'https://github.com/rudranaresh0201',               color: '#818cf8' },
  { icon: Linkedin, label: 'LinkedIn',  value: 'rudra-naresh',     href: 'https://linkedin.com/in/rudra-naresh-790751321',   color: '#22d3ee' },
  { icon: Phone,    label: 'WhatsApp',  value: '+91 9167563916',   href: 'tel:+919167563916',                                color: '#34d399' },
];

function CopyEmailButton() {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <motion.button onClick={copy}
      className="group flex items-center gap-3 glass rounded-2xl px-6 py-4 w-full max-w-md mx-auto transition-all duration-300"
      style={{ border: '1px solid rgba(129,140,248,0.2)' }}
      whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Mail size={18} className="text-indigo-400 flex-shrink-0" />
      <span className="font-mono text-sm text-slate-200 flex-1 text-left truncate">{EMAIL}</span>
      <span className="flex-shrink-0 text-slate-500 group-hover:text-indigo-400 transition-colors">
        {copied ? <Check size={15} className="text-green-400" /> : <Copy size={15} />}
      </span>
    </motion.button>
  );
}

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] } },
});

export default function Contact() {
  return (
    <section id="contact" className="relative py-32 px-5 sm:px-8 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-96 h-96 rounded-full -bottom-24 left-1/2 -translate-x-1/2 opacity-20"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.4) 0%, transparent 70%)' }} />
        <div className="absolute inset-0 opacity-[0.015]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)', backgroundSize: '64px 64px' }} />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.p variants={fadeUp(0)} initial="hidden" whileInView="visible" viewport={{ once: true }} className="section-label mb-4">
          06. contact
        </motion.p>

        <motion.h2 variants={fadeUp(0.08)} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="font-black tracking-tight text-white mb-4"
          style={{ fontSize: 'clamp(2.4rem, 7vw, 4rem)', lineHeight: 1.1 }}>
          Let's Build<br /><span className="gradient-text">Something Real.</span>
        </motion.h2>

        <motion.p variants={fadeUp(0.14)} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="text-slate-400 text-base sm:text-lg mb-10 max-w-lg mx-auto leading-relaxed">
          If you're building something interesting in AI or just want to argue about
          whether Dhoni is the GOAT <span className="text-slate-500 text-sm">(he is)</span>, reach out.
        </motion.p>

        <motion.div variants={fadeUp(0.2)} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-8">
          <CopyEmailButton />
          <p className="text-xs text-slate-600 mt-2 font-mono">click to copy</p>
        </motion.div>

        <motion.div variants={fadeUp(0.26)} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="flex items-center justify-center gap-3 flex-wrap mb-14">
          {LINKS.map(({ icon: Icon, label, value, href, color }) => (
            <motion.a key={label} href={href}
              target={label !== 'WhatsApp' ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 glass rounded-xl px-4 py-2.5 transition-all duration-200"
              style={{ border: `1px solid ${color}20` }}
              whileHover={{ y: -2, scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Icon size={14} style={{ color }} />
              <div className="text-left">
                <p className="font-mono text-[9px] text-slate-600 leading-none mb-0.5">{label}</p>
                <p className="text-xs text-slate-300 font-medium leading-none">{value}</p>
              </div>
            </motion.a>
          ))}
        </motion.div>

        <motion.div variants={fadeUp(0.32)} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="flex items-center gap-4">
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08))' }} />
          <p className="font-mono text-xs text-slate-600">Dhoni didn't wait for perfect conditions. Neither do I.</p>
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.08), transparent)' }} />
        </motion.div>
      </div>
    </section>
  );
}
