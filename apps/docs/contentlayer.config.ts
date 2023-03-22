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
  getHighlighter: async () => {
    const theme = await loadTheme(
      path.join(process.cwd(), "assets/vscode-theme.json")
    );
    return await getHighlighter({ theme });
  },
  onVisitLine(node) {
    // Prevent lines from collapsing in `display: grid` mode, and allow empty
    // lines to be copy/pasted
    if (node.children.length === 0) {
      node.children = [{ type: "text", value: " " }];
    }
  },
  onVisitHighlightedLine(node) {
    node.properties.className.push("line--highlighted");
  },
  onVisitHighlightedWord(node) {
    node.properties.className = ["word--highlighted"];
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
