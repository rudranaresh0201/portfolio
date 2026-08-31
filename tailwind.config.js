/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        /* surfaces: true black, with panels lifted just enough to separate */
        base:  '#000000',
        panel: '#0a0c0a',
        raise: '#111411',
        line:  'rgba(255,255,255,0.10)',
        line2: 'rgba(255,255,255,0.18)',
        /* type */
        fg:    '#e9efe9',
        dim:   '#a8b2a8',
        mute:  '#758075',
        faint: '#4c554c',
        /* Accent and "verified" are the same green on purpose: the site is
           about things being checked, so the brand colour is the pass state. */
        accent: '#3fb950',
        accentdim: '#238636',
        ok:    '#3fb950',
        bad:   '#f85149',
        warn:  '#d29922',
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem' }],
      },
      maxWidth: {
        page: '46rem',
      },
    },
  },
  plugins: [],
};
