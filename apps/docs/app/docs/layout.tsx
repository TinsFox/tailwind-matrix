"use client";

import { allDocs } from "contentlayer/generated";
import { Header } from "components/Header";
interface DocsLayoutProps {
  children: React.ReactNode;
}

export default function DocLayout({ children }: DocsLayoutProps) {
  return (
    <div className="relative overflow-hidden">
      <Header />
      <>{children}</>
    </div>
  );
}
