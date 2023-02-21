import React from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";

interface ILayout {}

export function Layout({ children }: React.PropsWithChildren<ILayout>) {
  return (
    <div>
      <Header></Header>
      <main>{children}</main>
      <Footer></Footer>
    </div>
  );
}
