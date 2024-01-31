import React from "react";
import Image from "next/image";
import { Typography } from "@material-tailwind/react";

export default function NewsCard() {
  return (
    <div className="h-full w-full space-y-2">
      <Image
        width={2048}
        height={1080}
        src={
          "https://hoy.com.do/wp-content/uploads/2023/09/WhatsApp-Image-2023-09-05-at-1.36.14-PM-1.jpeg"
        }
        alt={"news"}
        className="h-[30vh] w-full object-cover object-center rounded-md"
      />
      <Typography
        placeholder={undefined}
        className="text-red-700 font-normal tracking-widest uppercase font-montserrat"
      >
        Mision internacional
      </Typography>
      <Typography
        placeholder={undefined}
        className="text-blue-950 font-bold font-montserrat text-2xl"
      >
        República Dominicana Tendrá Nuevo Centro “Shetrades Hub” Para Impulsar
        El Desarrollo De Las Mujeres Empresarias
      </Typography>
      <div className="flex items-center space-x-3">
        <div className="bg-red-700 rounded-full h-2 w-2/12"></div>
        <Typography
          placeholder={undefined}
          className="text-cyan-600 font-normal font-montserrat text-lg uppercase"
        >
          18 DE DICIEMBRE 2023 | 09:23
        </Typography>
      </div>
    </div>
  );
}
