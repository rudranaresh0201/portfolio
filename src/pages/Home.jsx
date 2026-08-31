import { Link } from 'react-router-dom';
import Console from '../components/Console';
import Receipts from '../components/Receipts';
import About from '../components/About';
import Reveal from '../components/Reveal';

const LINKS = [
  { label: 'github', href: 'https://github.com/rudranaresh0201' },
  { label: 'linkedin', href: 'https://linkedin.com/in/rudra-naresh-790751321' },
  { label: 'email', href: 'mailto:rudranaresh2018@gmail.com' },
];

const NEXT = [
  { to: '/work', label: 'work', blurb: 'Three internships, the first still going.' },
  { to: '/projects', label: 'projects', blurb: 'Five builds, with the gaps named.' },
  { to: '/writing', label: 'writing', blurb: 'Long form, when it earns the space.' },
];

export default function Home() {
  return (
    <>
      <section className="pt-14 pb-14">
        <Reveal className="flex flex-col items-center text-center mb-9">
          <div className="relative mb-6">
            <div
              className="absolute -inset-3 rounded-full blur-2xl opacity-40"
              style={{ background: 'radial-gradient(circle, rgba(63,185,80,0.28), transparent 70%)' }}
              aria-hidden="true"
            />
            <img
              src={`${import.meta.env.BASE_URL}portrait.jpg`}
              alt="Rudra Naresh"
              width={224}
              height={224}
              className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full object-cover
                         ring-1 ring-white/15 shadow-2xl shadow-black/60"
            />
          </div>

          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight leading-tight mb-2">
            Rudra Naresh
          </h1>
          <p className="font-mono text-2xs text-mute leading-relaxed">
            electronics + ai/ml minor · vjti mumbai · b.tech '28
          </p>
          <span className="rule mt-4 mx-auto" />
        </Reveal>

        <Reveal delay={80}>
          <p className="text-dim leading-relaxed mb-4">
            Most of my week goes into <span className="text-accent">agents, MCP and automation</span>.
            I like the layer underneath the model, the protocols and plumbing and the unglamorous work
            of making all of it hold up once something real depends on it.
          </p>
          <p className="text-dim leading-relaxed mb-8">
            Mostly I tinker. Lately that means agentic systems and the protocol layer they talk over:
            retrieval that admits when it has nothing, tool calls that get checked instead of taken on
            trust, pipelines that survive contact with an actual user. I build a thing, then spend
            about as long trying to break it, because that is usually the part that tells you whether
            you built something that works or something that only looks like it does.
          </p>
        </Reveal>

        <Reveal delay={140}>
          <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 mb-12">
            {LINKS.map((l) => (
              <li key={l.label}>
                <a href={l.href} target="_blank" rel="noopener noreferrer" className="font-mono text-2xs link">
                  {l.label}
                </a>
              </li>
            ))}
            <li className="font-mono text-2xs text-faint">mumbai, india</li>
          </ul>
        </Reveal>

        <Reveal delay={60}>
          <div className="mb-2 flex items-baseline justify-between gap-3">
            <p className="label">verimcp console, replaying one real run</p>
            <p className="font-mono text-2xs text-faint">click any row</p>
          </div>
          <Console />
          <p className="font-mono text-2xs text-faint mt-2.5 leading-relaxed">
            Five of these nine calls reported a success that never happened. The pause on each row is
            the proxy going and checking rather than taking the answer on trust.
          </p>
        </Reveal>
      </section>

      <Receipts />

      <About />

      {/* the page ends by handing you somewhere to go, since the rest is behind the nav */}
      <Reveal as="nav" className="py-14 border-t border-line" aria-label="Rest of the site">
        <p className="label mb-4">elsewhere on this site</p>
        <ul className="grid sm:grid-cols-3 gap-px bg-line border border-line rounded-md overflow-hidden">
          {NEXT.map((n) => (
            <li key={n.to} className="bg-panel">
              <Link
                to={n.to}
                className="block px-4 py-4 h-full group hover:bg-raise transition-colors"
              >
                <span className="font-mono text-2xs text-accent inline-flex items-center gap-1.5">
                  {n.label}
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5">&#8594;</span>
                </span>
                <p className="text-sm text-dim leading-snug mt-1.5">{n.blurb}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Reveal>
    </>
  );
}
