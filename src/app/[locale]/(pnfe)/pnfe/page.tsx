"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Page() {
  return (
    <div className="bg-white overflow-hidden">
      <div className="w-full flex flex-col xl:flex-row items-center justify-center xl:justify-between h-8 bg-[#024C97] text-xs text-white px-2 xl:px-28">
        <div>Impulsando las exportaciones dominicanas</div>
        <div className="space-x-3">
          <Link
            target="_blank"
            href="tel:+18095555555"
            className="hover:text-sky-400 duration-300"
          >
            +1 (809) 555 5555
          </Link>
          <Link
            target="_blank"
            href="mailto:info@prodominicana.gob.do"
            className="hover:text-sky-400 duration-300"
          >
            info@prodominicana.gob.do
          </Link>
        </div>
      </div>
      <div className="w-full h-[60vh] xl:h-[120vh] flex items-center justify-center relative">
        <Image
          width={3840}
          height={2160}
          src="/images/puntacatalina.jpg"
          alt="PNFE Banner"
          className="w-full h-[120vh] object-cover absolute inset-0"
        />
        <div className="h-full absolute inset-0 bg-white/40">
          <div
            id="header"
            className="flex items-center justify-between py-10 px-5 xl:px-28"
          >
            <Image
              width={1920}
              height={1080}
              src="/prodominicana.svg"
              alt="Logo"
              className="w-48"
            />
            <div className="hidden xl:flex gap-16 font-semibold text-blue-950">
              <Link href="#home" className="hover:text-sky-700 duration-300">
                Inicio
              </Link>
              <Link href="#about" className="hover:text-sky-700 duration-300">
                Sobre el PNFE
              </Link>
              <Link
                href="#progress"
                className="hover:text-sky-700 duration-300"
              >
                Avances
              </Link>
              <Link
                href="#success-stories"
                className="hover:text-sky-700 duration-300"
              >
                Casos de Éxito
              </Link>
              <Link
                href="#documents"
                className="hover:text-sky-700 duration-300"
              >
                Documentos
              </Link>
              <Link
                href="#consults"
                className="hover:text-sky-700 duration-300"
              >
                Consultas
              </Link>
            </div>
          </div>
          <div className="w-full flex flex-col justify-center items-center xl:items-start gap-10 px-5 xl:px-28">
            <Image
              width={1920}
              height={1080}
              src="/prodominicana.svg"
              alt="Logo"
              className="w-3/6"
            />
            <Link
              href="#progress"
              className="max-w-min text-nowrap text-white text-lg xl:text-2xl font-bold bg-[#CA152B] px-4 py-2 rounded-lg hover:bg-[#CA152B]/80 duration-300"
            >
              Últimos avances
            </Link>
          </div>
        </div>

        <div className="hidden xl:block">
          <div className="absolute bottom-0 left-0 w-full h-full bg-[#003B7A] [clip-path:polygon(0%_80%,73%_80%,65%_100%,0%_100%)]">
            <div className="absolute bottom-10 left-60 flex gap-28 items-center">
              <Image
                src="/icons/icon1.svg"
                alt="Icono 1"
                width={40}
                height={40}
              />
              <Image
                src="/icons/icon2.svg"
                alt="Icono 2"
                width={40}
                height={40}
              />
              <Image
                src="/icons/icon3.svg"
                alt="Icono 3"
                width={40}
                height={40}
              />
              <Image
                src="/icons/icon4.svg"
                alt="Icono 4"
                width={40}
                height={40}
              />
              <Image
                src="/icons/icon5.svg"
                alt="Icono 5"
                width={40}
                height={40}
              />
            </div>
          </div>
          <div className="absolute bottom-[40px] right-[30%] w-[2px] h-full bg-[#CA152B] rotate-[35deg] origin-bottom z-20" />
          <div className="absolute bottom-0 right-[35%] w-[2px] h-96 bg-[#024C97] rotate-[35deg] origin-bottom z-20" />
        </div>
      </div>
      <section
        id="about"
        className="bg-white min-h-screen xl:h-screen w-full relative"
      >
        <div className="h-full flex flex-col xl:flex-row items-center justify-center gap-20 p-5 xl:px-28">
          <Image
            width={1920}
            height={1080}
            src="/prodominicana.svg"
            alt="Logo"
            className="w-3/6 xl:self-start"
          />
          <div className="text-blue-950 space-y-5 xl:self-end">
            <p>
              El Plan Nacional de Fomento a las Exportaciones de la República
              Dominicana 2020- 2030, ha sido un ejercicio que se ha nutrido de
              aportes de una diversidad de fuentes, con el fin de incorporar las
              ideas, reflexiones y propuestas formuladas desde las perspectivas
              de las instituciones gubernamentales, gremios empresariales y
              organizaciones vinculadas al desarrollo productivo y exportador,
              la academia y centros de pensamiento nacionales e internacionales,
              así como de los propios productores y exportadores que han asumido
              el reto de competir en los mercados globales. Este esfuerzo se
              inicia con levantamientos desde un proceso de trabajo desde 2016,
              se entrega un primer documento en el 2018 y no es hasta el pasado
            </p>
            <button className="font-semibold text-red-600 hover:underline hover:text-red-700 hover:cursor-pointer duration-200">
              Leer más...
            </button>
            <div className="hidden xl:block">
              <div className="absolute top-0 right-0 w-full h-full bg-[#CA152B] [clip-path:polygon(65%_0%,100%_0%,100%_20%,58.2%_20%)]" />
              <div className="absolute top-0 right-[35%] w-[2px] h-64 bg-[#024C97] rotate-[35deg] origin-top z-20" />
              <div className="absolute bottom-0 left-0 w-full h-full bg-[#003B7A] [clip-path:polygon(0%_80%,33%_80%,25%_100%,0%_100%)]" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
