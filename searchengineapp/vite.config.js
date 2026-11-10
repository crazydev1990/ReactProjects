
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      "/ddg-autocomplete": {
        target: "https://duckduckgo.com",
        changeOrigin: true,
        secure: true,
        rewrite: (path) =>
          path.replace(/^\/ddg-autocomplete/, "/ac"),
      },

      "/ddg-search": {
        target: "https://html.duckduckgo.com",
        changeOrigin: true,
        secure: true,
        rewrite: (path) =>
          path.replace(/^\/ddg-search/, "/html/"),
      },
    },
  },
});
