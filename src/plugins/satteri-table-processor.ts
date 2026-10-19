import { defineHastPlugin } from "satteri";

const satteriTableWrapper = defineHastPlugin({
  name: "hast-table-wrapper",
  element: {
    filter: ["table"],
    visit(node, context) {
      context.wrapNode(node, {
        type: "element",
        tagName: "div",
        properties: {
          className: ["table-wrapper"],
        },
        children: [],
      });
    },
  },
});

export default satteriTableWrapper;
