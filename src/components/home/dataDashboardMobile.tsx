"use client";

import Image from "next/image";
import React, { useState, useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
//import { Carousel } from "@material-tailwind/react";
import { Carousel } from "@mantine/carousel";
import { useTranslations } from "next-intl";

export default function DataDashboardMobile() {
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
  const [title, setTitle] = useState(data[0].label);
  const autoplay = useRef(Autoplay({ delay: 5000 }));

  return (
    <section className="sm:hidden relative w-full h-[60vh] ">
      <div className="w-full h-full relative">
        <Image
          src={"/images/business-image.jpg"}
          width={6000}
          height={2195}
          alt="foto"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-blue-dark/90 z-10"></div>
        <div className="absolute inset-0 flex flex-col space-y-5 items-center justify-center z-20 p-5  h-full">
          <h1 className="text-white text-3xl font-extrabold font-opensans">
            {t("title")}
          </h1>
          <Carousel
            className="w-full"
            withIndicators={false}
            withControls={false}
            loop
            plugins={[autoplay.current]}
          >
            {data.map(({ dataset, label, value }, index) => (
              <Carousel.Slide key={index}>
                <div className="w-full flex flex-col space-y-5 justify-center items-center">
                  <div
                    id="title"
                    className="w-10/12 h-20 bg-red-600 rounded-lg flex justify-center items-center p-5"
                  >
                    <div className="text-white font-bold text-center text-xl font-montserrat">
                      {label}
                    </div>
                  </div>
                  <div className="w-full flex flex-col space-y-2 justify-center items-center">
                    {dataset.map(({ title, total }, index) => (
                      <div
                        key={index}
                        className="flex flex-col justify-center items-center"
                      >
                        <label className="text-2xl font-bold text-cyan-600">
                          {total}
                        </label>
                        <label className="text-sm font-normal text-white">
                          {title}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </Carousel.Slide>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}
