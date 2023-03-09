"use client";
import { siteConfig } from "site.config";
export default function Head() {
  return (
    <>
      <title>{siteConfig.name}</title>
      <meta name="description" content={siteConfig.description} />
      <link rel="icon" href="/favicon.ico" />
    </>
  );
}
