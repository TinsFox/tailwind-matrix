import { makeSource } from "contentlayer/source-files";
import * as documentTypes from "./contentlayer";
import remarkSmartypants from "remark-smartypants";
import remarkSlug from "rehype-slug";
import remarkMdxCodeMeta from "remark-mdx-code-meta";
import remarkToc from "remark-toc";
export default makeSource({
  contentDirPath: "content",
  documentTypes: documentTypes,
  mdx: {
    remarkPlugins: [remarkSmartypants, remarkMdxCodeMeta],
    rehypePlugins: [remarkSlug],
  },
});
