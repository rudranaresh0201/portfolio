export default function CodeBlock({ label, children }) {
  return (
    <div className="my-6 rounded-xl overflow-hidden" style={{ border: '1px solid rgba(24,20,15,0.1)' }}>
      {label && (
        <div className="px-4 py-2 flex items-center gap-1.5" style={{ background: 'rgba(24,20,15,0.04)', borderBottom: '1px solid rgba(24,20,15,0.08)' }}>
          <span className="w-2 h-2 rounded-full" style={{ background: '#e8542e', opacity: 0.5 }} />
          <span className="w-2 h-2 rounded-full" style={{ background: '#c1861a', opacity: 0.5 }} />
          <span className="w-2 h-2 rounded-full" style={{ background: '#1f7d68', opacity: 0.5 }} />
          <span className="ml-2 font-mono text-[10px] text-ink-500">{label}</span>
        </div>
      )}
      <pre className="p-4 sm:p-5 overflow-x-auto text-[12.5px] leading-relaxed" style={{ background: '#18140f' }}>
        <code className="font-mono" style={{ color: '#e8dfcd' }}>{children}</code>
      </pre>
    </div>
  );
}
