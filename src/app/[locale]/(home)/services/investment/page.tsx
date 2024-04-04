"use client";
import { useInvestmentServices } from "@/services/service/service";
import { Typography } from "@material-tailwind/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function Page({ params }: { params: { locale: string } }) {
  const t = useTranslations("navbar");
  const [invest, setInvest] = useState<any>();
  const { data, isLoading } = useInvestmentServices();

  useEffect(() => {
    if (!isLoading && data) {
      setInvest(data);
      console.log(data);
    }
  }, [data, isLoading]);
  return (
    <div className="bg-white py-10 flex justify-center">
      <div className="w-10/12 flex flex-col gap-10">
        <Typography
          placeholder={undefined}
          className="text-blue-900 uppercase font-extrabold text-xl lg:text-3xl font-opensans"
        >
          {t("services.menuList.invest")}
        </Typography>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {invest?.map((item: any, index: number) => (
            <div
              className="w-full py-3 flex flex-row gap-1 border-2 border-blue-dark group hover:bg-red-700 duration-300 hover:cursor-pointer rounded-lg px-5"
              key={index}
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}/service/images/${item.id}/${item.image}`} // Use the preview URL directly
                alt={""}
                width="500"
                height="500"
                className="size-24 rounded-full object-center scale-75  duration-300" // Add bg-white for visibility
              />
              <div className="flex flex-col justify-center">
                <h1 className="font-montserrat font-bold w-full text-xl line-clamp-3 break-words text-balance text-black group-hover:text-white duration-300">
                  {params.locale === "es" ? item.es.name : item.en.name}
                </h1>
                <p className="font-light font-montserrat text-black group-hover:text-white duration-300">
                  {params.locale === "es" ? item.typeEs : item.typeEn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
