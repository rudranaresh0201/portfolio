import { useEffect, useRef } from 'react';
import Reveal from './Reveal';

const base = import.meta.env.BASE_URL;

function Rally() {
  const ref = useRef(null);
  useEffect(() => {
    const v = ref.current;
    if (!v || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const obs = new IntersectionObserver(
      ([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()),
      { threshold: 0.4 }
    );
    obs.observe(v);
    return () => obs.disconnect();
  }, []);
  return (
    <video
      ref={ref}
      src={`${base}me/tt.mp4`}
      poster={`${base}me/tt.jpg`}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label="A table tennis rally"
      className="w-full h-full object-cover block"
    />
  );
}

const DOSAS = [
  { src: 'me/dosa-1.jpg', alt: 'Three cone dosas on a table' },
  { src: 'me/dosa-2.jpg', alt: 'Dosas and chutneys' },
  { src: 'me/dosa-3.jpg', alt: 'A dosa on a leaf plate' },
];

export default function Life() {
  return (
    <div className="space-y-14">
      <div className="grid md:grid-cols-[1.55fr_1fr] gap-6">
        <Reveal as="figure">
          <div className="frame aspect-[16/10]"><Rally /></div>
          <figcaption className="mt-3">
            <p className="text-fg font-medium">Captain, VJTI table tennis team</p>
            <p className="text-mute text-[15px]">Connoisseur of good sports.</p>
          </figcaption>
        </Reveal>
        <Reveal as="figure" delay={60}>
          <div className="frame aspect-[4/5] md:aspect-[1/0.955]">
            <img src={`${base}me/medal.jpg`} alt="Rudra with a gold medal and a certificate at Enthusia 2026" loading="lazy" className="w-full h-full object-cover object-[50%_22%]" />
          </div>
          <figcaption className="mt-3">
            <p className="text-fg font-medium">Enthusia 2026, table tennis gold</p>
            <p className="text-mute text-[15px]">VJTI&apos;s annual sports fest.</p>
          </figcaption>
        </Reveal>
      </div>

      <Reveal>
        <div className="grid grid-cols-3 gap-3 sm:gap-6">
          {DOSAS.map((d) => (
            <div key={d.src} className="frame aspect-[4/3]">
              <img src={`${base}${d.src}`} alt={d.alt} loading="lazy" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
        <div className="mt-3">
          <p className="text-fg font-medium">Love good food</p>
          <p className="text-mute text-[15px]">In my free time I like to explore and eat.</p>
        </div>
      </Reveal>
    </div>
  );
}
