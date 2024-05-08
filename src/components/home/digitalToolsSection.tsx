"use client";
import { Button, Typography } from "@material-tailwind/react";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function DigitalToolsSection() {
  const tools = [
    {
      title: "Prointeligencia",
      link: "https://prointeligencia.prodominicana.gob.do/",
      icon: "svg/logos/prointeligencia-white.svg",
      className: "bg-blue-900",
    },
    {
      title: "Capacita",
      link: "https://capacita.prodominicana.gob.do/",
      icon: "svg/logos/capacita.svg",
      className: "bg-red-700",
    },
    {
      title: "Connect",
      link: "https://connectprodominicana.gob.do/",
      icon: "svg/logos/connect.svg",
      className: "bg-red-700",
    },
    {
      title: "VUI",
      link: "https://vui.gob.do",
      icon: "svg/logos/vui.svg",
      className: "bg-blue-900",
    },
  ];
  const t = useTranslations("DigitalTools");
  return (
    <section className="flex flex-col xl:flex-row items-center justify-evenly p-10 sm:p-20 space-y-10 xl:space-y-0">
      <div className="flex flex-col space-y-5 xl:w-4/12 items-center text-center">
        <div className="text-3xl xl:text-4xl uppercase text-blue-950 font-extrabold font-opensans">
          {t("title")}
        </div>
        <div className="text-xl xl:text-xl uppercase text-cyan-600 font-opensans text-balance tracking-widest font-light">
          {t("description")}
        </div>
      </div>
      <div className="xl:w-6/12 grid grid-cols-2 gap-10 xl:gap-16">
        {tools.map((tool, index) => (
          <ToolCard
            title={tool.title}
            link={tool.link}
            icon={tool.icon}
            className={tool.className}
            key={index}
          />
        ))}
      </div>
    </section>
  );
}

function ToolCard({ title, link, icon, className }: any) {
  return (
    <Link href={link} target="_blank">
      <div className={`w-full h-40 ${className} p-10 xl:p-14`}>
        <Image
          width={2048}
          height={1080}
          src={icon}
          alt={title}
          key={title}
          className="h-full w-full object-contain object-center hover:scale-110 duration-500 ease-in-out"
        />
      </div>
    </Link>
  );
}
