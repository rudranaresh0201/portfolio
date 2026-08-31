const ROWS = [
  { label: 'Believes a fabricated tool-call result', without: '14 / 14', withV: '11 / 14' },
  { label: 'Duplicates a side effect on retry', without: '5 / 5', withV: '0 / 5' },
];

export default function ComparisonTable() {
  return (
    <div className="my-6 rounded-md overflow-hidden border border-line bg-panel">
      <div className="grid grid-cols-[1fr_auto_auto] gap-4 px-3 py-2 border-b border-line">
        <span className="label !text-[9px]">scenario</span>
        <span className="label !text-[9px] text-right w-20">without</span>
        <span className="label !text-[9px] text-right w-20">with</span>
      </div>
      {ROWS.map((row) => (
        <div key={row.label}
          className="grid grid-cols-[1fr_auto_auto] gap-4 px-3 py-3 items-baseline border-b border-line last:border-b-0">
          <p className="text-sm text-dim leading-snug">{row.label}</p>
          <span className="text-right w-20 font-mono text-sm text-bad">{row.without}</span>
          <span className="text-right w-20 font-mono text-sm text-ok">{row.withV}</span>
        </div>
      ))}
    </div>
  );
}
