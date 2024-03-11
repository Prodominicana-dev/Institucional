import Image from "next/image";
import React from "react";

export default function TwoImagesContent({
  id,
  images,
}: {
  id: string;
  images: any;
}) {
  return (
    <div className="w-full flex justify-center gap-5">
      <Image
        src={`${process.env.NEXT_PUBLIC_API_URL}/files/news/${id}/img/${images[0].name}`}
        alt=""
        width={1920}
        height={1080}
        className="w-6/12 object-cover"
      />
      <Image
        src={`${process.env.NEXT_PUBLIC_API_URL}/files/news/${id}/img/${images[1].name}`}
        alt=""
        width={1920}
        height={1080}
        className="w-6/12 object-cover"
      />
    </div>
  );
}
