import { useEffect, useRef } from 'react';
import Reveal from './Reveal';

const base = import.meta.env.BASE_URL;

/* Muted clip that plays only while it is on screen. */
function Clip({ name, label, pos = '50% 50%' }) {
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
      src={`${base}me/${name}.mp4`}
      poster={`${base}me/${name}.jpg`}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={label}
      className="w-full h-full object-cover block"
      style={{ objectPosition: pos }}
    />
  );
}

const FOOD = [
  { src: 'me/dosa-1.jpg', alt: 'Three cone dosas on a table' },
  { src: 'me/food-kulcha.jpg', alt: 'A stuffed kulcha with chole and onions' },
  { src: 'me/dosa-2.jpg', alt: 'Dosas and chutneys' },
  { src: 'me/food-bhature.jpg', alt: 'Chole bhature and a kulcha plate' },
  { src: 'me/dosa-3.jpg', alt: 'A dosa on a leaf plate' },
  { src: 'me/food-paneer.jpg', alt: 'Chilli paneer' },
];

function Cap({ title, sub }) {
  return (
    <figcaption className="mt-3">
      <p className="text-fg font-medium">{title}</p>
      {sub && <p className="text-mute text-[15px]">{sub}</p>}
    </figcaption>
  );
}

export default function Life() {
  return (
    <div className="space-y-14">
      <div className="grid md:grid-cols-[1.55fr_1fr] gap-x-6 gap-y-10">
        <Reveal as="figure">
          <div className="frame aspect-[16/10]"><Clip name="tt" label="A table tennis rally" /></div>
          <Cap title="Captain, VJTI table tennis team" sub="Connoisseur of good sports." />
        </Reveal>
        <Reveal as="figure" delay={60}>
          <div className="frame aspect-[4/5] md:aspect-[1/0.955]">
            <img src={`${base}me/medal.jpg`} alt="Rudra with a gold medal and a certificate at Enthusia 2026" loading="lazy" className="w-full h-full object-cover object-[50%_22%]" />
          </div>
          <Cap title="Enthusia 2026, table tennis gold" sub="VJTI's annual sports fest." />
        </Reveal>
        <Reveal as="figure">
          <div className="frame aspect-[16/10]"><Clip name="tt-match" label="A table tennis match" /></div>
          <Cap title="Match day" />
        </Reveal>
        <Reveal as="figure" delay={60}>
          <div className="frame aspect-[4/5] md:aspect-[1/0.955]"><Clip name="cricket" label="Bowling in a park" pos="70% 50%" /></div>
          <Cap title="Some cricket too" />
        </Reveal>
      </div>

      <Reveal>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-6">
          {FOOD.map((d) => (
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
