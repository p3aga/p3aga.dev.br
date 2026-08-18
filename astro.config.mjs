// @ts-check

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";
import icon from "astro-icon";
import pagefind from "astro-pagefind";

// https://astro.build/config
export default defineConfig({
  site: "https://p3aga.dev.br",
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Playfair Display",
      cssVariable: "--font-playfair-display",
      weights: ["400", "700"],
      fallbacks: ["serif"],
    },
    {
      provider: fontProviders.google(),
      name: "Inter",
      weights: ["100 900"],
      cssVariable: "--font-inter",
      fallbacks: ["sans-serif"],
    },
    {
      provider: fontProviders.google(),
      name: "Noto Serif",
      weights: ["100 900"],
      cssVariable: "--font-noto-serif",
      fallbacks: ["serif"],
    },
    {
      provider: fontProviders.google(),
      name: "JetBrains Mono",
      weights: ["100 800"],
      cssVariable: "--font-jetbrains-mono",
      fallbacks: ["monospace"],
    },
  ],
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [pagefind(), sitemap(), mdx(), icon()],
});
