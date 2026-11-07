import Reveal from './Reveal';

/**
 * Concrete, checkable facts. Every row links to the thing that proves it,
 * or it does not belong on this list.
 */
const ROWS = [
  {
    k: 'published',
    v: 'verimcp + devmcp on PyPI and the official MCP Registry',
    href: 'https://registry.modelcontextprotocol.io/?search=rudranaresh0201',
  },
  {
    k: 'in production',
    v: '15 n8n workflows live, 123 on the instance, biggest past 60 nodes',
  },
  {
    k: 'worked on',
    v: 'DocDynamo, a live document product with real users',
    href: 'https://www.docdynamo.in/',
  },
  {
    k: 'deployed',
    v: 'ClinIQ live end to end, and PRGuard serving its governance API',
    href: 'https://cliniq-opal.vercel.app',
  },
  {
    k: 'shipped',
    v: 'Elevar Play, a Flutter game hub with 3 games playable offline',
    href: 'https://github.com/rudranaresh0201/elevar-game',
  },
  {
    k: 'running',
    v: '2 CRMs for 2 brands on one shared Dockerized stack',
  },
  {
    k: 'open source',
    v: 'SO-101 world model, DreamDesk, computer-use, verimcp, devmcp, PRGuard, ClinIQ and the CrewAI CSV agent are public',
    href: 'https://github.com/rudranaresh0201?tab=repositories',
  },
  {
    k: 'certified',
    v: 'Anthropic, Introduction to Model Context Protocol',
    href: 'https://verify.skilljar.com/c/gg3nm2kasyoy',
  },
];

export default function Receipts() {
  return (
    <section>
      <Reveal>
        <h3 className="label mb-3">receipts</h3>
      </Reveal>
      <ul className="card divide-y divide-line overflow-hidden">
        {ROWS.map((r) => (
          <li key={r.k} className="flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-4 px-4 py-3">
            <span className="text-xs text-mute sm:w-28 shrink-0">{r.k}</span>
            <span className="text-sm text-dim leading-snug">
              {r.href ? (
                <a href={r.href} target="_blank" rel="noopener noreferrer" className="link">{r.v}</a>
              ) : r.v}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
