import Links from './Links';
import Reveal from './Reveal';
import Shot from './Shot';

const ROLES = [
  {
    id: 'habit',
    role: 'AI Intern',
    org: 'Everyday Habit',
    period: 'oct 2026 to now',
    where: 'remote',
    current: true,
    line: 'A computer-use agent that learns a desktop workflow by watching someone do it once, then replays it on its own. I run the experiments that check what its spec assumes about real operating systems.',
    points: [
      'The spec was written by reasoning about how Windows, Linux and macOS behave. Each experiment takes one of those assumptions, measures it on real machines, and ends in a findings file that goes back into the spec. Ten so far, on Windows and Linux: accessibility trees, finding the same button again after a restart, browsers and Electron apps, photographing one window, how the screen settles after a click, hidden desktops, virtual displays, restricted tokens, clicking without the mouse, and Wayland recording.',
      'Accessibility trees: everyday apps have 46 to 198 nodes, not the 500 to 5,000 the spec assumed, but reading them one property at a time takes 64 to 511 ms, 3 to 25 times the spec\'s figure. Every clickable GTK4 button sits deeper than the planned depth-8 cap, so that pruning would have cut all of them off.',
      'Windows: a window on a hidden desktop can be photographed with PrintWindow, while Windows Graphics Capture refuses. Calculator and Settings cannot be driven through UI Automation while the screen is locked, minimised or on another desktop, and the spec\'s lock check does not see the lock. The spec\'s restricted-token recipe stops every program from starting.',
    ],
    stack: ['Windows UI Automation', 'AT-SPI', 'X11', 'Wayland', 'Python', 'Rust'],
    links: [],
  },
  {
    id: 'elevar',
    role: 'AI Automation Intern',
    org: 'Elevar Sports',
    period: 'jun to nov 2026',
    where: 'mumbai',
    line: 'Own the ops automation stack end to end: data sync, courier logic, the support bot, and the infra it all sits on.',
    points: [
      'Seven sources (Shopify, Shiprocket, EasyEcom, Delhivery forward and reverse, ATS, Returns Prime, Amazon) sync nightly into one sheet through Google Apps Script. Every vendor had its own personality: EasyEcom wanted dual-header auth and a report queue, Returns Prime only ever pushes webhooks and has no AWB column at all. An AWB corruption bug turned out to be key formatting, so matching now happens on a normalised key while the raw value is what gets stored.',
      'The whole stack (n8n, Chatwoot, Postgres with pgvector, Redis, Caddy) runs Dockerized on one droplet with GitHub Actions deploying on push. A production crash loop that looked like a workflow bug was actually the box running out of memory.',
      'Built 40+ n8n workflows across four phases, 15 of them running in production, covering NDR detection, claims creation and tracking, and courier switching reship with a human approval gate. The two biggest published flows run past 60 nodes against live courier APIs. Most of the debugging was against real executions: item count explosions, duplicate reship races, a consent gate reading the wrong column.',
      'A WhatsApp support bot on Gemini through Chatwoot, with a 19 domain intent classifier built by mining actual customer transcripts instead of guessing at categories. Every reply traces back to the row it came from. The same stack now runs a second brand, so two CRMs on shared infra.',
      'Where a courier portal has no API, a Tampermonkey script drives the real DOM instead. The Delhivery one files a claim end to end, form fill and multi photo upload included.',
      'Building Elevar Play, a Flutter game hub with three games shipped. Each game is a plugin, and the rules live in pure Dart packages that import no Flutter and no Flame, which means a server can re-run a submitted match and check the score it was handed.',
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
];

/**
 * On a page of its own there is no reason to make anyone click to read this,
 * so every role is open and they hang off one timeline rail.
 */
export default function Experience() {
  return (
    <section>
      <ol className="relative">
        <span className="absolute left-[5px] top-2 bottom-2 w-px bg-line" aria-hidden="true" />
        {ROLES.map((r, i) => (
          <Reveal as="li" key={r.id} delay={i * 70} className="relative pl-7 pb-14 last:pb-0 max-w-3xl">
            <span
              className={`absolute left-0 top-[7px] w-[11px] h-[11px] rounded-full border ${
                r.current ? 'bg-accent border-accent' : 'bg-base border-line2'
              }`}
              aria-hidden="true"
            />
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
              <span className="text-sm text-accent font-medium">{r.period}</span>
              <span className="text-sm text-faint">{r.where}</span>
              {r.current && <span className="text-sm text-ok">current</span>}
            </div>
            <h3 className="display text-3xl text-fg leading-tight">
              {r.role}
              <span className="text-mute"> at {r.org}</span>
            </h3>
            <p className="text-dim leading-relaxed mt-2 mb-5">{r.line}</p>
            <ul className="space-y-2.5 mb-4">
              {r.points.map((p, j) => (
                <li key={j} className="text-dim text-[15px] leading-relaxed pl-4 border-l-2 border-line">{p}</li>
              ))}
            </ul>

            {r.shots?.map((sh) => <Shot key={sh.src} {...sh} />)}
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
