"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Carousel } from "@material-tailwind/react";
import { useTranslations } from "next-intl";
import React from "react";

export default function Page() {
  const [activeIndex, setActiveIndex] = useState(0);
  const autoplayDelay = 10000; //
  const t = useTranslations("invest.sectors");

  const sectors = [
    {
      id: 0,
      name: t("list.0.name"),
      link: "tourism",
      video: "/videos/invest/tourism.mp4",
    },
    {
      id: 1,
      name: t("list.1.name"),
      link: "energy",
      video: "/videos/invest/energy.mp4",
    },
    {
      id: 2,
      name: t("list.2.name"),
      link: "technology",
      video: "/videos/invest/technology.mp4",
    },
    {
      id: 3,
      name: t("list.3.name"),
      link: "manufacturing",
      video: "/videos/invest/manufacturing.mp4",
    },
    {
      id: 4,
      name: t("list.4.name"),
      link: "semiconductors",
      video: "/videos/invest/semiconductors.mp4",
    },
    {
      id: 5,
      name: t("list.5.name"),
      link: "agriculture-and-livestock-farming",
      video: "/videos/invest/agriculture.mp4",
    },
    {
      id: 6,
      name: t("list.6.name"),
      link: "biomedicine",
      video: "/videos/invest/biomedicine.mp4",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) =>
        prevIndex === sectors.length - 1 ? 0 : prevIndex + 1
      );
    }, autoplayDelay);

    return () => clearInterval(interval);
  }, [sectors.length]);

  return (
    <div className="h-screen relative">
      <div className="h-full relative z-0">
        {sectors.map((sector, index) => (
          <div
            key={sector.id}
            className={`w-full h-full absolute transition-opacity duration-500 ${
              activeIndex === index ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <SectorVideo sector={sector} />
          </div>
        ))}
      </div>

      <div className="absolute bottom-4 left-2/4 z-20 flex -translate-x-2/4 gap-2">
        {sectors.map((_, i) => (
          <span
            key={i}
            className={`block h-1 cursor-pointer rounded-2xl transition-all ${
              activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
            }`}
            onClick={() => setActiveIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}

function SectorVideo({ sector }: any) {
  return (
    <div className="w-full h-full relative">
      <video
        playsInline
        autoPlay
        loop
        muted
        className="w-full h-full object-cover"
      >
        <source src={sector.video} type="video/mp4" />
      </video>
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="w-10/12 h-4/6 flex flex-col gap-5 justify-end">
          <h1 className="text-3xl lg:text-6xl font-bold text-white uppercase">
            {sector.name}
          </h1>
          <Link
            href={`/invest/sectors/${sector.link}`}
            className="bg-white w-44 lg:w-2/12 p-2 lg:p-4 text-blue-dark font-bold text-lg lg:text-xl text-center rounded-full"
          >
            Conoce más
          </Link>
        </div>
      </div>
    </div>
  );
}
