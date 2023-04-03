import type { ReactElement } from "react";
import { useEffect, useRef, useMemo } from "react";
import cn from "clsx";

export type TOCProps = {
  headings: any[];
  filePath?: string;
};

export function TOC({ headings, filePath }: TOCProps): ReactElement {
  const tocRef = useRef<HTMLDivElement>(null);

  const items = useMemo(
    () => headings.filter((heading) => heading.depth > 1),
    [headings]
  );

  const hasHeadings = items.length > 0;

  return (
    <div
      ref={tocRef}
      className={cn(
        "absolute top-16 overflow-y-auto pr-4 pt-6 text-sm [hyphens:auto]",
        "max-h-[calc(100vh-var(--nextra-navbar-height)-env(safe-area-inset-bottom))] ltr:-mr-4 rtl:-ml-4"
      )}
    >
      {hasHeadings && (
        <>
          <p className="mb-4 font-semibold tracking-tight">
            123
            {/* {renderComponent(config.toc.title)} */}
          </p>
          <ul>
            {items.map(({ id, value, depth }) => (
              <li className="my-2 scroll-my-6 scroll-py-6" key={id}>
                <a href={`#${id}`}>{value}</a>
              </li>
            ))}
          </ul>
        </>
      )}

      {/* {hasMetaInfo && (
        <div
          className={cn(
            hasHeadings &&
              "mt-8 border-t bg-white pt-8 shadow-[0_-12px_16px_white] dark:bg-dark dark:shadow-[0_-12px_16px_#111]",
            "sticky bottom-0 flex flex-col items-start gap-2 pb-8 dark:border-neutral-800",
            "contrast-more:border-t contrast-more:border-neutral-400 contrast-more:shadow-none contrast-more:dark:border-neutral-400"
          )}
        >
          {config.feedback.content ? (
            <Anchor
              className={linkClassName}
              href={config.feedback.useLink()}
              newWindow
            >
              {renderComponent(config.feedback.content)}
            </Anchor>
          ) : null}

          {renderComponent(config.editLink.component, {
            filePath,
            className: linkClassName,
            children: renderComponent(config.editLink.text),
          })}

          {renderComponent(config.toc.extraContent)}
        </div>
      )} */}
    </div>
  );
}
