/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        serif: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
      },
      colors: {
        paper: '#f6f1e7',
        ink: {
          900: '#18140f',
          700: '#332c22',
          500: '#6b6255',
          300: '#a89e8d',
        },
        coral: {
          400: '#ff7a52',
          500: '#e8542e',
          600: '#c23c1b',
        },
        teal: {
          400: '#2f9e86',
          500: '#1f7d68',
          600: '#155f4d',
        },
        gold: {
          400: '#e0a52c',
          500: '#c1861a',
          600: '#996a11',
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out infinite 2s',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'blink': 'blink 1s step-end infinite',
        'marquee': 'marquee 26s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
