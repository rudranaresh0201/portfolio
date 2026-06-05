import { useState, useEffect, useRef } from 'react';

/**
 * Typewriter effect hook — cycles through an array of words with
 * character-by-character typing and deletion.
 *
 * @param {string[]} words - Array of strings to cycle through
 * @param {object}   opts
 * @param {number}   opts.speed       - Typing speed in ms per character (default 80)
 * @param {number}   opts.deleteSpeed - Deletion speed in ms per character (default 40)
 * @param {number}   opts.pauseDelay  - Pause at full word before deleting (default 2000)
 */
export function useTypewriter(words, { speed = 80, deleteSpeed = 40, pauseDelay = 2000 } = {}) {
  const [displayText, setDisplayText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const pauseRef = useRef(false);

  useEffect(() => {
    if (!words.length) return;
    const currentWord = words[wordIndex % words.length];

    // Finished typing the full word — pause before deleting
    if (!isDeleting && charIndex === currentWord.length) {
      if (pauseRef.current) return;
      pauseRef.current = true;
      const pause = setTimeout(() => {
        setIsDeleting(true);
        pauseRef.current = false;
      }, pauseDelay);
      return () => clearTimeout(pause);
    }

    // Finished deleting — move to next word
    if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const delay = isDeleting ? deleteSpeed : speed;
    const t = setTimeout(() => {
      const next = charIndex + (isDeleting ? -1 : 1);
      setCharIndex(next);
      setDisplayText(currentWord.substring(0, next));
    }, delay);

    return () => clearTimeout(t);
  }, [charIndex, isDeleting, wordIndex, words, speed, deleteSpeed, pauseDelay]);

  return displayText;
}
