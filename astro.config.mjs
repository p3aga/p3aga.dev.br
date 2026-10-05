// @ts-check

import { satteri } from "@astrojs/markdown-satteri";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";
import astroExpressiveCode from "astro-expressive-code";
import icon from "astro-icon";
import pagefind from "astro-pagefind";
import hastTableWrapper from "./src/plugins/hast-table-processor";

// https://astro.build/config
export default defineConfig({
  site: "https://p3aga.dev.br",
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Playfair Display",
      cssVariable: "--font-playfair-display",
      weights: ["400", "900"],
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
  markdown: {
    processor: satteri({
      hastPlugins: [hastTableWrapper],
      features: {
        gfm: true,
        smartPunctuation: true,
      },
    }),
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [astroExpressiveCode(), mdx(), icon(), pagefind(), sitemap()],
});
