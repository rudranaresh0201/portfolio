/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Geist', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Bricolage Grotesque"', 'Geist', 'system-ui', 'sans-serif'],
        mono: ['"Geist Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        /* Neutral paper, near-black ink, one cobalt accent */
        base:  '#f6f6f3',
        panel: '#ffffff',
        raise: '#efefeb',
        sand:  '#e9e9e4',
        line:  'rgba(12,12,14,0.10)',
        line2: 'rgba(12,12,14,0.22)',
        fg:    '#0c0c0e',
        dim:   '#3b3b40',
        mute:  '#6c6c72',
        faint: '#9a9aa0',
        accent: '#1f3fff',
        accentdim: '#1730c9',
        ok:    '#15803d',
        bad:   '#b91c1c',
        warn:  '#b45309',
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem' }],
      },
      maxWidth: {
        page: '46rem',
        shell: '70rem',
        prose: '42rem',
      },
    },
  },
  plugins: [],
};
