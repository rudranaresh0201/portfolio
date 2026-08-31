import Console from './Console';
import Reveal from './Reveal';

const LINKS = [
  { label: 'github', href: 'https://github.com/rudranaresh0201' },
  { label: 'linkedin', href: 'https://linkedin.com/in/rudra-naresh-790751321' },
  { label: 'email', href: 'mailto:rudranaresh2018@gmail.com' },
];

export default function Hero() {
  return (
    <section className="pt-12 pb-16">
      <Reveal className="flex flex-col sm:flex-row sm:items-start gap-6 mb-8">
        <img
          src={`${import.meta.env.BASE_URL}profile.jpg`}
          alt="Rudra Naresh"
          className="w-32 h-32 sm:w-36 sm:h-36 rounded-xl object-cover border border-line shrink-0"
          style={{ objectPosition: '50% 18%' }}
        />
        <div className="min-w-0 sm:pt-1">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight leading-tight mb-1.5">
            Rudra Naresh
          </h1>
          <p className="font-mono text-2xs text-mute leading-relaxed">
            electronics + ai/ml minor · vjti mumbai · b.tech '28
          </p>
          <span className="rule mt-3" />
        </div>
      </Reveal>

      <Reveal delay={80}>
        <p className="text-dim leading-relaxed mb-4">
          Most of my week goes into exploring MCP and agent infrastructure, and an AI automation
          internship at <span className="text-fg">Elevar Sports</span>. Different ends of the same
          thing: one is the protocol layer agents talk over, the other is what happens when a real
          business depends on those pipes not quietly failing.
        </p>
        <p className="text-dim leading-relaxed mb-4">
          The problem I keep circling is that agents believe whatever a tool tells them. If a server
          says the commit landed, nothing anywhere checks that it did. It shows up in ops too: a
          courier API says the shipment booked, a sheet says the order synced, and the team finds out
          on Monday that neither one happened.
        </p>
        <p className="text-dim leading-relaxed mb-8">
          So I mostly build the checking layer, and then try hard to break it.
        </p>
      </Reveal>

      <Reveal delay={140}>
        <ul className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-12">
          {LINKS.map((l) => (
            <li key={l.label}>
              <a href={l.href} target="_blank" rel="noopener noreferrer" className="font-mono text-2xs link">
                {l.label}
              </a>
            </li>
          ))}
          <li className="font-mono text-2xs text-faint ml-auto">mumbai, india</li>
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
