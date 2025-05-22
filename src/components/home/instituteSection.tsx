"use client";
import { Button, Typography } from "@material-tailwind/react";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function InstituteSection() {
  const t = useTranslations("Institute");
  return (
    <section className="w-full sm:h-[20vh] bg-blue-950 flex flex-col sm:flex-row justify-center items-center space-y-5 sm:space-y-0 sm:space-x-10 text-center p-5 lg:p-0">
      <div className="flex flex-col justify-center items-center">
        <Typography className="sm:text-lg lg:text-4xl uppercase text-cyan-600 font-bold font-montserrat">
          {t("title")}
        </Typography>
        <Typography className="text-medium lg:text-xl uppercase text-white font-montserrat font-medium">
          {t("description")}
        </Typography>
      </div>
      <Image
        width={2048}
        height={1080}
        src={"svg/logos/instituto.svg"}
        alt={"instituto"}
        key={"instituto"}
        className="h-full w-32 lg:w-56 object-contain object-center py-5 order-first sm:order-none"
      />
      <Button className="h-14 px-10 bg-red-700 rounded-full text-xl hover:text-white/60 duration-300 font-gotham">
        {t("buttonText")}
      </Button>
    </section>
  );
}
