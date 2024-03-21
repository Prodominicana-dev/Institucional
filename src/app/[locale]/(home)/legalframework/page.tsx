"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useTranslations } from "next-intl";
import { title } from "process";

export default function Page() {
  const [activeIndex, setActiveIndex] = useState(0);
  const selectType = (value: number) => {
    setActiveIndex(value);
  };
  const t = useTranslations("legal");
  const t2 = useTranslations("commonWords");
  const data = [
    {
      label: t("laws.title"),
      value: "ied",
      files: [
        {
          title: "Decreto 143-17 / Que crea las Comisiones de Ética Pública",
          size: "1 MB",
        },
        {
          title: "Decreto 143-17 / Que crea las Comisiones de Ética Pública",
          size: "1 MB",
        },
        {
          title: "Decreto 143-17 / Que crea las Comisiones de Ética Pública",
          size: "1 MB",
        },
        {
          title: "Decreto 143-17 / Que crea las Comisiones de Ética Pública",
          size: "1 MB",
        },
      ],
    },
    {
      label: t("decrees.title"),
      value: "idt",
      files: [
        {
          title: "Decreto 143-17 / Que crea las Comisiones de Ética Pública",
          size: "1 MB",
        },
      ],
    },
    {
      label: t("resolutions.title"),
      value: "ezf",
      files: [
        {
          title: "Decreto 143-17 / Que crea las Comisiones de Ética Pública",
          size: "1 MB",
        },
        {
          title: "Decreto 143-17 / Que crea las Comisiones de Ética Pública",
          size: "1 MB",
        },
        {
          title: "Decreto 143-17 / Que crea las Comisiones de Ética Pública",
          size: "1 MB",
        },
      ],
    },
    {
      label: t("regulations.title"),
      value: "pm",
      files: [
        {
          title: "Decreto 143-17 / Que crea las Comisiones de Ética Pública",
          size: "1 MB",
        },
        {
          title: "Decreto 143-17 / Que crea las Comisiones de Ética Pública",
          size: "1 MB",
        },
        {
          title: "Decreto 143-17 / Que crea las Comisiones de Ética Pública",
          size: "1 MB",
        },
        {
          title: "Decreto 143-17 / Que crea las Comisiones de Ética Pública",
          size: "1 MB",
        },
        {
          title: "Decreto 143-17 / Que crea las Comisiones de Ética Pública",
          size: "1 MB",
        },
        {
          title: "Decreto 143-17 / Que crea las Comisiones de Ética Pública",
          size: "1 MB",
        },
        {
          title: "Decreto 143-17 / Que crea las Comisiones de Ética Pública",
          size: "1 MB",
        },
        {
          title: "Decreto 143-17 / Que crea las Comisiones de Ética Pública",
          size: "1 MB",
        },
      ],
    },
  ];
  return (
    <div>
      <section className="h-[40vh]">
        <div className="w-full h-full relative">
          <Image
            src={"/images/prodominicanabuilding.jpg"}
            width={6000}
            height={2195}
            alt="foto"
            className="object-cover object-top w-full h-full"
          />
          <div className="absolute inset-0 bg-blue-dark/50 z-10 flex flex-col-reverse xl:flex-row justify-center items-center xl:items-start xl:justify-end text-center text-white xl:p-32">
            <div className="">
              <div className="flex uppercase text-4xl sm:text-6xl font-extrabold space-x-2">
                <p>{t("title").split(" ")[0]}</p>{" "}
                <p className="bg-red-700 px-2">{t("title").split(" ")[1]}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="bg-white flex justify-center py-10 min-h-screen">
        <div className="w-10/12 xl:w-8/12">
          <Tabs value={data[0].value}>
            <TabsHeader
              placeholder={undefined}
              className="!bg-blue-950 p-5"
              indicatorProps={{ className: "bg-lightBlue-600" }}
            >
              {data.map(({ label, value }, index) => (
                <Tab
                  key={index}
                  value={value}
                  placeholder={undefined}
                  onClick={() => selectType(index)}
                  className="text-white"
                >
                  {label}
                </Tab>
              ))}
            </TabsHeader>
            <TabsBody placeholder={undefined} className="">
              {data.map(({ value, files }: any) => (
                <TabPanel
                  key={value}
                  value={value}
                  className="flex flex-col justify-center items-center gap-5"
                >
                  {files.map((file: any, index: any) => (
                    <div
                      className={`w-full border-2 border-gray-300 rounded-xl p-5 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-3`}
                      key={index}
                    >
                      <div className="flex flex-col sm:flex-row items-center gap-3">
                        <Image
                          width={100}
                          height={100}
                          alt={file.title}
                          src={"/svg/icons/PdfIcon.svg"}
                          className="w-12"
                        />
                        <div className="space-y-3 sm:space-y-0">
                          <Typography
                            placeholder={undefined}
                            className="text-lg text-black uppercase font-bold"
                          >
                            {file.title}
                          </Typography>
                          <div className="w-full flex gap-5">
                            <Typography
                              placeholder={undefined}
                              className=" text-black font-medium w-auto"
                            >
                              {t2("size")}: {file.size}
                            </Typography>
                            <Typography
                              placeholder={undefined}
                              className=" text-black font-medium"
                            >
                              {t2("date")}: {"12/12/2021"}
                            </Typography>
                          </div>
                        </div>
                      </div>
                      <Button
                        placeholder={undefined}
                        className="bg-transparent border-2 border-red-600 text-red-600 hover:text-white hover:bg-red-600 duration-300 w-full sm:w-auto"
                      >
                        {t2("download")}
                      </Button>
                    </div>
                  ))}
                </TabPanel>
              ))}
            </TabsBody>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
