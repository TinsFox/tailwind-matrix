import { makeSource } from "contentlayer/source-files";
import * as documentTypes from "./contentlayer";
import remarkSmartypants from "remark-smartypants";
import remarkSlug from "remark-slug";

export default makeSource({
  contentDirPath: "content",
  documentTypes: documentTypes,
  mdx: {
    remarkPlugins: [remarkSmartypants],
    rehypePlugins: [remarkSlug],
  },
});
