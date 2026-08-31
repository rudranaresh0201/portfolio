import Console from './Console';

const LINKS = [
  { label: 'github',   href: 'https://github.com/rudranaresh0201' },
  { label: 'linkedin', href: 'https://linkedin.com/in/rudra-naresh-790751321' },
  { label: 'email',    href: 'mailto:rudranaresh2018@gmail.com' },
];

export default function Hero() {
  return (
    <section className="pt-14 pb-16">
      <div className="flex items-start gap-4 mb-7">
        <img
          src={`${import.meta.env.BASE_URL}profile.jpg`}
          alt=""
          className="w-14 h-14 rounded-full object-cover border border-line shrink-0"
          style={{ objectPosition: '50% 20%' }}
        />
        <div className="min-w-0">
          <h1 className="text-xl font-semibold tracking-tight leading-tight">Rudra Naresh</h1>
          <p className="font-mono text-2xs text-mute mt-1">
            electronics + ai/ml minor · vjti mumbai · b.tech '28
          </p>
        </div>
      </div>

      <p className="text-dim leading-relaxed mb-4">
        Most of what I build is agent infrastructure. The thing I keep coming back to is that agents
        believe whatever a tool tells them. If an MCP server says the commit landed, nothing anywhere
        checks whether it did.
      </p>
      <p className="text-dim leading-relaxed mb-4">
        So I wrote <span className="text-fg">verimcp</span>, a proxy that goes and looks. It re-reads
        the git log, hashes the file back off disk, re-runs the CI step it was told passed. If what it
        finds doesn't match what the server claimed, the model gets an error instead of a success.
      </p>
      <p className="text-dim leading-relaxed mb-7">
        The rest of my week is an AI automation internship at <span className="text-fg">Elevar Sports</span>,
        which is the same problem with the theory taken out. A courier API says the shipment booked. A
        sheet says the order synced. Ops finds out on Monday that neither one did.
      </p>

      <ul className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-12">
        {LINKS.map((l) => (
          <li key={l.label}>
            <a href={l.href} target="_blank" rel="noopener noreferrer" className="font-mono text-2xs link">
              {l.label}
            </a>
          </li>
        ))}
        <li className="font-mono text-2xs text-faint ml-auto">mumbai, india</li>
      </ul>

      <div className="mb-2 flex items-baseline justify-between gap-3">
        <p className="label">verimcp console, one real run</p>
        <p className="font-mono text-2xs text-faint">click a row</p>
      </div>
      <Console />
      <p className="font-mono text-2xs text-faint mt-2.5 leading-relaxed">
        Five of these nine calls reported a success that never happened. Nothing was caught by
        intuition. Each one got checked.
      </p>
    </section>
  );
}
