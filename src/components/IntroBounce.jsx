import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function TennisBall() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" xmlns="http://www.w3.org/2000/svg">
      <circle cx="17" cy="17" r="16" fill="#e8542e" />
      <path d="M2 12c6 4 6 12 0 18" stroke="#fff8ef" strokeWidth="1.6" fill="none" opacity="0.85" />
      <path d="M32 12c-6 4 -6 12 0 18" stroke="#fff8ef" strokeWidth="1.6" fill="none" opacity="0.85" />
      <circle cx="17" cy="17" r="16" fill="none" stroke="rgba(24,20,15,0.15)" strokeWidth="1" />
    </svg>
  );
}

const bounceY = [-560, 0, -230, 0, -95, 0, -35, 0, -10, 0];
const bounceScaleY = [1, 0.55, 1, 0.7, 1, 0.82, 1, 0.9, 1, 1];
const bounceScaleX = [1, 1.3, 1, 1.18, 1, 1.1, 1, 1.06, 1, 1];
const bounceTimes = [0, 0.28, 0.34, 0.5, 0.55, 0.66, 0.7, 0.78, 0.81, 0.86];
const bounceEase = ['circIn', 'circOut', 'circIn', 'circOut', 'circIn', 'circOut', 'circIn', 'circOut', 'circIn', 'circOut'];

/* One-shot bounce-in on page load — settles, then fades. Not a persistent element. */
export default function IntroBounce() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 2500);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          aria-hidden="true"
          className="fixed bottom-10 right-6 sm:bottom-14 sm:right-14 z-40 pointer-events-none"
          style={{ transformOrigin: 'bottom center' }}
          initial={{ y: bounceY[0], opacity: 1 }}
          animate={{ y: bounceY, scaleY: bounceScaleY, scaleX: bounceScaleX }}
          exit={{ opacity: 0, y: 8, transition: { duration: 0.6 } }}
          transition={{ duration: 2.1, times: bounceTimes, ease: bounceEase }}
        >
          <TennisBall />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
