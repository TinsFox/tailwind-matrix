"use client";

import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { INavConfig } from "site.config";
import { Logo } from "./Logo";
import { SearchButton } from "./Search";
import { ThemeToggle } from "./ThemeToggle";

export function Header({
  hasNav = false,
  navIsOpen,
  onNavToggle,
  title,
  section,
}: any) {
  let [isOpaque, setIsOpaque] = useState(false);

  const router = useRouter();
  useEffect(() => {
    let offset = 50;
    function onScroll() {
      if (!isOpaque && window.scrollY > offset) {
        setIsOpaque(true);
      } else if (isOpaque && window.scrollY <= offset) {
        setIsOpaque(false);
      }
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll, { passive: true });
    };
  }, [isOpaque]);
  return (
    <>
      <div
        className={clsx(
          "sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 dark:border-slate-50/[0.06]",
          isOpaque
            ? "bg-white supports-backdrop-blur:bg-white/95 dark:bg-slate-900/75"
            : "bg-white/95 supports-backdrop-blur:bg-white/60 dark:bg-transparent"
        )}
      >
        <div className="max-w-8xl mx-auto">
          <div
            className={clsx(
              "py-4 border-b border-slate-900/10 lg:px-8 lg:border-0 dark:border-slate-300/10",
              hasNav ? "mx-4 lg:mx-0" : "px-4"
            )}
          >
            <div className="relative flex items-center">
              <Link
                href="/brand"
                className="mr-3 flex-none w-[2.0625rem] overflow-hidden md:w-auto"
                onContextMenu={(e) => {
                  e.preventDefault();
                  router.push("/brand");
                }}
              >
                <span className="sr-only">Tailwind CSS home page</span>
                <Logo className="w-auto h-5" />
              </Link>
              <div className="relative hidden lg:flex items-center ml-auto">
                <nav className="text-sm leading-6 font-semibold text-slate-700 dark:text-slate-200">
                  <ul className="flex space-x-8">{/* <NavItems /> */}</ul>
                </nav>
                <div className="flex items-center border-l border-slate-200 ml-6 pl-6 dark:border-slate-800">
                  <ThemeToggle panelClassName="mt-8" />
                  <a
                    href="https://github.com/tailwindlabs/tailwindcss"
                    className="ml-6 block text-slate-400 hover:text-slate-500 dark:hover:text-slate-300"
                  >
                    <span className="sr-only">Tailwind CSS on GitHub</span>
                    <svg
                      viewBox="0 0 16 16"
                      className="w-5 h-5"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                    </svg>
                  </a>
                </div>
              </div>
              <SearchButton className="ml-auto text-slate-500 w-8 h-8 -my-1 flex items-center justify-center hover:text-slate-600 lg:hidden dark:text-slate-400 dark:hover:text-slate-300">
                <span className="sr-only">Search</span>
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="m19 19-3.5-3.5" />
                  <circle cx="11" cy="11" r="6" />
                </svg>
              </SearchButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
