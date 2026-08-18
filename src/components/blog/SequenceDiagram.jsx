import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LANES = [
  { key: 'host', label: 'Host (Client)', color: '#332c22' },
  { key: 'verimcp', label: 'verimcp', color: '#996a11' },
  { key: 'devmcp', label: 'devmcp / liar', color: '#155f4d' },
];

const SCENARIOS = {
  honest: {
    label: 'Real devmcp, honest claim',
    accent: '#1f7d68',
    steps: [
      { from: 'host', to: 'verimcp', text: 'tools/call write_file' },
      { from: 'verimcp', to: 'devmcp', text: 'forwarded unchanged' },
      { from: 'devmcp', to: 'verimcp', text: 'isError: false, "wrote 12 bytes"' },
      { note: 'verimcp independently re-reads the file and hashes it' },
      { from: 'verimcp', to: 'host', text: 'response forwarded unchanged', result: 'pass' },
    ],
  },
  lying: {
    label: 'Lying backend, fabricated claim',
    accent: '#c23c1b',
    steps: [
      { from: 'host', to: 'verimcp', text: 'tools/call git_commit' },
      { from: 'verimcp', to: 'devmcp', text: 'forwarded unchanged' },
      { from: 'devmcp', to: 'verimcp', text: 'isError: false, commit_hash="ffff…"' },
      { note: 'verimcp independently runs git cat-file -e ffff…' },
      { from: 'verimcp', to: 'host', text: 'isError: true, "claimed commit does not exist"', result: 'fail' },
    ],
  },
};

const laneIndex = (key) => LANES.findIndex((l) => l.key === key);

function StepArrow({ step, accent }) {
  if (step.note) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35 }}
        className="mx-auto my-2 max-w-md text-center"
      >
        <span className="inline-block font-mono text-[10px] px-3 py-1.5 rounded-full"
          style={{ background: `${accent}12`, border: `1px solid ${accent}35`, color: accent }}>
          ⟲ {step.note}
        </span>
      </motion.div>
    );
  }

  const fromI = laneIndex(step.from);
  const toI = laneIndex(step.to);
  const leftToRight = toI > fromI;
  const resultColor = step.result === 'fail' ? '#c23c1b' : step.result === 'pass' ? '#1f7d68' : '#a89e8d';

  return (
    <motion.div
      initial={{ opacity: 0, x: leftToRight ? -12 : 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="grid grid-cols-3 items-center gap-2 my-1.5"
    >
      {LANES.map((lane, i) => {
        const isFrom = i === fromI;
        const isTo = i === toI;
        const isMid = i > Math.min(fromI, toI) && i < Math.max(fromI, toI);
        return (
          <div key={lane.key} className="h-8 flex items-center justify-center relative">
            {(isFrom || isTo || isMid) && (
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px" style={{ background: 'rgba(24,20,15,0.12)' }} />
            )}
            {isFrom && <span className="relative z-10 w-2.5 h-2.5 rounded-full" style={{ background: step.result ? resultColor : '#a89e8d' }} />}
            {isTo && (
              <span className="relative z-10 text-lg leading-none" style={{ color: step.result ? resultColor : '#a89e8d' }}>
                {leftToRight ? '→' : '←'}
              </span>
            )}
          </div>
        );
      })}
      <div
        className="col-span-3 -mt-1 text-center font-mono text-[10.5px] px-2"
        style={{ color: step.result ? resultColor : '#6b6255', fontWeight: step.result ? 600 : 400 }}
      >
        {step.text}
      </div>
    </motion.div>
  );
}

export default function SequenceDiagram() {
  const [mode, setMode] = useState('honest');
  const scenario = SCENARIOS[mode];

  return (
    <div className="my-8 rounded-2xl overflow-hidden glass" style={{ border: '1px solid rgba(24,20,15,0.09)' }}>
      <div className="px-4 sm:px-6 pt-4 pb-3 flex flex-wrap items-center justify-between gap-3 border-b border-ink-900/[0.06]">
        <span className="font-mono text-[9px] text-ink-500 tracking-widest">SAME PROXY · TWO OUTCOMES</span>
        <div className="flex rounded-full p-0.5" style={{ background: 'rgba(24,20,15,0.05)' }}>
          {Object.entries(SCENARIOS).map(([key, s]) => (
            <button
              key={key}
              onClick={() => setMode(key)}
              className="px-3 py-1 rounded-full text-[11px] font-semibold font-mono transition-colors"
              style={{
                background: mode === key ? s.accent : 'transparent',
                color: mode === key ? '#fff8ef' : '#6b6255',
              }}
            >
              {key}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 sm:px-6 py-5">
        <div className="grid grid-cols-3 gap-2 mb-3">
          {LANES.map((lane) => (
            <div key={lane.key} className="text-center font-mono text-[9px] font-semibold tracking-wide" style={{ color: lane.color }}>
              {lane.label}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={mode} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
            {scenario.steps.map((step, i) => (
              <StepArrow key={i} step={step} accent={scenario.accent} />
            ))}
          </motion.div>
        </AnimatePresence>

        <motion.div
          key={mode + '-result'}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.4 }}
          className="mt-4 text-center text-xs font-medium"
          style={{ color: scenario.accent }}
        >
          {mode === 'honest'
            ? '✓ Claim matched reality, response passed through unchanged'
            : '✕ Claim disagreed with reality, verimcp rewrote it before the Host ever saw it'}
        </motion.div>
      </div>
    </div>
  );
}
