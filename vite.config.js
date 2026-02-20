import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  base: "/instagram-site/",
  server: {
    host: true,
    port: 5173,
  },
  appType: "mpa",
  root: resolve(__dirname, "src/pages"),

  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@js": resolve(__dirname, "src/js"),
      "/js": resolve(__dirname, "src/js"),
      "/styles": resolve(__dirname, "src/styles"),
    },
  },

  publicDir: resolve(__dirname, "public"),

  build: {
    outDir: resolve(__dirname, "dist"),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/pages/index.html"), // 루트 진입점
        en: resolve(__dirname, "src/pages/en/index.html"),
        en_about: resolve(__dirname, "src/pages/en/about.html"),
        en_contact: resolve(__dirname, "src/pages/en/contact.html"),
        en_portfolio: resolve(__dirname, "src/pages/en/portfolio.html"),
        en_thanks: resolve(__dirname, "src/pages/en/thanks.html"),
        ko: resolve(__dirname, "src/pages/ko/index.html"),
        ko_about: resolve(__dirname, "src/pages/ko/about.html"),
        ko_contact: resolve(__dirname, "src/pages/ko/contact.html"),
        ko_portfolio: resolve(__dirname, "src/pages/ko/portfolio.html"),
        ko_thanks: resolve(__dirname, "src/pages/ko/thanks.html"),
      },
    },
  },
});
