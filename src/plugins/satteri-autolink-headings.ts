import type { HastNode, HastPluginInput } from "satteri";
import { defineHastPlugin } from "satteri";

export interface AutolinkHeadingsOptions {
  /**
   * The text or symbol to display for the anchor link. Default is `"#"`
   */
  content?: string;
  /**
   * Class name to add to the anchor element. Default is `"anchor-link"`
   */
  className?: string;
}

/**
 * Normaliza uma string gerando um slug legível para URL sem dependências externas.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove acentos
    .replace(/[^a-z0-9\s-]/g, "") // Remove caracteres especiais e pontuações
    .trim()
    .replace(/[\s_]+/g, "-") // Converte espaços e underscores para hífens
    .replace(/-+/g, "-"); // Remove múltiplos hífens consecutivos
}

export const satteriAutolinkHeadings = (
  options: AutolinkHeadingsOptions = {},
): HastPluginInput => {
  const { content = "#", className = "anchor-link" } = options;
  const slugs = new Map<string, number>();

  const getUniqueSlug = (rawText: string): string => {
    const base = slugify(rawText) || "section";
    const count = slugs.get(base) ?? 0;
    slugs.set(base, count + 1);

    if (count === 0) return base;
    return `${base}-${count}`;
  };

  return defineHastPlugin({
    name: "satteri-autolink-headings",
    before(_root, ctx) {
      slugs.clear();

      // Intercepta e higieniza astro.headings para remover o sufixo " #" do TOC
      const astro = (
        ctx.data as {
          astro?: {
            headings?: Array<{ depth: number; slug: string; text: string }>;
          };
        }
      )?.astro;

      if (astro) {
        let _headings: Array<{ depth: number; slug: string; text: string }> =
          [];
        Object.defineProperty(astro, "headings", {
          get() {
            return _headings;
          },
          set(newHeadings) {
            if (Array.isArray(newHeadings)) {
              _headings = newHeadings.map((h) => ({
                ...h,
                text: h.text.endsWith(` ${content}`)
                  ? h.text.slice(0, -(content.length + 1))
                  : h.text,
              }));
            } else {
              _headings = newHeadings;
            }
          },
          configurable: true,
          enumerable: true,
        });
      }
    },
    element: {
      filter: ["h1", "h2", "h3", "h4", "h5", "h6"],
      visit(node, ctx) {
        // 1. Obtém o ID existente ou gera um novo slug
        const existingId = (node.properties as Record<string, unknown> | null)
          ?.id;
        const rawText = ctx.textContent(node);
        const slug =
          typeof existingId === "string" && existingId.length > 0
            ? existingId
            : getUniqueSlug(rawText);

        // Se o elemento ainda não tiver o id definido, atribui o id gerado
        if (typeof existingId !== "string" || existingId.length === 0) {
          ctx.setProperty(node, "id", slug);
        }

        // 2. Cria o nó de âncora HAST
        const anchorNode: HastNode = {
          type: "element",
          tagName: "a",
          properties: {
            href: `#${slug}`,
            className: [className],
            ariaHidden: "true",
            tabIndex: -1,
          },
          children: [
            {
              type: "text",
              value: content,
            },
          ],
        };

        // 3. Adiciona o espaço e a âncora ao final do heading
        ctx.appendChild(node, [
          {
            type: "text",
            value: " ",
          },
          anchorNode,
        ]);
      },
    },
  });
};

export default satteriAutolinkHeadings;
