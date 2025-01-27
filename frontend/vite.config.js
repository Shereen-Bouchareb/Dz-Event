import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // vite.config.js
  server: {
    host: true, // This makes the server accessible from outside Docker container
    port: 5173, // Or any other port you wish
  },
});
