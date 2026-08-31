import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const SECTIONS = [
  { id: 'work',     label: 'work'     },
  { id: 'projects', label: 'projects' },
  { id: 'writing',  label: 'writing'  },
  { id: 'about',    label: 'about'    },
];

export default function Nav() {
  const [active, setActive] = useState('work');
  const { pathname } = useLocation();
  const onHome = pathname === '/';

  useEffect(() => {
    if (!onHome) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (vis[0]) setActive(vis[0].target.id);
      },
      { rootMargin: '-88px 0px -65% 0px' }
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [onHome]);

  return (
    <header className="sticky top-0 z-50 bg-base/85 backdrop-blur-sm border-b border-line">
      <nav className="max-w-page mx-auto px-5 h-14 flex items-center justify-between gap-4">
        <Link to="/" className="font-mono text-2xs text-fg hover:text-fg shrink-0">
          rudra naresh
          <span className="text-faint"> / vjti</span>
        </Link>
        <ul className="flex items-center gap-4 sm:gap-5">
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <a
                href={onHome ? `#${s.id}` : `/#${s.id}`}
                className={`font-mono text-2xs transition-colors ${
                  onHome && active === s.id ? 'text-fg' : 'text-mute hover:text-dim'
                }`}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
