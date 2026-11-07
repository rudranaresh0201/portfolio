import { Link } from 'react-router-dom';
import Reveal from './Reveal';

const POSTS = [
  {
    slug: '/blog/computer-use-journey',
    title: 'Computer use, three ways: pointing, plumbing, and an agent with no LLM',
    date: '2026-11-08',
    cover: 'blog/computer-use/teaser.png',
    excerpt:
      'A 2B grounder with Claude deciding every step, the OS plumbing I measure at my internship, and DreamDesk, an agent with no LLM at all. What each one taught me, why calling a large model every step pushed me to the last one, and how they compare.',
  },
  {
    slug: '/blog/dreamdesk',
    title: 'DreamDesk: an agent that learns a model of an app it has never seen',
    date: '2026-11-08',
    cover: 'demos/dreamdesk.jpg',
    excerpt:
      'No LLM, no instructions: an agent explores an app with random clicks, learns a model of it, and plans inside that model. The model predicts situations it never saw and composes what it did see. Turning that into better real tasks is harder, and Test 1, whether more apps make a better prior, narrowly failed. Every test pre-registered.',
  },
  {
    slug: '/blog/so101',
    title: 'Training a robot arm inside a world model, and catching it cheating',
    date: '2026-11-08',
    cover: 'demos/so101.jpg',
    excerpt:
      'SAC learns to pick up a box in MuJoCo. A second policy trained inside a learned world model learns to fool it instead: the model says the box went up 49 cm, and it never moved. Why short rollouts failed, how the cheat works, and the three fixes that got real picks on 2 of 3 seeds.',
  },
  {
    slug: '/blog/computer-use',
    title: 'Where should an agent click? A small grounder, and when to trust the accessibility tree',
    date: '2026-10-18',
    cover: 'blog/computer-use/teaser.png',
    excerpt:
      'I trained a 2B model to point at buttons on free labels and a free GPU, then measured the common "trust the accessibility tree first" design. It is worse than vision alone once the tree has holes, and the loss has an exact formula. Then I built an agent around the fix.',
  },
  {
    slug: '/blog/verimcp',
    title: "Don't trust the tool call: building a verifier for MCP",
    date: '2026-08-15',
    cover: 'shots/verimcp-console.jpg',
    excerpt:
      'An MCP server can return isError: false and still be lying, because nothing in the protocol proves a claimed side effect ever happened. This is the proxy I built to check it, and the real bugs three separate clients found in it before I was willing to trust my own tests.',
  },
];

export default function Writing() {
  return (
    <ul className="grid sm:grid-cols-2 gap-6">
      {POSTS.map((p) => (
        <Reveal as="li" key={p.slug}>
          <Link to={p.slug} className="card card-hover block h-full overflow-hidden group">
            <div className="aspect-[16/9] overflow-hidden border-b border-line bg-sand">
              <img
                src={`${import.meta.env.BASE_URL}${p.cover}`}
                alt=""
                loading="lazy"
                className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </div>
            <div className="p-5 sm:p-6">
              <p className="text-xs text-faint mb-2">{p.date}</p>
              <h3 className="display text-[1.75rem] leading-[1.1] text-fg group-hover:text-accent transition-colors">{p.title}</h3>
              <p className="text-dim text-[15px] leading-relaxed mt-3">{p.excerpt}</p>
            </div>
          </Link>
        </Reveal>
      ))}
    </ul>
  );
}
