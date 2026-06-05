import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Change base to '/rudra-portfolio/' for GitHub Pages deployment
// For Vercel or custom domain, keep base as '/'
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          motion: ['framer-motion'],
        },
      },
    },
  },
});
