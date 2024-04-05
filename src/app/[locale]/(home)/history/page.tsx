import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";
export default function Page() {
  const t = useTranslations("history");
  const historyYears = {
    data: [
      {
        year: 2003,
        description: t("info.0.description"),
      },
      {
        year: 2012,
        description: t("info.1.description"),
      },
      {
        year: 2017,
        description: t("info.2.description"),
      },
      {
        year: 2020,
        description: t("info.3.description"),
      },
      {
        year: 2020,
        description: t("info.4.description"),
      },
      {
        year: 2021,
        description: t("info.5.description"),
      },
      {
        year: 2021,
        description: t("info.6.description"),
      },
      {
        year: 2021,
        description: t("info.7.description"),
      },
      {
        year: 2021,
        description: t("info.8.description"),
      },
      {
        year: 2023,
        description: t("info.9.description"),
      },
    ],
  };

  return (
    <div className="w-full bg-white flex justify-center items-center">
      <div className="w-full">
        <h2 className=" text-[#1E3059] font-bold font-montserrat text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-5xl underline flex justify-center items-center py-10">
          {t("title")}
        </h2>
        <div className="flex flex-col p-10 h-full w-full">
          {historyYears.data.map((history, index) => (
            <HistoryYear history={history} index={index} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

function HistoryYear({ history, index }: any) {
  return (
    <div
      className={`flex items-center sm:w-[calc(50%+1px)] gap-5 py-5 border-gray-700 ${
        index % 2 === 0
          ? "border-l-2 self-end"
          : "border-l-2 sm:border-l-0 sm:border-r-2"
      }`}
    >
      <div
        className={`bg-gray-700 w-24 h-[2px] ${
          index % 2 === 0 ? "" : "sm:order-last"
        }`}
      ></div>
      <h1 className="font-semibold text-lg text-black">{history.year}</h1>

      <div className="flex order-1 rounded-lg py-4 2xl:py-7">
        <div className="w-full h-full">
          <div className="text-xs lg:text-sm 2xl:text-base">
            <p className="p-5 h-full tracking-wide text-gray-900 text-opacity-100 bg-[#F6F6F6] ">
              {history.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
