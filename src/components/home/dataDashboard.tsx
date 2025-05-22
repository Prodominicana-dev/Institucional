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
          title: t("ied.data.0.title"),
          value: t("ied.data.0.value"),
        },
        {
          title: t("ied.data.1.title"),
          value: t("ied.data.1.value"),
        },
        {
          title: t("ied.data.2.title"),
          value: t("ied.data.2.value"),
        },
        {
          title: t("ied.data.3.title"),
          value: t("ied.data.3.value"),
        },
      ],
    },
    {
      label: t("en.title"),
      value: "en",
      dataset: [
        {
          title: t("en.data.0.title"),
          value: t("en.data.0.value"),
        },
        {
          title: t("en.data.1.title"),
          value: t("en.data.1.value"),
        },
        {
          title: t("en.data.2.title"),
          value: t("en.data.2.value"),
        },
        {
          title: t("en.data.3.title"),
          value: t("en.data.3.value"),
        },
      ],
    },
    {
      label: t("cap.title"),
      value: "cap",
      dataset: [
        {
          title: t("cap.data.0.title"),
          value: t("cap.data.0.value"),
        },
        {
          title: t("cap.data.1.title"),
          value: t("cap.data.1.value"),
        },
        {
          title: t("cap.data.2.title"),
          value: t("cap.data.2.value"),
        },
        {
          title: t("cap.data.3.title"),
          value: t("cap.data.3.value"),
        },
      ],
    },
    {
      label: t("pg.title"),
      value: "pg",
      dataset: [
        {
          title: t("pg.data.0.title"),
          value: t("pg.data.0.value"),
        },
        {
          title: t("pg.data.1.title"),
          value: t("pg.data.1.value"),
        },
        {
          title: t("pg.data.2.title"),
          value: t("pg.data.2.value"),
        },
        {
          title: t("pg.data.3.title"),
          value: t("pg.data.3.value"),
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
                className="bg-transparent space-x-5 "
                indicatorProps={{
                  className: "bg-transparent  border-none ",
                }}
              >
                {data.map(({ label, value }, index) => (
                  <Tab
                    key={index}
                    value={value}
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
                className="pt-5 w-[90vw]"
              >
                {data.map(({ value, dataset }: any) => (
                  <TabPanel key={value} value={value} className="flex w-full ">
                    {dataset.map((dataset: any, index: any) => (
                      <div className={`w-3/12 text-center p-2`} key={index}>
                        <h1 className="font-black text-cyan-600 sm:text-lg lg:text-xl xl:text-3xl">
                          {dataset.value}
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
