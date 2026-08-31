import { useEffect, useRef, useState } from 'react';

/**
 * A recreation of the real verimcp console (the local dashboard at
 * 127.0.0.1:8787 tailing live-audit.jsonl). The events and counts below are
 * from an actual run against devmcp, not invented for the page.
 *
 * It replays that run rather than showing the end state: each call arrives,
 * sits in "checking" while the verifier re-derives the truth, then resolves.
 * That pause is the whole product, so it is the one thing on this site worth
 * animating.
 */

/* newest first, the way the real stream reads */
const EVENTS = [
  {
    id: 'b6f7·1', tool: 'run_ci_pipeline', verdict: 'disproven',
    verifier: 'CIRunVerifier',
    claimed: 'the call succeeded',
    found: "step 'tests' claimed exit_code=0, but re-running it produced exit_code=1",
  },
  {
    id: '8695·1', tool: 'write_file', verdict: 'disproven',
    verifier: 'FilesystemVerifier',
    claimed: 'wrote 412 bytes to src/config.py',
    found: 'the file on disk hashes to a different digest than the content claimed',
  },
  {
    id: 'ec62·1', tool: 'git_branch', verdict: 'disproven',
    verifier: 'GitBranchVerifier',
    claimed: "created branch 'feat/retry-cache'",
    found: 'git for-each-ref lists no such branch in the repository',
  },
  {
    id: '6a30·1', tool: 'write_file', verdict: 'disproven',
    verifier: 'FilesystemVerifier',
    claimed: 'wrote 2.1 KB to scripts/deploy.sh',
    found: 'no file exists at that path after the call returned success',
  },
  {
    id: '2f5a·1', tool: 'git_commit', verdict: 'disproven',
    verifier: 'GitCommitVerifier',
    claimed: 'committed as 9f2c1ab',
    found: 'that hash resolves, but its tree is identical to the parent, so nothing was committed',
  },
  {
    id: '8edf·4', tool: 'git_commit', verdict: 'error',
    verifier: 'n/a',
    claimed: 'nothing to commit, working tree clean',
    found: 'an honest failure from the backend, passed straight through and never counted as a lie',
  },
  {
    id: '8edf·3', tool: 'git_branch', verdict: 'verified',
    verifier: 'GitBranchVerifier',
    claimed: "created branch 'main'",
    found: 'the branch exists and points at the claimed commit',
  },
  {
    id: '8edf·2', tool: 'write_file', verdict: 'verified',
    verifier: 'FilesystemVerifier',
    claimed: 'wrote 64 bytes to .gitignore',
    found: 'bytes on disk match the claim exactly',
  },
  {
    id: '8edf·1', tool: 'write_file', verdict: 'verified',
    verifier: 'FilesystemVerifier',
    claimed: 'wrote 128 bytes to README.md',
    found: 'content re-read off disk hashes to exactly the claimed bytes',
  },
];

const VERDICT = {
  disproven: { text: 'text-bad', bar: 'bg-bad', label: 'DISPROVEN' },
  verified: { text: 'text-ok', bar: 'bg-ok', label: 'VERIFIED' },
  error: { text: 'text-warn', bar: 'bg-warn', label: 'TOOL ERROR' },
};

const STEP = 460;   // ms between calls arriving
const CHECK = 300;  // ms a call spends being verified

const prefersStill = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

function Counter({ label, value, tone }) {
  return (
    <div className="px-3 py-2.5">
      <div className="label !text-[9px] leading-tight mb-0.5">{label}</div>
      <div className={`font-mono text-lg leading-none tabular-nums transition-colors duration-300 ${tone}`}>
        {value}
      </div>
    </div>
  );
}

