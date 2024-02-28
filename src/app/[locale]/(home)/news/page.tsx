"use client";
import NewsCard from "@/components/home/newsCard";
import { Typography } from "@material-tailwind/react";
import { useTranslations } from "next-intl";
import React from "react";

export default function Page() {
  const t = useTranslations("PressRoom");
  const news = [
    {
      id: "20240404",
      title:
        "República Dominicana Tendrá Nuevo Centro “Shetrades Hub” Para Impulsar El Desarrollo De Las Mujeres Empresarias",
      category: "Mision internacional",
      date: "18 DE DICIEMBRE 2023 | 09:23",
      image:
        "https://hoy.com.do/wp-content/uploads/2023/09/WhatsApp-Image-2023-09-05-at-1.36.14-PM-1.jpeg",
    },
  ];
  return (
    <div className="w-full bg-white flex justify-center ">
      <div className="p-10 lg:p-20 space-y-5">
        <Typography
          placeholder={undefined}
          className="text-blue-900 uppercase font-extrabold text-xl lg:text-3xl font-opensans"
        >
          {t("title")}
        </Typography>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 w-full gap-10">
          {news.map((item, index) => (
            <NewsCard
              key={index}
              id={item.id}
              title={item.title}
              category={item.category}
              date={item.date}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
