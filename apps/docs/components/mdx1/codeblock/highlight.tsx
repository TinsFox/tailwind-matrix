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
              const { key, ...rest } = getLineProps({
                line,
                key: i,
              });
              return (
                <div key={key} {...rest}>
                  {line.length > 1 && (
                    <span className="mr-6 select-none text-xs opacity-30">
                      {i + 1}
                    </span>
                  )}
                  {/* https://github.com/FormidableLabs/prism-react-renderer/issues/172#issuecomment-1411339364 */}
                  {line.map((token, key) => {
                    const { key: tokenKey, ...rest } = getTokenProps({
                      token,
                      key,
                    });
                    return <span key={tokenKey} {...rest} />;
                  })}
                </div>
              );
            })}
          </pre>
        </div>
      )}
    </BaseHighlight>
  );
}
