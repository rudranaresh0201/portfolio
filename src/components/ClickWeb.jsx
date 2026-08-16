import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const COLORS = ['#e8542e', '#1f7d68', '#c1861a', '#c2528f'];
const LINE_COUNT = 9;
const RINGS = [26, 52, 84];

function Burst({ x, y, color }) {
  const lines = Array.from({ length: LINE_COUNT }, (_, i) => {
    const angle = (i / LINE_COUNT) * Math.PI * 2 + Math.random() * 0.3;
    const len = 60 + Math.random() * 40;
    return { x2: 100 + Math.cos(angle) * len, y2: 100 + Math.sin(angle) * len };
  });

  return (
    <motion.svg
      width="200" height="200" viewBox="0 0 200 200"
      className="absolute"
      style={{ left: x - 100, top: y - 100, overflow: 'visible' }}
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.85, ease: 'easeOut' }}
    >
      {/* web threads radiating outward */}
      {lines.map((l, i) => (
        <motion.line
          key={i}
          x1={100} y1={100}
          initial={{ x2: 100, y2: 100 }}
          animate={{ x2: l.x2, y2: l.y2 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.008 }}
          stroke={color}
          strokeWidth={1.3}
          strokeLinecap="round"
          opacity={0.55}
        />
      ))}
      {/* concentric web rings */}
      {RINGS.map((r, i) => (
        <motion.circle
          key={r}
          cx={100} cy={100}
          initial={{ r: 0, opacity: 0.5 }}
          animate={{ r, opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: i * 0.05 }}
          fill="none"
          stroke={color}
          strokeWidth={1}
          strokeDasharray="2 5"
        />
      ))}
      {/* center spark */}
      <motion.circle
        cx={100} cy={100}
        initial={{ r: 5, opacity: 0.9 }}
        animate={{ r: 0, opacity: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        fill={color}
      />
    </motion.svg>
  );
}

export default function ClickWeb() {
  const [bursts, setBursts] = useState([]);
  const idRef = useRef(0);

  const handleClick = useCallback((e) => {
    const id = idRef.current++;
    const color = COLORS[id % COLORS.length];
    setBursts((prev) => [...prev, { id, x: e.clientX, y: e.clientY, color }]);
    setTimeout(() => {
      setBursts((prev) => prev.filter((b) => b.id !== id));
    }, 900);
  }, []);

  useEffect(() => {
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [handleClick]);

  return (
    <div className="fixed inset-0 z-[65] pointer-events-none overflow-hidden">
      <AnimatePresence>
        {bursts.map((b) => <Burst key={b.id} x={b.x} y={b.y} color={b.color} />)}
      </AnimatePresence>
    </div>
  );
}
