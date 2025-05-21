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
  locale?: string;
  author?: string;
}

export default function NewsCard({
  id,
  title,
  category,
  date,
  image,
  locale,
  author,
}: Props) {
  const dateFormated = new Date(date);
  const dateNow = new Date();
  const diffTime = Math.abs(dateNow.getTime() - dateFormated.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  let dateFormatedString = "";
  if (locale === "en") {
    if (diffDays <= 1) {
      dateFormatedString = `${Math.ceil(diffTime / (1000 * 60 * 60))}hr ago`;
    } else if (diffDays <= 7) {
      dateFormatedString = `${diffDays}d ago`;
    } else if (diffDays < 30) {
      const options = {
        year: "numeric" as any, // Cambiado a "numeric"
        month: "long" as any, // Cambiado a "long"
        day: "numeric" as any, // Cambiado a "numeric"
      };

      dateFormatedString = dateFormated.toLocaleDateString("en", options);
    }
  } else {
    if (diffDays <= 1) {
      dateFormatedString = `Hace ${Math.ceil(diffTime / (1000 * 60 * 60))}hr`;
    } else if (diffDays <= 7) {
      dateFormatedString = `Hace ${diffDays}d`;
    } else if (diffDays < 31) {
      // Luego de 7 días mostrar la fecha en formato "18 de diciembre 2023"
      const options = {
        year: "numeric" as any, // Cambiado a "numeric"
        month: "long" as any, // Cambiado a "long"
        day: "numeric" as any, // Cambiado a "numeric"
      };

      dateFormatedString = dateFormated.toLocaleDateString("es-ES", options);
    }
  }

  return (
    <Link href={`/news/${id}`} className="w-full space-y-2 cursor-pointer">
      <div className="sm:h-[25vh] xl:h-[30vh] w-full overflow-hidden rounded-md">
        <Image
          width={2048}
          height={1080}
          src={`${process.env.NEXT_PUBLIC_API_URL}/files/news/${id}/img/${image}`}
          alt={title}
          className="w-full h-full object-cover object-center hover:scale-110 duration-300"
        />
      </div>
      <Typography
        placeholder={undefined}
        className="text-red-700 font-normal tracking-widest uppercase font-montserrat line-clamp-2 break-words"
      >
        {category}
      </Typography>
      <Typography
        placeholder={undefined}
        className="text-blue-950 font-bold font-montserrat text-2xl w-full break-words line-clamp-3"
      >
        {title}
      </Typography>
      <div className="flex items-center space-x-3">
        <div className="bg-red-700 rounded-full h-2 w-2/12"></div>
        <Typography
          placeholder={undefined}
          className="text-cyan-600 font-normal font-montserrat text-xs sm:text-sm md:text-base lg:text-lg xl:text-lg"
        >
          {dateFormatedString}
        </Typography>

        {author && (
          <Typography
            placeholder={undefined}
            className="text-red-700 font-normal font-montserrat text-xs sm:text-sm md:text-base lg:text-lg xl:text-lg"
          >
            {author}
          </Typography>
        )}
      </div>
    </Link>
  );
}
