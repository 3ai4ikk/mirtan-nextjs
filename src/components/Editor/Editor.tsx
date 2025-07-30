"use client";

import { EditorContent, EditorRoot, JSONContent } from "novel";
import { useState } from "react";
import { defaultExtensions } from "./extensions";
import EditorMenu from "./EditorMenu";
import { NodeSelector } from "./selectors/node-selector";
import { TextButtons } from "./selectors/text-buttons";
import { ColorSelector } from "./selectors/color-selector";

import "./Editor.scss";

type Props = {
  onChange: (JSONContent: JSONContent, HTMLContent: string) => void;
  initialContent?: JSONContent;
};

const initialContents: JSONContent = {
  type: "doc",
  content: [
    {
      type: "paragraph",
      content: [],
    },
  ],
};

const extensions = [...defaultExtensions];

const Editor = ({ onChange, initialContent }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNodeMenuOpen, setIsNodeMenuOpen] = useState(false);
  const [isColorMenuOpen, setIsColorMenuOpen] = useState(false);

  return (
    <EditorRoot>
      <EditorContent
        immediatelyRender={false}
        extensions={extensions}
        initialContent={initialContent ? initialContent : initialContents}
        onUpdate={({ editor }) => {
          onChange(editor.getJSON(), editor.getHTML());
        }}
        className="min-h-96 rounded-xl border p-4 editor"
        editorProps={{
          attributes: {
            class:
              "prose dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full",
          },
        }}
      >
        <EditorMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <NodeSelector
            open={isNodeMenuOpen}
            onOpenChange={setIsNodeMenuOpen}
          />
          <TextButtons />
          <ColorSelector
            open={isColorMenuOpen}
            onOpenChange={setIsColorMenuOpen}
          />
        </EditorMenu>
      </EditorContent>
    </EditorRoot>
  );
};
export default Editor;
