"use client";
import clsx from "clsx";
import { useRef } from "react";
import { CopyButton } from "./copy-to-clipboard";

export const Pre = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLPreElement>) => {
  console.log("pre", props);
  const preRef = useRef<HTMLPreElement | null>(null);
  console.log("code", preRef.current);

  return (
    <div className="group relative">
      <pre
        className={clsx(
          "ligatures-none relative my-5 flex rounded-md bg-black p-4 text-sm leading-6 text-slate-50  before:absolute before:top-[0.2rem] before:right-[0.6rem] before:content-[attr(data-language)]",
          className
        )}
        ref={preRef}
        {...props}
      />
      <CopyButton
        getValue={() =>
          preRef.current?.querySelector("code")?.textContent || ""
        }
      />
    </div>
  );
};
