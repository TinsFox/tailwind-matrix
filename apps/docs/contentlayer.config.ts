import { makeSource } from "contentlayer/source-files";
import rehypePrettyCode from "rehype-pretty-code";
import { getHighlighter, loadTheme } from "shiki";
import { rehypeCopyCode } from "./rehype/rehypeCopyCode";
import * as documentTypes from "./contentlayer";
import path from "path";
import remarkSmartypants from "remark-smartypants";
import { visit } from "unist-util-visit";
import remarkSlug from "remark-slug";

const options = {
  getHighlighter: async () => {
    const theme = await loadTheme(
      path.join(process.cwd(), "assets/vscode-theme.json")
    );
    return await getHighlighter({ theme });
  },
  onVisitLine(node) {
    console.log("onVisitLine", node);

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
    // [rehypePrettyCode, options], rehypeCopyCode,
    rehypePlugins: [remarkSlug],
  },
});
