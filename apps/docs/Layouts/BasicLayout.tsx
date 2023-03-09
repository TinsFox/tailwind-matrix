import { DocsFooter } from "components/DocsFooter";
import React from "react";

export function BasicLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <main className="max-w-3xl mx-auto relative z-20 pt-10 xl:max-w-none">
        {children}
      </main>
      <DocsFooter />
    </>
  );
}
