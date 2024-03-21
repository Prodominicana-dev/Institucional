"use client";
import { Typography } from "@material-tailwind/react";
import { useTranslations } from "next-intl";
import React from "react";

export default function Page() {
  const t = useTranslations("navbar");
  return (
    <div className="bg-white py-10 flex justify-center">
      <div className="w-10/12 flex flex-col gap-10">
        <Typography
          placeholder={undefined}
          className="text-blue-900 uppercase font-extrabold text-xl lg:text-3xl font-opensans"
        >
          {t("services.menuList.export")}
        </Typography>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"></div>
      </div>
    </div>
  );
}
