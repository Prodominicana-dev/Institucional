"use client";
import { Button, Typography } from "@material-tailwind/react";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function DigitalToolsSection() {
  const t = useTranslations("DigitalTools");
  return (
    <section className="flex flex-col lg:flex-row items-center justify-evenly p-10 sm:p-20 space-y-10 lg:space-y-0">
      <div className="flex flex-col space-y-5 sm:w-8/12 lg:w-4/12 items-center text-center">
        <Typography
          className="text-3xl lg:text-4xl uppercase text-blue-950 font-extrabold font-opensans"
          placeholder={undefined}
        >
          {t("title")}
        </Typography>
        <Typography
          className="text-lg lg:text-xl uppercase text-cyan-600 font-montserrat tracking-widest"
          placeholder={undefined}
        >
          {t("description")}
        </Typography>
        <Button
          placeholder={undefined}
          className="bg-transparent border-2 border-cyan-600 text-cyan-600 shadow-none"
        >
          {t("buttonText")}
        </Button>
      </div>
      <div className="lg:w-6/12 grid grid-cols-2 gap-10 lg:gap-16">
        <div className="bg-blue-900 w-full h-20 lg:h-40">
          <Link href="https://sinim.prodominicana.gob.do/" target="_blank">
            <Image
              width={2048}
              height={1080}
              src={"svg/logos/Sinim.svg"}
              alt={"sinim"}
              key={"sinim"}
              className="h-full w-full object-contain object-center p-7 lg:p-12"
            />
          </Link>
        </div>
        <div className="bg-red-700 w-full h-20 lg:h-40">
          <Link href="https://capacita.prodominicana.gob.do/" target="_blank">
            <Image
              width={2048}
              height={1080}
              src={"svg/logos/capacita.svg"}
              alt={"capacita"}
              key={"capacita"}
              className="h-full w-full object-contain object-center p-7 lg:p-14"
            />
          </Link>
        </div>
        <div className="bg-red-700 w-full h-20 lg:h-40">
          <Link href="https://connectprodominicana.gob.do/" target="_blank">
            <Image
              width={2048}
              height={1080}
              src={"svg/logos/connect.svg"}
              alt={"connect"}
              key={"connect"}
              className="h-full w-full object-contain object-center p-7 lg:p-14"
            />
          </Link>
        </div>
        <div className="bg-blue-900 w-full h-20 lg:h-40">
          <Link href="https://vui.gob.do" target="_blank">
            <Image
              width={2048}
              height={1080}
              src={"svg/logos/vui.svg"}
              alt={"vui"}
              key={"vui"}
              className="h-full w-full object-contain object-center p-7 lg:p-14"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
