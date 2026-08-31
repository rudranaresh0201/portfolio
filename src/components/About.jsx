import Reveal from './Reveal';

const CERTS = [
  {
    title: 'Introduction to Model Context Protocol',
    issuer: 'Anthropic',
    href: 'https://verify.skilljar.com/c/gg3nm2kasyoy',
  },
  {
    title: 'Accelerating End-to-End Data Science Workflows',
    issuer: 'NVIDIA',
    href: 'https://learn.nvidia.com/certificates?id=vl38RuWHSouN5HTav1-LwA',
  },
];

const ELSEWHERE = [
  'Captain of the VJTI table tennis team, and we took the Enthusia title.',
  'Won Vivekotsav, a citywide elocution competition.',
  'State champion at Abacus, which is where the habit of checking my own arithmetic started.',
  'Piano, table tennis, and a reading list that swings between fiction and papers.',
];

export default function About() {
  return (
    <section className="py-14 border-t border-line">
      <Reveal>
        <h2 className="label mb-1">about</h2>
        <p className="text-mute text-sm mb-1">The parts that do not fit anywhere else.</p>
        <span className="rule mb-5" />
      </Reveal>

      <p className="text-dim leading-relaxed mb-4">
        I am a B.Tech electronics student at VJTI Mumbai with an AI and ML minor, CGPA 8.26, graduating
        in 2028. I came into this from the retrieval side and stayed for the infrastructure underneath
        it: agents, MCP, automation, and the unglamorous work of making those hold up outside a demo.
      </p>
      <p className="text-dim leading-relaxed mb-8">
        I like problems where you can be proven wrong. A benchmark that prints a number I do not like,
        a dataset that turns out to be a third garbage, a workflow that fails on a real order at 2am.
        Those are the ones worth writing down.
      </p>

      <h3 className="label mb-3">certifications</h3>
      <ul className="border border-line rounded-md divide-y divide-line bg-panel mb-8">
        {CERTS.map((c) => (
          <li key={c.title} className="flex items-baseline justify-between gap-4 px-3 py-2.5">
            <a href={c.href} target="_blank" rel="noopener noreferrer" className="text-sm link leading-snug">
              {c.title}
            </a>
            <span className="font-mono text-2xs text-mute shrink-0">{c.issuer}</span>
          </li>
        ))}
      </ul>

      <h3 className="label mb-3">elsewhere</h3>
      <ul className="space-y-1.5">
        {ELSEWHERE.map((e) => (
          <li key={e} className="text-dim text-sm leading-relaxed pl-4 border-l border-line">{e}</li>
        ))}
      </ul>
    </section>
  );
}
