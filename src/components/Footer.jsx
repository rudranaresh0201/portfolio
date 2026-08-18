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
      '%c\n  Rudra Naresh · rudranaresh2018@gmail.com\n  github.com/rudranaresh0201\n',
      'color: #c23c1b; font-family: JetBrains Mono, monospace; font-size: 13px;'
    );
  }, []);

  return (
    <footer className="border-t border-ink-900/[0.07] py-8 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-black text-sm gradient-text font-mono">RN</span>
          <span className="text-ink-300 text-xs">© {year} Rudra Naresh. Built with React + Vite + Framer Motion.</span>
        </div>
        <div className="flex items-center gap-2">
          {SOCIALS.map(({ icon: Icon, href, label }) => (
            <motion.a key={label} href={href}
              target={label !== 'Email' ? '_blank' : undefined}
              rel="noopener noreferrer" aria-label={label}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-ink-300 hover:text-ink-700 transition-colors"
              style={{ background: 'rgba(24,20,15,0.04)' }}
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.93 }}>
              <Icon size={13} />
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  );
}
