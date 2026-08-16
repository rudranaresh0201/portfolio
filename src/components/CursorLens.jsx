import { useEffect, useRef } from 'react';

/**
 * A soft blurred circle that trails the cursor with slight lag —
 * a subtle "magnifying glass on parchment" touch. Desktop-only, decorative.
 */
export default function CursorLens() {
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const el = ref.current;
    if (!el) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;
    let raf;

    const onMove = (e) => { tx = e.clientX; ty = e.clientY; };
    window.addEventListener('mousemove', onMove);

    const loop = () => {
      x += (tx - x) * 0.14;
      y += (ty - y) * 0.14;
      el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="fixed left-0 top-0 w-24 h-24 rounded-full pointer-events-none z-[70] hidden md:block"
      style={{
        backdropFilter: 'blur(3px) saturate(1.35)',
        WebkitBackdropFilter: 'blur(3px) saturate(1.35)',
        maskImage: 'radial-gradient(closest-side, #000 38%, rgba(0,0,0,0.5) 64%, transparent)',
        WebkitMaskImage: 'radial-gradient(closest-side, #000 38%, rgba(0,0,0,0.5) 64%, transparent)',
        boxShadow: 'inset 0 0 0 1px rgba(24,20,15,0.06)',
        willChange: 'transform',
      }}
    />
  );
}
