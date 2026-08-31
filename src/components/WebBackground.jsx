import { useEffect, useRef } from 'react';

/**
 * A web, not a starfield.
 *
 * Nodes sit on a jittered grid and are wired to their neighbours, so the mesh
 * is visible at rest instead of appearing only where dots happen to drift near
 * each other. The cursor is what makes it feel like a web: strands within reach
 * light up and the nodes give way slightly, as though something pressed into
 * it. Clicking throws strands and rings out from the point of contact.
 *
 * One canvas, one RAF loop. Under prefers-reduced-motion the mesh is painted
 * once, flat, and nothing listens.
 */

const SPACING = 94;    // grid pitch in px
const JITTER = 0.34;   // how far off-grid a node sits, as a fraction of pitch
const REACH = 190;     // cursor influence radius
const PUSH = 26;       // how far a node gives way, px
const BURST_MS = 900;
const STRANDS = 9;
const RINGS = [26, 54, 86];

const ACCENT = '103, 232, 249';
const PLAIN = '255, 255, 255';

const REST_EDGE = 0.05;   // the web at rest
const LIT_EDGE = 0.5;    // the web under the cursor

const easeOut = (p) => 1 - Math.pow(1 - p, 3);

export default function WebBackground() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const still = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    let w = 0, h = 0, cols = 0, rows = 0;
    let nodes = [];       // flat grid, index = r * cols + c
    let bursts = [];
    let raf = 0;
    const mouse = { x: -9999, y: -9999 };

    const at = (c, r) => nodes[r * cols + c];

    function build() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cols = Math.ceil(w / SPACING) + 2;
      rows = Math.ceil(h / SPACING) + 2;
      nodes = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const bx = (c - 0.5) * SPACING + (Math.random() - 0.5) * SPACING * JITTER * 2;
          const by = (r - 0.5) * SPACING + (Math.random() - 0.5) * SPACING * JITTER * 2;
          nodes.push({
            bx, by, x: bx, y: by,
            phase: Math.random() * Math.PI * 2,   // for the idle sway
            lit: 0,
          });
        }
      }
    }

    function settle(t) {
      for (const n of nodes) {
        // a slow breath so the web is never completely dead
        const sway = still ? 0 : 2.4;
        const ox = Math.cos(t * 0.00022 + n.phase) * sway;
        const oy = Math.sin(t * 0.00019 + n.phase * 1.3) * sway;

        let dx = n.bx + ox - mouse.x;
        let dy = n.by + oy - mouse.y;
        const d = Math.hypot(dx, dy);

        if (d < REACH && d > 0.001) {
          const k = 1 - d / REACH;          // 1 at the cursor, 0 at the edge
          n.lit = k;
          const give = PUSH * k * k;         // the web gives way where it is touched
          n.x = n.bx + ox + (dx / d) * give;
          n.y = n.by + oy + (dy / d) * give;
        } else {
          n.lit = 0;
          n.x = n.bx + ox;
          n.y = n.by + oy;
        }
      }
    }

    function strand(a, b) {
      // an edge is lit by whichever end the cursor is nearer
      const lit = Math.max(a.lit, b.lit);
      const alpha = REST_EDGE + (LIT_EDGE - REST_EDGE) * lit * lit;
      ctx.strokeStyle = lit > 0.02
        ? `rgba(${ACCENT}, ${alpha})`
        : `rgba(${PLAIN}, ${REST_EDGE})`;
      ctx.lineWidth = lit > 0.5 ? 1.15 : 1;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }

    function drawMesh() {
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const n = at(c, r);
          if (c + 1 < cols) strand(n, at(c + 1, r));          // across
          if (r + 1 < rows) strand(n, at(c, r + 1));          // down
          if (c + 1 < cols && r + 1 < rows) strand(n, at(c + 1, r + 1)); // the diagonal that makes it a web
        }
      }
      for (const n of nodes) {
        if (n.lit <= 0.02) continue;                          // only knots near the cursor read as dots
        ctx.fillStyle = `rgba(${ACCENT}, ${0.5 * n.lit})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1 + 1.6 * n.lit, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function drawBursts(now) {
      bursts = bursts.filter((b) => now - b.t0 < BURST_MS);
      for (const b of bursts) {
        const p = (now - b.t0) / BURST_MS;
        const e = easeOut(p);
        const fade = 1 - p;

        ctx.lineCap = 'round';
        for (const s of b.strands) {
          ctx.strokeStyle = `rgba(${ACCENT}, ${0.55 * fade})`;
          ctx.lineWidth = 1.3;
          ctx.beginPath();
          ctx.moveTo(b.x, b.y);
          ctx.lineTo(b.x + Math.cos(s.a) * s.len * e, b.y + Math.sin(s.a) * s.len * e);
          ctx.stroke();
        }

        ctx.setLineDash([2, 5]);
        RINGS.forEach((rad, i) => {
          const rp = Math.max(0, Math.min(1, (p - i * 0.06) / 0.78));
          if (rp <= 0) return;
          ctx.strokeStyle = `rgba(${ACCENT}, ${0.4 * (1 - rp)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(b.x, b.y, rad * easeOut(rp), 0, Math.PI * 2);
          ctx.stroke();
        });
        ctx.setLineDash([]);

        const spark = 1 - Math.min(1, p / 0.45);
        ctx.fillStyle = `rgba(${ACCENT}, ${0.85 * spark})`;
        ctx.beginPath();
        ctx.arc(b.x, b.y, 5 * spark, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function frame(now) {
      ctx.clearRect(0, 0, w, h);
      settle(now);
      drawMesh();
      drawBursts(now);
      raf = requestAnimationFrame(frame);
    }

    const onMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };
    const onDown = (e) => {
      bursts.push({
        x: e.clientX, y: e.clientY, t0: performance.now(),
        strands: Array.from({ length: STRANDS }, (_, i) => ({
          a: (i / STRANDS) * Math.PI * 2 + Math.random() * 0.35,
          len: 58 + Math.random() * 44,
        })),
      });
    };
    const onResize = () => { build(); if (still) { ctx.clearRect(0, 0, w, h); settle(0); drawMesh(); } };

    build();

    if (still) {
      settle(0);
      drawMesh();
    } else {
      raf = requestAnimationFrame(frame);
      window.addEventListener('pointermove', onMove, { passive: true });
      window.addEventListener('pointerdown', onDown, { passive: true });
      document.addEventListener('pointerleave', onLeave);
    }
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      document.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="fixed inset-0 z-0 pointer-events-none" />;
}
