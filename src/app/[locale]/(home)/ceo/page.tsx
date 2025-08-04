"use client";
import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("CEO");
  const CEO = {
    name: t("name"),
    title: t("title"),
    description: t("description"),
    studies: {
      title: t("studies.title"),
      icon: "/svg/icons/StudiesIcon.svg",
      data: [
        {
          desc: t("studies.data.0.desc"),
        },
        {
          desc: t("studies.data.1.desc"),
        },
      ],
    },
    experience: {
      title: t("experience.title"),
      icon: "/svg/icons/ExperiencesIcon.svg",
      data: [
        {
          desc: t("experience.data.0.desc"),
        },
        {
          desc: t("experience.data.1.desc"),
        },
        {
          desc: t("experience.data.2.desc"),
        },
        {
          desc: t("experience.data.3.desc"),
        },
        {
          desc: t("experience.data.4.desc"),
        },
        {
          desc: t("experience.data.5.desc"),
        },
        {
          desc: t("experience.data.6.desc"),
        },
      ],
    },
  };
  return (
    <div>
      <div className="bg-white flex flex-col-reverse xl:flex-row items-center justify-center">
        <div className="w-6/12 xl:w-4/12 flex justify-center items-end">
          <Image
            src={"/images/bivianariveiro.png"}
            width={2504}
            height={4096}
            alt="CEO"
            className="object-contain w-96 self-end"
          />
        </div>
        <div
          className="
        w-10/12 sm:w-8/12 xl:w-4/12
        flex flex-col items-center justify-center space-y-5
        pt-24 xl:pt-0
        text-center text-blue-950
      "
        >
          <div className="flex flex-col items-center space-y-2">
            <div className="font-noctura text-5xl">{t("name")}</div>
            <div className="h-1 bg-red-700 w-8/12"></div>
            <div className="font-bold font-montserrat lg:text-lg w-10/12">
              {t("title")}
            </div>
          </div>
          <div className="font-light font-montserrat text-xs sm:text-base">
            {t("about")}
          </div>
        </div>
      </div>
      <div className="bg-blue-950 py-12 flex flex-col justify-center items-center">
        <div className="w-10/12 lg:w-8/12 space-y-5">
          <div className="flex items-center text-cyan-600 space-x-5 border-b-2 border-lightBlue-500 py-2">
            <Image
              width={100}
              height={100}
              alt={CEO.studies.title}
              src={CEO.studies.icon}
              className="w-20"
            />
            <div className="text-4xl xl:text-5xl font-extrabold">
              {CEO.studies.title}
            </div>
          </div>
          {CEO.studies.data.map((studies: any, key: any) => {
            return (
              <li className="text-white font-montserrat text-lg" key={key}>
                {studies.desc}
              </li>
            );
          })}
          <div className="flex items-center text-cyan-600 space-x-5 border-b-2 border-lightBlue-500 py-2">
            <Image
              width={100}
              height={100}
              alt={CEO.experience.title}
              src={CEO.experience.icon}
              className="w-20"
            />
            <div className="text-4xl xl:text-5xl font-extrabold">
              {CEO.experience.title}
            </div>
          </div>
          {CEO.experience.data.map((experience: any, key: any) => {
            return (
              <li className="text-white font-montserrat text-lg" key={key}>
                {experience.desc}
              </li>
            );
          })}
        </div>
      </div>
    </div>
  );
}
