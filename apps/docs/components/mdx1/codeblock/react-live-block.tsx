import React, { useState } from "react";
import { LiveEditor, LiveError, LivePreview, LiveProvider } from "react-live";
import { CopyToClipboard } from "../copy-to-clipboard";
import { CodeContainer } from "./code-container";
import { ReactLiveScope } from "./react-live-scope";
import { liveEditorStyle, liveErrorStyle } from "./styles";

const EditableNotice = (props: any) => {
  return (
    <div
      className="pointer-events-none absolute -top-[1.25em] z-0 w-full rounded-t-lg bg-[#011627] py-2 text-center uppercase"
      {...props}
    >
      {"example"}
    </div>
  );
};

interface ReactLiveBlockProps {
  editable: boolean;
  rawCode: string;
}

export function ReactLiveBlock({
  editable,
  rawCode,
  ...rest
}: ReactLiveBlockProps) {
  const code = rawCode.trim().replace("// prettier-ignore", "");
  const [editorCode, setEditorCode] = useState(code.trim());
  const onChange = (newCode: string) => setEditorCode(newCode.trim());
  const liveProviderProps = {
    code: editorCode,
    ReactLiveScope,
    ...rest,
  };
  return (
    <LiveProvider {...liveProviderProps}>
      <LivePreview className="z-10 mt-10 overflow-x-auto rounded-xl border border-gray-200 p-3" />
      <div className="relative z-0 mt-10">
        {editable && (
          <CodeContainer className="pt-5">
            <LiveEditor
              onChange={onChange}
              style={liveEditorStyle}
              className="rounded-b-xl"
            />
          </CodeContainer>
        )}
        <CopyToClipboard code={editorCode} />
        {editable && <EditableNotice />}
      </div>
      {editable && <LiveError style={liveErrorStyle} />}
    </LiveProvider>
  );
}
