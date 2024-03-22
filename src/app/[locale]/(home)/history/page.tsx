import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";
export default function Page() {
  const historyYears = [
    {
      year: 2003,
      description:
        "El 17 de junio del 2003 surge la fusión de CEDOPEX y OPI-RD, para ser creado el Centro de Exportación e Inversión de la República Dominicana (CEI-RD) a través de la Ley 98-03, bajo el mandato del Expresidente Hipólito Mejía, con el objetivo principal de promoción y fomento de las exportaciones dominicanas e inversiones, con el fin de impulsar la competitividad del país en los mercados internacionales.",
      image: "/images/prodominicanabuilding.jpg",
    },
    {
      year: 2012,
      description:
        "Desde 2012, tras la conformación de la Comisión Multisectorial mediante el decreto NO. 22-12 se designó al CEI-RD para el desarrollo de la Marca País República Dominicana para cimentar las bases y articular todo un plan estratégico, teniendo a Colombia como país asesor.",
      image: "/images/prodominicanabuilding.jpg",
    },
    {
      year: 2017,
      description:
        "Se crea ProDominicana, con el decreto 275-17, como un mecanismo de coordinación y ejecución de los planes del estado dominicano con el proceso de implementación de una estrategia Nacional de Promoción de la exportación e Inversión. Así como una denominación que identifique de manera clara a la República Dominicana con el desarrollo de sus actividades de promoción de exportaciones y capitación de inversiones.",
      image: "/images/prodominicanabuilding.jpg",
    },
    {
      year: 2020,
      description:
        "Se presentó el primer Encuentro de Mujeres en Exportación en el cual se lanzó el Estudio de Mujeres en Exportación para prescindir de las brechas de género como estrategia de promoción de una mayor participación de las mujeres en la actividad productiva y comercial; busca generar más empleo y un esquema de desarrollo económico sostenible. Para el 2024 realizamos la 4ta edición.",
      image: "/images/prodominicanabuilding.jpg",
    },
    {
      year: 2020,
      description:
        "Presentación del “Plan Nacional de Fomento a las Exportaciones de la República Dominicana PNFE-RD 2020–2030” que ha sido formulado de manera consensuada y coherente, para garantizar el impulso de las exportaciones, que conecta con las políticas en favor del desarrollo productivo. Así como el trabajo conjunto de las instituciones que inciden en el proceso de exportación para atender los retos a corto, mediano y largo plazo que permiten la participación del país en el comercio internacional.",
      image: "/images/prodominicanabuilding.jpg",
    },
    {
      year: 2021,
      description:
        "Lanzamiento de la primera Guía de Inversión Extranjera en inglés y español, orientada a brindar información básica para el desarrollo de inversiones y negocios en el país, así como las oportunidades y facilidades que les ofrece R.D a los inversionistas extranjeros. Al 2024 contamos con la Guía de Inversión en 11 idiomas.",
      image: "/images/prodominicanabuilding.jpg",
    },
    {
      year: 2021,
      description:
        "Lanzamiento de la Guía de Exportación, la cual es un resumen que presenta los elementos más importantes que deben conocer y aplicar los exportadores y potenciales exportadores del país a fin de desarrollar con éxito sus negocios de exportación. Asimismo, es una herramienta de altísimo valor, desarrollada por ProDominicana a favor de los productores y exportadores dominicanos, en cumplimiento al Plan Nacional de Fomento a las Exportaciones (PNFE) y la estrategia de promoción comercial, trazada por el Gobierno del presidente Luis Abinader.",
      image: "/images/prodominicanabuilding.jpg",
    },
    {
      year: 2021,
      description:
        "Presentación del primer Estudio de la Moda en República Dominicana D con el objetivo de crear un Plan de Promoción Comercial para estimular las exportaciones de la industria de la moda.",
      image: "/images/prodominicanabuilding.jpg",
    },
    {
      year: 2021,
      description:
        "Puesta en funcionamiento del sistema Ventanilla Única de Inversión (VUIRD) la cual tiene como objetivo agilizar los procesos de las inversiones nacionales y extranjeras que tengan el propósito de desarrollar operaciones en los diferentes sectores productivos de bienes y servicios del país, para que el inversionista tenga un punto único de contacto, más eficiente con menos burocracia.",
      image: "/images/prodominicanabuilding.jpg",
    },
    {
      year: 2023,
      description:
        "En 2023 ProDominicana realizó 17 acuerdos institucionales con el propósito de instaurar oficinas provinciales con presencia de Ejecutivos Regionales de ProDominicana para contribuir en la consecución de las metas y objetivos de promover las exportaciones y la captación de las inversiones. Las provincias donde la institución tiene presencian son: Bonao, La Vega, San Cristóbal, Samaná, La Altagracia, Pedernales, La Romana, Puerto Plata, Espaillat, Peravia, Miches, El Seibo, Hermanas Mirabal, Hato Mayor, Constanza, San Juan y Santiago.",
      image: "/images/prodominicanabuilding.jpg",
    },
  ];
  const t = useTranslations("history");
  return (
    <div className="w-full bg-white flex justify-center items-center">
      <div className="w-full">
        <h2 className=" text-[#1E3059] font-bold font-montserrat text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-5xl underline flex justify-center items-center py-10">
          {t("title")}
        </h2>
        <div className="flex flex-col p-10 h-full w-full">
          {historyYears.map((history, index) => (
            <HistoryYear history={history} index={index} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

function HistoryYear({ history, index }: any) {
  return (
    <div
      className={`flex items-center sm:w-[calc(50%+1px)] gap-5 py-5 border-gray-700 ${
        index % 2 === 0
          ? "border-l-2 self-end"
          : "border-l-2 sm:border-l-0 sm:border-r-2"
      }`}
    >
      <div
        className={`bg-gray-700 w-24 h-[2px] ${
          index % 2 === 0 ? "" : "sm:order-last"
        }`}
      ></div>
      <h1 className="font-semibold text-lg text-black">{history.year}</h1>

      <div className="flex order-1 rounded-lg py-4 2xl:py-7">
        <div className="w-full h-full">
          <div className="w-full">
            <Image
              src={history.image}
              width={1500}
              height={1500}
              className="object-cover object-center w-full h-full max-h-[50vh]"
              alt={history.year.toString()}
            />
          </div>
          <div className="text-xs lg:text-sm 2xl:text-base">
            <p className="p-5 h-full tracking-wide text-gray-900 text-opacity-100 bg-[#F6F6F6] ">
              {history.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
