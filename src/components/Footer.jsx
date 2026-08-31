const LINKS = [
  { label: 'github', href: 'https://github.com/rudranaresh0201' },
  { label: 'linkedin', href: 'https://linkedin.com/in/rudra-naresh-790751321' },
  { label: 'email', href: 'mailto:rudranaresh2018@gmail.com' },
  { label: 'phone', href: 'tel:+919167563916' },
];

export default function Footer() {
  return (
    <footer className="border-t border-line mt-10">
      <div className="max-w-page mx-auto px-5 py-8">
        <p className="text-dim text-sm leading-relaxed mb-5 max-w-md">
          If you are building agent infrastructure, or you have a system that quietly lies to itself,
          I would like to hear about it.
        </p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-6">
          {LINKS.map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
              className="font-mono text-2xs link">{l.label}</a>
          ))}
        </div>
        <p className="font-mono text-2xs text-faint">
          built by hand, mumbai. no analytics, no cookies, nothing tracking you here.
        </p>
      </div>
    </footer>
  );
}
