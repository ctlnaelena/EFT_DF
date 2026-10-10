import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: './' permite publicar en GitHub Pages sin depender del nombre del repositorio
export default defineConfig({
  plugins: [react()],
  base: './',
  test: {
    environment: 'node',
  },
});
