import { useEffect, useRef } from 'react';

/**
 * One canvas doing two jobs, so there is a single RAF loop on the page:
 *
 *  1. a slow drifting constellation, where nodes closer than LINK_DIST get a
 *     thread between them and the cursor pulls threads toward itself
 *  2. a burst on click, throwing web strands and dashed rings out from the
 *     point you hit
 *
 * Everything is drawn at low alpha and sits behind the content. Under
 * prefers-reduced-motion the nodes are painted once and never move, and
 * clicking does nothing.
 */

const LINK_DIST = 132;
const MOUSE_DIST = 172;
const BURST_MS = 900;
const STRANDS = 9;
const RINGS = [26, 52, 84];

const ACCENT = '103, 232, 249'; // cyan, matches --accent in the CSS
const PLAIN = '255, 255, 255';

const easeOut = (p) => 1 - Math.pow(1 - p, 3);

export default function WebBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const still = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let nodes = [];
    let bursts = [];
    const mouse = { x: -9999, y: -9999 };
    let raf = 0;

    function size() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // density scales with area, but stays cheap on big screens
      const count = Math.min(72, Math.max(26, Math.round((w * h) / 26000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16,
        r: Math.random() * 1.1 + 0.5,
      }));
    }

    function drawWeb() {
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];

        if (!still) {
          a.x += a.vx;
          a.y += a.vy;
          if (a.x < 0 || a.x > w) a.vx *= -1;
          if (a.y < 0 || a.y > h) a.vy *= -1;
        }

        // threads between neighbours
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < LINK_DIST) {
            ctx.strokeStyle = `rgba(${PLAIN}, ${0.055 * (1 - d / LINK_DIST)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }

        // a thread to the cursor when it comes close
        const md = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (md < MOUSE_DIST) {
          const k = 1 - md / MOUSE_DIST;
          ctx.strokeStyle = `rgba(${ACCENT}, ${0.22 * k})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }

        ctx.fillStyle = `rgba(${PLAIN}, ${md < MOUSE_DIST ? 0.4 : 0.2})`;
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function drawBursts(now) {
      bursts = bursts.filter((b) => now - b.t0 < BURST_MS);
      for (const b of bursts) {
        const p = (now - b.t0) / BURST_MS;
        const e = easeOut(p);
        const fade = 1 - p;

        // web strands thrown outward
        ctx.lineCap = 'round';
        for (const s of b.strands) {
          ctx.strokeStyle = `rgba(${ACCENT}, ${0.55 * fade})`;
          ctx.lineWidth = 1.3;
          ctx.beginPath();
          ctx.moveTo(b.x, b.y);
          ctx.lineTo(b.x + Math.cos(s.a) * s.len * e, b.y + Math.sin(s.a) * s.len * e);
          ctx.stroke();
        }

        // dashed rings, the way a web is spun
        ctx.setLineDash([2, 5]);
        RINGS.forEach((r, i) => {
          const rp = Math.max(0, Math.min(1, (p - i * 0.06) / 0.78));
          if (rp <= 0) return;
          ctx.strokeStyle = `rgba(${ACCENT}, ${0.4 * (1 - rp)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(b.x, b.y, r * easeOut(rp), 0, Math.PI * 2);
          ctx.stroke();
        });
        ctx.setLineDash([]);

        // the spark at the point of contact
        ctx.fillStyle = `rgba(${ACCENT}, ${0.85 * (1 - Math.min(1, p / 0.45))})`;
        ctx.beginPath();
        ctx.arc(b.x, b.y, 5 * (1 - Math.min(1, p / 0.45)), 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function frame(now) {
      ctx.clearRect(0, 0, w, h);
      drawWeb();
      drawBursts(now);
      raf = requestAnimationFrame(frame);
    }

    function onMove(e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }
    function onLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
    }
    function onClick(e) {
      if (still) return;
      bursts.push({
        x: e.clientX,
        y: e.clientY,
        t0: performance.now(),
        strands: Array.from({ length: STRANDS }, (_, i) => ({
          a: (i / STRANDS) * Math.PI * 2 + Math.random() * 0.35,
          len: 58 + Math.random() * 44,
        })),
      });
    }

    size();

    if (still) {
      // paint once, then stop
      ctx.clearRect(0, 0, w, h);
      drawWeb();
    } else {
      raf = requestAnimationFrame(frame);
      window.addEventListener('pointermove', onMove, { passive: true });
      window.addEventListener('pointerdown', onClick, { passive: true });
      document.addEventListener('pointerleave', onLeave);
    }
    window.addEventListener('resize', size);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onClick);
      document.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('resize', size);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
}
