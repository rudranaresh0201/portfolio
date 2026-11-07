/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        /* Paper: warm off-white page, white-ish cards, ink text */
        base:  '#f4f0e8',
        panel: '#fffdf8',
        raise: '#f9f5ed',
        sand:  '#efe8da',
        line:  'rgba(28,26,23,0.11)',
        line2: 'rgba(28,26,23,0.22)',
        fg:    '#1c1a17',
        dim:   '#4a453d',
        mute:  '#6b6559',
        faint: '#9a9283',
        /* one accent, burnt orange, for links, emphasis and hover */
        accent: '#c2410c',
        accentdim: '#9a3412',
        /* verified / disproven / honest-error, darkened to read on paper */
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
