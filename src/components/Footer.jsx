import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

const SOCIALS = [
  { icon: Github,   href: 'https://github.com/rudranaresh0201',              label: 'GitHub'   },
  { icon: Linkedin, href: 'https://linkedin.com/in/rudra-naresh-790751321',  label: 'LinkedIn' },
  { icon: Mail,     href: 'mailto:rudranaresh2018@gmail.com',                label: 'Email'    },
];

export default function Footer() {
  const year = new Date().getFullYear();

  useEffect(() => {
    console.log(
      '%c\n  MS Dhoni would have shipped this portfolio with 6 balls to spare. 🏏\n\n  Hey recruiter 👋  Rudra Naresh — rudranaresh2018@gmail.com\n  github.com/rudranaresh0201\n',
      'color: #818cf8; font-family: JetBrains Mono, monospace; font-size: 13px;'
    );
  }, []);

  return (
    <footer className="border-t border-white/[0.06] py-8 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-black text-sm gradient-text font-mono">RN</span>
          <span className="text-slate-600 text-xs">© {year} Rudra Naresh. Built with React + Vite + Framer Motion.</span>
        </div>
        <div className="flex items-center gap-2">
          {SOCIALS.map(({ icon: Icon, href, label }) => (
            <motion.a key={label} href={href}
              target={label !== 'Email' ? '_blank' : undefined}
              rel="noopener noreferrer" aria-label={label}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 hover:text-slate-300 transition-colors"
              style={{ background: 'rgba(255,255,255,0.04)' }}
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.93 }}>
              <Icon size={13} />
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  );
}
