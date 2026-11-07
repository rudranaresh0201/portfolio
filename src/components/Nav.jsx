import { Link, useLocation } from 'react-router-dom';

export const SECTIONS = [
  { id: 'projects', label: 'projects', path: '/projects' },
  { id: 'demos', label: 'demos', path: '/demos' },
  { id: 'internships', label: 'internships', path: '/work' },
  { id: 'writing', label: 'blog', path: '/writing' },
  { id: 'about', label: 'about', path: '/about' },
];

export default function Nav() {
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-base/85 backdrop-blur-md border-b border-line/60">
      <nav className="max-w-shell mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-6">
        <Link to="/" className="display text-2xl text-fg hover:text-accent transition-colors shrink-0">
          Rudra Naresh
        </Link>
        <ul className="flex items-center gap-4 sm:gap-7 overflow-x-auto">
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <Link
                to={s.path}
                className={`text-sm transition-colors ${
                  pathname === s.path || (s.id === 'projects' && pathname.startsWith('/projects/'))
                    ? 'text-accent'
                    : 'text-mute hover:text-fg'
                }`}
              >
                {s.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
