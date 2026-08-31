export default function CodeBlock({ label, children }) {
  return (
    <div className="my-6 rounded-md overflow-hidden border border-line">
      {label && (
        <div className="px-3 py-1.5 bg-raise border-b border-line">
          <span className="font-mono text-2xs text-mute">{label}</span>
        </div>
      )}
      <pre className="p-4 overflow-x-auto text-[12.5px] leading-relaxed bg-panel">
        <code className="font-mono text-dim">{children}</code>
      </pre>
    </div>
  );
}
