import { useState } from 'react';
import { Link } from 'react-router-dom';
import Links from './Links';
import Reveal from './Reveal';

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
    blog: '/blog/verimcp',
  },
  {
    id: 'computer-use',
    name: 'computer-use',
    period: '2026',
    status: 'building',
    line: 'A Windows desktop agent that reads the screen through the accessibility tree, and a dataset that labels itself.',
    body: [
      'Anthropic-style computer use, but pointed at the whole OS instead of a browser tab. It loops perceive, decide, act. Perception reads the Windows UI Automation tree first because it is structured and exact, and falls back to vision when the tree is empty or lying. A LangGraph state machine drives the loop behind a swappable decision backend: scripted, a local VLM, a hosted model, or a Qwen2-VL-2B I fine tuned myself.',
      'The interesting part is the data. An orchestrator walks 14 real Windows apps and pulls click targets straight out of the accessibility tree, so the labels come from the OS rather than from me drawing boxes for a month. LoRA fine tuning runs entirely on free tier GPUs, which keeps the whole project at zero spend.',
      'Three hypotheses were written down before any data was collected: whether fine tuning beats zero shot on native Windows apps, whether hybrid grounding beats either signal alone, and whether it generalises to apps it never trained on. Committing first means I cannot quietly move the goalposts once results land.',
    ],
    metrics: [
      ['dataset', '3,163 rows, 0 integrity errors'],
      ['apps walked', '14, labels straight from the UIA tree'],
      ['budget', 'zero, free tier GPUs only'],
    ],
    note: 'The bugs have been the useful part. A process integrity rule meant a standard privilege collector literally could not see an elevated window like Task Manager. An fp16 underflow was rounding LoRA updates to zero while the loss curve still looked healthy. And 36 percent of a dataset I had already called validated turned out to be labels from the wrong app, which only showed up when I rendered the boxes onto screenshots and actually looked at them.',
    stack: ['Python', 'PyTorch', 'LoRA', 'Qwen2-VL', 'LangGraph', 'Windows UIA'],
    links: [],
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
      'Alongside it, Aftershock: a signed cross repo notice board with no registration and no server to trust, so a library can warn dependent repos about a breaking change and they can verify the notice offline with Ed25519.',
    ],
    metrics: [
      ['on a 16 issue suite', '100% recall, 94.12% precision'],
      ['languages covered', 'Python, Solidity, Bash, Dockerfile'],
    ],
    stack: ['LangGraph', 'FastAPI', 'ChromaDB', 'Ed25519', 'PyGitHub'],
    links: [{ label: 'github', href: 'https://github.com/rudranaresh0201/PRGuard' }],
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
    note: 'The honest gap: this one has no test suite and I have not published evaluation numbers for it, so unlike the projects above it is argued on how it is built rather than on a score. The frontend is deployed but its backend is currently offline, so the repo is the link until I bring it back up.',
    stack: ['FastAPI', 'React', 'TypeScript', 'ChromaDB', 'Supabase', 'Docker', 'SSE'],
    links: [{ label: 'github', href: 'https://github.com/rudranaresh0201/Cliniq' }],
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
        <p className="text-dim text-sm leading-relaxed pr-6">{p.line}</p>
        <span className="font-mono text-2xs text-faint group-hover:text-mute mt-1.5 inline-flex items-center gap-1">
          {open ? 'less' : 'more'}
          <span className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}>&#8595;</span>
        </span>
      </button>

      <div className="disclose" data-open={open ? "true" : "false"}>
        <div>
          <div className="pb-5 -mt-1">
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
