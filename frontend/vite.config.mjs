import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Port für den Entwicklungsserver
    proxy: {
      '/scan': {
        target: 'http://localhost:5000', // Backend-Server
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
