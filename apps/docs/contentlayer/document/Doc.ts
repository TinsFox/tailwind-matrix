import { defineDocumentType } from "contentlayer/source-files";
import { bundleMDX } from "mdx-bundler";
import type * as unified from "unified";
import { toMarkdown } from "mdast-util-to-markdown";
import { mdxToMarkdown } from "mdast-util-mdx";
import { log } from "console";
export type DocHeading = { level: 1 | 2 | 3; title: string };
export const Doc = defineDocumentType(() => ({
  name: "Docs",
  filePathPattern: `docs/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      description: "The title of the post",
      required: true,
    },
    date: {
      type: "date",
      description: "The date of the post",
      required: true,
    },
    category: {
      type: "enum",
      options: ["Getting Started", "Components"],
      description: "The date of the post",
      required: true,
    },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (doc) => `/${doc._raw.flattenedPath}`,
    },
    slugAsParams: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/"),
    },
    slug: {
      type: "string",
      resolve: (doc) => `/${doc._raw.flattenedPath}`,
    },
    headings: {
      type: "json",
      resolve: async (doc) => {
        const headings: DocHeading[] = [];
        await bundleMDX({
          source: doc.body.raw,
          mdxOptions: (opts) => {
            opts.remarkPlugins = [
              ...(opts.remarkPlugins ?? []),
              tocPlugin(headings),
            ];
            return opts;
          },
        });
        return [{ level: 1, title: doc.title }, ...headings];
      },
    },
  },
}));
const tocPlugin =
  (headings: DocHeading[]): unified.Plugin =>
  () => {
    console.log("headings", headings);
    return (node: any) => {
      for (const element of node.children.filter(
        (_: any) => _.type === "heading" || _.name === "OptionsTable"
      )) {
        if (element.type === "heading") {
          const title = toMarkdown(
            { type: "paragraph", children: element.children },
            { extensions: [mdxToMarkdown()] }
          )
            .trim()
            .replace(/<.*$/g, "")
            .replace(/\\/g, "")
            .trim();
          headings.push({ level: element.depth, title });
        } else if (element.name === "OptionsTable") {
          element.children
            .filter((_: any) => _.name === "OptionTitle")
            .forEach((optionTitle: any) => {
              optionTitle.children
                .filter((_: any) => _.type === "heading")
                .forEach((heading: any) => {
                  const title = toMarkdown(
                    { type: "paragraph", children: heading.children },
                    { extensions: [mdxToMarkdown()] }
                  )
                    .trim()
                    .replace(/<.*$/g, "")
                    .replace(/\\/g, "")
                    .trim();
                  headings.push({ level: heading.depth, title });
                });
            });
        }
      }
    };
  };
