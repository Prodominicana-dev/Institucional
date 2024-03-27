import React from "react";
import Image from "next/image";

export default function Page() {
  const sector = {
    name: "Energía Renovable",
    image: "/images/flags.jpg",
    icon: "/svg/invest/energyIcon.svg",
  };
  return (
    <div className="bg-white h-full">
      <div className="relative">
        <Image
          width={3840}
          height={2160}
          src="/images/flags.jpg"
          alt="Turismo"
          className="object-cover w-full h-[40vh] sm:h-[70vh]"
        />
        <div className="absolute inset-0 xl:p-32 pb-20 flex items-end justify-center lg:justify-start">
          <div className="w-8/12 xl:w-6/12 text-center text-white flex flex-col gap-[2px]">
            <div className="uppercase bg-blue-dark w-full font-light text-xl sm:text-3xl p-2">
              {sector.name}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
