"use client";
import React, { useEffect, useState } from "react";
import Editor from "../rich-editor/config";
import TextEditor from "../rich-editor/rich-editor";
import { InformationCircleIcon } from "@heroicons/react/24/solid";

export default function TextEditorWithConfig({
  id,
  data,
  setData,
  content,
  isSubmitting,
}: {
  id: number;
  data: any;
  setData: any;
  content?: any;
  isSubmitting: boolean;
}) {
  const [warningAlert, setWarningAlert] = useState(false);
  const editor1 = Editor({
    placeholder: "Cuerpo de la noticia",
    content: content ? content : "",
  });
  useEffect(() => {
    setData(
      ...data.slice(0, id),
      { type: "text", content: editor1?.getHTML() },
      ...data.slice(id + 1)
    );
  }, [editor1?.getHTML()]);
  return (
    <div className="w-full gap-5">
      <TextEditor editor={editor1} description={content ? content : ""} />
      <div
        className={`${
          warningAlert ? "block" : "hidden"
        } w-full flex gap-2 items-center`}
      >
        <InformationCircleIcon className="size-8 text-red-500" />
        <p className="text-red-500 font-montserrat font-light">
          El contenido es obligatorio.
        </p>
      </div>
    </div>
  );
}
