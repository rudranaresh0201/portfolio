import Console from './Console';
import Reveal from './Reveal';

const LINKS = [
  { label: 'github', href: 'https://github.com/rudranaresh0201' },
  { label: 'linkedin', href: 'https://linkedin.com/in/rudra-naresh-790751321' },
  { label: 'email', href: 'mailto:rudranaresh2018@gmail.com' },
];

export default function Hero() {
  return (
    <section className="pt-14 pb-16">
      <Reveal className="flex flex-col items-center text-center mb-9">
        <div className="relative mb-6">
          {/* a soft accent halo so the portrait separates from the dark page */}
          <div
            className="absolute -inset-3 rounded-full blur-2xl opacity-40"
            style={{ background: 'radial-gradient(circle, rgba(103,232,249,0.30), transparent 70%)' }}
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
          Most of my week goes into <span className="text-accent">MCP and agent infrastructure</span>,
          and an AI automation internship at <span className="text-fg">Elevar Sports</span>. Two ends
          of the same interest: the protocol layer agents talk over, and what it takes to keep real
          systems running on top of it.
        </p>
        <p className="text-dim leading-relaxed mb-8">
          I like the layer underneath the model, and I tend to build something and then spend just as
          long trying to break it, because that is usually the part that tells you what you actually
          made.
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
  );
}
