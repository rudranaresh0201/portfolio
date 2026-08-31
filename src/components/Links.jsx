/**
 * A row of outbound links. `live: true` means the thing is deployed and
 * reachable right now, not just a repo you can read. Anything without a
 * working URL gets no link at all rather than a placeholder.
 */
export default function Links({ items = [] }) {
  if (!items.length) return null;
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
      {items.map((l) => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-2xs link inline-flex items-center gap-1.5"
        >
          {l.live && <span className="w-1.5 h-1.5 rounded-full bg-ok shrink-0" aria-hidden="true" />}
          {l.label}
          {l.live && <span className="sr-only"> (live)</span>}
        </a>
      ))}
    </div>
  );
}
