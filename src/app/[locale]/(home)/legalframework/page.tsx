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
import { FolderOpenIcon } from "@heroicons/react/24/solid";

export default function Page() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [marcoLegalDocs, setMarcoLegalDocs] = useState<any>([]);
  const { data: marcoLegal, isLoading } = useMarcoLegalDocs();
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const selectType = (value: number) => {
    setActiveIndex(value);
    setPreviousIndex(activeIndex);
  };

  const goBack = () => {
    if (previousIndex !== null) {
      setActiveIndex(previousIndex);
      setPreviousIndex(null);
    }
  };
  console.log("activeIndex", activeIndex);

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
            <div>
              <div className="flex uppercase text-4xl sm:text-6xl font-extrabold space-x-2">
                <p>{t("title").split(" ")[0]}</p>
                <p className="bg-red-700 px-2">{t("title").split(" ")[1]}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-white flex justify-center py-10 min-h-[60vh]">
        <div className="w-11/12 xl:w-8/12">
          {marcoLegalDocs.length > 0 ? (
            <div className="flex flex-col xl:flex-row gap-10">
              <div className="hidden xl:block w-full xl:w-1/4 bg-blue-950 p-5 rounded-lg">
                {marcoLegalDocs.map(({ label }: any, index: number) => (
                  <div
                    key={index}
                    onClick={() => selectType(index)}
                    className={`py-2 px-3 hover:bg-blue-900 cursor-pointer transition-colors duration-200 rounded-md my-16 whitespace-normal ${
                      activeIndex === index ? "bg-blue-900" : ""
                    }`}
                  >
                    <p className="text-white text-center">{label}</p>
                  </div>
                ))}
              </div>

              <div className="w-full xl:w-3/4">
                {activeIndex === 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                    {marcoLegalDocs.map(
                      ({ value, files, label }: any, index: number) => (
                        <div
                          key={value}
                          onClick={() => selectType(index)}
                          className="p-4 border border-gray-200 rounded-lg shadow-sm bg-white cursor-pointer"
                        >
                          <div className="flex items-center gap-3">
                            <FolderOpenIcon className="h-10 w-10 text-orange-300" />
                            <div>
                              <h3 className="font-medium text-gray-900">
                                {label}
                              </h3>
                              <p className="text-sm text-gray-500">
                                {files.length}{" "}
                                {files.length === 1 ? "archivo" : "archivos"}
                              </p>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                )}

                {activeIndex !== null && marcoLegalDocs[activeIndex] && (
                  <div className="flex flex-col gap-5 mt-6">
                    <div>
                      {activeIndex > 0 && marcoLegalDocs[activeIndex - 1] && (
                        <div
                          onClick={goBack}
                          className="flex flex-row cursor-pointer mb-4"
                        >
                          <p className="text-base font-bold text-blue-950">
                            ← Regresar a{" "}
                            {previousIndex !== null &&
                            marcoLegalDocs[previousIndex]
                              ? marcoLegalDocs[previousIndex].label
                              : ""}
                          </p>
                        </div>
                      )}
                      <h2
                        className={`${
                          activeIndex > 0 ? "flex flex-row" : "hidden"
                        } text-2xl font-bold text-blue-950 mb-4}`}
                      >
                        {marcoLegalDocs[activeIndex].label}
                      </h2>
                    </div>

                    {marcoLegalDocs[activeIndex].files.map(
                      (file: any, i: number) => (
                        <DocsCard doc={file} key={i} />
                      )
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <h1 className="font-bold text-3xl text-black font-montserrat p-2">
              No hay documentos
            </h1>
          )}
        </div>
      </div>
    </div>
  );
}
