import { Link } from 'react-router-dom';
import Reveal from './Reveal';

const STEPS = [
  {
    when: 'early 2026',
    title: 'Stumbled into RAG',
    text: 'It started with RAG and agentic AI. I built Aria, an assistant with 15 agents behind one planner, and ClinIQ.',
    to: '/projects/aria',
  },
  {
    when: 'may 2026',
    title: 'Agents got fun',
    text: 'PRGuard, a review agent that reads the whole repo and not just the diff. This is where I got hooked on agents.',
    to: '/projects/prguard',
  },
  {
    when: 'jul 2026',
    title: 'Found MCP',
    text: 'Nothing in MCP checks whether a tool call really happened. So I built verimcp and published it on PyPI and the MCP Registry.',
    to: '/projects/verimcp',
  },
  {
    when: 'may to nov 2026',
    title: 'Internships',
    text: '4Seer, then Elevar. Agents and an automation stack running a real business, where a bug means a real order goes wrong.',
    to: '/work',
  },
  {
    when: 'sep to nov 2026',
    title: 'Computer use',
    text: 'Solved two things: trained a small model to find where to click, and built DreamDesk, an agent that learns an app with no LLM. Wrote both up.',
    to: '/blog/computer-use-journey',
  },
  {
    when: 'nov 2026',
    title: 'RL and robots',
    text: 'Reinforcement learning on a robot arm. First a world model that got cheated, now visual RL on long tasks.',
    to: '/projects/squint',
  },
  {
    when: 'next',
    title: 'Where this goes',
    text: 'Robot policies that remember what they have done and can handle long tasks without being shown each one.',
  },
];

export default function Journey() {
  return (
    <ol className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 border-b border-line">
      {STEPS.map((s, i) => {
        const body = (
          <>
            <div className="flex items-baseline justify-between">
              <span className={`label ${s.to ? '' : '!text-accent'}`}>{s.when}</span>
              <span className="label">{String(i + 1).padStart(2, '0')}</span>
            </div>
            <h3 className="display text-2xl text-fg mt-3 group-hover:text-accent transition-colors">{s.title}</h3>
            <p className="text-dim text-[15px] leading-relaxed mt-2 max-w-md">{s.text}</p>
          </>
        );
        return (
          <Reveal as="li" key={s.title} delay={(i % 3) * 60} className={`rowline py-7 ${s.to ? '' : 'sm:col-span-2 lg:col-span-3'}`}>
            {s.to ? <Link to={s.to} className="group block">{body}</Link> : body}
          </Reveal>
        );
      })}
    </ol>
  );
}
