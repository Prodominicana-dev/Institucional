import Image from "next/image";
import React from "react";

export default function ThreeImagesContent({
  id,
  images,
}: {
  id: string;
  images: any;
}) {
  return (
    <div className="w-full grid grid-rows-4 grid-flow-col gap-5">
      <div className="row-span-4">
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}/files/news/${id}/img/${images[0].name}`}
          alt=""
          width={1920}
          height={1080}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="row-span-2">
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}/files/news/${id}/img/${images[1].name}`}
          alt=""
          width={1920}
          height={1080}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="row-span-2">
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}/files/news/${id}/img/${images[2].name}`}
          alt=""
          width={1920}
          height={1080}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
