import { Link } from 'react-router-dom';
import Reveal from './Reveal';

const base = import.meta.env.BASE_URL;

/* The story in order, no dates. Each chapter is a few short lines. */
const CHAPTERS = [
  {
    title: 'rag',
    lines: [
      'i stumbled into rag and agentic ai first.',
      'built aria: 15 agents behind one planner, and it stops and asks before it writes anything.',
      'then cliniq, a clinical assistant that has to show where every claim came from.',
    ],
    to: '/projects/aria',
  },
  {
    title: 'agents',
    lines: [
      'prguard is where agents got fun.',
      'a review agent that reads the whole repo instead of just the diff. it caught all 16 bugs i planted, at 94% precision.',
    ],
    to: '/projects/prguard',
  },
  {
    title: 'mcp',
    lines: [
      'then i came across mcp, and noticed nothing checks whether a tool call really happened.',
      'so i built verimcp, a proxy that goes and checks. an agent with no protection believed 14 of 14 fake results. verimcp caught 11 and named the 3 it could not check.',
      'published it on pypi and the mcp registry.',
    ],
    to: '/projects/verimcp',
    img: { src: 'shots/verimcp-console.jpg', caption: 'the verimcp console on a real run. five calls claimed a success that never happened.' },
  },
  {
    title: 'internships',
    lines: [
      '4seer first: backend and testing for an australian cable company.',
      'then elevar, where i automated the ops of a real d2c brand. failed deliveries, claims, reships, a whatsapp support bot. 40+ n8n workflows, 15 running in production.',
      'this is where i learned what it takes for an agent to run something real.',
    ],
    to: '/work',
    img: { src: 'shots/elevar-n8n-claims.jpg', caption: 'the claims workflow at elevar, past 60 nodes.' },
  },
  {
    title: 'computer use',
    lines: [
      'got curious about agents that use a computer the way we do.',
      'solved two things. trained a 2b model to find where to click: 1.5% to 46.5% on apps it had never seen. and built dreamdesk, an agent that learns an app with no llm at all.',
      'wrote blogs about both. now building habit at everyday habit.',
    ],
    to: '/blog/computer-use-journey',
  },
  {
    title: 'rl and robots',
    lines: [
      'then i started rl and robot learning, from the basics.',
      'trained a robot arm inside a world model and caught it cheating. the model said the box went up 50 cm. the real box never moved.',
      'now it is visual rl on long tasks, on a free kaggle gpu.',
    ],
    to: '/projects/squint',
    img: { src: 'demos/so101.jpg', caption: 'the dream on the left, reality on the right.' },
  },
  {
    title: 'next',
    lines: [
      'robot policies that remember what they have done, and can handle long tasks without being shown each one.',
    ],
  },
];

export default function Journey() {
  return (
    <ol className="border-b border-line">
      {CHAPTERS.map((c, i) => (
        <Reveal as="li" key={c.title} className="rowline grid grid-cols-[2rem_1fr] sm:grid-cols-[3rem_1fr] gap-x-3 sm:gap-x-5 py-9">
          <span className="label pt-2">{String(i + 1).padStart(2, '0')}</span>
          <div className="max-w-2xl">
            <h3 className={`display text-3xl ${c.to ? 'text-fg' : 'text-accent'}`}>{c.title}</h3>
            <div className="mt-4 space-y-2.5">
              {c.lines.map((l) => (
                <p key={l} className="text-dim text-[17px] leading-relaxed">{l}</p>
              ))}
            </div>
            {c.img && (
              <figure className="mt-6">
                <div className="frame border border-line">
                  <img src={`${base}${c.img.src}`} alt="" loading="lazy" className="w-full block" />
                </div>
                <figcaption className="text-mute text-sm mt-2">{c.img.caption}</figcaption>
              </figure>
            )}
            {c.to && (
              <Link to={c.to} className="label inline-block mt-5 hover:!text-accent transition-colors">read more &#8599;</Link>
            )}
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
