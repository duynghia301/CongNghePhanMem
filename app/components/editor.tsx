"use client";

import { useState, useEffect } from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

interface RichTextEditorProps {
  onChange: (value: string) => void;
  value: string;
}

const RichTextEditor = ({
  onChange,
  value,
}: RichTextEditorProps) => {
  const [editorState, setEditorState] = useState(() => {
    const contentBlock = htmlToDraft(value || "");
    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
    return EditorState.createWithContent(contentState);
  });

  useEffect(() => {
    const contentBlock = htmlToDraft(value || "");
    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
    setEditorState(EditorState.createWithContent(contentState));
  }, [value]);

  const handleEditorChange = (state: EditorState) => {
    setEditorState(state);
    onChange(draftToHtml(convertToRaw(state.getCurrentContent())));
  };

  return (
    <div className="bg-white">
      <Editor
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
      />
    </div>
  );
};

export default RichTextEditor;
