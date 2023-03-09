import { defineDocumentType } from "contentlayer/source-files";

export const Post = defineDocumentType(() => ({
  name: "Blog",
  contentType: "mdx",
  filePathPattern: `blog/**/*.md`,
  fields: {
    title: {
      type: "string",
      description: "The title of the blog",
      required: true,
    },
    date: {
      type: "date",
      description: "The date of the blog",
      required: true,
    },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (blog) => `/${blog._raw.flattenedPath}`,
    },
    slugAsParams: {
      type: "string",
      resolve: (blog) => blog._raw.flattenedPath.split("/").slice(1).join("/"),
    },
    slug: {
      type: "string",
      resolve: (blog) => `/${blog._raw.flattenedPath}`,
    },
  },
}));
