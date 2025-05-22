"use client";
import { Carousel, Typography } from "@material-tailwind/react";
import React from "react";
import Image from "next/image";

interface BannerProps {
  title: string;
  background: string;
  image: string;
}

interface BannerListProps {
  banners: BannerProps[];
}

export default function Banner({ banners }: BannerListProps) {
  return (
    <Carousel
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
          {new Array(length).fill("").map((_, i) => (
            <span
              key={i}
              className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
              }`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      )}
      className="h-[50vh]"
      autoplay
      loop
    >
      {banners.map((banner, index) => (
        <div className="relative h-full w-full" key={index}>
          <Image
            width={2048}
            height={1080}
            src={banner.image}
            alt={banner.title}
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 flex flex-col sm:flex-row text-center h-full w-full justify-center items-center bg-black/50 space-x-5">
            <Image
              width={2048}
              height={1080}
              src={banner.image}
              alt={banner.title}
              key={banner.title}
              className="h-52 w-52 object-cover object-center"
            />
            <Typography color="white" className="text-3xl sm:text-5xl">
              {banner.title}
            </Typography>
          </div>
        </div>
      ))}
    </Carousel>
  );
}
