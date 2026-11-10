import { Link, useLocation } from 'react-router-dom';

export const SECTIONS = [
  { id: 'projects', label: 'projects', path: '/projects' },
  { id: 'internships', label: 'work', path: '/work' },
  { id: 'journey', label: 'journey', path: '/journey' },
  { id: 'writing', label: 'blog', path: '/writing' },
  { id: 'life', label: 'life', path: '/life' },
];

export default function Nav() {
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-base/90 backdrop-blur-md border-b border-line">
      <nav className="max-w-shell mx-auto px-5 sm:px-8 h-14 flex items-center justify-between gap-6">
        <Link to="/" className="font-medium text-fg hover:text-accent transition-colors shrink-0 inline-flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent" aria-hidden="true" />
          Rudra Naresh
        </Link>
        <ul className="flex items-center gap-4 sm:gap-7 overflow-x-auto">
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <Link
                to={s.path}
                className={`label transition-colors ${
                  pathname === s.path || (s.id === 'projects' && pathname.startsWith('/projects/'))
                    ? '!text-accent'
                    : 'hover:!text-fg'
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
