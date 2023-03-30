import { useEffect, useState } from "react";
import { CodeContainer } from "./code-container";
import { Highlight } from "./highlight";
import { ReactLiveBlock } from "./react-live-block";
import theme from "prism-react-renderer/themes/nightOwl";
import { LiveCode } from "../sandpack";

export function CodeBlock(props: any) {
  console.log("CodeBlock props", props.live);
  const [isMounted, on] = useState<boolean>(false);
  useEffect(() => {
    on(true);
  }, [on]);
  const { live = false } = props;
  const {
    className,
    manual,
    render,
    children,
    viewlines,
    ln,
    mountStylesheet = false,
  } = props.children.props;
  console.log("props.children.props", props.children.props);

  const language = className?.replace(/language-/, "");

  const _live = live === "true" || live === true;

  const rawCode = children?.trim();
  console.log("_live", _live, rawCode);

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
    return <LiveCode></LiveCode>;
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
        />
      </CodeContainer>
    </div>
  );
}
