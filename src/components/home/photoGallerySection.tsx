"use client";
import { Typography } from "@material-tailwind/react";
import React, { useRef } from "react";
import Image from "next/image";
import { Carousel } from "@mantine/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useTranslations } from "next-intl";

export default function PhotoGallerySection() {
  const t = useTranslations("PhotoGallery");
  const autoplay = useRef(Autoplay({ delay: 5000 }));
  return (
    <div className="relative w-full h-[60vh] xl:h-screen overflow-hidden flex pt-10 justify-center">
      <div className="absolute inset-0">
        <div className="absolute inset-0 border-t-[50vh] xl:border-t-[80vh] border-t-blue-950 border-r-[70vw] border-l-[30vw] border-l-blue-950 border-r-blue-950 lg:border-b-[20vh] border-b-[10vh] border-b-slate-300"></div>
        <div className="z-10 absolute w-full xl:h-[10vh] bottom-0 border-l-red-700 border-l-[30vw] lg:border-t-[10vh] border-t-[5vh] border-b-transparent lg:border-b-[20vh] border-b-[10vh] border-t-transparent"></div>
      </div>
      <div className="absolute z-20 w-10/12 xl:w-8/12 space-y-5">
        <div className="flex items-center space-x-2">
          <Image
            width={100}
            height={100}
            src={"svg/icons/PicIcon.svg"}
            alt={"news"}
            className="w-14 sm:w-20"
          />
          <div>
            <Typography
              placeholder={undefined}
              className="sm:text-lg text-white uppercase font-light font-opensans"
            >
              {t("miniTitle")}
            </Typography>
            <Typography
              placeholder={undefined}
              className="text-2xl sm:text-4xl text-white font-bold font-opensans"
            >
              {t("title")}
            </Typography>
          </div>
        </div>
        <div className="hidden sm:grid grid-cols-2 gap-10">
          <div className="col-span-2 md:col-span-1">
            <Image
              width={2048}
              height={1080}
              src={
                "https://hoy.com.do/wp-content/uploads/2023/09/WhatsApp-Image-2023-09-05-at-1.36.14-PM-1.jpeg"
              }
              alt={"news"}
              className="w-full h-full"
            />
          </div>
          <div className="md:flex md:flex-col md:col-span-1 gap-10">
            <div className="flex gap-10">
              <Image
                width={2048}
                height={1080}
                src={
                  "https://hoy.com.do/wp-content/uploads/2023/09/WhatsApp-Image-2023-09-05-at-1.36.14-PM-1.jpeg"
                }
                alt={"news"}
                className="w-6/12"
              />
              <Image
                width={2048}
                height={1080}
                src={
                  "https://hoy.com.do/wp-content/uploads/2023/09/WhatsApp-Image-2023-09-05-at-1.36.14-PM-1.jpeg"
                }
                alt={"news"}
                className="w-6/12"
              />
            </div>
            <div className="flex gap-10">
              <Image
                width={2048}
                height={1080}
                src={
                  "https://hoy.com.do/wp-content/uploads/2023/09/WhatsApp-Image-2023-09-05-at-1.36.14-PM-1.jpeg"
                }
                alt={"news"}
                className="w-6/12"
              />
              <Image
                width={2048}
                height={1080}
                src={
                  "https://hoy.com.do/wp-content/uploads/2023/09/WhatsApp-Image-2023-09-05-at-1.36.14-PM-1.jpeg"
                }
                alt={"news"}
                className="w-6/12"
              />
            </div>
          </div>
        </div>
        <div className="block xl:hidden">
          <Carousel
            withIndicators={false}
            withControls={false}
            slideSize={{ base: "100%" }}
            slideGap={{ base: 0, sm: "md" }}
            height={260}
            loop
            align="start"
            plugins={[autoplay.current]}
            onMouseEnter={autoplay.current.stop}
            onMouseLeave={autoplay.current.reset}
            classNames={{ indicators: "fill-black" }}
            className=""
          >
            <Image
              width={2048}
              height={1080}
              src={
                "https://hoy.com.do/wp-content/uploads/2023/09/WhatsApp-Image-2023-09-05-at-1.36.14-PM-1.jpeg"
              }
              alt={"news"}
              className="w-full h-full"
            />
            <Image
              width={2048}
              height={1080}
              src={
                "https://hoy.com.do/wp-content/uploads/2023/09/WhatsApp-Image-2023-09-05-at-1.36.14-PM-1.jpeg"
              }
              alt={"news"}
              className="w-full h-full"
            />
            <Image
              width={2048}
              height={1080}
              src={
                "https://hoy.com.do/wp-content/uploads/2023/09/WhatsApp-Image-2023-09-05-at-1.36.14-PM-1.jpeg"
              }
              alt={"news"}
              className="w-full h-full"
            />
          </Carousel>
        </div>
      </div>
    </div>
  );
}
