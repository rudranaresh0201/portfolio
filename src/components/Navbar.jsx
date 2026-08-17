import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Magnetic } from './Motion';

const NAV_LINKS = [
  { n: '01', label: 'About',      href: '#about' },
  { n: '02', label: 'Experience', href: '#experience' },
  { n: '03', label: 'Projects',   href: '#projects' },
  { n: '04', label: 'Blog',       href: '#blog' },
  { n: '05', label: 'Life',       href: '#life' },
  { n: '06', label: 'Certs',      href: '#certifications' },
  { n: '07', label: 'Contact',    href: '#contact' },
];

export default function Navbar() {
  const [scrolled,      setScrolled]      = useState(false);
  const [mobileOpen,    setMobileOpen]    = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (href) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className={`sticky top-0 z-50 transition-all duration-300 ${scrolled || mobileOpen ? 'bg-paper/90 backdrop-blur-md border-b border-ink-900/[0.07]' : 'bg-transparent'}`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-4 flex items-center justify-between">
        <motion.button onClick={() => scrollTo('#about')} className="flex items-center gap-2 focus:outline-none" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
          <span className="text-xl font-black tracking-tight gradient-text" style={{ fontFamily: 'JetBrains Mono, monospace' }}>RN</span>
          <span className="hidden sm:block text-ink-500 text-sm font-light">/ portfolio</span>
        </motion.button>

        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map(({ n, label, href }) => {
            const active = activeSection === href.slice(1);
            return (
              <button key={label} onClick={() => scrollTo(href)}
                className="relative py-1.5 text-sm font-medium transition-colors duration-200 group">
                <span className={`font-mono text-[10px] mr-1.5 ${active ? 'text-coral-500' : 'text-ink-300'}`}>{n}</span>
                <span className={active ? 'text-ink-900' : 'text-ink-500 group-hover:text-ink-900'}>{label}</span>
                <span className="absolute left-0 -bottom-0.5 h-[1.5px] bg-coral-500 transition-all duration-300"
                  style={{ width: active ? '100%' : '0%' }} />
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <Magnetic strength={0.4} className="hidden md:block">
            <a href="https://github.com/rudranaresh0201" target="_blank" rel="noopener noreferrer"
              className="group inline-flex items-center gap-1 text-sm font-semibold text-ink-700 pb-0.5 border-b-2 border-ink-900/15 hover:border-coral-500 transition-colors duration-200">
              GitHub
              <ArrowUpRight size={13} className="text-coral-500 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Magnetic>
          <button className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl glass text-ink-500 hover:text-ink-900 transition-colors"
            onClick={() => setMobileOpen((p) => !p)} aria-label="Toggle navigation">
            {mobileOpen ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div key="mobile-menu" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }} className="md:hidden overflow-hidden border-b border-ink-900/[0.06]">
            <div className="px-5 py-3 space-y-1">
              {NAV_LINKS.map(({ n, label, href }) => (
                <button key={label} onClick={() => scrollTo(href)}
                  className={`flex items-center gap-2 w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${activeSection === href.slice(1) ? 'text-ink-900 bg-ink-900/[0.06]' : 'text-ink-500 hover:text-ink-900 hover:bg-ink-900/[0.04]'}`}>
                  <span className="font-mono text-[10px] text-ink-300">{n}</span> {label}
                </button>
              ))}
              <a href="https://github.com/rudranaresh0201" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-ink-500 hover:text-ink-900 hover:bg-ink-900/[0.04] transition-all duration-150">
                GitHub ↗
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
