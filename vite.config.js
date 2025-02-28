import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// Get repository name for GitHub Pages deployment
const repoName = "awesome-scalability-talks";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: `/${repoName}/`,
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  server: {
    port: 3000,
    host: "0.0.0.0",
    open: true,
  },
  build: {
    outDir: "dist",
    sourcemap: true,
    // Support both .jsx and .tsx files
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
      },
      output: {
        manualChunks: undefined,
      },
    },
    // Ensure assets are properly referenced
    assetsInlineLimit: 4096,
    // Copy files from public directory to dist
    copyPublicDir: true,
  },
});
