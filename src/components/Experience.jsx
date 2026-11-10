import Links from './Links';
import Reveal from './Reveal';
import Shot from './Shot';

const ROLES = [
  {
    id: 'habit',
    role: 'AI Intern',
    org: 'Everyday Habit',
    period: 'Oct 2026 to now',
    where: 'remote',
    current: true,
    line: 'Habit is a computer-use agent. You show it a task on your desktop once. It learns the workflow and then does it for you every week.',
    points: [
      'While you do the task, it records your actions along with the screen and the accessibility tree. Each step is saved as something it can find again, so it still works after a restart or when a button moves. It checks every action worked before doing the next.',
      'My part is testing that design on real Windows and Linux machines before it gets built. Ten experiments so far, and a few changed the plan: reading the accessibility tree is 3 to 25 times slower than assumed, and one planned shortcut would have hidden every GTK4 button.',
    ],
    stack: ['Windows UI Automation', 'AT-SPI', 'X11', 'Wayland', 'Python', 'Rust'],
    links: [],
  },
  {
    id: 'elevar',
    role: 'Agentic AI and Automation Intern',
    org: 'Elevar Sports',
    period: 'Jun to Nov 2026',
    where: 'Mumbai',
    line: 'Automated the operations of a real D2C brand: failed deliveries, claims, reships and customer support.',
    points: [
      'Failed delivery (NDR) to claim to reship to customer message, automated end to end across 40+ n8n workflows. 15 run in production, the biggest past 60 nodes on live courier APIs. A human signs off before anything irreversible.',
      'A WhatsApp support agent on Gemini with RAG, running through Chatwoot, routed by a 19-domain intent classifier built from real customer chats. It now runs a second brand on the same stack.',
      'Seven systems (Shopify, Shiprocket, EasyEcom, Delhivery, Amazon, Returns Prime, ATS) synced into one dataset every night with Google Apps Script.',
      'Elevar Play, a Flutter game hub with three games.',
    ],
    shots: [
      {
        src: 'shots/elevar-n8n-claims.jpg',
        alt: 'The claims creation workflow in n8n, past sixty nodes',
        caption: 'Claims creation, published and running. Warehouse staff type one AWB; the flow resolves the order across EasyEcom, Shiprocket and Delhivery, falls back when a lookup misses, files the claim and logs the result.',
      },
      {
        src: 'shots/elevar-n8n-list.jpg',
        alt: 'The n8n instance listing 123 workflows',
        caption: '123 workflows on the instance. Most are probes and one-off tests; the ones marked published are what actually runs the operation.',
      },
    ],
    stack: ['n8n', 'Gemini', 'RAG', 'Chatwoot', 'Apps Script', 'Postgres/pgvector', 'Redis', 'Docker', 'Flutter'],
    links: [{ label: 'elevar-game', href: 'https://github.com/rudranaresh0201/elevar-game' }],
  },
  {
    id: '4seer',
    role: 'Software Engineering Intern',
    org: '4Seer Technologies',
    period: 'May to Jul 2026',
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
];

export default function Experience() {
  return (
    <ol className="border-b border-line">
      {ROLES.map((r, i) => (
        <Reveal as="li" key={r.id} delay={i * 60} className="rowline grid md:grid-cols-[11rem_1fr] gap-x-8 gap-y-3 py-9">
          <div className="label flex md:flex-col gap-x-3 gap-y-1.5">
            <span className={r.current ? '!text-accent inline-flex items-center gap-1.5' : ''}>
              {r.current && <span className="w-1.5 h-1.5 rounded-full bg-accent live-dot" aria-hidden="true" />}
              {r.period}
            </span>
            <span>{r.where}</span>
          </div>
          <div className="max-w-3xl">
            <h3 className="display text-3xl text-fg">
              {r.org}
            </h3>
            <p className="text-mute mt-1">{r.role}</p>
            <p className="text-fg text-[17px] leading-relaxed mt-4">{r.line}</p>
            <ul className="space-y-2.5 mt-4 mb-5">
              {r.points.map((p, j) => (
                <li key={j} className="text-dim text-[15px] leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[0.7em] before:w-1.5 before:h-px before:bg-faint">{p}</li>
              ))}
            </ul>
            {r.shots?.map((sh) => <Shot key={sh.src} {...sh} />)}
            <div className="flex flex-wrap items-center gap-1.5 mb-3">
              {r.stack.map((s) => <span key={s} className="chip">{s}</span>)}
            </div>
            <Links items={r.links} />
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
