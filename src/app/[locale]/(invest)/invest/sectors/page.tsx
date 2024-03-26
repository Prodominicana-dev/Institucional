import Image from "next/image";
import React from "react";

export default function Page() {
  const sectors = [
    {
      name: "Turismo",
      image: "/images/flags.jpg",
      icon: "",
    },
    {
      name: "Energía",
      image: "/images/flags.jpg",
      icon: "",
    },
    {
      name: "Tecnología",
      image: "/images/flags.jpg",
      icon: "",
    },
    {
      name: "Manufactura",
      image: "/images/flags.jpg",
      icon: "",
    },
    {
      name: "Semiconductores",
      image: "/images/flags.jpg",
      icon: "",
    },
    {
      name: "Agricultura",
      image: "/images/flags.jpg",
      icon: "",
    },
    {
      name: "Alimentos y bebidas",
      image: "/images/flags.jpg",
      icon: "",
    },
    {
      name: "Biomédicina",
      image: "/images/flags.jpg",
      icon: "",
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
    <div className="h-full relative">
      <Image
        width={1000}
        height={1000}
        src={image}
        alt={name}
        className="object-cover aspect-square rounded-xl"
      />
      <div className="absolute inset-0 p-10">
        <h1 className="rounded-full p-3 border-2 border-white text-white uppercase font-bold">
          {name}
        </h1>
      </div>
    </div>
  );
}
