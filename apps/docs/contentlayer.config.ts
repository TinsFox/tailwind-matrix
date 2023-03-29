import { makeSource } from "contentlayer/source-files";
import * as documentTypes from "./contentlayer";
import remarkSmartypants from "remark-smartypants";
import remarkSlug from "remark-slug";
import remarkMdxCodeMeta from "remark-mdx-code-meta";
export default makeSource({
  contentDirPath: "content",
  documentTypes: documentTypes,
  mdx: {
    remarkPlugins: [remarkSmartypants, remarkMdxCodeMeta],
    rehypePlugins: [remarkSlug],
  },
});
