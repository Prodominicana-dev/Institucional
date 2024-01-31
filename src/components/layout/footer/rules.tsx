"use client";
import React from "react";

export default function OgticRules({
  title,
  url,
  source,
}: {
  title: string;
  url: string;
  source: string;
}) {
  return (
    <div className="relative flex justify-center items-center max-w-[100px]">
      <iframe
        src={source}
        height="100"
        width="100"
        scrolling="no"
        className="relative z-0 w-full "
      ></iframe>
      <a
        title={title}
        target="_blank"
        href={url}
        className="absolute inset-0"
      ></a>
    </div>
  );
}
