"use client";

import { allDocs, Docs } from "contentlayer/generated";
import { compareDesc, format, parseISO } from "date-fns";
import { useLiveReload, useMDXComponent } from "next-contentlayer/hooks";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { groupBy } from "lodash-es";
import Link from "next/link";
import React from "react";
import { usePathname, useSelectedLayoutSegments } from "next/navigation";
import clsx from "clsx";
import { MDX } from "components/mdx1/index1";
import { TOC } from "components/mdx1/toc";
export interface NpmCommands {
  __npmCommand__?: string;
  __yarnCommand__?: string;
  __pnpmCommand__?: string;
}

export async function generateStaticParams(): Promise<
  DocPageProps["params"][]
> {
  return allDocs.map((doc) => ({
    slug: doc.slugAsParams.split("/"),
  }));
}

interface DocPageProps {
  params: {
    slug: string[];
  };
}

function Doclsxav() {
  const pathname = usePathname();
  const groupByResult = groupBy(allDocs, "category");
  const categories = Object.keys(groupByResult);
  let nav: { title: string; children: Docs[] }[] = [];
  categories.forEach((category) => {
    nav.push({
      title: category,
      children: allDocs.filter((doc) => doc.category === category),
    });
  });
  return (
    <ScrollArea.Root className="h-full w-52 overflow-hidden">
      <ScrollArea.Viewport className="h-full w-full">
        <div style={{ padding: "15px 20px" }}>
          {nav.map(({ children, title }) => (
            <React.Fragment key={title}>
              <div className="mt-5 mb-8 font-semibold text-slate-900 dark:text-slate-200 lg:mb-3">
                {title}
              </div>
              <ol>
                {children.map((doc) => (
                  <li key={doc._id}>
                    <Link
                      href={doc.url}
                      className={clsx(
                        "-ml-px block border-l border-transparent pl-4 text-slate-700 hover:border-slate-400 hover:text-slate-900 dark:text-slate-400 dark:hover:border-slate-500 dark:hover:text-slate-300",
                        {
                          "border-current border-sky-400 font-semibold text-sky-500 dark:text-sky-400":
                            pathname === doc.url,
                        }
                      )}
                    >
                      {doc.title}
                    </Link>
                  </li>
                ))}
              </ol>
            </React.Fragment>
          ))}
        </div>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar className="flex p-1" orientation="vertical">
        <ScrollArea.Thumb className="" />
      </ScrollArea.Scrollbar>
      <ScrollArea.Scrollbar className="" orientation="horizontal">
        <ScrollArea.Thumb className="relative flex-1" />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner className="" />
    </ScrollArea.Root>
  );
}
function TableOfContents() {
  return (
    <ScrollArea.Root className="fixed bottom-0 right-0 z-10 w-full overflow-x-hidden">
      <ScrollArea.Viewport className="">
        <div style={{ padding: "15px 20px" }}>
          <div className="">Tags</div>
          {allDocs.map(({ slug, title }) => (
            <div className="Tag" key={slug}>
              {title}
            </div>
          ))}
        </div>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar className="" orientation="vertical">
        <ScrollArea.Thumb className="" />
      </ScrollArea.Scrollbar>
      <ScrollArea.Scrollbar
        className="ScrollAreaScrollbar"
        orientation="horizontal"
      >
        <ScrollArea.Thumb className="" />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner className="" />
    </ScrollArea.Root>
  );
}

export default function DocsPage({ params }: DocPageProps) {
  const slug = params?.slug?.join("/") || "";
  const doc = allDocs.find((doc) => doc.slugAsParams === slug);
  console.log("doc", doc);

  if (!doc) {
    return <div>Not Found</div>;
  }

  return (
    <div>
      <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="fixed inset-0 top-[3.8125rem] left-[max(0px,calc(50%-45rem))] right-auto z-20 hidden w-[19.5rem] overflow-y-auto px-8 pb-10 lg:block">
          <Doclsxav />
        </div>
        <div className="relative lg:pl-[19.5rem]">
          <div className="mx-auto max-w-3xl pt-10 xl:ml-0 xl:mr-[15.5rem] xl:max-w-none xl:pr-16">
            <MDX code={doc.body.code} />
          </div>
          <TOC headings={doc.headings} />
        </div>
      </div>
    </div>
  );
}
