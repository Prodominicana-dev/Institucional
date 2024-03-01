import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";
export default function page() {
  const historyYears = [
    {
      year: 2020,
      description:
        "El Centro de Exportación e Inversión de la República Dominicana (ProDominicana) mantiene un elevado compromiso con el desarrollo del país al fomentar el incremento de la exportación y la inversión extranjera directa, a través de un servicio integral que satisface las necesidades de exportadores",
      image: "/images/2020.png",
    },
    {
      year: 2020,
      description:
        "El Centro de Exportación e Inversión de la República Dominicana (ProDominicana) mantiene un elevado compromiso con el desarrollo del país al fomentar el incremento de la exportación y la inversión extranjera directa, a través de un servicio integral que satisface las necesidades de exportadores",
      image: "/images/2020.png",
    },
    {
      year: 2020,
      description:
        "El Centro de Exportación e Inversión de la República Dominicana (ProDominicana) mantiene un elevado compromiso con el desarrollo del país al fomentar el incremento de la exportación y la inversión extranjera directa, a través de un servicio integral que satisface las necesidades de exportadores",
      image: "/images/2020.png",
    },
    {
      year: 2020,
      description:
        "El Centro de Exportación e Inversión de la República Dominicana (ProDominicana) mantiene un elevado compromiso con el desarrollo del país al fomentar el incremento de la exportación y la inversión extranjera directa, a través de un servicio integral que satisface las necesidades de exportadores",
      image: "/images/2020.png",
    },
    {
      year: 2020,
      description:
        "El Centro de Exportación e Inversión de la República Dominicana (ProDominicana) mantiene un elevado compromiso con el desarrollo del país al fomentar el incremento de la exportación y la inversión extranjera directa, a través de un servicio integral que satisface las necesidades de exportadores",
      image: "/images/2020.png",
    },
  ];
  const t = useTranslations("history");
  return (
    <div className="  mx-auto w-full h-full bg-white flex justify-center items-center">
      <div className=" bg-whiteh-[135vh] w-full">
        <h2 className=" text-[#1E3059] font-bold font-montserrat text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-5xl underline flex justify-center items-center py-10">
          {t("title")}
        </h2>
        <div className="flex flex-col p-10 h-full w-full  ">
          {historyYears.map((history, index) => (
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
      <h1 className="font-semibold text-lg text-black">2002</h1>

      <div className=" flex order-1 rounded-lg py-4 2xl:py-7">
        <div className="w-full h-full xl:flex">
          <div className="w-full">
            <Image
              src={"/images/prodominicanabuilding.jpg"}
              width={1500}
              height={1500}
              className="   items-start w-full h-full mt-[2px] "
              alt=""
            />
          </div>
          <div className=" text-xs  lg:text-sm 2xl:text-base ">
            <p className=" p-5  h-full   tracking-wide text-gray-900 text-opacity-100 bg-[#F6F6F6] ">
              {history.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
