import { defineEcConfig } from "astro-expressive-code";

export default defineEcConfig({
  themes: ["gruvbox-dark-medium"],
  styleOverrides: {
    borderRadius: "4px",
    uiFontFamily: "var(--font-sans), sans-serif",
    codeFontFamily: "var(--font-mono), monospace",
    frames: {
      frameBoxShadowCssValue: "none",
    },
  },
});
