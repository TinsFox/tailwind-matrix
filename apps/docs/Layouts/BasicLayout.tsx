import React from "react";

export function BasicLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <main className="relative z-20 mx-auto max-w-3xl pt-10 xl:max-w-none">
        {children}
      </main>
    </>
  );
}
