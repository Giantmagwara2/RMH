// Updated vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 5000,
    hmr: {
      clientPort: 443,
      host: "0.0.0.0",
      protocol: "wss",
    },
    allowedHosts: [
      "localhost",
      "127.0.0.1",
      // Update any project-specific hosts
    ],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    sourcemap: true,
    // Using ESbuild (Vite's default) for minification is significantly faster
    // than Terser and usually provides comparable bundle sizes.
    // minify: "terser", // Keep if Terser's specific features or slightly smaller output are critical
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "ui-vendor": ["framer-motion", "@fortawesome/react-fontawesome"],
        },
      },
    },
  },
});
