const BASE = import.meta.env.BASE_URL;

/* A plot or picture with a caption under it. */
export function Figure({ src, caption, alt }) {
  return (
    <figure>
      <img src={`${BASE}${src}`} alt={alt || caption} loading="lazy" className="w-full block rounded-xl border border-line bg-panel" />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

export function Video({ src, poster, caption }) {
  return (
    <figure>
      <video src={`${BASE}${src}`} poster={`${BASE}${poster}`} controls muted loop playsInline preload="metadata"
        className="w-full block rounded-xl border border-line bg-sand" />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

/* head: column titles. rows: arrays of cells. The first column reads as a label. */
export function Table({ head, rows, caption }) {
  return (
    <figure>
      <div className="card overflow-x-auto">
        <table className="w-full text-[15px] min-w-[520px]">
          <thead>
            <tr className="border-b border-line">
              {head.map((h, i) => (
                <th key={h} className={`label font-medium px-4 py-3 ${i ? 'text-right' : 'text-left'}`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r[0]} className="border-b border-line last:border-b-0 align-baseline">
                {r.map((c, i) => (
                  <td key={i} className={`px-4 py-3 leading-snug ${i ? 'text-right text-fg tabular-nums' : 'text-dim'}`}>{c}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
