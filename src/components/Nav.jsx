import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SECTIONS = [
  { id: 'work', label: 'work' },
  { id: 'projects', label: 'projects' },
  { id: 'writing', label: 'writing' },
  { id: 'about', label: 'about' },
];

export default function Nav() {
  const [active, setActive] = useState('');
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const onHome = pathname === '/';

  useEffect(() => {
    if (!onHome) {
      setActive('');
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        const vis = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (vis[0]) setActive(vis[0].target.id);
      },
      { rootMargin: '-88px 0px -60% 0px' }
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [onHome]);

  /* The router owns the URL hash, so an <a href="#work"> reads as a route and
     never scrolls. Scroll it ourselves instead, and hop home first if we are
     deep in a blog post. */
  function go(id) {
    const scroll = () =>
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

    if (onHome) {
      scroll();
    } else {
      navigate('/');
      requestAnimationFrame(() => requestAnimationFrame(scroll));
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-base/80 backdrop-blur-md border-b border-line">
      <nav className="max-w-page mx-auto px-5 h-14 flex items-center justify-between gap-4">
        <button
          onClick={() => (onHome ? window.scrollTo({ top: 0, behavior: 'smooth' }) : navigate('/'))}
          className="font-mono text-2xs text-fg shrink-0 hover:opacity-70 transition-opacity"
        >
          rudra naresh
          <span className="text-faint"> / vjti</span>
        </button>

        <ul className="flex items-center gap-4 sm:gap-5">
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <button
                onClick={() => go(s.id)}
                className={`relative font-mono text-2xs py-1 transition-colors duration-200 ${
                  active === s.id ? 'text-fg' : 'text-mute hover:text-dim'
                }`}
              >
                {s.label}
                <span
                  className={`absolute left-0 -bottom-0.5 h-px bg-fg transition-all duration-300 ease-out ${
                    active === s.id ? 'w-full opacity-100' : 'w-0 opacity-0'
                  }`}
                />
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
