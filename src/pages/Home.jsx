import { useEffect } from 'react';
import Console from '../components/Console';
import Receipts from '../components/Receipts';
import About from '../components/About';
import Projects, { PROJECTS } from '../components/Projects';
import Demos from '../components/Demos';
import Experience from '../components/Experience';
import Writing from '../components/Writing';
import Reveal from '../components/Reveal';

const LINKS = [
  { label: 'github', href: 'https://github.com/rudranaresh0201' },
  { label: 'linkedin', href: 'https://linkedin.com/in/rudra-naresh-790751321' },
  { label: 'email', href: 'mailto:rudranaresh2018@gmail.com' },
];

/* Every section opens the same way: a serif title, a quiet count or note. */
function Head({ title, aside, lede }) {
  return (
    <Reveal className="mb-10">
      <div className="flex items-baseline justify-between gap-4 border-b border-line pb-4">
        <h2 className="display text-4xl sm:text-5xl text-fg">{title}</h2>
        {aside && <span className="text-sm text-faint shrink-0">{aside}</span>}
      </div>
      {lede && <p className="text-dim leading-relaxed max-w-2xl mt-5">{lede}</p>}
    </Reveal>
  );
}

export default function Home({ section }) {
  /* /projects, /work, ... land here and scroll to their section */
  useEffect(() => {
    if (section === 'top') return window.scrollTo({ top: 0 });
    document.getElementById(section)?.scrollIntoView({ block: 'start' });
  }, [section]);

  return (
    <>
      <section className="pt-16 sm:pt-24 pb-20 sm:pb-28">
        <Reveal className="grid sm:grid-cols-[1fr_auto] gap-10 sm:gap-16 items-end">
          <div>
            <h1 className="display text-[3.4rem] sm:text-7xl lg:text-[5.75rem] text-fg leading-[0.95]">
              Building with AI,<br />
              <em className="text-accent">agents</em> and RL.
            </h1>
            <p className="text-lg text-dim leading-relaxed max-w-2xl mt-8">
              Most of my week goes into agents, MCP and automation, and lately reinforcement learning
              and robotics. I like the layer underneath the model, the protocols and plumbing and the
              unglamorous work of making all of it hold up once something real depends on it.
            </p>
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-8">
              {LINKS.map((l) => (
                <li key={l.label}>
                  <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-sm link">{l.label}</a>
                </li>
              ))}
              <li className="text-sm text-faint">Mumbai, India</li>
            </ul>
          </div>
          <img
            src={`${import.meta.env.BASE_URL}portrait.jpg`}
            alt="Rudra Naresh"
            width={176}
            height={176}
            className="w-32 h-32 sm:w-44 sm:h-44 rounded-full object-cover ring-1 ring-line order-first sm:order-none"
          />
        </Reveal>
      </section>

      <section id="projects" className="scroll-mt-20 pb-24">
        <Head
          title="Projects"
          aside={`${PROJECTS.length} projects`}
          lede="The numbers are whatever the benchmarks actually print, and every one carries a note saying what it does not do yet, because a project page with no gaps in it is not telling you the truth."
        />
        <Projects />
      </section>

      <section id="demos" className="scroll-mt-20 pb-24">
        <Head title="Demos" aside="real runs, nothing mocked" />
        <Demos />
        <Reveal className="card p-5 sm:p-6 mt-6">
          <div className="mb-3 flex items-baseline justify-between gap-3">
            <p className="text-fg font-medium">verimcp console, replaying one real run</p>
            <p className="text-xs text-faint">click any row</p>
          </div>
          <Console />
          <p className="text-sm text-mute mt-3 leading-relaxed">
            Five of these nine calls reported a success that never happened. The pause on each row is
            the proxy going and checking rather than taking the answer on trust.
          </p>
        </Reveal>
      </section>

      <section id="internships" className="scroll-mt-20 pb-24">
        <Head title="Internships" aside="3 roles" />
        <Experience />
      </section>

      <section id="writing" className="scroll-mt-20 pb-24">
        <Head
          title="Blog"
          lede="Mostly write-ups of something that took a while to understand, with the wrong turns left in."
        />
        <Writing />
      </section>

      <section id="about" className="scroll-mt-20 pb-16">
        <Head title="About" />
        <div className="grid lg:grid-cols-2 gap-x-16 gap-y-10">
          <div>
            <p className="text-dim leading-relaxed mb-8">
              Mostly I tinker. Lately that means agentic systems and the protocol layer they talk over:
              retrieval that admits when it has nothing, tool calls that get checked instead of taken on
              trust, pipelines that survive contact with an actual user. I build a thing, then spend
              about as long trying to break it, because that is usually the part that tells you whether
              you built something that works or something that only looks like it does.
            </p>
            <About />
          </div>
          <Receipts />
        </div>
      </section>
    </>
  );
}
