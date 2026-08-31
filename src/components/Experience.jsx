import { useState } from 'react';
import Links from './Links';
import Reveal from './Reveal';

const ROLES = [
  {
    id: 'elevar',
    role: 'AI Automation Intern',
    org: 'Elevar Sports',
    period: 'jun 2026 to now',
    current: true,
    line: 'Own the ops automation stack end to end: data sync, courier logic, the support bot, and the infra it all sits on.',
    points: [
      'Seven sources (Shopify, Shiprocket, EasyEcom, Delhivery forward and reverse, ATS, Returns Prime, Amazon) sync nightly into one sheet through Google Apps Script. Every vendor had its own personality: EasyEcom wanted dual-header auth and a report queue, Returns Prime only ever pushes webhooks and has no AWB column at all. An AWB corruption bug turned out to be key formatting, so matching now happens on a normalised key while the raw value is what gets stored.',
      'The whole stack (n8n, Chatwoot, Postgres with pgvector, Redis, Caddy) runs Dockerized on one droplet with GitHub Actions deploying on push. A production crash loop that looked like a workflow bug was actually the box running out of memory.',
      'Built 40+ n8n workflows across four phases, 15 of them running in production, covering NDR detection, claims creation and tracking, and courier switching reship with a human approval gate. The two biggest published flows run past 60 nodes against live courier APIs. Most of the debugging was against real executions: item count explosions, duplicate reship races, a consent gate reading the wrong column.',
      'A WhatsApp support bot on Gemini through Chatwoot, with a 19 domain intent classifier built by mining actual customer transcripts instead of guessing at categories. Every reply traces back to the row it came from. The same stack now runs a second brand, so two CRMs on shared infra.',
      'Where a courier portal has no API, a Tampermonkey script drives the real DOM instead. The Delhivery one files a claim end to end, form fill and multi photo upload included.',
      'Building Elevar Play, a Flutter game hub with three games shipped. Each game is a plugin, and the rules live in pure Dart packages that import no Flutter and no Flame, which means a server can re-run a submitted match and check the score it was handed.',
    ],
    stack: ['Google Apps Script', 'n8n', 'Docker', 'Postgres/pgvector', 'Redis', 'Chatwoot', 'Gemini', 'Flutter'],
    links: [{ label: 'elevar-game', href: 'https://github.com/rudranaresh0201/elevar-game' }],
  },
  {
    id: '4seer',
    role: 'Software Engineering Intern',
    org: '4Seer Technologies',
    period: 'may to jul 2026',
    line: 'A FastAPI PDF service, an ops dashboard API, and the testing pass on an Australian client build.',
    points: [
      'Built a PDF generation service in FastAPI with the layers kept honest: routers, then Pydantic schemas, then a service layer, then ReportLab doing the rendering. Structured logging with correlation IDs, so a bad PDF traces back to the request that asked for it.',
      'A separate dashboard API surfacing live metrics for the Amplex app, so ops could stop asking engineering what the numbers were.',
      'Ran the testing pass for Amplex: the full frontend, cable management and spec sheet flows, and pricing engine validation across the API.',
      'Containerised with Docker and covered by a pytest suite over health checks, schema validation and endpoint behaviour.',
    ],
    stack: ['FastAPI', 'Docker', 'ReportLab', 'pytest', 'Pydantic', 'React'],
    links: [
      { label: 'pdf-generator-service', href: 'https://github.com/rudranaresh0201/pdf-generator-service' },
      { label: '4seer-dashboard-api', href: 'https://github.com/rudranaresh0201/4seer-dashboard-api' },
      { label: 'certificate', href: `${import.meta.env.BASE_URL}certs/4seer-internship-certificate.pdf` },
    ],
  },
  {
    id: 'openrag',
    role: 'Backend Engineering Intern',
    org: 'OpenRAG',
    period: 'apr to jun 2026',
    line: 'Production RAG bugs on DocDynamo: chunks quietly deleting each other, caches no worker could see, chunking that cut mid sentence.',
    points: [
      'A BM25 bug where uploading several files silently overwrote earlier chunks, because chunk keys were not scoped to the file. Fixed by keying per file with UUIDs in MongoDB.',
      'The FAISS cache was process local, so under Gunicorn every worker kept its own copy and mostly missed. Replaced it with a Redis L2 layer plus a threading lock so workers stop stepping on each other, with an in process TTL cache in front for hot users.',
      'Replaced phrase scanning in user_ip() with a structured return type, so callers stop parsing strings to work out what happened.',
      'Moved chunking from character counts to a semantic chunker with a 1000 character ceiling, so a chunk ends where the meaning does and not at character 512.',
      'Prototyped a pandas agent for CSV and XLSX questions, so structured data stops being force fed through a retrieval pipeline built for PDFs.',
    ],
    stack: ['Python', 'FastAPI', 'Redis', 'FAISS', 'MongoDB', 'SSE'],
    links: [
      { label: 'docdynamo.in', href: 'https://www.docdynamo.in/', live: true },
      { label: 'pandas-agent-prototype', href: 'https://github.com/rudranaresh0201/pandas-agent-prototype' },
    ],
  },
];

function Row({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full text-left py-4 group"
      >
        <div className="flex items-baseline justify-between gap-4 mb-1">
          <h3 className="text-fg font-medium">
            {item.role}
            <span className="text-mute font-normal"> at {item.org}</span>
          </h3>
          <span className="font-mono text-2xs text-faint shrink-0 flex items-center gap-1.5">
            {item.current && <span className="w-1.5 h-1.5 rounded-full bg-ok" />}
            {item.period}
          </span>
        </div>
        <p className="text-dim text-sm leading-relaxed pr-6">{item.line}</p>
        <span className="font-mono text-2xs text-faint group-hover:text-mute mt-1.5 inline-flex items-center gap-1">
          {open ? 'less' : 'more'}
          <span className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}>&#8595;</span>
        </span>
      </button>

      <div className="collapse" data-open={open}>
        <div>
          <div className="pb-5 -mt-1">
          <ul className="space-y-2.5 mb-4">
            {item.points.map((p, i) => (
              <li key={i} className="text-dim text-sm leading-relaxed pl-4 border-l border-line">
                {p}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mb-2">
            {item.stack.map((s) => <span key={s} className="chip">{s}</span>)}
          </div>
            <Links items={item.links} />
          </div>
        </div>
      </div>
    </>
  );
}

export default function Experience() {
  return (
    <section id="work" className="py-14">
      <Reveal>
        <h2 className="label mb-1">work</h2>
        <p className="text-mute text-sm mb-1">Three internships. The first one is still going.</p>
        <span className="rule mb-4" />
      </Reveal>
      <ul>
        {ROLES.map((r, i) => (
          <Reveal key={r.id} as="li" delay={i * 60} className="rowline">
            <Row item={r} />
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
