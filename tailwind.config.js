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
        /* surfaces */
        base:  '#0b0b0c',
        panel: '#0f0f11',
        raise: '#141417',
        line:  'rgba(255,255,255,0.09)',
        line2: 'rgba(255,255,255,0.16)',
        /* type */
        fg:    '#ededec',
        dim:   '#9b9b97',
        mute:  '#6a6a67',
        faint: '#4a4a48',
        /* semantic only — these mean verified / disproven, never decoration */
        ok:    '#4ade80',
        bad:   '#f87171',
        warn:  '#e3b341',
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
