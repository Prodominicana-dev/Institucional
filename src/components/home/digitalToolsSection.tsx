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
    <section className="flex flex-col lg:flex-row items-center justify-evenly p-10 sm:p-20 space-y-10 lg:space-y-0">
      <div className="flex flex-col space-y-5 sm:w-8/12 lg:w-4/12 items-center text-center">
        <Typography
          className="text-3xl lg:text-4xl uppercase text-blue-950 font-extrabold font-opensans"
          placeholder={undefined}
        >
          {t("title")}
        </Typography>
        <Typography
          className="text-lg lg:text-xl uppercase text-cyan-600 font-montserrat tracking-widest"
          placeholder={undefined}
        >
          {t("description")}
        </Typography>
      </div>
      <div className="lg:w-6/12 grid grid-cols-2 gap-10 lg:gap-16">
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
      <div className={`w-full h-20 lg:h-40 ${className}`}>
        <Image
          width={2048}
          height={1080}
          src={icon}
          alt={title}
          key={title}
          className="h-full w-full object-contain object-center p-7 lg:p-14 hover:scale-110 duration-500 ease-in-out"
        />
      </div>
    </Link>
  );
}
