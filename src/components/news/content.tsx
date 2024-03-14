import React from "react";
import TextContent from "./text";
import OneImageContent from "./images/one-image";
import TwoImagesContent from "./images/two-images";
import ThreeImagesContent from "./images/three-images";
import FourImagesContent from "./images/four-images";

export default function NewsContent({
  id,
  content,
}: {
  id: string;
  content: any;
}) {
  console.log(content);
  return (
    <div className="flex flex-col gap-5 w-full">
      {content?.map((item: any, index: number) => (
        <div key={index}>
          {item.type === "text" && <TextContent text={item.content} />}
          {item.type === "image" && item.content.length === 1 && (
            <OneImageContent id={id} images={item.content} />
          )}
          {item.type === "image" && item.content.length === 2 && (
            <TwoImagesContent id={id} images={item.content} />
          )}
          {item.type === "image" && item.content.length === 3 && (
            <ThreeImagesContent id={id} images={item.content} />
          )}
          {item.type === "image" && item.content.length === 4 && (
            <FourImagesContent id={id} images={item.content} />
          )}
        </div>
      ))}
    </div>
  );
}
