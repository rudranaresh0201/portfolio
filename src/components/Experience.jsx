import Links from './Links';
import Reveal from './Reveal';

const ROLES = [
  {
    id: 'elevar',
    role: 'AI Automation Intern',
    org: 'Elevar Sports',
    period: 'jun 2026 to now',
    where: 'mumbai',
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
    where: 'remote',
    line: 'Software testing and backend work for Amplex, an Australian client.',
    points: [
      'Ran the testing pass across Amplex end to end: the full frontend, cable management and spec sheet flows, and pricing engine validation against the API. Most of the value sat in the boring half, checking that a quoted price survived every path a user could take to reach it.',
      'On the backend, a PDF generation service in FastAPI with the layers kept honest: routers, then Pydantic schemas, then a service layer, then ReportLab doing the rendering. Structured logging with correlation IDs, so a bad document traces back to the request that asked for it.',
      'A separate dashboard API surfacing live metrics for the Amplex app, so ops could stop asking engineering what the numbers were.',
      'Containerised with Docker and covered by a pytest suite over health checks, schema validation and endpoint behaviour.',
    ],
    stack: ['Testing', 'FastAPI', 'Docker', 'ReportLab', 'pytest', 'Pydantic'],
    links: [
      { label: 'pdf-generator-service', href: 'https://github.com/rudranaresh0201/pdf-generator-service' },
      { label: '4seer-dashboard-api', href: 'https://github.com/rudranaresh0201/4seer-dashboard-api' },
      { label: 'certificate', href: `${import.meta.env.BASE_URL}certs/4seer-internship-certificate.pdf` },
    ],
  },
  {
    id: 'openrag',
    role: 'AI Intern',
    org: 'OpenRAG',
    period: 'apr to jun 2026',
    where: 'remote',
    line: 'Production RAG work on DocDynamo: chunks quietly deleting each other, caches no worker could see, and a CSV agent for the questions retrieval was never going to answer.',
    points: [
      'A BM25 bug where uploading several files silently overwrote earlier chunks, because chunk keys were not scoped to the file. Fixed by keying per file with UUIDs in MongoDB.',
      'The FAISS cache was process local, so under Gunicorn every worker kept its own copy and mostly missed. Replaced it with a Redis L2 layer plus a threading lock so workers stop stepping on each other, with an in process TTL cache in front for hot users.',
      'Replaced phrase scanning in user_ip() with a structured return type, so callers stop parsing strings to work out what happened.',
      'Moved chunking from character counts to a semantic chunker with a 1000 character ceiling, so a chunk ends where the meaning does and not at character 512.',
      'Built a CrewAI CSV analytics agent so structured data stops being force fed through a retrieval pipeline designed for PDFs. Seven specialist agents in a chain: ingestion and encoding detection, schema profiling, cleaning, LLM query planning, execution, validation, then the written answer. The planner emits pandas code and the executor validates it against an AST allowlist before running it in a restricted sandbox, because the alternative is exec() on model output. Covered by a pytest suite.',
    ],
    stack: ['Python', 'FastAPI', 'Redis', 'FAISS', 'MongoDB', 'CrewAI', 'pandas'],
    links: [
      { label: 'docdynamo.in', href: 'https://www.docdynamo.in/', live: true },
      { label: 'crewai-csv-agent', href: 'https://github.com/rudranaresh0201/pandas-agent-prototype' },
    ],
  },
];

/**
 * On a page of its own there is no reason to make anyone click to read this,
 * so every role is open and they hang off one timeline rail.
 */
export default function Experience() {
  return (
    <section className="pb-16">
      <ol className="relative">
        <span className="absolute left-[5px] top-2 bottom-2 w-px bg-line" aria-hidden="true" />
        {ROLES.map((r, i) => (
          <Reveal as="li" key={r.id} delay={i * 70} className="relative pl-7 pb-12 last:pb-0">
            <span
              className={`absolute left-0 top-[7px] w-[11px] h-[11px] rounded-full border ${
                r.current ? 'bg-ok border-ok' : 'bg-base border-line2'
              }`}
              aria-hidden="true"
            />
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
              <span className="font-mono text-2xs text-accent">{r.period}</span>
              <span className="font-mono text-2xs text-faint">{r.where}</span>
              {r.current && <span className="font-mono text-2xs text-ok">current</span>}
            </div>
            <h2 className="text-fg font-medium text-lg leading-tight">
              {r.role}
              <span className="text-mute font-normal"> at {r.org}</span>
            </h2>
            <p className="text-dim text-sm leading-relaxed mt-1 mb-4">{r.line}</p>
            <ul className="space-y-2.5 mb-4">
              {r.points.map((p, j) => (
                <li key={j} className="text-dim text-sm leading-relaxed pl-4 border-l border-line">{p}</li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mb-2">
              {r.stack.map((s) => <span key={s} className="chip">{s}</span>)}
            </div>
            <Links items={r.links} />
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
