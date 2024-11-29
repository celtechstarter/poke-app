import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Lokaler Port für die Entwicklung
  },
  build: {
    rollupOptions: {
      input: './index.html',
    },
  },
});
