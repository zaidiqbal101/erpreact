// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Put all node_modules in separate vendor chunk
            return 'vendor';
          }
        }
      }
    },
    chunkSizeWarningLimit: 1500, // optional: increase limit to 1.5 MB
  }
});
