import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Typography } from "@material-tailwind/react";

interface Props {
  id: string;
  title: string;
  category: string;
  date: string;
  image: string;
}

export default function NewsCard({ id, title, category, date, image }: Props) {
  console.log(id, title, category, date, image);
  return (
    <Link
      href={`/news/${id}`}
      className="h-full w-full space-y-2 cursor-pointer"
    >
      <Image
        width={2048}
        height={1080}
        src={`${process.env.NEXT_PUBLIC_API_URL}/files/news/${id}/img/${image}`}
        alt={title}
        className="sm:h-[25vh] xl:h-[30vh] w-full object-cover object-center rounded-md"
      />
      <Typography
        placeholder={undefined}
        className="text-red-700 font-normal tracking-widest uppercase font-montserrat"
      >
        {category}
      </Typography>
      <Typography
        placeholder={undefined}
        className="text-blue-950 font-bold font-montserrat text-2xl"
      >
        {title}
      </Typography>
      <div className="flex items-center space-x-3">
        <div className="bg-red-700 rounded-full h-2 w-2/12"></div>
        <Typography
          placeholder={undefined}
          className="text-cyan-600 font-normal font-montserrat text-lg uppercase"
        >
          {date}
        </Typography>
      </div>
    </Link>
  );
}
