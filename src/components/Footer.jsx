const LINKS = [
  { label: 'email', href: 'mailto:rudranaresh2018@gmail.com' },
  { label: 'github', href: 'https://github.com/rudranaresh0201' },
  { label: 'linkedin', href: 'https://linkedin.com/in/rudra-naresh-790751321' },
];

export default function Footer() {
  return (
    <footer className="border-t border-line mt-10">
      <div className="max-w-shell mx-auto px-5 sm:px-8 py-14 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8">
        <a href="mailto:rudranaresh2018@gmail.com" className="display text-4xl sm:text-6xl text-fg hover:text-accent transition-colors">
          Say hi &#8599;
        </a>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {LINKS.map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="label hover:!text-accent transition-colors">
              {l.label}
            </a>
          ))}
          <span className="label">Mumbai, India</span>
        </div>
      </div>
    </footer>
  );
}
