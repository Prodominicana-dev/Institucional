"use client";
import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function CEOSection() {
  const t = useTranslations("CEO");
  return (
    <section className="h-[60vh] xl:h-screen">
      <div className="w-full h-full relative">
        <Image
          src={"/images/prodominicanabuilding.jpg"}
          width={6000}
          height={2195}
          alt="foto"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-blue-dark/80 z-10 flex flex-col-reverse xl:flex-row items-center justify-center xl:justify-evenly text-center text-white xl:px-32">
          <div className="w-6/12 flex justify-center items-end">
            <Image
              src={"/images/bivianariveiro.png"}
              width={2504}
              height={4096}
              alt="CEO"
              className="object-cover w-full xl:w-6/12 self-end hidden xl:block"
            />
          </div>
          <div className="w-10/12 sm:w-8/12 xl:w-5/12 flex flex-col items-center justify-center space-y-5 pt-16 xl:p-0">
            <div className="flex flex-col items-center space-y-2">
              <div className="font-noctura text-5xl">{t("name")}</div>
              <div className="h-1 bg-red-700 w-8/12"></div>
              <div className="font-bold font-montserrat text-lg w-10/12">
                {t("title")}
              </div>
            </div>
            <div className="font-light font-montserrat text-xs sm:text-base">
              {t("description")}
            </div>
            <Image
              src={"/svg/logos/Prodominicana.svg"}
              width={1300}
              height={600}
              alt="CEO"
              className="w-[10rem] hidden xl:block"
            />
          </div>
          <Image
            src={"/svg/redWave.svg"}
            width={1300}
            height={600}
            alt="CEO"
            className="w-full object-cover absolute bottom-0 hidden xl:block"
          />
        </div>
      </div>
    </section>
  );
}
