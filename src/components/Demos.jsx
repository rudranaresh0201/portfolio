import { useEffect, useRef } from 'react';
import Reveal from './Reveal';

const DEMOS = [
  {
    id: 'so101',
    title: 'SO-101: a world model that gets cheated',
    src: 'demos/so101.mp4',
    poster: 'demos/so101.jpg',
    caption: 'SAC picks the box in MuJoCo. Then the world model (blue, left) beside reality (right): the policy trained in the model "lifts" a box it never touched. Last, the same idea after the fixes, picking for real.',
    project: 'so101',
  },
  {
    id: 'dreamdesk',
    title: 'DreamDesk: practising inside a model of an app',
    src: 'demos/dreamdesk.mp4',
    poster: 'demos/dreamdesk.jpg',
    caption: 'Random exploration of a real app in a sandbox, then a task it never saw: the map of memorised screens against the dream planner, and the results.',
    project: 'dreamdesk',
  },
  {
    id: 'computer-use',
    title: 'computer-use: one prompt, three apps',
    src: 'blog/computer-use/demo.mp4',
    poster: 'blog/computer-use/demo-poster.jpg',
    caption: 'Calculator, Notepad++ and Excalidraw driven end to end, with every step proved from the app itself.',
    project: 'computer-use',
  },
];

/* Muted clips play while on screen and pause when scrolled away, so the page
   never runs three videos at once. Controls stay available for sound/seek. */
function Clip({ src, poster, title }) {
  const ref = useRef(null);
  useEffect(() => {
    const v = ref.current;
    if (!v || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const obs = new IntersectionObserver(
      ([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()),
      { threshold: 0.5 }
    );
    obs.observe(v);
    return () => obs.disconnect();
  }, []);
  const base = import.meta.env.BASE_URL;
  return (
    <video
      ref={ref}
      src={`${base}${src}`}
      poster={`${base}${poster}`}
      muted
      loop
      playsInline
      controls
      preload="metadata"
      aria-label={title}
      className="w-full aspect-video object-cover bg-sand block border-b border-line"
    />
  );
}

export default function Demos() {
  return (
    <ul className="grid sm:grid-cols-2 gap-6">
      {DEMOS.map((d, i) => (
        <Reveal as="li" key={d.id} delay={i * 60} className={i === 0 ? 'sm:col-span-2' : ''}>
          <figure className="card overflow-hidden">
            <Clip {...d} />
            <figcaption className="p-5 sm:p-6">
              <p className="display text-2xl text-fg mb-2">{d.title}</p>
              <p className="text-dim text-[15px] leading-relaxed">{d.caption}</p>
            </figcaption>
          </figure>
        </Reveal>
      ))}
    </ul>
  );
}
