import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Relative, so the same build works from a subpath and from a domain root.
  // GitHub Pages serves this at /portfolio/ and Vercel serves it at /, and an
  // absolute base is correct for exactly one of those and 404s on the other.
  base: './',
})
