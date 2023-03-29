"use client";
import React, { useEffect } from "react";
import { Footer } from "./footer";
import { Header } from "./header/Header";
import styles from "./index.module.css";

interface ILayout {}
import { siteConfig } from "site.config";
import clsx from "clsx";
import { ThemeToggle, update } from "./ThemeToggle";

export function Layout({ children }: React.PropsWithChildren<ILayout>) {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
}
