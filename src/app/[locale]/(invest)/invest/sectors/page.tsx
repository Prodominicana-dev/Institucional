import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Page() {
  const sectors = [
    {
      name: "Turismo",
      image: "/images/flags.jpg",
      icon: "/svg/invest/energyIcon.svg",
    },
    {
      name: "Energía",
      image: "/images/flags.jpg",
      icon: "/svg/invest/energyIcon.svg",
    },
    {
      name: "Tecnología",
      image: "/images/flags.jpg",
      icon: "/svg/invest/energyIcon.svg",
    },
    {
      name: "Manufactura",
      image: "/images/flags.jpg",
      icon: "/svg/invest/energyIcon.svg",
    },
    {
      name: "Semiconductores",
      image: "/images/flags.jpg",
      icon: "/svg/invest/energyIcon.svg",
    },
    {
      name: "Agricultura",
      image: "/images/flags.jpg",
      icon: "/svg/invest/energyIcon.svg",
    },
    {
      name: "Alimentos y bebidas",
      image: "/images/flags.jpg",
      icon: "/svg/invest/energyIcon.svg",
    },
    {
      name: "Biomédicina",
      image: "/images/flags.jpg",
      icon: "/svg/invest/energyIcon.svg",
    },
  ];

  return (
    <div>
      <div className="relative">
        <Image
          width={3840}
          height={2160}
          src="/images/flags.jpg"
          alt="Turismo"
          className="object-cover w-full h-[40vh] sm:h-[70vh]"
        />
      </div>
      <div className="bg-white h-full flex flex-col items-center py-10 gap-10">
        <div className="text-center">
          <h1 className="uppercase text-4xl font-bold text-blue-dark">
            sectores para invertir en RD
          </h1>
          <p className="text-gray-400">
            Sectores que representan oportunidades de inversion en el pais
          </p>
        </div>
        <div className="w-10/12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {sectors.map((sector, index) => (
            <SectorCard
              name={sector.name}
              image={sector.image}
              icon={sector.icon}
              key={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function SectorCard({ name, image, icon }: any) {
  return (
    <Link href={`invest/sectors/${name}`} className="h-full relative">
      <Image
        width={1000}
        height={1000}
        src={image}
        alt={name}
        className="object-cover aspect-square rounded-xl"
      />
      <div className="absolute inset-0 p-5 xl:p-10 flex flex-col justify-between">
        <div className="flex h-full items-end">
          <div className="border-t-2 border-l-2 rounded-tl-3xl border-white translate-y-6 w-full h-[98%]"></div>
          <Image
            width={100}
            height={100}
            src={icon}
            alt={name}
            className="w-16 aspect-square self-start border-l-2 border-white p-1"
          />
        </div>
        <h1 className="rounded-full p-3 border-2 border-white text-white uppercase font-bold text-sm lg:text-lg">
          {name}
        </h1>
      </div>
    </Link>
  );
}
