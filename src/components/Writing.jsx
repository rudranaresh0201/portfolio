import { Link } from 'react-router-dom';
import Reveal from './Reveal';

const POSTS = [
  {
    slug: '/blog/computer-use-journey',
    title: 'Computer use, three ways: pointing, plumbing, and an agent with no LLM',
    date: '2026-11-08',
    cover: 'blog/computer-use/teaser.png',
    excerpt:
      "Three takes on computer use: a small grounder with Claude deciding, the OS plumbing from my internship, and DreamDesk, an agent with no LLM. What each one taught me.",
  },
  {
    slug: '/blog/dreamdesk',
    title: 'DreamDesk: an agent that learns a model of an app it has never seen',
    date: '2026-11-08',
    cover: 'demos/dreamdesk.jpg',
    excerpt:
      "An agent explores an app with random clicks, learns a model of it, and plans inside that model. What worked, and the scaling test that narrowly failed.",
  },
  {
    slug: '/blog/so101',
    title: 'Training a robot arm inside a world model, and catching it cheating',
    date: '2026-11-08',
    cover: 'demos/so101.jpg',
    excerpt:
      "A policy trained inside a learned world model fooled it: the model said the box rose 49 cm and it never moved. How the cheat works and the three fixes.",
  },
  {
    slug: '/blog/computer-use',
    title: 'Where should an agent click? A small grounder, and when to trust the accessibility tree',
    date: '2026-10-18',
    cover: 'blog/computer-use/teaser.png',
    excerpt:
      "I trained a 2B model to point at buttons on free labels and a free GPU, then measured the \"trust the accessibility tree first\" design. It loses to vision alone once the tree has holes.",
  },
  {
    slug: '/blog/verimcp',
    title: "Don't trust the tool call: building a verifier for MCP",
    date: '2026-08-15',
    cover: 'shots/verimcp-console.jpg',
    excerpt:
      "An MCP server can return isError: false and still be lying. The proxy I built to check it, and the bugs three clients found in it.",
  },
];

export default function Writing() {
  return (
    <ul className="border-b border-line">
      {POSTS.map((p) => (
        <Reveal as="li" key={p.slug}>
          <Link
            to={p.slug}
            className="row group grid sm:grid-cols-[7rem_1fr_9rem] gap-x-6 gap-y-2 items-center py-6 px-2 sm:px-3 -mx-2 sm:-mx-3"
          >
            <span className="label self-start sm:pt-1.5">{p.date}</span>
            <div>
              <h3 className="display text-2xl text-fg">
                {p.title} <span className="arrow inline-block text-faint text-lg" aria-hidden="true">&#8599;</span>
              </h3>
              <p className="text-dim text-[15px] leading-relaxed mt-2 max-w-2xl">{p.excerpt}</p>
            </div>
            <div className="frame hidden sm:block aspect-[16/10] border border-line">
              <img
                src={`${import.meta.env.BASE_URL}${p.cover}`}
                alt=""
                loading="lazy"
                className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition duration-300"
              />
            </div>
          </Link>
        </Reveal>
      ))}
    </ul>
  );
}
