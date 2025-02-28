import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from 'path';

// Get repository name for GitHub Pages deployment
const repoName = "awesome-scalability-talks";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: `/${repoName}/`,
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: "dist",
    sourcemap: true,
    // Copy assets from public directory to output directory
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          router: ['react-router-dom']
        }
      }
    }
  },
  // Add this to ensure proper asset handling
  publicDir: 'public'
});
