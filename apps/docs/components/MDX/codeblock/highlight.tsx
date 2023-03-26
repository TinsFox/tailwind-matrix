import BaseHighlight, {
  Language,
  PrismTheme,
  defaultProps,
} from "prism-react-renderer";

import { liveEditorStyle } from "./styles";

const RE = /{([\d,-]+)}/;

const calculateLinesToHighlight = (meta: string) => {
  if (!RE.test(meta)) {
    return () => false;
  }
  const lineNumbers = RE?.exec?.(meta)?.[1]
    .split(`,`)
    .map((v) => v.split(`-`).map((x) => parseInt(x, 10)));

  return (index: number) => {
    const lineNumber = index + 1;
    const inRange = lineNumbers?.some(([start, end]) =>
      end ? lineNumber >= start && lineNumber <= end : lineNumber === start
    );
    return inRange;
  };
};

interface HighlightProps {
  codeString: string;
  language: Language;
  theme?: PrismTheme;
  metastring?: string;
  showLines?: boolean;
}

export function Highlight({
  codeString,
  language,
  metastring,
  showLines,
  ...props
}: HighlightProps) {
  const shouldHighlightLine = calculateLinesToHighlight(metastring);

  return (
    <BaseHighlight
      {...defaultProps}
      code={codeString}
      language={language}
      {...props}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <div style={liveEditorStyle} data-language={language} className="p-5">
          <pre className={className} style={style}>
            {tokens.map((line, i) => {
              const lineProps = getLineProps({ line, key: i });
              return (
                <div key={i} {...lineProps}>
                  {showLines && (
                    <span className="mr-6 text-xs opacity-30">{i + 1}</span>
                  )}
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </div>
              );
            })}
          </pre>
        </div>
      )}
    </BaseHighlight>
  );
}
