"use client";
import { Typography } from "@material-tailwind/react";
import React from "react";
import Image from "next/image";

export default function Page() {
  return (
    <div className="bg-white">
      <div className="w-full h-[40vh] bg-blue-950 flex py-5">
        <div className="w-5/12 p-16 flex justify-center items-center">
          <Typography
            placeholder={undefined}
            className="text-white font-extrabold text-5xl"
          >
            ¿Quiénes somos?
          </Typography>
        </div>
        <div className="w-7/12">
          <Image
            width={3840}
            height={2160}
            src={
              "https://hoy.com.do/wp-content/uploads/2023/09/WhatsApp-Image-2023-09-05-at-1.36.14-PM-1.jpeg"
            }
            alt={"news"}
            className="h-full w-full object-cover object-center rounded-l-3xl"
          />
        </div>
      </div>
      <div className="w-full lg:h-screen flex flex-col lg:flex-row">
        <div className="lg:w-6/12 h-full bg-sky-600 flex justify-center items-center p-10">
          <div className="lg:w-6/12 space-y-3">
            <Typography
              placeholder={undefined}
              className="text-white font-extrabold text-3xl"
            >
              ¿Quiénes somos?
            </Typography>
            <div className="bg-white w-4/12 h-1 rounded-full"></div>
            <Typography
              placeholder={undefined}
              className="text-white text-xl"
              translate="yes"
            >
              Somos el Centro para la promoción de las exportaciones e
              inversiones en el país, responsables de promover nuestros
              productos, servicios y oportunidades de negocio por el mundo.
            </Typography>
          </div>
        </div>
        <div className="flex flex-col lg:w-6/12 h-full">
          <div className="h-3/6 bg-red-700 flex justify-center items-center p-10">
            <div className="lg:w-8/12 space-y-2">
              <Typography
                placeholder={undefined}
                className="text-white font-extrabold text-3xl"
              >
                Misión
              </Typography>
              <Typography
                placeholder={undefined}
                className="text-white text-xl"
                translate="yes"
              >
                Crear valor y servir para optimizar la atracción de inversión y
                mejorar nuestra presencia exportadora en los mercados
                internacionales, incentivando empleos de calidad.
              </Typography>
            </div>
          </div>
          <div className="h-3/6 bg-blue-950 flex justify-center items-center p-10">
            <div className="lg:w-8/12 space-y-2">
              <Typography
                placeholder={undefined}
                className="text-white font-extrabold text-3xl"
              >
                Visión
              </Typography>
              <Typography
                placeholder={undefined}
                className="text-sky-500 text-xl"
                translate="yes"
              >
                Ser la agencia de promoción de exportación e inversión más
                eficiente de la región, para una República Dominicana más
                competitiva, productiva y desarrollada.
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
