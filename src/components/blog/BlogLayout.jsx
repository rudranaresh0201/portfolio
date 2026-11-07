import { Link } from 'react-router-dom';

export default function BlogLayout({ title, date, tags = [], children }) {
  return (
    <article className="max-w-prose mx-auto pt-10 pb-20">
      <Link to="/writing" className="text-sm text-mute hover:text-accent transition-colors inline-block mb-10">
        &larr; all posts
      </Link>

      <header className="mb-12">
        <h1 className="display text-4xl sm:text-5xl text-fg leading-[1.05] mb-5">
          {title}
        </h1>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="text-sm text-faint">{date}</span>
          {tags.map((t) => <span key={t} className="chip">{t}</span>)}
        </div>
      </header>

      <div className="prose-blog">{children}</div>
    </article>
  );
}
