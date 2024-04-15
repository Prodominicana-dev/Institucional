"use client";
import { Carousel, Typography } from "@material-tailwind/react";
import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function PhotoGallerySection() {
  const images = [
    {
      src: "https://hoy.com.do/wp-content/uploads/2023/09/WhatsApp-Image-2023-09-05-at-1.36.14-PM-1.jpeg",
      alt: "news",
    },
    {
      src: "https://hoy.com.do/wp-content/uploads/2023/09/WhatsApp-Image-2023-09-05-at-1.36.14-PM-1.jpeg",
      alt: "news",
    },
    {
      src: "https://hoy.com.do/wp-content/uploads/2023/09/WhatsApp-Image-2023-09-05-at-1.36.14-PM-1.jpeg",
      alt: "news",
    },
  ];
  const t = useTranslations("PhotoGallery");
  return (
    <div className="relative w-full h-[60vh] xl:h-screen overflow-hidden flex pt-10 justify-center">
      <div className="absolute inset-0">
        <div className="absolute inset-0 border-t-[50vh] xl:border-t-[80vh] border-t-blue-950 border-r-[70vw] border-l-[30vw] border-l-blue-950 border-r-blue-950 lg:border-b-[20vh] border-b-[10vh] border-b-slate-300"></div>
        <div className="z-10 absolute w-full xl:h-[10vh] bottom-0 border-l-red-700 border-l-[30vw] lg:border-t-[10vh] border-t-[5vh] border-b-transparent lg:border-b-[20vh] border-b-[10vh] border-t-transparent"></div>
      </div>
      <div className="absolute z-20 w-10/12 xl:w-8/12 space-y-5">
        <div className="flex justify-between items-center">
          <div className="flex gap-5">
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
          <Link
            href="/gallery"
            className="w-32 text-center py-2 text-lg bg-transparent border-2 rounded-full border-white text-white font-gotham hover:bg-white hover:text-blue-950 hover:border-transparent transition-all duration-500 ease-in-out"
          >
            {t("buttonText")}
          </Link>
        </div>
        <div className="hidden xl:grid grid-cols-2 gap-10">
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
            autoplay
            loop
            className=""
            placeholder={undefined}
            navigation={() => <></>}
          >
            {images.map((image, index) => (
              <Image
                key={index}
                width={2048}
                height={1080}
                src={image.src}
                alt={image.alt}
                className="w-full h-full rounded-lg"
              />
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
}
