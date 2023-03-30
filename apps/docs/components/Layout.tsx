"use client";
import React from "react";
interface ILayout {}

export function Layout({ children }: React.PropsWithChildren<ILayout>) {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
}
