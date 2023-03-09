"use client";
import Link from "next/link";
import { Logo } from "./Logo";
import { SearchButton } from "./Search";
import { ThemeToggle } from "./ThemeToggle";
import styles from "./index.module.css";
import { AnimateSharedLayout, motion, useAnimation } from "framer-motion";
import clsx from "clsx";
import { useRef, useState, useEffect } from "react";
import { CodeWindow } from "./CodeWindow";
import { Layout } from "./Layout";
import { useMedia } from "hooks/useMedia";
import { createInViewPromise } from "utils/createInViewPromise";
import { wait } from "utils/wait";
import { debounce } from "debounce";

// import { tokens, code } from "../samples/hero.html?highlight";

const CHAR_DELAY = 75;
const GROUP_DELAY = 1000;
const TRANSITION = { duration: 0.5 };

// function getRange(text: string, options = {}) {
//   return {
//     start: code.indexOf(text),
//     end: code.indexOf(text) + text.length,
//     ...options,
//   };
// }

// const ranges = [
//   getRange(" p-8"),
//   getRange(" rounded-full"),
//   getRange(" mx-auto"),
//   getRange(" font-medium"),
//   getRange(' class="font-medium"'),
//   getRange(' class="text-sky-500 dark:text-sky-400"'),
//   getRange(' class="text-slate-700 dark:text-slate-500"'),
//   getRange(" text-center"),
//   getRange("md:flex "),
//   getRange(" md:p-0"),
//   getRange(" md:p-8", { immediate: true }),
//   getRange(" md:rounded-none"),
//   getRange(" md:w-48"),
//   getRange(" md:h-auto"),
//   getRange(" md:text-left"),
// ];

function getRangeIndex(index, ranges) {
  for (let i = 0; i < ranges.length; i++) {
    const rangeArr = Array.isArray(ranges[i]) ? ranges[i] : [ranges[i]];
    for (let j = 0; j < rangeArr.length; j++) {
      if (index >= rangeArr[j].start && index < rangeArr[j].end) {
        return [i, index - rangeArr[j].start, index === rangeArr[j].end - 1];
      }
    }
  }
  return [-1];
}

function Words({ children, bolder = false, layout, transition }) {
  return children.split(" ").map((word, i) => (
    <motion.span
      key={i}
      layout={layout}
      className="relative inline-flex whitespace-pre text-lg"
      transition={transition}
    >
      {bolder ? (
        <>
          <motion.span
            className="absolute top-0 left-0"
            initial={{ fontWeight: 400 }}
            animate={{ fontWeight: 500 }}
            transition={transition}
          >
            {word}{" "}
          </motion.span>
          <span style={{ opacity: 0, fontWeight: 500 }}>{word} </span>
        </>
      ) : (
        word + " "
      )}
    </motion.span>
  ));
}

function augment(tokens, index = 0) {
  for (let i = 0; i < tokens.length; i++) {
    if (Array.isArray(tokens[i])) {
      const _type = tokens[i][0];
      const children = tokens[i][1];
      if (Array.isArray(children)) {
        index = augment(children, index);
      } else {
        const str = children;
        const result = [];
        for (let j = 0; j < str.length; j++) {
          const [rangeIndex, indexInRange, isLast] = getRangeIndex(
            index,
            ranges
          );
          if (rangeIndex > -1) {
            result.push([
              `char:${rangeIndex}:${indexInRange}${isLast ? ":last" : ""}`,
              str[j],
            ]);
          } else {
            if (typeof result[result.length - 1] === "string") {
              result[result.length - 1] += str[j];
            } else {
              result.push(str[j]);
            }
          }
          index++;
        }
        if (!(result.length === 1 && typeof result[0] === "string")) {
          tokens[i].splice(1, 1, result);
        }
      }
    } else {
      const str = tokens[i];
      const result = [];
      for (let j = 0; j < str.length; j++) {
        const [rangeIndex, indexInRange, isLast] = getRangeIndex(index, ranges);
        if (rangeIndex > -1) {
          result.push([
            `char:${rangeIndex}:${indexInRange}${isLast ? ":last" : ""}`,
            str[j],
          ]);
        } else {
          if (typeof result[result.length - 1] === "string") {
            result[result.length - 1] += str[j];
          } else {
            result.push(str[j]);
          }
        }
        index++;
      }
      tokens.splice(i, 1, ...result);
      i += result.length - 1;
    }
  }
  return index;
}

