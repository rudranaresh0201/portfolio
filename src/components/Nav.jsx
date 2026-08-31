import { Link, NavLink, useLocation } from 'react-router-dom';

const PAGES = [
  { to: '/work', label: 'work' },
  { to: '/projects', label: 'projects' },
  { to: '/writing', label: 'writing' },
];

export default function Nav() {
  const { pathname } = useLocation();
  const onHome = pathname === '/';

  return (
    <header className="sticky top-0 z-50 bg-base/80 backdrop-blur-md border-b border-line">
      <nav className="max-w-page mx-auto px-5 h-14 flex items-center justify-between gap-4">
        <Link
          to="/"
          className={`font-mono text-2xs shrink-0 transition-colors ${
            onHome ? 'text-accent' : 'text-fg hover:text-accent'
          }`}
        >
          rudra naresh
          <span className="text-faint"> / vjti</span>
        </Link>

        <ul className="flex items-center gap-4 sm:gap-5">
          {PAGES.map((p) => (
            <li key={p.to}>
              <NavLink
                to={p.to}
                className={({ isActive }) =>
                  `relative font-mono text-2xs py-1 transition-colors duration-200 ${
                    isActive ? 'text-accent' : 'text-mute hover:text-dim'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {p.label}
                    <span
                      className={`absolute left-0 -bottom-0.5 h-px bg-accent transition-all duration-300 ease-out ${
                        isActive ? 'w-full opacity-100' : 'w-0 opacity-0'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
