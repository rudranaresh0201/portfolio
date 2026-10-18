import { useState } from 'react';
import { Link } from 'react-router-dom';
import Links from './Links';
import Reveal from './Reveal';
import Shot, { Thumb } from './Shot';

const PROJECTS = [
  {
    id: 'verimcp',
    name: 'verimcp + devmcp',
    period: '2026',
    status: 'shipped',
    line: 'A proxy that checks whether an MCP tool call actually did what it said, and a server built to be caught lying by it.',
    body: [
      'MCP gives a host no way to tell a real success from a claimed one. isError: false means the tool did not crash, nothing more. verimcp sits between host and backend as a transparent stdio proxy and forwards everything unchanged, except that for calls it knows how to check, it independently re-derives the outcome and compares. A write gets hashed back off disk, a commit gets re-read out of the git log, a CI step gets re-run if it is safe to re-run. When the two disagree, the claimed success is rewritten into a real error before the model ever sees it.',
      'There is a second problem underneath: MCP has no idea what a retry is. Resend a tools/call after a timeout and the backend just runs it again, which for a commit or a charge is not a no-op. The proxy answers a repeated call from cache, but only if that exact call was independently verified true earlier in the session. A key match with nothing verified behind it is a miss, not a dedupe.',
      'devmcp is the backend it gets proven against, deliberately built across the full protocol surface (tools, resources, prompts, roots, sampling) and across git, CI, filesystem, SQLite and Docker, because a proxy is only as convincing as what you can show it catching. The two ship separately and neither imports the other, so verimcp fronts any MCP backend, including the official mcp-server-git.',
    ],
    metrics: [
      ['unprotected agent believes', '14 / 14 fabricated results'],
      ['verimcp disproves', '11 / 14, and names the 3 it cannot'],
      ['duplicate side effects', '5 / 5 down to 0 / 5'],
      ['tests', '138, real subprocess pipes, no mocks'],
    ],
    next: 'Currently extending the same idea past MCP to A2A, so an agent handing another agent a finished task gets checked the same way a tool call does. A2A renamed its state enum between v0.3 and v1.0 and both are deployed in the wild, so the first piece reads a Task across both generations and treats an unfamiliar state as unknown rather than crashing a working conversation.',
    note: 'The benchmark prints 79 percent rather than a round 100 on purpose. Three of the fourteen exploit gaps that are real and documented, like a hash-exists check that cannot prove this call is what created the hash. A tool scoring perfectly on a benchmark it wrote itself is the thing worth being suspicious of.',
    stack: ['Python', 'MCP', 'JSON-RPC', 'OpenTelemetry', 'Docker', 'pytest'],
    links: [
      { label: 'github', href: 'https://github.com/rudranaresh0201/mcp' },
      { label: 'pypi', href: 'https://pypi.org/project/verimcp/', live: true },
      { label: 'mcp registry', href: 'https://registry.modelcontextprotocol.io/?search=rudranaresh0201', live: true },
    ],
    shots: [{
      src: 'shots/verimcp-console.jpg',
      alt: 'The verimcp console mid-run, five calls marked disproven',
      caption: 'The console tailing a real run. Five of nine calls claimed a success that never happened; the inspector shows the claim beside what re-deriving it actually found.',
    }],
    blog: '/blog/verimcp',
  },
  {
    id: 'computer-use',
    name: 'computer-use',
    period: '2026',
    status: 'building',
    line: 'A computer-use agent where Claude only decides, and a 2B grounder I trained for free finds what the accessibility tree cannot.',
    body: [
      'Every action an agent takes starts with one question: where on the screen is the thing I want? The accessibility tree answers it exactly when the target is there and named, and agents usually trust it first and fall back to vision. I measured that design on generated apps and on real Windows screens with ground truth from neither source. Once the tree has holes it is worse than vision alone, and the loss has an exact form: how often the tree answers, times how much less precise it is than vision on those same items.',
      'The vision side is Qwen2-VL-2B with LoRA, trained on 1,572 targets the Windows accessibility tree labels for free, on one free Kaggle T4. A gate that trusts the tree only when the element an LLM picks has a name keeps the tree on named targets and hands everything else to the grounder.',
      'The agent is built around that rule. Claude runs headless with its tools off and returns one decision as JSON. A router applies the gate, my grounder places nameless targets from a GPU behind a tunnel, and every step has to be proved from the app itself, so a wrong "done" is counted as a false success instead of a pass. One prompt drove Calculator, Notepad++ and Excalidraw end to end.',
    ],
    metrics: [
      ['unseen apps', '1.5% to 46.5% after training'],
      ['ScreenSpot-v2', '19.2 to 62.8'],
      ['tree first, else vision', '12 points below vision alone'],
      ['named-pick gate', '85.2% vs 66.4% for vision'],
      ['tests', '417'],
    ],
    note: 'The useful part was the failures. 36 percent of an early dataset was labels from the wrong window, found only by drawing the boxes on the screenshots. In the Tinkercad demo the grounder pointed every "empty spot on the board" at the toolbar, because it learned to find things and empty space is not a thing, so empty places are now the brain\'s job. The circuit run is the next experiment, not the demo.',
    stack: ['Python', 'PyTorch', 'LoRA', 'Qwen2-VL', 'LangGraph', 'Claude', 'Windows UIA', 'Playwright', 'Electron'],
    links: [{ label: 'github', href: 'https://github.com/rudranaresh0201/computer-use' }],
    shots: [{
      src: 'shots/computer-use-demo.jpg',
      alt: 'The finished Excalidraw box labelled 0.06 beside the agent window',
      caption: 'The end of a three-app run. The label is drawn on a canvas the accessibility tree cannot see, so the verifier rejected the first proof and the step had to be checked another way.',
    }],
    blog: '/blog/computer-use',
  },
  {
    id: 'aria',
    name: 'Aria',
    period: '2026',
    status: 'shipped',
    line: 'An agentic assistant where every write action stops and shows you an editable card before it runs.',
    body: [
      'A planner routes work across 15 specialist agents (Gmail, GitHub, Calendar, code execution, data analysis) behind an orchestrate, synthesise, critique pipeline. Anything that writes to the outside world pauses at an approval card first, so nothing sends or commits on the model deciding it should.',
      'Retrieval runs HyDE query expansion, BM25 and dense vectors fused and then reranked, with a similarity floor that returns nothing rather than inventing something when no relevant context exists. Vector store, memory and OAuth credentials are isolated per user. Executed code runs in a Docker sandbox with no network.',
    ],
    metrics: [
      ['agents', '15 specialists behind one planner'],
      ['security', 'found and fixed a JWT flaw allowing forged tokens'],
    ],
    shots: [{
      src: 'shots/aria-answer.jpg',
      alt: 'Aria answering a question with evidence and insights panels',
      caption: 'One answer, with the evidence it was drawn from and the confidence beside it, so a claim can be traced back to the document that supports it rather than taken on faith.',
    }],
    note: 'Repo is private for now, so there is nothing to link yet.',
    stack: ['LangGraph', 'FastAPI', 'React', 'ChromaDB', 'Docker'],
    links: [],
  },
  {
    id: 'prguard',
    name: 'PRGuard',
    period: '2026',
    status: 'shipped',
    line: 'PR review that indexes the whole codebase by AST, so it catches what a diff cannot show you.',
    body: [
      'An 8 node LangGraph pipeline: triage, security, docs, bug detection, API change detection, critical file audit. Because it indexes the repo at function level rather than reading the diff alone, it can flag an architecture violation or logic that already exists elsewhere, which is exactly the class of problem a diff hides by definition.',
      'Alongside it, Aftershock: a signed cross repo notice board with no registration and no server to trust, so a library can warn dependent repos about a breaking change and they can verify the notice offline with Ed25519. It is deployed and /cross-repo/pubkey serves a real key, though not yet a stable identity: free hosting gives it no persistent disk, so the keypair is regenerated on every cold start and a notice signed before a restart stops verifying after one. I watched the key change between two requests fifteen minutes apart. The mechanism works and the durability wants a mounted disk, which is worth saying plainly, because the whole value of the scheme is not having to trust the server.',
    ],
    metrics: [
      ['on a 16 issue suite', '100% recall, 94.12% precision'],
      ['languages covered', 'Python, Solidity, Bash, Dockerfile'],
    ],
    stack: ['LangGraph', 'FastAPI', 'ChromaDB', 'Ed25519', 'PyGitHub'],
    shots: [{
      src: 'shots/prguard-routes.jpg',
      alt: 'The deployed API listing its governance and cross-repo routes',
      caption: 'The deployed surface, in three groups. The agent answers questions about an indexed codebase, governance takes the GitHub webhook and the manual trigger that starts a review, and cross-repo is Aftershock: announce a breaking change, fetch the public key, verify a notice.',
    }],
    links: [
      { label: 'live api', href: 'https://governance-agent.onrender.com/docs', live: true },
      { label: 'signing key', href: 'https://governance-agent.onrender.com/cross-repo/pubkey', live: true },
      { label: 'github', href: 'https://github.com/rudranaresh0201/PRGuard' },
    ],
  },
  {
    id: 'cliniq',
    name: 'ClinIQ',
    period: '2026',
    status: 'shipped',
    line: 'A clinical decision-support pipeline that has to show its evidence, because the failure mode here is a confident sentence nobody can trace.',
    body: [
      'Takes symptoms, age, medications and location, and runs them through a nine stage pipeline: emergency red flag check first, then a cached-answer lookup over PubMedBERT vectors, first-principles clinical reasoning, a plan for which tools to call, and only then retrieval against real PubMed literature and OpenFDA drug data. Answers stream to the browser over SSE so you watch the stages resolve instead of waiting on a spinner.',
      'Two parts I would actually defend. The evaluator scores whether the evidence it just fetched is sufficient, and if it is not, it rewrites the query and fetches again, which is roughly what a clinician does when a broad search comes back useless. And after synthesis, a faithfulness pass checks every claim against the abstracts actually retrieved on that run, so a fluent sentence with no source behind it gets flagged rather than shipped.',
      'Retrieval is reranked against India-specific epidemiology, seasonal and state level, because base rates are most of diagnosis and a model trained on largely Western literature carries the wrong ones.',
    ],
    metrics: [
      ['pipeline', '9 stages, evidence checked between them'],
      ['sources', 'PubMed and OpenFDA, live, not a scraped dump'],
    ],
    note: 'The honest gap: this one has no test suite and I have not published evaluation numbers for it, so unlike the projects above it is argued on how it is built rather than on a score. It runs on a free instance, so the first request after fifteen idle minutes takes about a minute to wake.',
    stack: ['FastAPI', 'React', 'TypeScript', 'ChromaDB', 'Supabase', 'Docker', 'SSE'],
    shots: [
      {
        src: 'shots/cliniq-patient-os.jpg',
        alt: 'The ClinIQ patient view: recovery score, risk band and agent activity',
        caption: 'The patient view after a real query. A recovery score and risk band over a seven day window, a monitoring plan with checkpoints, and the agents that produced it logged as they finish.',
      },
      {
        src: 'shots/cliniq-timeline.jpg',
        alt: 'The case timeline listing which agent produced each entry',
        caption: 'The same case as a timeline, with each entry tagged by the agent that wrote it: symptom extractor, clinical reasoner, India epidemiology reranker.',
      },
    ],
    links: [
      { label: 'live demo', href: 'https://cliniq-opal.vercel.app', live: true },
      { label: 'api', href: 'https://cliniq-backend-lwon.onrender.com/docs', live: true },
      { label: 'github', href: 'https://github.com/rudranaresh0201/Cliniq' },
    ],
  },
];

