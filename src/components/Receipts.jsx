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
    v: 'ClinIQ, a 9 stage clinical pipeline, answering on its own API',
    href: 'https://cliniq-backend-lwon.onrender.com/docs',
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
    v: 'verimcp, devmcp, PRGuard, ClinIQ and the CrewAI CSV agent are public',
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
    <section className="pb-14">
      <Reveal>
        <h2 className="label mb-1">receipts</h2>
        <span className="rule mb-3" />
      </Reveal>
      <ul className="border border-line rounded-md divide-y divide-line bg-panel">
        {ROWS.map((r) => (
          <li key={r.k} className="flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-4 px-3 py-2.5">
            <span className="font-mono text-2xs text-mute sm:w-24 shrink-0">{r.k}</span>
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
