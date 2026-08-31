import { Link } from 'react-router-dom';

export default function BlogLayout({ title, date, tags = [], children }) {
  return (
    <article className="py-14">
      <Link to="/" className="font-mono text-2xs text-mute hover:text-fg inline-block mb-10">
        back
      </Link>

      <header className="mb-12">
        <p className="label mb-3">writing</p>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight leading-tight mb-4">
          {title}
        </h1>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="font-mono text-2xs text-faint">{date}</span>
          {tags.map((t) => <span key={t} className="chip">{t}</span>)}
        </div>
      </header>

      <div className="prose-blog">{children}</div>
    </article>
  );
}
