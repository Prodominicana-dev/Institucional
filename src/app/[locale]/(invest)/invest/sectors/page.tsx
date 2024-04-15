import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Page() {
  const t = useTranslations("invest.sectors");
  const sectors = [
    {
      name: t("list.0.name"),
      image: "/images/invest/sectors/tourism.jpg",
      icon: "/svg/invest/sectors/tourismIcon.svg",
      link: "/invest/sectors/tourism",
    },
    {
      name: t("list.1.name"),
      image: "/images/invest/sectors/energy.jpg",
      icon: "/svg/invest/sectors/energyIcon.svg",
      link: "/invest/sectors/energy",
    },
    {
      name: t("list.2.name"),
      image: "/images/invest/sectors/technology.jpg",
      icon: "/svg/invest/sectors/technologyIcon.svg",
      link: "/invest/sectors/technology",
    },
    {
      name: t("list.3.name"),
      image: "/images/invest/sectors/manufacturing.jpg",
      icon: "/svg/invest/sectors/manufacturingIcon.svg",
      link: "/invest/sectors/manufacturing",
    },
    {
      name: t("list.4.name"),
      image: "/images/invest/sectors/semiconductors.jpg",
      icon: "/svg/invest/sectors/semiconductorsIcon.svg",
      link: "/invest/sectors/semiconductors",
    },
    {
      name: t("list.5.name"),
      image: "/images/invest/sectors/agriculture.jpg",
      icon: "/svg/invest/sectors/agricultureIcon.svg",
      link: "/invest/sectors/agriculture-and-livestock-farming",
    },
    {
      name: t("list.6.name"),
      image: "/images/invest/sectors/biomedicine.jpg",
      icon: "/svg/invest/sectors/biomedicineIcon.svg",
      link: "/invest/sectors/biomedicine",
    },
    {
      name: t("list.7.name"),
      image: "/images/invest/sectors/film.jpg",
      icon: "/svg/invest/sectors/filmIcon.svg",
      link: "/invest/sectors/film",
    },
    {
      name: t("list.8.name"),
      image: "/images/invest/sectors/realestate.jpg",
      icon: "/svg/invest/sectors/realestateIcon.svg",
      link: "/invest/sectors/real-estate",
    },
  ];

  return (
    <div>
      <div className="relative h-[40vh] sm:h-[70vh]">
        <video
          playsInline
          autoPlay
          loop
          muted
          className="w-full h-full object-cover"
        >
          <source src={"/videos/invest/sectors.mp4"} type="video/mp4" />
        </video>
      </div>
      <div className="bg-white h-full flex flex-col items-center py-10 gap-10">
        <div className="text-center">
          <h1 className="uppercase text-4xl font-bold text-blue-dark">
            {t("title")}
          </h1>
          <p className="text-gray-400">{t("description")}</p>
        </div>
        <div className="w-10/12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {sectors.map((sector, index) => (
            <SectorCard
              name={sector.name}
              image={sector.image}
              icon={sector.icon}
              link={sector.link}
              key={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function SectorCard({ name, image, icon, link }: any) {
  return (
    <Link
      href={`${link}`}
      className="h-full rounded-xl overflow-hidden relative group"
    >
      <Image
        width={1000}
        height={1000}
        src={image}
        alt={name}
        className="object-cover aspect-square  group-hover:scale-110 transition-transform duration-500 ease-in-out"
      />
      <div className="absolute inset-0 p-5 xl:p-10 flex flex-col justify-between">
        <div className="flex h-full items-end">
          <div className="border-t-2 border-l-2 rounded-tl-3xl border-white translate-y-6 w-full h-[98%]"></div>
          <Image
            width={100}
            height={100}
            src={icon}
            alt={name}
            className="w-16 aspect-square self-start border-l-2 border-white pl-2"
          />
        </div>
        <h1 className="rounded-full p-3 border-2 border-white text-white uppercase font-bold text-sm lg:text-lg">
          {name}
        </h1>
      </div>
    </Link>
  );
}
