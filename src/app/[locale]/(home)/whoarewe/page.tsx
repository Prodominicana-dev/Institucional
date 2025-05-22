"use client";
import { Typography } from "@material-tailwind/react";
import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("whoarewe");
  const valores = [
    {
      title: t("values.excellence.title"),
      desc: t("values.excellence.desc"),
      icon: "/svg/icons/ExcellenceIcon.svg",
    },
    {
      title: t("values.teamWork.title"),
      desc: t("values.teamWork.desc"),
      icon: "/svg/icons/TeamWorkIcon.svg",
    },
    {
      title: t("values.integrity.title"),
      desc: t("values.integrity.desc"),
      icon: "/svg/icons/IntegrityIcon.svg",
    },
    {
      title: t("values.efficiency.title"),
      desc: t("values.efficiency.desc"),
      icon: "/svg/icons/EfficiencyIcon.svg",
    },
    {
      title: t("values.confidence.title"),
      desc: t("values.confidence.desc"),
      icon: "/svg/icons/ConfidenceIcon.svg",
    },
    {
      title: t("values.transparency.title"),
      desc: t("values.transparency.desc"),
      icon: "/svg/icons/TransparencyIcon.svg",
    },
    {
      title: t("values.serviceVocation.title"),
      desc: t("values.serviceVocation.desc"),
      icon: "/svg/icons/ServiceVocationIcon.svg",
    },
    {
      title: t("values.proactivity.title"),
      desc: t("values.proactivity.desc"),
      icon: "/svg/icons/ProactivityIcon.svg",
    },
    {
      title: t("values.equity.title"),
      desc: t("values.equity.desc"),
      icon: "/svg/icons/EquityIcon.svg",
    },
  ];

  return (
    <div className="bg-white">
      <div className="w-full lg:h-[40vh] bg-blue-950 flex py-5">
        <div className="w-full sm:w-5/12 p-16 flex justify-center items-center text-center">
          <Typography className="text-white font-extrabold text-5xl">
            {t("title")}
          </Typography>
        </div>
        <div className="hidden sm:block w-7/12">
          <Image
            width={3840}
            height={2160}
            src={"/images/flags.jpg"}
            alt={"news"}
            className=" h-full w-full object-cover object-center rounded-l-3xl"
          />
        </div>
      </div>
      <div className="w-full lg:h-[70vh] flex flex-col lg:flex-row">
        <div className="lg:w-6/12 h-full bg-sky-600 flex justify-center items-center p-10 relative">
          <div className="lg:w-6/12 space-y-3">
            <Typography className="text-white font-extrabold text-3xl">
              {t("title")}
            </Typography>
            <div className="bg-white w-4/12 h-1 rounded-full"></div>
            <Typography className="text-white text-xl" translate="yes">
              {t("desc")}
            </Typography>
          </div>
          <Image
            width={100}
            height={100}
            alt={"whoarewe"}
            src={"/svg/icons/WhoareweIcon.svg"}
            className="w-32 bottom-0 right-0 absolute hidden lg:block"
          />
        </div>
        <div className="flex flex-col lg:w-6/12 h-full">
          <div className="h-3/6 bg-red-700 flex justify-center items-center p-10 relative">
            <div className="lg:w-8/12 space-y-2">
              <Typography className="text-white font-extrabold text-3xl">
                {t("mission.title")}
              </Typography>
              <Typography className="text-white text-xl" translate="yes">
                {t("mission.desc")}
              </Typography>
            </div>
            <Image
              width={100}
              height={100}
              alt={"whoarewe"}
              src={"/svg/icons/MissionIcon.svg"}
              className="w-32 bottom-0 right-0 absolute hidden lg:block"
            />
          </div>
          <div className="h-3/6 bg-white sm:bg-blue-950 flex justify-center items-center p-10 relative">
            <div className="lg:w-8/12 space-y-2">
              <Typography className="text-blue-950 sm:text-white font-extrabold text-3xl">
                {t("vision.title")}
              </Typography>
              <Typography className="text-blue-950 sm:text-sky-500 text-xl">
                {t("vision.desc")}
              </Typography>
            </div>
            <Image
              width={100}
              height={100}
              alt={"whoarewe"}
              src={"/svg/icons/VisionIcon.svg"}
              className="w-32 bottom-0 right-0 absolute hidden lg:block"
            />
          </div>
        </div>
      </div>
      <div className="h-full">
        <div className="w-full relative">
          <Image
            src={"/images/prodominicanabuilding.jpg"}
            width={6000}
            height={2195}
            alt="foto"
            className="object-cover w-full h-full hidden lg:block"
          />
          <div className="relative lg:absolute inset-0 bg-blue-950 lg:bg-blue-950/90 z-10 flex flex-col items-center justify-center p-10 xl:p-0">
            <div className="xl:w-10/12 space-y-5">
              <Typography className="text-white font-bold text-4xl xl:pl-20">
                {t("values.title")}
              </Typography>
              <ul className="grid grid-cols-1 xl:grid-cols-2 gap-5 list-disc list-inside">
                {valores.map((value, index) => (
                  <div className="w-full flex items-center gap-5" key={index}>
                    <Image
                      width={100}
                      height={100}
                      alt={value.title}
                      src={value.icon}
                      className="w-16 hidden lg:block"
                    />
                    <div>
                      <li className="text-white font-extrabold text-xl">
                        {value.title}
                      </li>
                      <Typography className="text-white text-lg">
                        {value.desc}
                      </Typography>
                    </div>
                  </div>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-white flex justify-center items-center p-10">
        <div className="w-full lg:w-10/12 flex flex-col lg:flex-row gap-10">
          <Image
            width={100}
            height={100}
            alt={"quality"}
            src={"/svg/icons/QualityPolicyIcon.svg"}
            className="w-24 hidden lg:block"
          />
          <div className="w-full space-y-5">
            <div className="text-blue-950 font-extrabold text-2xl">
              {t("qualityPolicy.title")}
            </div>
            <Typography className="text-black text-lg">
              {t("qualityPolicy.desc")}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}
