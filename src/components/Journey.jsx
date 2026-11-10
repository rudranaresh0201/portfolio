import { Link } from 'react-router-dom';
import Reveal from './Reveal';

const base = import.meta.env.BASE_URL;

/* The story in order, no dates. Each chapter is a few short lines. */
const CHAPTERS = [
  {
    tag: 'RAG',
    title: 'It started with RAG.',
    lines: [
      'I stumbled into RAG and agentic AI first.',
      'Built Aria: 15 agents behind one planner, and it stops and asks before it writes anything.',
      'Then ClinIQ, a clinical assistant that has to show where every claim came from.',
    ],
    to: '/projects/aria',
  },
  {
    tag: 'Agents',
    title: 'Then agents got fun.',
    lines: [
      'PRGuard: a review agent that reads the whole repo instead of just the diff. It caught all 16 bugs I planted, at 94% precision.',
    ],
    to: '/projects/prguard',
  },
  {
    tag: 'MCP',
    title: 'Nobody was checking the tool calls.',
    lines: [
      'Then I came across MCP, and noticed nothing checks whether a tool call really happened.',
      'So I built verimcp, a proxy that goes and checks. An agent with no protection believed 14 of 14 fake results. verimcp caught 11 and named the 3 it could not check.',
      'Published it on PyPI and the MCP registry.',
    ],
    to: '/projects/verimcp',
    img: { src: 'shots/verimcp-console.jpg', caption: 'The verimcp console on a real run. Five calls claimed a success that never happened.' },
  },
  {
    tag: 'Internships',
    title: 'Automating a real brand.',
    lines: [
      '4Seer first: backend and testing for an Australian cable company.',
      'Then Elevar, where I automated the ops of a real D2C brand. Failed deliveries, claims, reships, a WhatsApp support bot. 40+ n8n workflows, 15 running in production.',
      'This is where I learned what it takes for an agent to run something real.',
    ],
    to: '/work',
    img: { src: 'shots/elevar-n8n-claims.jpg', caption: 'The claims workflow at Elevar, past 60 nodes.' },
  },
  {
    tag: 'Computer use',
    title: 'Agents that use a computer like we do.',
    lines: [
      'Solved two things. Trained a 2B model to find where to click: 1.5% to 46.5% on apps it had never seen. And built DreamDesk, an agent that learns an app with no LLM at all.',
      'Wrote blogs about both. Now building Habit at Everyday Habit.',
    ],
    to: '/blog/computer-use-journey',
  },
  {
    tag: 'RL and robots',
    title: 'Then came robots.',
    lines: [
      'I started RL and robot learning from the basics.',
      'Trained a robot arm inside a world model and caught it cheating. The model said the box went up 50 cm. The real box never moved.',
      'Now it is visual RL on long tasks, on a free Kaggle GPU.',
    ],
    to: '/projects/squint',
    img: { src: 'demos/so101.jpg', caption: 'The dream on the left, reality on the right.' },
  },
  {
    tag: 'Next',
    title: 'What I want to build.',
    lines: [
      'Robot policies that remember what they have done, and can handle long tasks without being shown each one.',
    ],
  },
];

export default function Journey() {
  return (
    <ol className="relative ml-1.5 border-l border-line2">
      {CHAPTERS.map((c, i) => {
        const last = i === CHAPTERS.length - 1;
        return (
          <Reveal as="li" key={c.tag} className={`relative pl-7 sm:pl-10 ${last ? '' : 'pb-14'}`}>
            <span
              aria-hidden="true"
              className={`absolute -left-[5px] top-[0.55rem] w-[9px] h-[9px] rounded-full border-2 border-accent ${last ? 'bg-accent' : 'bg-base'}`}
            />
            <div className="max-w-2xl">
              <p className="label !text-accent">{c.tag}</p>
              <h3 className="display text-2xl sm:text-[2rem] text-fg mt-1.5">{c.title}</h3>
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
                <Link to={c.to} className="link text-[15px] inline-block mt-5">Read more</Link>
              )}
            </div>
          </Reveal>
        );
      })}
    </ol>
  );
}
