import { useState } from 'react';

/**
 * A faithful recreation of the real verimcp console (the local dashboard at
 * 127.0.0.1:8787 reading live-audit.jsonl). Numbers and events below are the
 * ones from an actual run against devmcp, not invented for the page.
 */

const COUNTERS = [
  { label: 'claims disproven', value: 5, tone: 'bad'  },
  { label: 'calls observed',   value: 9, tone: 'fg'   },
  { label: 'verified true',    value: 3, tone: 'ok'   },
  { label: 'backend errors',   value: 1, tone: 'warn' },
  { label: 'uncheckable',      value: 0, tone: 'mute' },
];

const EVENTS = [
  {
    id: 'b6f7·1', t: '00:02:54', tool: 'run_ci_pipeline', verdict: 'disproven',
    verifier: 'CIRunVerifier',
    claimed: 'the call succeeded',
    found: "step 'tests' claimed exit_code=0, but re-running it produced exit_code=1",
  },
  {
    id: '8695·1', t: '00:02:54', tool: 'write_file', verdict: 'disproven',
    verifier: 'FilesystemVerifier',
    claimed: 'wrote 412 bytes to src/config.py',
    found: 'file on disk hashes to a different digest than the content claimed',
  },
  {
    id: 'ec62·1', t: '00:02:53', tool: 'git_branch', verdict: 'disproven',
    verifier: 'GitBranchVerifier',
    claimed: "created branch 'feat/retry-cache'",
    found: 'git for-each-ref lists no such branch in the repository',
  },
  {
    id: '2f5a·1', t: '00:02:52', tool: 'git_commit', verdict: 'disproven',
    verifier: 'GitCommitVerifier',
    claimed: 'committed as 9f2c1ab',
    found: 'that hash resolves, but its tree is identical to the parent, so nothing was actually committed',
  },
  {
    id: '8edf·4', t: '00:02:52', tool: 'git_commit', verdict: 'error',
    verifier: 'n/a',
    claimed: 'nothing to commit, working tree clean',
    found: 'an honest failure from the backend, passed straight through and never counted as a lie',
  },
  {
    id: '8edf·3', t: '00:02:52', tool: 'git_branch', verdict: 'verified',
    verifier: 'GitBranchVerifier',
    claimed: "created branch 'main'",
    found: 'branch exists and points at the claimed commit',
  },
  {
    id: '8edf·1', t: '00:02:52', tool: 'write_file', verdict: 'verified',
    verifier: 'FilesystemVerifier',
    claimed: 'wrote 128 bytes to README.md',
    found: 'content re-read off disk hashes to exactly the claimed bytes',
  },
];

/* Class names are written out in full on purpose. Tailwind scans source text,
   so a name built at runtime (text- swapped for bg-) gets purged from the CSS. */
const VERDICT = {
  disproven: { text: 'text-bad',  bar: 'bg-bad',  label: 'DISPROVEN' },
  verified:  { text: 'text-ok',   bar: 'bg-ok',   label: 'VERIFIED'  },
  error:     { text: 'text-warn', bar: 'bg-warn', label: 'TOOL ERROR'},
};

const TONE = { bad: 'text-bad', ok: 'text-ok', warn: 'text-warn', fg: 'text-fg', mute: 'text-mute' };

export default function Console() {
  const [sel, setSel] = useState(EVENTS[0]);

  return (
    <div className="rounded-lg border border-line bg-panel overflow-hidden">
      {/* title bar */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-line bg-raise">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-ok" />
          <span className="font-mono text-2xs text-fg">verimcp console</span>
        </div>
        <span className="font-mono text-2xs text-faint hidden sm:inline">live-audit.jsonl</span>
      </div>

      {/* counters */}
      <div className="grid grid-cols-3 sm:grid-cols-5 border-b border-line">
        {COUNTERS.map((c, i) => (
          <div key={c.label}
            className={`px-3 py-2.5 ${i !== 0 ? 'border-l border-line' : ''} ${i === 3 ? 'border-l-0 sm:border-l' : ''}`}>
            <div className="label !text-[9px] leading-tight mb-0.5">{c.label}</div>
            <div className={`font-mono text-lg leading-none ${TONE[c.tone]}`}>{c.value}</div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-[1fr_1fr]">
        {/* event stream */}
        <div className="border-b md:border-b-0 md:border-r border-line">
          <div className="px-3 py-1.5 label !text-[9px] border-b border-line">event stream</div>
          <ul>
            {EVENTS.map((e) => {
              const v = VERDICT[e.verdict];
              const active = sel.id === e.id;
              return (
                <li key={e.id}>
                  <button
                    onClick={() => setSel(e)}
                    aria-pressed={active}
                    className={`w-full text-left px-3 py-1.5 flex items-center gap-2 font-mono text-2xs transition-colors
                      ${active ? 'bg-raise' : 'hover:bg-raise/60'}`}
                  >
                    <span className={`w-px h-3.5 ${v.bar} ${active ? 'opacity-100' : 'opacity-40'}`} />
                    <span className="text-faint w-11 shrink-0">{e.id}</span>
                    <span className="text-fg truncate flex-1">{e.tool}</span>
                    <span className={`${v.text} shrink-0`}>{v.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* inspector */}
        <div>
          <div className="px-3 py-1.5 label !text-[9px] border-b border-line">
            inspector · <span className="text-dim">{sel.tool}</span>
          </div>
          <div className="p-3 space-y-3 font-mono text-2xs">
            <div>
              <div className="text-faint mb-1">- backend claimed</div>
              <p className="text-dim leading-relaxed">{sel.claimed}</p>
            </div>
            <div>
              <div className="text-faint mb-1">
                + verimcp went and checked
                {sel.verifier !== 'n/a' && <span className="text-faint/70"> · {sel.verifier}</span>}
              </div>
              <p className={`leading-relaxed ${VERDICT[sel.verdict].text}`}>{sel.found}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
