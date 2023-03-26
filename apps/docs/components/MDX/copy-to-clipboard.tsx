"use client";
import { CheckIcon } from "components/icons/check";
import { CopyIcon } from "components/icons/copy";
import { ComponentProps, useCallback, useEffect, useState } from "react";

export function CopyToClipboard({ code }: { code: string }) {
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
      await navigator.clipboard.writeText(code);
    } catch {
      console.error("Failed to copy!");
    }
  }, [code]);

  const IconToUse = isCopied ? CheckIcon : CopyIcon;

  return (
    <div className="absolute top-[1.8rem] right-[1rem] inline-block  border-none text-slate-300 opacity-50 group-hover:visible group-hover:bg-transparent group-hover:opacity-100">
      <button
        type="button"
        className="text-slate-500 group-hover:text-slate-400"
        onClick={handleClick}
      >
        <IconToUse className="h-5 w-5"></IconToUse>
      </button>
    </div>
  );
}
