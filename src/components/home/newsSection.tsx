"use client";
import { Button, Typography } from "@material-tailwind/react";
import React from "react";
import Link from "next/link";
import NewsCard from "./newsCard";
import Schedule from "./schedule";
import { useTranslations } from "next-intl";

export default function NewsSection() {
  const t = useTranslations("PressRoom");
  return (
    <section className="p-10 sm:p-16 flex flex-col lg:flex-row lg:space-x-10 space-y-10 lg:space-y-0">
      <div className="w-full lg:w-8/12 space-y-10">
        <div className="w-full flex flex-wrap sm:flex-nowrap items-center justify-between gap-4 sm:gap-0">
          <Typography
            placeholder={undefined}
            className="w-8/12 text-blue-900 uppercase font-extrabold text-xl lg:text-3xl font-opensans"
          >
            {t("title")}
          </Typography>
          <div className="flex flex-wrap w-full space-x-4 sm:h-4/6 order-last sm:order-none hidden xl:block">
            <Button
              placeholder={undefined}
              className="font-gotham bg-red-700 sm:px-8 uppercase text-xs sm:text-base text-white rounded-full font-medium"
            >
              {t("postButton")}
            </Button>
            <Button
              placeholder={undefined}
              className="font-gotham bg-white border-2 border-cyan-600 sm:px-8 uppercase text-xs sm:text-base text-cyan-600 rounded-full font-semibold"
            >
              {t("mediaButton")}
            </Button>
          </div>
          <Link
            href="/news"
            className="sm:w-2/12 text-cyan-600 flex flex-col items-end group font-gotham"
          >
            {t("buttonText")}
            <div className="bg-cyan-600 rounded-full h-1 w-7/12 group-hover:w-full duration-500"></div>
          </Link>
        </div>
        <div className="flex flex-col lg:flex-row lg:space-x-10 space-y-10 lg:space-y-0">
          <NewsCard />
          <NewsCard />
        </div>
      </div>
      <Schedule />
    </section>
  );
}
