import { Link } from 'react-router-dom';
import Reveal from './Reveal';

const POSTS = [
  {
    slug: '/blog/verimcp',
    title: "Don't trust the tool call: building a verifier for MCP",
    date: '2026-08-15',
    excerpt:
      'An MCP server can return isError: false and still be lying, because nothing in the protocol proves a claimed side effect ever happened. This is the proxy I built to check it, and the real bugs three separate clients found in it before I was willing to trust my own tests.',
  },
];

export default function Writing() {
  return (
    <section className="pb-16">
      <ul>
        {POSTS.map((p) => (
          <li key={p.slug} className="rowline">
            <Link to={p.slug} className="block py-4 group">
              <div className="flex items-baseline justify-between gap-4 mb-1">
                <h3 className="text-fg font-medium group-hover:underline underline-offset-4 decoration-line2">
                  {p.title}
                </h3>
                <span className="font-mono text-2xs text-faint shrink-0">{p.date}</span>
              </div>
              <p className="text-dim text-sm leading-relaxed">{p.excerpt}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
