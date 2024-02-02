"use client";
import { Typography } from "@material-tailwind/react";
import React from "react";
import Image from "next/image";

export default function Page() {
  const valores = [
    {
      title: "Compromiso con la Excelencia",
      desc: "Ponemos todo nuestro empeño en hacer nuestro trabajo del mejor modo posible, para mantenernos como institución modelo.",
    },
    {
      title: "Colaboración y Enriquecimiento Mutuo",
      desc: "Creemos que nuestro trabajo se enriquece y nuestros servicios mejoran cuando compartimos valor e información en equipo.",
    },
    {
      title: "Ética y Compromiso",
      desc: "Nos mueve el amor al servicio público y por ello actuamos correctamente, con apego a la ley y a los valores éticos.",
    },
    {
      title: "Optimización de Recursos",
      desc: "Optimizamos los recursos disponibles para ofrecer los servicios en el menor tiempo y con la mayor calidad posible.",
    },
    {
      title: "Confianza en las Relaciones",
      desc: "La palabra dada y la consistencia de las acciones con esta, es parte importante de nuestro intercambio de negocios. Por eso cuidamos nuestras relaciones profesionales y de inversión generando confianza.",
    },
    {
      title: "Transparencia y Fiscalización",
      desc: "Trabajamos con apertura y transparencia para que nuestra labor pueda ser fiscalizada y reconocida asegurando la confianza.",
    },
    {
      title: "Vocación de Servicio",
      desc: "Creemos en el servicio público. Atendemos con esmero, calidad y de manera oportuna, los requerimientos de nuestros clientes internos y externos.",
    },
    {
      title: "Proactividad y Satisfacción del Cliente",
      desc: "Nos anticipamos, gestionamos, conocemos y satisfacemos las expectativas del cliente en función de los objetivos propuestos para garantizar el éxito.",
    },
    {
      title: "Actuación Justa y Equitativa",
      desc: "Actuamos de manera justa con nuestros clientes, sin importar condición económica, social, política y de género, respetando y sirviendo a todos los seres humanos por igual.",
    },
  ];
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
              >
                Ser la agencia de promoción de exportación e inversión más
                eficiente de la región, para una República Dominicana más
                competitiva, productiva y desarrollada.
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <div className="h-full">
        <div className="w-full h-full relative">
          <Image
            src={"/images/home/prodominicanabuilding.jpg"}
            width={6000}
            height={2195}
            alt="foto"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-blue-dark/80 z-10 flex items-center justify-center">
            <div className="w-10/12 flex justify-center flex-wrap gap-5">
              {valores.map((valor, index) => (
                <div className="w-5/12 flex items-center gap-5">
                  <Image
                    width={100}
                    height={100}
                    alt={valor.title}
                    src={"/svg/icons/ExportIcon.svg"}
                    className="w-16"
                  />
                  <div>
                    <Typography
                      key={index}
                      placeholder={undefined}
                      className="text-white font-extrabold text-xl"
                    >
                      {valor.title}
                    </Typography>
                    <Typography
                      placeholder={undefined}
                      className="text-white text-lg"
                      translate="yes"
                    >
                      {valor.desc}
                    </Typography>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
