const ITEMS = ['AGENTIC RAG', 'MCP', 'LANGGRAPH', 'COMPUTER USE', 'FASTAPI', 'DOCKER', 'ELEVAR SPORTS', 'VJTI MUMBAI', 'DHONI FAN'];
const COLORS = ['#e8542e', '#1f7d68', '#c1861a'];

export default function Marquee() {
  const loopItems = [...ITEMS, ...ITEMS];
  return (
    <div className="relative overflow-hidden border-y border-ink-900/[0.08] py-5 select-none"
      style={{ background: 'rgba(24,20,15,0.02)' }}>
      <div className="flex whitespace-nowrap animate-marquee" style={{ width: 'max-content' }}>
        {loopItems.map((item, i) => (
          <span key={i} className="inline-flex items-center font-mono font-extrabold text-xl sm:text-2xl tracking-tight mx-6"
            style={{ color: COLORS[i % COLORS.length], opacity: 0.75 }}>
            {item}
            <span className="mx-6 text-ink-300">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
