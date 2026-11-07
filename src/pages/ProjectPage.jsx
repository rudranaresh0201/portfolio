import { Link, Navigate, useParams } from 'react-router-dom';
import { PROJECTS } from '../components/Projects';
import Links from '../components/Links';
import Shot from '../components/Shot';

/* One project, in full: the write-up, the numbers, the honest gap. */
export default function ProjectPage() {
  const { id } = useParams();
  const i = PROJECTS.findIndex((p) => p.id === id);
  if (i < 0) return <Navigate to="/projects" replace />;
  const p = PROJECTS[i];
  const next = PROJECTS[(i + 1) % PROJECTS.length];

  return (
    <article className="max-w-prose mx-auto pt-10 pb-20">
      <Link to="/projects" className="text-sm text-mute hover:text-accent transition-colors">
        &larr; all projects
      </Link>

      <header className="mt-8 mb-10">
        <div className="flex items-center gap-3 mb-4 text-sm">
          <span className="text-mute">{p.period}</span>
          <span className="text-faint">&middot;</span>
          <span className={p.status === 'building' ? 'text-accent' : 'text-mute'}>{p.status}</span>
        </div>
        <h1 className="display text-5xl sm:text-6xl text-fg mb-5">{p.name}</h1>
        <p className="text-lg text-dim leading-relaxed">{p.line}</p>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-6">
          <Links items={p.links} />
          {p.blog && <Link to={p.blog} className="text-sm link">read the write-up</Link>}
          {p.demo && <Link to="/demos" className="text-sm link">watch the demo</Link>}
        </div>
      </header>

      {p.shots?.slice(0, 1).map((sh) => <Shot key={sh.src} {...sh} />)}

      <div className="space-y-5 my-10">
        {p.body.map((para, k) => (
          <p key={k} className="text-[17px] text-dim leading-[1.75]">{para}</p>
        ))}
      </div>

      {p.metrics?.length > 0 && (
        <dl className="card divide-y divide-line my-10">
          {p.metrics.map(([k, v]) => (
            <div key={k} className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-6 px-5 py-3.5">
              <dt className="text-sm text-mute">{k}</dt>
              <dd className="text-[15px] text-fg font-medium sm:text-right">{v}</dd>
            </div>
          ))}
        </dl>
      )}

      {p.next && (
        <div className="border-l-2 border-accent pl-5 my-10">
          <p className="label !text-accent mb-1.5">now</p>
          <p className="text-dim leading-relaxed">{p.next}</p>
        </div>
      )}

      {p.note && (
        <div className="bg-sand rounded-xl px-6 py-5 my-10">
          <p className="label mb-1.5">where it falls short</p>
          <p className="text-dim leading-relaxed">{p.note}</p>
        </div>
      )}

      {p.shots?.slice(1).map((sh) => <Shot key={sh.src} {...sh} />)}

      <div className="flex flex-wrap gap-1.5 mt-10">
        {p.stack.map((t) => <span key={t} className="chip">{t}</span>)}
      </div>

      <Link to={`/projects/${next.id}`} className="card card-hover block mt-16 p-6 group">
        <p className="label mb-2">next project</p>
        <p className="display text-3xl text-fg group-hover:text-accent transition-colors">{next.name} &rarr;</p>
      </Link>
    </article>
  );
}
