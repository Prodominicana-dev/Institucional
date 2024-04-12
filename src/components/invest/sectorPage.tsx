"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

interface Sector {
  name: string;
  desc: string;
  image: string;
  video: string;
  icon: string;
  subSectors: { name: string; icon: string }[];
  incentives: { title: string; subtitle: string; list: string[] };
  relatedEntities?: { name: string; link: string; logo: string }[];
  procedures: {
    name: string;
    deliverable: string;
    link: string;
    icon: string;
  }[];
}

export default function SectorPage(sector: Sector) {
  const t = useTranslations("invest.sectors");
  return (
    <div className="bg-white h-full">
      <div className="relative h-[40vh] sm:h-[70vh]">
        <video
          playsInline
          autoPlay
          loop
          muted
          className="w-full h-full object-cover"
        >
          <source src={sector.video} type="video/mp4" />
        </video>
        <div className="absolute inset-0 flex items-end justify-end">
          <div className="flex items-center justify-center gap-3 bg-blue-dark p-8 mb-32">
            <Image
              width={100}
              height={100}
              src={sector.icon}
              alt={sector.name}
              className="object-cover w-16"
            />
            <h1 className="text-white uppercase font-bold text-xl sm:text-4xl">
              {sector.name}
            </h1>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center pt-10 bg-white">
        <div className="w-10/12">
          <div className="space-y-3">
            <h1 className="uppercase text-5xl font-bold text-blue-dark">
              {sector.name}
            </h1>
            <p className="text-lg text-gray-600">{sector.desc}</p>
          </div>
          <div className="flex justify-between py-20 px-10">
            {sector.subSectors.map((subSector, index) => (
              <div key={index} className="flex flex-col items-center gap-5">
                <Image
                  width={100}
                  height={100}
                  src={subSector.icon}
                  alt={subSector.name}
                  className="object-cover w-28 bg-lightBlue-500 p-5 rounded-sm"
                />
                <div className="text-blue-dark text-xl font-medium">
                  {subSector.name}
                </div>
              </div>
            ))}
          </div>
          <div>
            <h1 className="uppercase text-4xl font-bold text-blue-dark">
              {sector.incentives.title}
            </h1>
            <div>
              <div className="space-y-2">
                <h1 className="text-xl font-bold text-blue-dark">
                  {sector.incentives.subtitle}
                </h1>
                <ul className="list-disc list-inside">
                  {sector.incentives.list.map((item, index) => (
                    <li key={index} className="text-lg text-gray-600">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col items-center gap-10 py-10">
          <div className="w-full p-5 bg-blue-dark text-white text-center font-bold text-2xl">
            {t("procedures.title")}
          </div>
          <div className="w-8/12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14">
            {sector.procedures.map((procedure, index) => (
              <Link
                href={procedure.link}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-5 hover:scale-110 transition-transform duration-500 ease-in-out"
                key={index}
              >
                <Image
                  width={100}
                  height={100}
                  src={procedure.icon}
                  alt={procedure.name}
                  className="object-cover w-20 p-2"
                />
                <div>
                  <div className="text-gray-600 font-semibold">
                    {procedure.name}
                  </div>
                  <div className="text-gray-500">{procedure.deliverable}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        {sector.relatedEntities && (
          <div className="w-full flex flex-col items-center gap-10 py-10">
            <div className="w-full p-5 bg-blue-dark text-white text-center font-bold text-2xl">
              {t("relatedEntities")}
            </div>
            <div className="flex justify-evenly items-center gap-10 w-8/12">
              {sector.relatedEntities.map((contact, index) => (
                <Link
                  href={contact.link}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center gap-5 hover:scale-110 transition-transform duration-500 ease-in-out"
                  key={index}
                >
                  <Image
                    width={100}
                    height={100}
                    src={contact.logo}
                    alt={contact.name}
                    className="w-60 h-32"
                  />
                  <div className="text-blue-dark font-medium w-44 text-center">
                    {contact.name}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
        <div className="w-full bg-blue-dark flex flex-col items-center justify-center py-10">
          <div className="w-6/12 flex items-center">
            <div className="w-full flex flex-col gap-5 items-center text-center">
              <h1 className="text-4xl font-bold text-white">
                ¿Quieres invertir?
              </h1>
              <p className="text-gray-200 w-8/12">
                Ponte en contacto con uno de nuestros representantes de
                inversión para obtener una asesoría personalizada sobre cómo
                invertir en el sector de {sector.name}.
              </p>
              <Link
                href={"/invest/contact"}
                className="px-10 py-3 text-blue-dark text-lg font-bold bg-white rounded-full w-min"
              >
                Contáctanos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
