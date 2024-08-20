import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://fullstack-3xjz.onrender.com",
      },
    },
  },
  plugins: [react()],
});
