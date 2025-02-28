import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Get repository name for GitHub Pages deployment
const repoName = "awesome-scalability-talks";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Always use the repo name in the base path for GitHub Pages
  base: `/${repoName}/`,
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: "dist",
    sourcemap: true,
  },
});
