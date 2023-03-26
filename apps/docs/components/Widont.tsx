export function Widont({ children }: { children: string }) {
  return children.replace(/ ([^ ]+)$/, "\u00A0$1");
}
