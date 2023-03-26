import { useEffect, useState } from "react";

import { Pre } from "../pre";
import { CodeContainer } from "./code-container";
import { Highlight } from "./highlight";
import { ReactLiveBlock } from "./react-live-block";
import theme from "prism-react-renderer/themes/nightOwl";

export function CodeBlock(props: any) {
  const [isMounted, on] = useState<boolean>(false);
  useEffect(() => {
    on(true);
  }, [on]);

  const {
    className,
    live = true,
    manual,
    render,
    children,
    viewlines,
    ln,
    mountStylesheet = false,
  } = props.children.props;
  const language = className?.replace(/language-/, "");

  const _live = live === "true" || live === true;

  const rawCode = children?.trim();

  const reactLiveBlockProps = {
    rawCode,
    language,
    theme,
    noInline: manual,
    mountStylesheet,
  };

  if (
    isMounted &&
    (language === "jsx" || language === "tsx") &&
    _live === true
  ) {
    return <ReactLiveBlock editable {...reactLiveBlockProps} />;
  }

  return (
    <div className="relative z-0">
      <CodeContainer>
        <Highlight
          codeString={rawCode}
          language={language}
          theme={theme}
          metastring={ln}
          showLines={viewlines}
        />
      </CodeContainer>
    </div>
  );
}
