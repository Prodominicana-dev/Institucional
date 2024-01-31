"use client";
import NewsCard from "@/components/home/newsCard";
import { Typography } from "@material-tailwind/react";
import { useTranslations } from "next-intl";
import React from "react";

export default function Page() {
  const t = useTranslations("PressRoom");
  return (
    <div className="w-full bg-white flex justify-center ">
      <div className="p-10 lg:p-20 space-y-5">
        <Typography
          placeholder={undefined}
          className="text-blue-900 uppercase font-extrabold text-xl lg:text-3xl font-opensans"
        >
          {t("title")}
        </Typography>
        <div className="grid grid-cols-1 sm:grid-cols-3 w-full gap-10">
          <NewsCard />
          <NewsCard />
          <NewsCard />
          <NewsCard />
          <NewsCard />
        </div>
      </div>
    </div>
  );
}
