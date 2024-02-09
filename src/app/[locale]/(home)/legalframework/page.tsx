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
          <div className="absolute inset-0 bg-blue-dark/50 z-10 flex flex-col-reverse xl:flex-row justify-center xl:justify-end text-center text-white xl:p-32">
            <div className="">
              <div className="flex uppercase text-6xl font-extrabold space-x-2">
                <p>Marco</p> <p className="bg-red-700 px-2">Legal</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="bg-white flex justify-center p-20 min-h-screen">
        <div className="w-8/12">
          <Tabs value={data[0].value}>
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
                      ? "bg-blue-950 ease-in border-2 border-blue-950"
                      : "bg-cyan-600 ease-in border-2 border-lightBlue-600"
                  } text-white rounded-t-2xl h-34  p-3  duration-300 font-montserrat`}
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
                      className={`w-full border-2 border-gray-300 rounded-xl p-8 flex items-center justify-between `}
                      key={index}
                    >
                      <div className="flex items-center gap-3">
                        <Image
                          width={100}
                          height={100}
                          alt={file.title}
                          src={"/svg/icons/PdfIcon.svg"}
                          className="w-12"
                        />
                        <div>
                          <Typography
                            placeholder={undefined}
                            className="text-lg text-black uppercase font-bold"
                          >
                            {file.title}
                          </Typography>
                          <div className="flex gap-5">
                            <Typography
                              placeholder={undefined}
                              className=" text-black uppercase font-medium"
                            >
                              {file.size}
                            </Typography>
                            <Typography
                              placeholder={undefined}
                              className=" text-black font-medium"
                            >
                              {"Fecha de publicación: 12/12/2021"}
                            </Typography>
                          </div>
                        </div>
                      </div>
                      <Button
                        placeholder={undefined}
                        className="bg-transparent border-2 border-red-600 text-red-600"
                      >
                        Descargar
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
