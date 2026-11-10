import { useEffect, useRef } from 'react';
import Reveal from './Reveal';

const base = import.meta.env.BASE_URL;

/* Drop a photo at public/me/dosa.jpg and set this to 'me/dosa.jpg'. */
const FOOD_PHOTO = null;

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

export default function Life() {
  return (
    <div className="grid md:grid-cols-[1.55fr_1fr] gap-6">
      <Reveal as="figure">
        <div className="frame aspect-[16/10]"><Rally /></div>
        <figcaption className="mt-3">
          <p className="text-fg font-medium">Captain, VJTI table tennis team</p>
          <p className="text-mute text-[15px]">Connoisseur of good sports.</p>
        </figcaption>
      </Reveal>

      <div className="grid grid-cols-2 md:grid-cols-1 gap-6 content-start">
        <Reveal as="figure" delay={60}>
          <div className="frame aspect-[4/5] md:aspect-[5/4]">
            <img src={`${base}me/medal.jpg`} alt="Rudra with a medal and a certificate at Enthusia 2026" loading="lazy" className="w-full h-full object-cover object-[50%_22%]" />
          </div>
          <figcaption className="mt-3">
            <p className="text-fg font-medium">Enthusia 2026</p>
            <p className="text-mute text-[15px]">VJTI&apos;s annual sports fest.</p>
          </figcaption>
        </Reveal>

        <Reveal as="figure" delay={120}>
          {FOOD_PHOTO && (
            <div className="frame aspect-[4/5] md:aspect-[5/4] mb-3">
              <img src={`${base}${FOOD_PHOTO}`} alt="A dosa" loading="lazy" className="w-full h-full object-cover" />
            </div>
          )}
          <figcaption className={FOOD_PHOTO ? '' : 'rowline pt-4'}>
            <p className="text-fg font-medium">Love good food</p>
          </figcaption>
        </Reveal>
      </div>
    </div>
  );
}
