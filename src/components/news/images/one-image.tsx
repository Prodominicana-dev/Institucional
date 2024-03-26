import Image from "next/image";
import React from "react";

export default function OneImageContent({
  id,
  images,
}: {
  id: string;
  images: any;
}) {
  return (
    <div className="w-full flex justify-center">
      <Image
        src={`${process.env.NEXT_PUBLIC_API_URL}/files/news/${id}/img/${images[0].name}`}
        alt=""
        width={1920}
        height={1080}
        className="w-8/12 object-cover"
      />
    </div>
  );
}
