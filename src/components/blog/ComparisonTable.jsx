import { motion } from 'framer-motion';

const ROWS = [
  { label: 'Believes a fabricated tool-call result', without: '12/12', withV: '9/12', pct: 75 },
  { label: 'Duplicates a side effect on retry', without: '5/5', withV: '0/5', pct: 0 },
];

function Bar({ pct, color }) {
  return (
    <div className="h-1.5 rounded-full overflow-hidden mt-1.5" style={{ background: 'rgba(24,20,15,0.08)' }}>
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${pct}%` }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="h-full rounded-full"
        style={{ background: color }}
      />
    </div>
  );
}

export default function ComparisonTable() {
  return (
    <div className="my-6 rounded-xl overflow-hidden glass" style={{ border: '1px solid rgba(24,20,15,0.09)' }}>
      <div className="grid grid-cols-3 px-4 sm:px-5 py-2.5 border-b border-ink-900/[0.07]">
        <span className="font-mono text-[9px] text-ink-300 tracking-widest">SCENARIO</span>
        <span className="font-mono text-[9px] text-ink-300 tracking-widest text-center">WITHOUT verimcp</span>
        <span className="font-mono text-[9px] text-ink-300 tracking-widest text-center">WITH verimcp</span>
      </div>
      {ROWS.map((row) => (
        <div key={row.label} className="grid grid-cols-3 gap-3 px-4 sm:px-5 py-4 items-center border-b border-ink-900/[0.05] last:border-b-0">
          <div>
            <p className="text-xs text-ink-700 leading-snug">{row.label}</p>
            <Bar pct={100 - row.pct} color="#e8542e" />
          </div>
          <span className="text-center font-mono text-sm font-semibold text-coral-500">{row.without}</span>
          <span className="text-center font-mono text-sm font-semibold text-teal-600">{row.withV}</span>
        </div>
      ))}
    </div>
  );
}
