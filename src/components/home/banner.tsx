"use client";
import { Typography } from "@material-tailwind/react";
import React from "react";
import Image from "next/image";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { useTranslations } from "next-intl";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Banner() {
  const t = useTranslations("DominicanRepublic");

  const banners = [
    {
      title: t("name"),
      desc: t("slogan"),
      image: "/videos/home.mp4",
    },
  ];

  const data = [
    {
      title: t("nameTitle"),
      desc: t("name"),
      icon: "svg/icons/RDMapIcon.svg",
    },
    {
      title: t("telCodeLabel"),
      desc: t("telCode"),
      icon: "svg/icons/PhoneIcon.svg",
    },
    {
      title: t("govDivisionLabel"),
      desc: t("govDivision"),
      icon: "svg/icons/MapIcon.svg",
    },
    {
      title: t("govFormLabel"),
      desc: t("govForm"),
      icon: "svg/icons/GovIcon.svg",
    },
    {
      title: t("weatherLabel"),
      desc: t("weather"),
      icon: "svg/icons/CloudsIcon.svg",
    },
    {
      title: t("languageLabel"),
      desc: t("language"),
      icon: "svg/icons/MessageIcon.svg",
    },
    {
      title: t("timeZoneLabel"),
      desc: t("timeZone"),
      icon: "svg/icons/ClockIcon.svg",
    },
    {
      title: t("currencyLabel"),
      desc: t("currency"),
      icon: "svg/icons/CoinIcon.svg",
    },
    {
      title: t("areaLabel"),
      desc: t("area"),
      icon: "svg/icons/MapPinIcon.svg",
    },
  ];
  return (
    <section className="w-full relative h-[60vh] sm:h-[95vh] xl:h-screen bg-white flex justify-center">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        className="relative w-full"
      >
        <CarouselContent>
          {banners.map(({ title, desc, image }, index) => (
            <CarouselItem
              className="relative h-[40vh] sm:h-[80vh] w-full"
              key={index}
            >
              <video
                width={3840}
                height={2160}
                src={image}
                autoPlay
                loop
                muted
                className="h-full w-full object-cover object-center"
              />
              <div className="w-6/12 sm:w-5/12 absolute inset-0 flex flex-col justify-center space-y-5 text-center">
                <Typography
                  color="white"
                  className="bg-red-700/75 text-sm font-opensans font-extrabold sm:text-5xl p-3"
                >
                  {title}
                </Typography>
                <Typography
                  color="white"
                  className="bg-blue-950/75 text-xs font-adelia sm:text-2xl p-5"
                >
                  {desc}
                </Typography>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="flex bg-blue-950 xl:px-8 h-[20vh] xl:h-[30vh] items-center w-10/12 absolute bottom-10 rounded-xl">
        <div className="hidden xl:flex justify-evenly w-full">
          {data.map(({ title, desc, icon }, index) => (
            <div
              className="w-full h-3/6 flex flex-col justify-center text-center space-y-4"
              key={index}
            >
              <div className="h-3/6">
                <Image
                  width={100}
                  height={100}
                  src={icon}
                  alt={"icon"}
                  className="h-16 w-full"
                />
              </div>
              <div className="h-3/6">
                <Typography className="text-cyan-600 font-bold text-sm font-opensans">
                  {title}
                </Typography>
                <Typography className="text-white font-bold text-xs p-1 font-opensans">
                  {desc}
                </Typography>
              </div>
            </div>
          ))}
        </div>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 2500,
            }),
          ]}
          className="flex xl:hidden w-full"
        >
          <CarouselContent>
            {data.map(({ title, desc, icon }, index) => (
              <CarouselItem
                className="w-6/12 xl:w-full h-3/6 flex flex-col justify-center text-center space-y-4"
                key={index}
              >
                <div className="h-3/6">
                  <Image
                    width={100}
                    height={100}
                    src={icon}
                    alt={"icon"}
                    className="h-16 w-full"
                  />
                </div>
                <div className="h-3/6">
                  <Typography className="text-cyan-600 font-bold text-sm font-opensans ">
                    {title}
                  </Typography>
                  <p className="text-white font-normal text-xs p-1 font-opensans">
                    {desc}
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
