"use client";

import Image from "next/image";
import React, { useState } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { useTranslations } from "next-intl";

export default function DataDashboard() {
  const t = useTranslations("DataDashboard");
  const data = [
    {
      label: t("ied.title"),
      value: "ied",
      dataset: [
        {
          title: "IED stock últimos 10 años",
          total: "USD$27,401.5 MM",
        },
        {
          title: "IED 2021",
          total: "USD$3,102.1 MM",
        },
        {
          title: "IED enero-septiembre 2022",
          total: "USD$3,957.7 MM",
        },
        {
          title: "Proyecciones de IED a cierre del año 2022",
          total: "USD$4,000 MM",
        },
      ],
    },
    {
      label: t("it.title"),
      value: "idt",
      dataset: [
        {
          title: "IED stock últimos 10 años",
          total: "USD$27,401.5 MM",
        },
        {
          title: "IED 2021",
          total: "USD$3,102.1 MM",
        },
        {
          title: "IED enero-septiembre 2022",
          total: "USD$3,957.7 MM",
        },
        {
          title: "Proyecciones de IED a cierre del año 2022",
          total: "USD$4,000 MM",
        },
      ],
    },
    {
      label: t("ezf.title"),
      value: "ezf",
      dataset: [
        {
          title: "IED stock últimos 20 años",
          total: "USD$27,401.5 MM",
        },
        {
          title: "IED 2021",
          total: "USD$3,102.1 MM",
        },
        {
          title: "IED enero-septiembre 2022",
          total: "USD$3,957.7 MM",
        },
        {
          title: "Proyecciones de IED a cierre del año 2022",
          total: "USD$4,000 MM",
        },
      ],
    },
    {
      label: t("pm.title"),
      value: "pm",
      dataset: [
        {
          title: "IED stock últimos 10 años",
          total: "USD$27,401.5 MM",
        },
        {
          title: "IED 2021",
          total: "USD$3,102.1 MM",
        },
        {
          title: "IED enero-septiembre 2022",
          total: "USD$3,957.7 MM",
        },
        {
          title: "Proyecciones de IED a cierre del año 2022",
          total: "USD$4,000 MM",
        },
      ],
    },
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  const selectType = (value: number) => {
    setActiveIndex(value);
  };

  return (
    <section className="hidden sm:block relative w-full h-[60vh] lg:h-[60vh] overflow-hidden">
      <div className="w-full h-full relative">
        <Image
          src={"/images/business-image.jpg"}
          width={6000}
          height={2195}
          alt="foto"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-blue-dark/90 z-10"></div>
        <div className="absolute inset-0 flex flex-col space-y-10 items-center justify-center z-20 p-20">
          <h1 className="text-white text-3xl font-extrabold uppercase font-opensans">
            {t("title")}
          </h1>
          <div className="flex flex-col space-y-10 w-full justify-center items-center">
            <Tabs id="custom-animation" value={data[0].value}>
              <TabsHeader
                placeholder={undefined}
                className="bg-transparent space-x-5 "
                indicatorProps={{
                  className: "bg-transparent  border-none ",
                }}
              >
                {data.map(({ label, value }, index) => (
                  <Tab
                    key={index}
                    value={value}
                    placeholder={undefined}
                    onClick={() => selectType(index)}
                    className={` ${
                      activeIndex === index
                        ? "bg-red-600 ease-in border-2 border-red-600"
                        : "bg-transparent ease-in border-2 border-cyan-600"
                    } text-white rounded-xl h-34  p-3  duration-300 font-montserrat`}
                  >
                    {label}
                  </Tab>
                ))}
              </TabsHeader>
              <TabsBody
                animate={{
                  initial: { y: 250 },
                  mount: { y: 0 },
                  unmount: { y: 250 },
                }}
                placeholder={undefined}
                className="pt-5 w-[90vw]"
              >
                {data.map(({ value, dataset }: any) => (
                  <TabPanel key={value} value={value} className="flex w-full ">
                    {dataset.map((dataset: any, index: any) => (
                      <div className={`w-3/12 text-center p-2`} key={index}>
                        <h1 className="font-black text-cyan-600 sm:text-lg lg:text-xl xl:text-3xl">
                          {dataset.total}
                        </h1>
                        <p className="font-bold text-white sm:text-sm lg:text-base">
                          {dataset.title}
                        </p>
                      </div>
                    ))}
                  </TabPanel>
                ))}
              </TabsBody>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
}
