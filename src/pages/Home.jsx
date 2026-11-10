import { useEffect, useState } from 'react';
import Console from '../components/Console';
import Projects, { PROJECTS } from '../components/Projects';
import Demos from '../components/Demos';
import Experience from '../components/Experience';
import Journey from '../components/Journey';
import Life from '../components/Life';
import Writing from '../components/Writing';
import Reveal from '../components/Reveal';

const base = import.meta.env.BASE_URL;

const LINKS = [
  { label: 'github', href: 'https://github.com/rudranaresh0201' },
  { label: 'linkedin', href: 'https://linkedin.com/in/rudra-naresh-790751321' },
  { label: 'email', href: 'mailto:rudranaresh2018@gmail.com' },
];

/* The hero photo is picked at random on every load. Click it for the next one. */
const PHOTOS = [
  { src: 'me/cafe.jpg', caption: 'Mumbai', pos: '50% 30%' },
  { src: 'me/medal.jpg', caption: 'Enthusia 2026, table tennis gold', pos: '50% 20%' },
  { src: 'me/kurta-night.jpg', caption: 'Mumbai', pos: '50% 30%' },
  { src: 'me/portrait.jpg', caption: 'Mumbai', pos: '50% 30%' },
  { src: 'me/kurta.jpg', caption: 'Mumbai', pos: '50% 20%' },
  { src: 'me/pool.jpg', caption: 'Off the clock', pos: '60% 40%' },
];

const NOW = [
  'Long-horizon visual RL on an SO-101 arm, without demos',
  'Habit, a computer-use agent, at Everyday Habit',
  'Next: catching world models when they hallucinate',
];

function Head({ n, title, aside }) {
  return (
    <Reveal className="flex items-baseline justify-between gap-4 mb-8">
      <h2 className="display text-4xl sm:text-6xl text-fg">
        <span className="label align-top mr-3 relative top-2">{n}</span>
        {title}
      </h2>
      {aside && <span className="label shrink-0">{aside}</span>}
    </Reveal>
  );
}

function Photo() {
  const [i, setI] = useState(() => Math.floor(Math.random() * PHOTOS.length));
  const p = PHOTOS[i];
  return (
    <figure className="w-full max-w-[19rem] order-first lg:order-none">
      <button
        type="button"
        onClick={() => setI((i + 1) % PHOTOS.length)}
        className="frame block w-full aspect-[4/5] cursor-pointer"
        aria-label="Show another photo"
      >
        <img key={p.src} src={`${base}${p.src}`} alt="Rudra Naresh" className="w-full h-full object-cover page-enter" style={{ objectPosition: p.pos }} />
      </button>
      <figcaption className="label flex justify-between mt-2.5">
        <span>{p.caption}</span>
        <span>{i + 1}/{PHOTOS.length}</span>
      </figcaption>
    </figure>
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
      <section className="pt-12 sm:pt-20 pb-20 sm:pb-28">
        <div className="grid lg:grid-cols-[1fr_19rem] gap-10 lg:gap-16 items-end">
          <Reveal>
            <p className="label mb-6">Rudra Naresh / VJTI Mumbai, class of 2028</p>
            <h1 className="display text-[2.9rem] sm:text-7xl lg:text-[5.4rem] text-fg">
              RL, world models and <span className="text-accent">computer-use</span> agents.
            </h1>
            <ul className="mt-10 max-w-xl">
              {NOW.map((t, k) => (
                <li key={t} className="rowline flex gap-4 py-3 text-dim">
                  <span className="label pt-1 w-8 shrink-0 inline-flex items-center gap-1.5">
                    {k === 0 && <span className="w-1.5 h-1.5 rounded-full bg-accent live-dot" aria-hidden="true" />}
                    {k === 0 ? 'now' : ''}
                  </span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-8">
              {LINKS.map((l) => (
                <li key={l.label}>
                  <a href={l.href} target="_blank" rel="noopener noreferrer" className="label hover:!text-accent transition-colors">{l.label} &#8599;</a>
                </li>
              ))}
            </ul>
          </Reveal>
          <Photo />
        </div>
      </section>

      <section id="projects" className="scroll-mt-20 pb-28">
        <Head n="01" title="Projects" aside={`${PROJECTS.length} projects`} />
        <Projects />
      </section>

      <section id="demos" className="scroll-mt-20 pb-28">
        <Head n="02" title="Demos" aside="real runs" />
        <Demos />
        <Reveal className="card p-5 sm:p-6 mt-6">
          <div className="mb-3 flex items-baseline justify-between gap-3">
            <p className="text-fg font-medium">verimcp console, replaying one real run</p>
            <p className="label">click any row</p>
          </div>
          <Console />
          <p className="text-sm text-mute mt-3 leading-relaxed">
            Five of these nine calls reported a success that never happened.
          </p>
        </Reveal>
      </section>

      <section id="internships" className="scroll-mt-20 pb-28">
        <Head n="03" title="Work" aside="3 internships" />
        <Experience />
      </section>

      <section id="journey" className="scroll-mt-20 pb-28">
        <Head n="04" title="Journey" />
        <Journey />
      </section>

      <section id="writing" className="scroll-mt-20 pb-28">
        <Head n="05" title="Blog" />
        <Writing />
      </section>

      <section id="life" className="scroll-mt-20 pb-20">
        <Head n="06" title="Off the clock" />
        <Life />
      </section>
    </>
  );
}
