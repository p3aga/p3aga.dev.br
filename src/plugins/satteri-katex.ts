import katex from "katex";
import type { MdastPluginInput, RawMdastContent } from "satteri";
import { defineMdastPlugin } from "satteri";

type KatexOptions = Parameters<typeof katex.renderToString>[1];

export type SatteriKatexOptions = Omit<
  NonNullable<KatexOptions>,
  "displayMode" | "throwOnError"
> & {
  /** Colour of the source text left in place when math fails to parse. Default `"#cc0000"`. */
  readonly errorColor?: string;
};

const ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#x27;",
};

const escapeHtml = (value: string): string =>
  value.replace(/[&<>"']/g, (character) => ESCAPES[character] ?? character);

const errorSpan = (source: string, message: string, color: string): string =>
  `<span class="katex-error" title="${escapeHtml(message)}" ` +
  `style="color:${escapeHtml(color)}">${escapeHtml(source)}</span>`;

export const satteriKatex = ({
  errorColor = "#cc0000",
  ...katexOptions
}: SatteriKatexOptions = {}): MdastPluginInput => {
  const transform = (
    node: { value: string },
    displayMode: boolean,
  ): RawMdastContent => {
    const rawSource = node.value;
    let htmlOutput: string;

    try {
      htmlOutput = katex.renderToString(rawSource, {
        ...katexOptions,
        displayMode,
        throwOnError: true,
      });

      if (displayMode) {
        htmlOutput = `<div class="katex-display-wrapper">${htmlOutput}</div>`;
      }
    } catch (error) {
      htmlOutput = errorSpan(rawSource, String(error), errorColor);
    }

    return {
      raw: htmlOutput,
      mdxExpressions: false,
    };
  };

  return defineMdastPlugin({
    name: "satteri-katex",
    math: (node) => transform(node, true),
    inlineMath: (node) => transform(node, false),
  });
};

export default satteriKatex;