// augment(tokens);
export function Hero() {
  const containerRef = useRef();
  const [step, setStep] = useState(-1);
  const [state, setState] = useState({ group: -1, char: -1 });
  const cursorControls = useAnimation();
  const [wide, setWide] = useState(false);
  const [finished, setFinished] = useState(false);
  const supportsMd = useMedia("(min-width: 640px)");
  const [isMd, setIsMd] = useState(false);
  const [containerRect, setContainerRect] = useState();
  const md = supportsMd && isMd;
  const mounted = useRef(true);
  const inViewRef = useRef();
  const imageRef = useRef();

  const layout = !finished;

  useEffect(() => {
    return () => (mounted.current = false);
  }, []);

  useEffect(() => {
    let current = true;

    const { promise: inViewPromise, disconnect } = createInViewPromise(
      inViewRef.current,
      {
        threshold: 0.5,
      }
    );

    const promises = [
      wait(1000),
      inViewPromise,
      new Promise((resolve) => {
        if ("requestIdleCallback" in window) {
          window.requestIdleCallback(resolve);
        } else {
          setTimeout(resolve, 0);
        }
      }),
      new Promise((resolve) => {
        if (imageRef.current.complete) {
          resolve();
        } else {
          imageRef.current.addEventListener("load", resolve);
        }
      }),
    ];

    Promise.all(promises).then(() => {
      if (current) {
        setState({ group: 0, char: 0 });
      }
    });

    return () => {
      current = false;
      disconnect();
    };
  }, []);

  useEffect(() => {
    if (step === 14) {
      let id = window.setTimeout(() => {
        setFinished(true);
      }, 1000);
      return () => {
        window.clearTimeout(id);
      };
    }
  }, [step]);

  useEffect(() => {
    if (!finished) return;
    let count = 0;
    cursorControls.start({ opacity: 0.5 });
    const id = window.setInterval(() => {
      if (count === 2) {
        return window.clearInterval(id);
      }
      count++;
      cursorControls
        .start({ opacity: 1, scale: 0.9, transition: { duration: 0.25 } })
        .then(() => {
          setWide((wide) => !wide);
          cursorControls.start({
            opacity: count === 2 ? 0 : 0.5,
            scale: 1,
            transition: { duration: 0.25, delay: 0.6 },
          });
        });
    }, 2000);
    return () => {
      window.clearInterval(id);
    };
  }, [finished]);

  useEffect(() => {
    if (finished) {
      const id = window.setTimeout(() => {
        setIsMd(wide);
      }, 250);
      return () => window.clearTimeout(id);
    }
  }, [wide, finished]);

  useEffect(() => {
    const observer = new window.ResizeObserver(
      debounce(() => {
        if (containerRef.current) {
          setContainerRect(containerRef.current.getBoundingClientRect());
        }
      }, 500)
    );
    observer.observe(containerRef.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <Layout
      left={
        <div ref={containerRef} className="lg:-mr-18">
          <AnimateSharedLayout>
            <motion.div
              layout={layout}
              className="relative z-10 rounded-lg shadow-xl text-slate-900 mx-auto sm:w-[23.4375rem] dark:text-slate-300"
              initial={false}
              animate={
                containerRect?.width
                  ? {
                      width: !supportsMd || wide ? containerRect.width : 375,
                    }
                  : {}
              }
              transition={TRANSITION}
            >
              <motion.div
                layout={layout}
                transition={TRANSITION}
                className={clsx(
                  "bg-white rounded-lg overflow-hidden ring-1 ring-slate-900/5 dark:bg-slate-800 dark:highlight-white/5 dark:ring-0",
                  {
                    flex: step >= 8 && md,
                    "p-8": step >= 0,
                    "text-center": (step >= 7 && !md) || (step < 14 && md),
                  }
                )}
              >
                <motion.div
                  layout={layout}
                  className={clsx(
                    "absolute z-20 top-1/2 right-0 xl:right-auto xl:left-0 text-black rounded-full -mt-4 -mr-4 xl:mr-0 xl:-ml-4 pointer-events-none",
                    { invisible: !supportsMd }
                  )}
                  initial={{ opacity: 0 }}
                  animate={cursorControls}
                  transition={{
                    default: TRANSITION,
                    opacity: { duration: 0.25 },
                  }}
                >
                  <svg className="h-8 w-8" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="rgba(255, 255, 255, 0.5)"
                      strokeWidth="8"
                      fill="rgba(0, 0, 0, 0.5)"
                    />
                  </svg>
                </motion.div>
                <motion.div
                  layout={layout}
                  initial={false}
                  animate={{
                    ...((step >= 1 && step < 11) ||
                    (step >= 11 && !md && !finished)
                      ? { borderRadius: 96 / 2 }
                      : { borderRadius: 0 }),
                  }}
                  transition={TRANSITION}
                  className={clsx(
                    "relative z-10 overflow-hidden flex-none",
                    step >= 10 && md
                      ? "-m-8 mr-8"
                      : step >= 2
                      ? "mx-auto"
                      : undefined,
                    step >= 12 && md ? "w-48" : "w-24",
                    step >= 13 && md ? "h-auto" : "h-24"
                  )}
                >
                  <motion.img
                    ref={imageRef}
                    layout={layout}
                    transition={TRANSITION}
                    src={"/img/sarah-dayan.jpg"}
                    decoding="async"
                    alt=""
                    className={clsx(
                      "absolute max-w-none object-cover bg-slate-100",
                      {
                        "rounded-full": finished && !md,
                      }
                    )}
                    style={
                      finished
                        ? { top: 0, left: 0, width: "100%", height: "100%" }
                        : step >= 13 && md
                        ? fit(192, containerRect.height, 384, 512)
                        : step >= 12 && md
                        ? fit(192, 96, 384, 512)
                        : fit(96, 96, 384, 512)
                    }
                  />
                </motion.div>
                <motion.div
                  layout={layout}
                  className={step >= 10 && md ? "" : "pt-6"}
                  transition={TRANSITION}
                >
                  <motion.div
                    layout={layout}
                    className="mb-4"
                    transition={TRANSITION}
                  >
                    <Words
                      bolder={step >= 3}
                      layout={layout}
                      transition={TRANSITION}
                    >
                      “Tailwind CSS is the only framework that I've seen scale
                      on large teams. It’s easy to customize, adapts to any
                      design, and the build size is tiny.”
                    </Words>
                  </motion.div>
                  <motion.div
                    className={`flex flex-col ${
                      (step >= 7 && !md) || (step < 14 && md)
                        ? "items-center"
                        : "items-start"
                    }`}
                    style={{
                      ...(step >= 4
                        ? { fontWeight: 500 }
                        : { fontWeight: 400 }),
                    }}
                    transition={TRANSITION}
                  >
                    <motion.p
                      layout={layout}
                      initial={false}
                      transition={TRANSITION}
                      className={clsx(
                        "transition-colors duration-500",
                        step >= 5
                          ? "text-sky-500 dark:text-sky-400"
                          : "text-black dark:text-slate-300"
                      )}
                    >
                      Sarah Dayan
                    </motion.p>
                    <motion.p
                      layout={layout}
                      initial={false}
                      transition={TRANSITION}
                      className={clsx(
                        "transition-colors duration-500",
                        step >= 6
                          ? "text-slate-700 dark:text-slate-500"
                          : "text-black dark:text-slate-300"
                      )}
                    >
                      Staff Engineer, Algolia
                    </motion.p>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </AnimateSharedLayout>
        </div>
      }
      right={
        <CodeWindow className="!h-auto max-h-[none]">
          <CodeWindow.Code
            ref={inViewRef}
            tokens={tokens}
            tokenComponent={HeroToken}
            tokenProps={{
              currentGroup: state.group,
              currentChar: state.char,
              onCharComplete(charIndex) {
                if (!mounted.current) return;
                setState((state) => ({ ...state, char: charIndex + 1 }));
              },
              async onGroupComplete(groupIndex) {
                if (!mounted.current) return;
                setStep(groupIndex);

                if (groupIndex === 7) {
                  if (!supportsMd) return;
                  await cursorControls.start({
                    opacity: 0.5,
                    transition: { delay: 1 },
                  });
                  if (!mounted.current) return;
                  setWide(true);
                  setIsMd(true);
                  await cursorControls.start({
                    opacity: 0,
                    transition: { delay: 0.5 },
                  });
                }

                if (!mounted.current) return;

                if (
                  ranges[groupIndex + 1] &&
                  ranges[groupIndex + 1].immediate
                ) {
                  setState({ char: 0, group: groupIndex + 1 });
                } else {
                  window.setTimeout(() => {
                    if (!mounted.current) return;
                    setState({ char: 0, group: groupIndex + 1 });
                  }, GROUP_DELAY);
                }
              },
            }}
          />
        </CodeWindow>
      }
    />
  );
}
export function IndexHeader() {
  return (
    <header className="relative">
      <div className="px-4 sm:px-6 md:px-8">
        <div
          className={clsx(
            "absolute inset-0 bottom-10 bg-bottom bg-no-repeat bg-slate-50 dark:bg-[#0B1120]",
            styles.beams
          )}
        >
          <div
            className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[bottom_1px_center] dark:bg-grid-slate-400/[0.05] dark:bg-bottom dark:border-b dark:border-slate-100/5"
            style={{
              maskImage: "linear-gradient(to bottom, transparent, black)",
              WebkitMaskImage: "linear-gradient(to bottom, transparent, black)",
            }}
          />
        </div>
        <div className="relative pt-6 lg:pt-8 flex items-center justify-between text-slate-700 font-semibold text-sm leading-6 dark:text-slate-200">
          <Logo className="w-auto h-5" />
          <div className="flex items-center">
            <SearchButton className="text-slate-500 hover:text-slate-600 w-8 h-8 -my-1 flex items-center justify-center md:hidden dark:hover:text-slate-300">
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
            {/* <NavPopover className="-my-1 ml-2 -mr-1" display="md:hidden" /> */}
            <div className="hidden md:flex items-center">
              <nav>
                <ul className="flex items-center gap-x-8">
                  <NavItems />
                </ul>
              </nav>
              <div className="flex items-center border-l border-slate-200 ml-6 pl-6 dark:border-slate-800">
                <ThemeToggle />
                <Link
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
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="relative max-w-5xl mx-auto pt-20 sm:pt-24 lg:pt-32">
          <h1 className="text-slate-900 font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center dark:text-white">
            Rapidly build modern websites without ever leaving your HTML.
          </h1>
          {/* <p className="mt-6 text-lg text-slate-600 text-center max-w-3xl mx-auto dark:text-slate-400">
            A utility-first CSS framework packed with classes like{" "}
            <code className="font-mono font-medium text-sky-500 dark:text-sky-400">
              flex
            </code>
            ,{" "}
            <code className="font-mono font-medium text-sky-500 dark:text-sky-400">
              pt-4
            </code>
            ,{" "}
            <code className="font-mono font-medium text-sky-500 dark:text-sky-400">
              text-center
            </code>{" "}
            and{" "}
            <code className="font-mono font-medium text-sky-500 dark:text-sky-400">
              rotate-90
            </code>{" "}
            that can be composed to build any design, directly in your markup.
          </p> */}
          <div className="mt-6 sm:mt-10 flex justify-center space-x-6 text-sm">
            <Link
              href="/docs/installation"
              className="bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400"
            >
              Get started
            </Link>
            <SearchButton className="hidden sm:flex items-center w-72 text-left space-x-3 px-4 h-12 bg-white ring-1 ring-slate-900/10 hover:ring-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm rounded-lg text-slate-400 dark:bg-slate-800 dark:ring-0 dark:text-slate-300 dark:highlight-white/5 dark:hover:bg-slate-700">
              {({ actionKey }) => (
                <>
                  <svg
                    width="24"
                    height="24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="flex-none text-slate-300 dark:text-slate-400"
                    aria-hidden="true"
                  >
                    <path d="m19 19-3.5-3.5" />
                    <circle cx="11" cy="11" r="6" />
                  </svg>
                  <span className="flex-auto">Quick search...</span>
                  {actionKey && (
                    <kbd className="font-sans font-semibold dark:text-slate-500">
                      <abbr
                        title={actionKey[1]}
                        className="no-underline text-slate-300 dark:text-slate-500"
                      >
                        {actionKey[0]}
                      </abbr>{" "}
                      K
                    </kbd>
                  )}
                </>
              )}
            </SearchButton>
          </div>
        </div>
      </div>
      {/* <Hero /> */}
    </header>
  );
}
export function NavItems() {
  return (
    <>
      <li>
        <Link
          href="/docs/installation"
          className="hover:text-sky-500 dark:hover:text-sky-400"
        >
          Docs
        </Link>
      </li>
      <li>
        <Link
          href="https://tailwindui.com/?ref=top"
          className="hover:text-sky-500 dark:hover:text-sky-400"
        >
          Components
        </Link>
      </li>
      <li>
        <Link
          href="/blog"
          className="hover:text-sky-500 dark:hover:text-sky-400"
        >
          Blog
        </Link>
      </li>
      <li>
        <Link
          href="/showcase"
          className="hover:text-sky-500 dark:hover:text-sky-400"
        >
          <>
            Showcase
            <span className="ml-2 font-medium text-xs leading-5 rounded-full text-sky-600 bg-sky-400/10 px-2 py-0.5  dark:text-sky-400">
              New
            </span>
          </>
        </Link>
      </li>
    </>
  );
}
