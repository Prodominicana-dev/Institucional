import React from "react";
import Image from "next/image";
import Link from "next/link";

interface Sector {
  name: string;
  desc: string;
  image: string;
  icon: string;
  subSectors: { name: string; icon: string }[];
  incentives: { name: string; list: string[] }[];
  contact: { name: string; link: string; logo: string }[];
  procedures: {
    name: string;
    deliverable: string;
    link: string;
    icon: string;
  }[];
}

export default function SectorPage(sector: Sector) {
  return (
    <div className="bg-white h-full">
      <div className="relative">
        <Image
          width={3840}
          height={2160}
          src={sector.image}
          alt={sector.name}
          className="object-cover w-full h-[40vh] sm:h-[70vh]"
        />
        <div className="absolute inset-0 flex items-end justify-end">
          <div className="flex items-center justify-center gap-3 bg-blue-dark p-5 mb-32">
            <Image
              width={100}
              height={100}
              src={sector.icon}
              alt={sector.name}
              className="object-cover w-16"
            />
            <h1 className="text-white uppercase font-bold text-xl sm:text-4xl">
              {sector.name}
            </h1>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center py-10 bg-white">
        <div className="w-10/12">
          <div className="space-y-3">
            <h1 className="uppercase text-5xl font-bold text-blue-dark">
              {sector.name}
            </h1>
            <p className="text-lg text-gray-600">{sector.desc}</p>
          </div>
          <div className="flex justify-between py-20 px-10">
            {sector.subSectors.map((subSector, index) => (
              <div key={index} className="flex flex-col items-center gap-5">
                <Image
                  width={100}
                  height={100}
                  src={subSector.icon}
                  alt={subSector.name}
                  className="object-cover w-28 bg-lightBlue-500 p-3 rounded-sm"
                />
                <div className="text-blue-dark text-xl font-medium">
                  {subSector.name}
                </div>
              </div>
            ))}
          </div>
          <div>
            <h1 className="uppercase text-5xl font-bold text-blue-dark">
              Incentivos
            </h1>
            <div>
              {sector.incentives.map((incentive, index) => (
                <div key={index} className="space-y-2">
                  <h1 className="text-xl font-bold text-blue-dark">
                    {incentive.name}
                  </h1>
                  <ul className="list-disc list-inside">
                    {incentive.list.map((item, index) => (
                      <li key={index} className="text-lg text-gray-600">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col items-center gap-10 pt-10">
          <div className="w-full p-5 bg-blue-dark text-white text-center font-bold text-2xl">
            Trámites
          </div>
          <div className="w-8/12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14">
            {sector.procedures.map((procedure, index) => (
              <Link
                href={procedure.link}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-5 hover:scale-110 transition-transform duration-500 ease-in-out"
                key={index}
              >
                <Image
                  width={100}
                  height={100}
                  src={procedure.icon}
                  alt={procedure.name}
                  className="object-cover w-20"
                />
                <div>
                  <div className="text-gray-600 font-semibold">
                    {procedure.name}
                  </div>
                  <div className="text-gray-500">{procedure.deliverable}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="w-full flex flex-col items-center gap-10 pt-10">
          <div className="w-full p-5 bg-blue-dark text-white text-center font-bold text-2xl">
            Información de contacto
          </div>
          <div className="flex justify-evenly items-center gap-10 w-8/12">
            {sector.contact.map((contact, index) => (
              <Link
                href={contact.link}
                target="_blank"
                rel="noreferrer"
                className="flex flex-col items-center gap-5 hover:scale-110 transition-transform duration-500 ease-in-out"
                key={index}
              >
                <Image
                  width={100}
                  height={100}
                  src={contact.logo}
                  alt={contact.name}
                  className="object-cover w-60 "
                />
                <div className="text-blue-dark font-medium w-40 text-center">
                  {contact.name}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
