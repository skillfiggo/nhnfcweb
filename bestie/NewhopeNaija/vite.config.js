import { defineConfig } from 'vite';

export default defineConfig({
  root: './',
  publicDir: 'public',
  server: {
    host: true,
    port: 5173,
    strictPort: true, // Fails if 5173 is taken, preventing silent port changes
    open: true
  },
  build: {
    outDir: 'dist',
  },
});
