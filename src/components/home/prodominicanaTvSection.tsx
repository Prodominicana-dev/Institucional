"use client";
import { Typography } from "@material-tailwind/react";
import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function ProdominicanaTvSection() {
  const t = useTranslations("ProdominicanaTV");
  return (
    <section className="bg-slate-300 space-y-10 md:space-y-0">
      <div className="flex justify-center items-center">
        <div className="w-full xl:w-8/12 flex flex-col md:flex-row md:space-x-10 sm:p-20 p-10 items-center space-y-5 md:space-y-0">
          <div className="sm:w-6/12 space-y-3 md:text-end">
            <div>
              <Typography
                placeholder={undefined}
                className="text-2xl lg:text-4xl text-blue-950 font-extrabold font-opensans"
              >
                {t("title")}
              </Typography>
              <Typography
                placeholder={undefined}
                className="text-lg lg:text-2xl text-blue-950 font-bold font-opensans"
              >
                {t("subtitle")}
              </Typography>
            </div>
            <Typography
              placeholder={undefined}
              className="text-sm lg:text-lg text-black font-opensans"
            >
              {t("description")}
            </Typography>
          </div>
          <div className="w-full md:w-8/12">
            <iframe
              src="https://www.youtube.com/embed/NS30pnAaj3w?si=0e2lQ6iDd-QBSMPv"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              className="w-full h-[20vh] xl:h-[30vh]"
            ></iframe>
          </div>
        </div>
      </div>
      <Image
        width={2048}
        height={1080}
        src={"svg/illustrations/ProDominicanaTV.svg"}
        alt={"news"}
        className="w-full object-cover object-center"
      />
    </section>
  );
}
