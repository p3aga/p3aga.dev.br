import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { getDefaultCollection } from "@/scripts/collection";

const blog = getDefaultCollection("blog");
const projects = getDefaultCollection("projects");

const pages = defineCollection({
  loader: glob({
    base: "./src/content/pages",
    pattern: "**/*.{md,mdx}",
  }),
  schema: z.object({
    title: z.string().max(30),
    description: z.string().max(100),
  }),
});

export const collections = { blog, projects, pages };
