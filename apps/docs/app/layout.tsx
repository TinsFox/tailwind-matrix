import { Layout } from "components/Layout";
import clsx from "clsx";
import { TailwindIndicator } from "components/TailwindIndicator";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className="antialiased text-slate-500 dark:text-slate-400">
        <TailwindIndicator />
        {children}
      </body>
    </html>
  );
}
