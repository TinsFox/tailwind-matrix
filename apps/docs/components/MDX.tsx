import clsx from "clsx";
import { useMDXComponent } from "next-contentlayer/hooks";
import redent from "redent";
import { useEffect, useState } from "react";
import Image from "next/image";

function CopyButton({ code }: { code: string }) {
  let [{ state, i }, setState] = useState({ state: "idle", i: 0 });

  useEffect(() => {
    if (state === "copied") {
      let handle = window.setTimeout(() => {
        setState({ state: "idle", i: i + 1 });
      }, 1500);
      return () => {
        window.clearTimeout(handle);
      };
    }
  }, [state, i]);

  return (
    <div className="absolute top-1 right-5 -mr-2 flex">
      <button
        type="button"
        className={clsx("", {
          "text-slate-500 hover:text-slate-400": state === "idle",
          "text-sky-400": state === "copied",
        })}
        onClick={() => {
          navigator.clipboard
            .writeText(redent(code.replace(/^[+>-]/gm, " ")))
            .then(() => {
              setState({ state: "copied", i: i + 1 });
            });
        }}
      >
        <svg
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="h-8 w-8"
        >
          <path d="M13 10.75h-1.25a2 2 0 0 0-2 2v8.5a2 2 0 0 0 2 2h8.5a2 2 0 0 0 2-2v-8.5a2 2 0 0 0-2-2H19" />
          <path d="M18 12.25h-4a1 1 0 0 1-1-1v-1.5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1.5a1 1 0 0 1-1 1ZM13.75 16.25h4.5M13.75 19.25h4.5" />
        </svg>
      </button>
    </div>
  );
}
const components = {
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className={clsx(
        "text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-200 sm:text-4xl",
        className
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className={clsx(
        "mt-12 scroll-m-20 border-b border-b-slate-200 pb-2 text-3xl font-semibold tracking-tight first:mt-0 dark:border-b-slate-700",
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className={clsx(
        "mt-8 scroll-m-20 text-2xl font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className={clsx(
        "mt-8 scroll-m-20 text-xl font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h5: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h5
      className={clsx(
        "mt-8 scroll-m-20 text-lg font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h6: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h6
      className={clsx(
        "mt-8 scroll-m-20 text-base font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  a: ({ className, ...props }: React.HTMLAttributes<HTMLAnchorElement>) => (
    <a
      className={clsx(
        "font-medium text-slate-900 underline underline-offset-4 dark:text-slate-50",
        className
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className={clsx("leading-7 [&:not(:first-child)]:mt-6", className)}
      {...props}
    />
  ),
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className={clsx("my-6 ml-6 list-disc", className)} {...props} />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className={clsx("my-6 ml-6 list-decimal", className)} {...props} />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <li className={clsx("mt-2", className)} {...props} />
  ),
  blockquote: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <blockquote
      className={clsx(
        "mt-6 border-l-2 border-slate-300 pl-6 italic text-slate-800 [&>*]:text-slate-600",
        className
      )}
      {...props}
    />
  ),
  img: ({
    className,
    alt,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={clsx("rounded-md border border-slate-200", className)}
      alt={alt}
      {...props}
    />
  ),
  hr: ({ ...props }: React.HTMLAttributes<HTMLHRElement>) => (
    <hr
      className="my-4 border-slate-200 dark:border-slate-700 md:my-8"
      {...props}
    />
  ),
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className={clsx("w-full", className)} {...props} />
    </div>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className={clsx(
        "m-0 border-t border-slate-300 p-0 even:bg-slate-100",
        className
      )}
      {...props}
    />
  ),
  th: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className={clsx(
        "border border-slate-200 px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className={clsx(
        "border border-slate-200 px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }: React.HTMLAttributes<HTMLPreElement>) => {
    return (
      <pre
        className={clsx(
          "ligatures-none relative my-5 flex rounded-md bg-black p-4 text-sm leading-6 text-slate-50  before:absolute before:top-[0.2rem] before:right-[0.6rem] before:content-[attr(data-language)]",
          className
        )}
        {...props}
      />
    );
  },
  // code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => {
  //   console.log("props", props);
  //   return (
  //     <div className="relative z-10 col-span-3 bg-slate-800 rounded-xl shadow-lg xl:ml-0 dark:shadow-none dark:ring-1 dark:ring-inset dark:ring-white/10 py-2 px-5 w-full">
  //       <code className={clsx("flex-none min-w-full", className)} {...props} />
  //       <CopyButton code={props.children as string}></CopyButton>
  //     </div>
  //   );
  // },
  Image,
  CodeBlockWrapper: ({ ...props }) => (
    <pre className="rounded-md border border-slate-100" {...props} />
  ),
};
interface MdxProps {
  code: string;
}
export const MDX = ({ code }: MdxProps) => {
  const Component = useMDXComponent(code);
  return (
    <div className="">
      <Component components={components} />
    </div>
  );
};
