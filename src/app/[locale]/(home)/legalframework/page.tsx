"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Typography,
  Button,
  Spinner,
} from "@material-tailwind/react";
import { useTranslations } from "next-intl";
import { useMarcoLegalDocs } from "@/services/subsection/service";
import DocsCard from "@/components/transparencia/documents/card";
import Link from "next/link";
import { HashLoader } from "react-spinners";

export default function Page() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [marcoLegalDocs, setMarcoLegalDocs] = useState<any>([]);
  const { data: marcoLegal, isLoading } = useMarcoLegalDocs();
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

  useEffect(() => {
    if (marcoLegal && !isLoading) {
      const data = marcoLegal.map((item: any) => {
        if (item.name.toLowerCase().includes("ley")) {
          return {
            label: t("laws.title"),
            value: "ied",
            files: item.documents,
          };
        }
        if (item.name.toLowerCase().includes("decreto")) {
          return {
            label: t("decrees.title"),
            value: "idt",
            files: item.documents,
          };
        }
        if (item.name.toLowerCase().includes("resolucion")) {
          return {
            label: t("resolutions.title"),
            value: "ezf",
            files: item.documents,
          };
        }
        if (item.name.toLowerCase().includes("normativa")) {
          return {
            label: t("regulations.title"),
            value: "pm",
            files: item.documents,
          };
        }
      });
      setMarcoLegalDocs(data);
    }
  }, [marcoLegal, isLoading]);

  if (isLoading)
    return (
      <div className="w-full h-[85vh] flex justify-center items-center bg-white">
        <HashLoader />
      </div>
    );
  return (
    <div>
      <section className="h-[40vh]">
        <div className="w-full h-full relative z-0">
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
      <div className="bg-white flex justify-center py-10 min-h-[60vh]">
        <div className="w-11/12 xl:w-8/12">
          {marcoLegalDocs.length > 0 ? (
            <Tabs value={data[0].value}>
              <TabsHeader
                className="!bg-blue-950 p-5 "
                indicatorProps={{ className: "bg-lightBlue-600" }}
              >
                {marcoLegalDocs.map(({ label, value }: any, index: number) => (
                  <Tab
                    key={index}
                    value={value}
                    onClick={() => selectType(index)}
                    className="text-white "
                  >
                    {label}
                  </Tab>
                ))}
              </TabsHeader>
              <TabsBody className="">
                {marcoLegalDocs.map(({ value, files }: any) => (
                  <TabPanel
                    key={value}
                    value={value}
                    className="flex flex-col justify-center items-center gap-5"
                  >
                    {files.map((file: any, index: any) => (
                      <DocsCard doc={file} key={index} />
                    ))}
                  </TabPanel>
                ))}
              </TabsBody>
            </Tabs>
          ) : (
            <h1 className="font-bold text-3xl text-black font-montserrat p-2 relative">
              No hay documentos
            </h1>
          )}
        </div>
      </div>
    </div>
  );
}
