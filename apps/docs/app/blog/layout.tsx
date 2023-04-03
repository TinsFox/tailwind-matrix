"use client";
import clsx from "clsx";
import Link from "next/link";
import { allBlogs } from "contentlayer/generated";
interface DocsLayoutProps {
  children: React.ReactNode;
}

export default function DocLayout({ children }: DocsLayoutProps) {
  return (
    <main className="mx-auto max-w-[52rem] px-4 pb-28 sm:px-6 md:px-8 lg:max-w-6xl xl:px-12">
      <div className="relative sm:ml-[calc(2rem+1px)] sm:pb-12 md:ml-[calc(3.5rem+1px)] lg:ml-[max(calc(14.5rem+1px),calc(100%-48rem))]">
        <div className="absolute top-3 bottom-0 right-full mr-7 hidden w-px bg-slate-200 dark:bg-slate-800 sm:block md:mr-[3.25rem]" />
        <div className="space-y-16">
          {allBlogs.map(({ slug, title }) => (
            <article key={slug} className="group relative">
              <div className="absolute -inset-y-2.5 -inset-x-4 group-hover:bg-slate-50/70 dark:group-hover:bg-slate-800/50 sm:rounded-2xl md:-inset-y-4 md:-inset-x-6" />
              <svg
                viewBox="0 0 9 9"
                className="absolute right-full top-2 mr-6 hidden h-[calc(0.5rem+1px)] w-[calc(0.5rem+1px)] overflow-visible text-slate-200 dark:text-slate-600 sm:block md:mr-12"
              >
                <circle
                  cx="4.5"
                  cy="4.5"
                  r="4.5"
                  stroke="currentColor"
                  className="fill-white dark:fill-slate-900"
                  strokeWidth={2}
                />
              </svg>
              <div className="relative">
                <h3 className="pt-8 text-base font-semibold tracking-tight text-slate-900  lg:pt-0">
                  {title}
                </h3>
                <div className="prose prose-slate prose-a:relative prose-a:z-10 dark:prose-dark line-clamp-2 mt-2 mb-4">
                  {/* <Component /> */}
                  123
                </div>
                <dl className="absolute left-0 top-0 lg:left-auto lg:right-full lg:mr-[calc(6.5rem+1px)]">
                  <dt className="sr-only">Date</dt>
                  <dd
                    className={clsx(
                      "whitespace-nowrap text-sm leading-6 dark:text-slate-400"
                    )}
                  >
                    {/* <time dateTime={date}> */}
                    123
                    {/* {formatDate(date, "{MMMM} {DD}, {YYYY}")} */}
                    {/* </time> */}
                  </dd>
                </dl>
              </div>
              <Link
                href={`/blog/${slug}`}
                className="flex items-center text-sm font-medium text-sky-500"
              >
                <>
                  <span className="absolute -inset-y-2.5 -inset-x-4 sm:rounded-2xl md:-inset-y-4 md:-inset-x-6" />
                  <span className="relative">
                    Read more
                    <span className="sr-only">,{/* {meta.title} */}</span>
                  </span>
                  <svg
                    className="relative mt-px ml-2.5 overflow-visible text-sky-300 dark:text-sky-700"
                    width="3"
                    height="6"
                    viewBox="0 0 3 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M0 0L3 3L0 6"></path>
                  </svg>
                </>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
