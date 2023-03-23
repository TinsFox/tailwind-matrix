import { visit } from "unist-util-visit";

export interface UnistTree extends Node {
  children: UnistNode[];
}

export interface UnistNode extends Node {
  type: string;
  name?: string;
  tagName?: string;
  value?: string;
  properties?: {
    __rawString__?: string;
    __className__?: string;
    [key: string]: unknown;
  };
  attributes?: {
    name: string;
    value: unknown;
    type?: string;
  }[];
  children?: UnistNode[];
}
export function rehypeCopyCode() {
  return (tree: UnistTree) => {
    visit(tree, (node: UnistNode) => {
      console.log("tree", tree, node);
      if (node.type !== "element" || node?.tagName !== "pre") {
        return;
      }
      console.log("rehypeCopyCode", node);
      // We'll only deal with the npm install command for now.
      if (node.properties?.["__rawString__"]) {
        const npmCommand = node.properties?.["__rawString__"];
        node.properties["__npmCommand__"] = npmCommand;
        node.properties["__yarnCommand__"] = npmCommand.replace(
          "npm install",
          "yarn add"
        );
        node.properties["__pnpmCommand__"] = npmCommand.replace(
          "npm install",
          "pnpm add"
        );
      }
    });
  };
}