export default function Console() {
  const total = EVENTS.length;
  const [shown, setShown] = useState(0);      // how many calls have arrived
  const [settled, setSettled] = useState(0);  // how many have finished checking
  const [sel, setSel] = useState(null);
  const [started, setStarted] = useState(false);
  const rootRef = useRef(null);
  const timers = useRef([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  function play() {
    clearTimers();
    setSel(null);
    if (prefersStill()) {
      setShown(total);
      setSettled(total);
      return;
    }
    setShown(0);
    setSettled(0);
    for (let i = 1; i <= total; i++) {
      timers.current.push(setTimeout(() => setShown(i), i * STEP));
      timers.current.push(setTimeout(() => setSettled(i), i * STEP + CHECK));
    }
  }

  /* start once, when it first scrolls into view */
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started) {
          setStarted(true);
          play();
          obs.disconnect();
        }
      },
      { rootMargin: '0px 0px -15% 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started]);

  useEffect(() => clearTimers, []);

  /* oldest arrive first, so newer calls push in at the top like a real tail */
  const visible = EVENTS.slice(total - shown);

  const counts = { disproven: 0, verified: 0, error: 0 };
  visible.forEach((e, i) => {
    const ageIndex = total - shown + i;      // position in EVENTS
    const arrivedAt = total - ageIndex;       // 1-based arrival order
    if (arrivedAt <= settled) counts[e.verdict]++;
  });

  const active = sel ?? visible.find((e, i) => {
    const arrivedAt = total - (total - shown + i);
    return arrivedAt <= settled;
  }) ?? null;

  return (
    <div ref={rootRef} className="rounded-lg border border-line bg-panel overflow-hidden">
      <div className="flex items-center justify-between px-3 py-2 border-b border-line bg-raise">
        <div className="flex items-center gap-2">
          <span className="relative flex w-1.5 h-1.5">
            {shown < total && (
              <span className="absolute inline-flex w-full h-full rounded-full bg-ok opacity-70 animate-ping" />
            )}
            <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-ok" />
          </span>
          <span className="font-mono text-2xs text-fg">verimcp console</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-2xs text-faint hidden sm:inline">live-audit.jsonl</span>
          <button
            onClick={play}
            className="font-mono text-2xs text-mute hover:text-fg transition-colors"
          >
            replay
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-5 divide-x divide-line border-b border-line">
        <Counter label="claims disproven" value={counts.disproven} tone="text-bad" />
        <Counter label="calls observed" value={shown} tone="text-fg" />
        <Counter label="verified true" value={counts.verified} tone="text-ok" />
        <Counter label="backend errors" value={counts.error} tone="text-warn" />
        <Counter label="uncheckable" value={0} tone="text-mute" />
      </div>

      <div className="grid md:grid-cols-2">
        <div className="border-b md:border-b-0 md:border-r border-line">
          <div className="px-3 py-1.5 label !text-[9px] border-b border-line">event stream</div>
          <ul className="min-h-[236px]">
            {visible.map((e, i) => {
              const arrivedAt = total - (total - shown + i);
              const done = arrivedAt <= settled;
              const v = VERDICT[e.verdict];
              const isActive = active?.id === e.id;
              return (
                <li key={e.id} className="reveal is-in">
                  <button
                    onClick={() => done && setSel(e)}
                    className={`w-full text-left px-3 py-1.5 flex items-center gap-2 font-mono text-2xs
                      transition-colors duration-200
                      ${isActive ? 'bg-raise' : 'hover:bg-raise/60'}`}
                  >
                    <span
                      className={`w-px h-3.5 transition-colors duration-300 ${done ? v.bar : 'bg-faint'} ${
                        isActive ? 'opacity-100' : 'opacity-40'
                      }`}
                    />
                    <span className="text-faint w-11 shrink-0">{e.id}</span>
                    <span className="text-fg truncate flex-1">{e.tool}</span>
                    <span
                      className={`shrink-0 transition-colors duration-300 ${
                        done ? v.text : 'text-faint'
                      }`}
                    >
                      {done ? v.label : 'checking'}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <div className="px-3 py-1.5 label !text-[9px] border-b border-line">
            inspector{active && <span className="text-dim"> · {active.tool}</span>}
          </div>
          <div className="p-3 font-mono text-2xs min-h-[236px]">
            {active ? (
              <div key={active.id} className="reveal is-in space-y-3">
                <div>
                  <div className="text-faint mb-1">- backend claimed</div>
                  <p className="text-dim leading-relaxed">{active.claimed}</p>
                </div>
                <div>
                  <div className="text-faint mb-1">
                    + verimcp went and checked
                    {active.verifier !== 'n/a' && (
                      <span className="text-faint/70"> · {active.verifier}</span>
                    )}
                  </div>
                  <p className={`leading-relaxed ${VERDICT[active.verdict].text}`}>{active.found}</p>
                </div>
              </div>
            ) : (
              <p className="text-faint">waiting for the first call</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
