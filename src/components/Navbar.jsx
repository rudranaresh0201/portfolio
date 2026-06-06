import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github } from 'lucide-react';

const NAV_LINKS = [
  { label: 'About',      href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Life',       href: '#life' },
  { label: 'Certs',      href: '#certifications' },
  { label: 'Contact',    href: '#contact' },
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
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled || mobileOpen ? 'glass border-b border-white/[0.06]' : 'bg-transparent'}`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-4 flex items-center justify-between">
        <motion.button onClick={() => scrollTo('#about')} className="flex items-center gap-2 focus:outline-none" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
          <span className="text-xl font-black tracking-tight gradient-text" style={{ fontFamily: 'JetBrains Mono, monospace' }}>RN</span>
          <span className="hidden sm:block text-slate-500 text-sm font-light">/ portfolio</span>
        </motion.button>

        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ label, href }) => {
            const active = activeSection === href.slice(1);
            return (
              <button key={label} onClick={() => scrollTo(href)}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${active ? 'text-white' : 'text-slate-400 hover:text-slate-200'}`}>
                {active && (
                  <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-lg"
                    style={{ background: 'rgba(255,255,255,0.07)' }}
                    transition={{ type: 'spring', stiffness: 380, damping: 34 }} />
                )}
                <span className="relative z-10">{label}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <motion.a href="https://github.com/rudranaresh0201" target="_blank" rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-slate-300 px-4 py-2 rounded-xl border border-white/[0.08] hover:border-indigo-500/40 hover:text-white transition-all duration-200"
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
            <Github size={14} /> GitHub
          </motion.a>
          <button className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl glass text-slate-400 hover:text-white transition-colors"
            onClick={() => setMobileOpen((p) => !p)} aria-label="Toggle navigation">
            {mobileOpen ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div key="mobile-menu" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }} className="md:hidden overflow-hidden border-b border-white/[0.06]">
            <div className="px-5 py-3 space-y-1">
              {NAV_LINKS.map(({ label, href }) => (
                <button key={label} onClick={() => scrollTo(href)}
                  className={`block w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${activeSection === href.slice(1) ? 'text-white bg-white/[0.07]' : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'}`}>
                  {label}
                </button>
              ))}
              <a href="https://github.com/rudranaresh0201" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-white/[0.04] transition-all duration-150">
                <Github size={14} /> GitHub ↗
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
