import React from "react";

export default function TextContent({ text }: { text: any }) {
  return (
    <div
      className="w-full flex flex-col gap-2"
      dangerouslySetInnerHTML={{ __html: text }}
    ></div>
  );
}
