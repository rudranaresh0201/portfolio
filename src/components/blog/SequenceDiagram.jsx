import { useState } from 'react';

const SCENARIOS = {
  honest: {
    label: 'honest backend',
    steps: [
      { from: 'host', to: 'verimcp', text: 'tools/call write_file' },
      { from: 'verimcp', to: 'devmcp', text: 'forwarded unchanged' },
      { from: 'devmcp', to: 'verimcp', text: 'isError: false, "wrote 12 bytes"' },
      { note: 'verimcp re-reads the file off disk and hashes it' },
      { from: 'verimcp', to: 'host', text: 'forwarded unchanged', result: 'pass' },
    ],
  },
  lying: {
    label: 'lying backend',
    steps: [
      { from: 'host', to: 'verimcp', text: 'tools/call git_commit' },
      { from: 'verimcp', to: 'devmcp', text: 'forwarded unchanged' },
      { from: 'devmcp', to: 'verimcp', text: 'isError: false, commit_hash="ffff..."' },
      { note: 'verimcp runs git cat-file -e ffff... itself' },
      { from: 'verimcp', to: 'host', text: 'isError: true, "claimed commit does not exist"', result: 'fail' },
    ],
  },
};

export default function SequenceDiagram() {
  const [key, setKey] = useState('lying');
  const scenario = SCENARIOS[key];

  return (
    <div className="my-6 rounded-md border border-line bg-panel overflow-hidden">
      <div className="flex border-b border-line">
        {Object.entries(SCENARIOS).map(([k, s]) => (
          <button
            key={k}
            onClick={() => setKey(k)}
            className={`px-3 py-2 font-mono text-2xs transition-colors ${
              key === k ? 'text-fg bg-raise' : 'text-mute hover:text-dim'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <ol className="p-3 space-y-1.5">
        {scenario.steps.map((s, i) => {
          if (s.note) {
            return (
              <li key={i} className="font-mono text-2xs text-warn pl-4 py-1 border-l border-warn/40">
                {s.note}
              </li>
            );
          }
          const tone =
            s.result === 'fail' ? 'text-bad' : s.result === 'pass' ? 'text-ok' : 'text-dim';
          return (
            <li key={i} className="font-mono text-2xs flex items-baseline gap-2">
              <span className="text-faint w-32 shrink-0">
                {s.from} <span className="text-line2">to</span> {s.to}
              </span>
              <span className={tone}>{s.text}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
