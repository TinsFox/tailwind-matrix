"use client";
import { CheckIcon } from "components/icons/check";
import { CopyIcon } from "components/icons/copy";
import { ComponentProps, useCallback, useEffect, useState } from "react";

export function CopyButton({ getValue }: { getValue: () => string }) {
  const [isCopied, setCopied] = useState(false);
  useEffect(() => {
    if (!isCopied) return;
    const timerId = setTimeout(() => {
      setCopied(false);
    }, 2000);

    return () => {
      clearTimeout(timerId);
    };
  }, [isCopied]);
  const handleClick = useCallback<
    NonNullable<ComponentProps<"button">["onClick"]>
  >(async () => {
    setCopied(true);
    if (!navigator?.clipboard) {
      console.error("Access to clipboard rejected!");
    }
    try {
      await navigator.clipboard.writeText(getValue());
    } catch {
      console.error("Failed to copy!");
    }
  }, [getValue]);

  const IconToUse = isCopied ? CheckIcon : CopyIcon;

  return (
    <div className="absolute top-[2rem] right-[1rem] inline-block  border-none text-slate-300 opacity-50 group-hover:visible group-hover:bg-transparent group-hover:opacity-100">
      <button
        type="button"
        className="text-slate-500 group-hover:text-slate-400"
        onClick={handleClick}
      >
        <IconToUse className="h-5 w-5"></IconToUse>
        {/* <svg
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M13 10.75h-1.25a2 2 0 0 0-2 2v8.5a2 2 0 0 0 2 2h8.5a2 2 0 0 0 2-2v-8.5a2 2 0 0 0-2-2H19" />
              <path d="M18 12.25h-4a1 1 0 0 1-1-1v-1.5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1.5a1 1 0 0 1-1 1ZM13.75 16.25h4.5M13.75 19.25h4.5" />
            </svg> */}
      </button>
    </div>
  );
}
