import React from "react";

export default function TextContent({ text }: any) {
  return (
    <div className="w-full" dangerouslySetInnerHTML={{ __html: text }}></div>
  );
}
