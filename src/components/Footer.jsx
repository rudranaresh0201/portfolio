const LINKS = [
  { label: 'github', href: 'https://github.com/rudranaresh0201' },
  { label: 'linkedin', href: 'https://linkedin.com/in/rudra-naresh-790751321' },
  { label: 'email', href: 'mailto:rudranaresh2018@gmail.com' },
  { label: 'phone', href: 'tel:+919167563916' },
];

export default function Footer() {
  return (
    <footer className="border-t border-line mt-10 bg-raise">
      <div className="max-w-shell mx-auto px-5 sm:px-8 py-14">
        <p className="display text-3xl sm:text-4xl text-fg leading-tight mb-6 max-w-2xl">
          If you are building agent infrastructure, or you have a system that quietly lies to itself,
          I would like to hear about it.
        </p>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {LINKS.map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
              className="text-sm link">{l.label}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}
