import { defineDocumentType, makeSource } from "contentlayer/source-files";
import highlight from "rehype-highlight";
import { codeImport } from "remark-code-import";
import remarkGfm from "remark-gfm";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import { getHighlighter, loadTheme } from "shiki";
import { visit } from "unist-util-visit";
import { rehypeNpmCommand } from "utils/rehype-npm-command";
import { rehypeComponent } from "utils/rehype-component";
import { readFileSync } from "fs";
import * as documentTypes from "./contentlayer";

import path from "path";
import remarkSmartypants from "remark-smartypants";
import moonlightII from "./assets/moonlight-ii.json";
import vscodeTheme from "./assets/vscode-theme.json";
import floatingUILightTheme from "./assets/floating-ui-light-theme.json";
import floatingUITheme from "./assets/floating-ui-theme.json";

const options = {
  theme: floatingUILightTheme,
  tokensMap: {
    objectKey: "meta.object-literal.key",
    function: "entity.name.function",
    param: "variable.parameter",
    const: "variable.other.constant",
    class: "support.class",
  },
  onVisitLine(node: {
    children: string | any[];
    properties: { className: string[] };
  }) {
    if (node.children.length === 0) {
      node.children = [{ type: "text", value: " " }];
    }
    node.properties.className = ["line"];
  },
  onVisitHighlightedLine(node: { properties: { className: string[] } }) {
    node.properties.className = ["line", "line--highlighted"];
  },
  onVisitHighlightedWord(
    node: {
      properties: { [x: string]: any; className: string[]; style: string };
      children: { properties: { style: string } }[];
    },
    id: any
  ) {
    node.properties.className = ["word"];

    if (id) {
      // If the word spans across syntax boundaries (e.g. punctuation), remove
      // colors from the child nodes.
      if (node.properties["data-rehype-pretty-code-wrapper"]) {
        node.children.forEach(
          (childNode: { properties: { style: string } }) => {
            childNode.properties.style = "";
          }
        );
      }
      node.properties.style = "";
      node.properties["data-word-id"] = id;
    }
  },
};

export default makeSource({
  contentDirPath: "content",
  documentTypes: documentTypes,
  mdx: {
    remarkPlugins: [remarkSmartypants],
    rehypePlugins: [[rehypePrettyCode, options]],
  },
});