const STATUS = {
  shipped: { dot: 'bg-mute', text: 'text-faint' },
  building: { dot: 'bg-ok', text: 'text-ok' },
};

function Project({ p }) {
  const [open, setOpen] = useState(false);
  const s = STATUS[p.status];

  return (
    <>
      <button onClick={() => setOpen((v) => !v)} aria-expanded={open} className="w-full text-left py-4 group">
        <div className="flex items-baseline justify-between gap-4 mb-1">
          <h3 className="text-accent font-medium font-mono text-sm">{p.name}</h3>
          <span className={`font-mono text-2xs shrink-0 flex items-center gap-1.5 ${s.text}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
            {p.status}
          </span>
        </div>
        <div className="flex items-start gap-4">
          <p className="text-dim text-sm leading-relaxed flex-1">{p.line}</p>
          {p.shots?.[0] && <Thumb src={p.shots[0].src} alt={p.shots[0].alt} />}
        </div>
        <span className="font-mono text-2xs text-faint group-hover:text-mute mt-1.5 inline-flex items-center gap-1">
          {open ? 'less' : 'more'}
          <span className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}>&#8595;</span>
        </span>
      </button>

      <div className="disclose" data-open={open ? "true" : "false"}>
        <div>
          <div className="pb-5 -mt-1">
          {p.shots?.map((sh) => <Shot key={sh.src} {...sh} />)}
          {p.body.map((para, i) => (
            <p key={i} className="text-dim text-sm leading-relaxed mb-3 pl-4 border-l border-line">{para}</p>
          ))}

          {p.metrics?.length > 0 && (
            <dl className="my-4 border border-line rounded-md divide-y divide-line bg-panel">
              {p.metrics.map(([k, v]) => (
                <div key={k} className="flex items-baseline justify-between gap-4 px-3 py-2">
                  <dt className="font-mono text-2xs text-mute">{k}</dt>
                  <dd className="font-mono text-2xs text-fg text-right">{v}</dd>
                </div>
              ))}
            </dl>
          )}

          {p.next && (
            <p className="text-dim text-sm leading-relaxed mb-3 pl-4 border-l border-ok/40">
              <span className="font-mono text-2xs text-ok mr-1.5">now</span>
              {p.next}
            </p>
          )}

          {p.note && (
            <p className="text-mute text-sm leading-relaxed mb-4 italic">{p.note}</p>
          )}

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mb-2">
            {p.stack.map((t) => <span key={t} className="chip">{t}</span>)}
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
            <Links items={p.links} />
            {p.blog && <Link to={p.blog} className="font-mono text-2xs link">read the writeup</Link>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function Projects() {
  return (
    <section className="pb-16">
      <Reveal className="mb-8">
        <p className="label mb-2">index</p>
        <ol className="border border-line rounded-md divide-y divide-line bg-panel">
          {PROJECTS.map((p, i) => (
            <li key={p.id} className="flex items-baseline gap-3 px-3 py-2">
              <span className="font-mono text-2xs text-faint tabular-nums w-5 shrink-0">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="font-mono text-2xs text-accent w-32 shrink-0 truncate">{p.name}</span>
              <span className="text-sm text-mute leading-snug truncate hidden sm:block">{p.line}</span>
            </li>
          ))}
        </ol>
      </Reveal>
      <ul>
        {PROJECTS.map((p, i) => (
          <Reveal key={p.id} as="li" delay={i * 60} className="rowline">
            <Project p={p} />
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
