import type { ReactElement } from "react";
import { useRef } from "react";
import cn from "clsx";

export type TOCProps = {
  headings: any[];
  filePath?: string;
};

export function TOC({ headings, filePath }: TOCProps): ReactElement {
  const tocRef = useRef<HTMLDivElement>(null);
  const hasHeadings = headings?.length > 0;

  return (
    <div
      ref={tocRef}
      className={cn(
        "fixed top-16 right-56 overflow-y-auto pt-6 text-sm [hyphens:auto]"
      )}
    >
      {hasHeadings && (
        <>
          <p className="mb-4 font-semibold tracking-tight">On this page</p>
          <ul>
            {headings.map(({ title, level }, index) => (
              <li
                className="my-2 scroll-my-6 scroll-py-6"
                key={index}
                style={{
                  marginLeft: level * 2 + 10,
                }}
              >
                <a href={`#${title}`}>{title}</a>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
