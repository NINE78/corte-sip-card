import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      // The path to your main TypeScript file
      entry: 'src/corte-sip-card.ts',
      formats: ['es'], // Home Assistant uses ES Modules
      fileName: 'corte-sip-card',
    },
    rollupOptions: {
      // This prevents Vite from adding a hash to the filename (e.g., card-gh392.js)
      // so your Home Assistant resource path stays the same.
      output: {
        manualChunks: undefined,
      },
    },
  },
});
