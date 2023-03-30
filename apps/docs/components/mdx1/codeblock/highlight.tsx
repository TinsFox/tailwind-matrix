import BaseHighlight, {
  Language,
  PrismTheme,
  defaultProps,
} from "prism-react-renderer";

import { liveEditorStyle } from "./styles";

interface HighlightProps {
  codeString: string;
  language: Language;
  theme?: PrismTheme;
  metastring?: string;
}

export function Highlight({
  codeString,
  language,
  metastring,

  ...props
}: HighlightProps) {
  return (
    <BaseHighlight
      {...defaultProps}
      code={codeString}
      language={language}
      {...props}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <div className="p-5" style={liveEditorStyle}>
          <pre className={className} style={style}>
            {tokens.map((line, i) => {
              const lineProps = getLineProps({ line, key: i });
              return (
                <div key={i} {...lineProps}>
                  {line.length > 1 && (
                    <span className="mr-6 select-none text-xs opacity-30">
                      {i + 1}
                    </span>
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
