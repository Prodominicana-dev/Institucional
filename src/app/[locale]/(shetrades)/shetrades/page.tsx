"use client";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { Collapse } from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export default function Page() {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen((cur) => !cur);
  const navbarMenuItems = [
    {
      title: "Home",
      description: "Get to know us",
      link: "#home",
    },
    {
      title: "about",
      description: "Get the latest news",
      link: "#about",
    },
    {
      title: "trainings",
      description: "Explore our services",
      link: "#trainings",
    },
    {
      title: "initiatives",
      description: "Learn about investment",
      link: "#initiatives",
    },
    {
      title: "benefits",
      description: "Learn about export",
      link: "#benefits",
    },
    {
      title: "register",
      description: "Get in touch with us",
      link: "#register",
    },
  ];

  const initiatives = [
    {
      title:
        "Creación de espacios de interacción entre mujeres exportadoras y mujeres interesadas en exportar",
      icon: "/svg/shetrades/InitiativeIcon1.svg",
    },
    {
      title: "Focalización de servicios especializados",
      icon: "/svg/shetrades/InitiativeIcon2.svg",
    },
    {
      title: "Ampliación de servicios financieros",
      icon: "/svg/shetrades/InitiativeIcon3.svg",
    },
    {
      title: "Priorización de servicios de promoción de Servicios Modernos",
      icon: "/svg/shetrades/InitiativeIcon4.svg",
    },
    {
      title: "Participación en ferias internacionales",
      icon: "/svg/shetrades/InitiativeIcon5.svg",
    },
    {
      title:
        "Inserción de República Dominicana en foros internacionales sobre el tema de género y su participación en el comercio exterior",
      icon: "/svg/shetrades/InitiativeIcon2.svg",
    },
  ];
  const benefits = [
    {
      title: "Integración a la red internacional SheTrades Hub",
      desc: "SheTrades facilita la posibilidad de que las mujeres empresarias conecten con mujeres emprendedoras de otros países, creando así un espacio idóneo para compartir experiencias y aprender de prácticas efectivas de desarrollo empresarial. Del mismo modo, permite que las instituciones de apoyo empresarial compartan entre sí iniciativas, proyectos y programas para brindar soporte a las mujeres en el comercio exterior.",
    },
    {
      title: "Acceso a herramientas y recursos",
      desc: "El ITC ofrece diversas herramientas para facilitar la participación de la mujer en el mercado internacional e identificación de oportunidades potenciales; de igual manera, elabora informes que detallan la importancia de promover el empoderamiento económico de las mujeres, la contratación pública con perspectiva de género, facilitación de inversión, incorporación de perspectiva de género en los acuerdos comerciales y políticas comerciales, incluyendo recomendaciones a países y a organismos multilaterales relacionados con el comercio internacional.",
    },
    {
      title: "Desarrollo de capacidades",
      desc: "SheTrades brinda oportunidades de acceso exclusivo a capacitaciones y a entrenamientos virtuales enfocados en el desarrollo de habilidades, manejo de herramientas digitales, competitividad, gestión de riesgo empresarial, preparación para exportar, y herramientas de inteligencia de mercados y sostenibilidad. Los Hubs difunden esos programas de formación con las empresas lideradas por mujeres de sus países. En adición a esto, a través del portal web SheTrades Academy42, la mujer emprendedora puede acceder a múltiples programas asincrónicos gratuitos sobre el entorno comercial internacional, cadenas de valor, competitividad, mercados de exportación, comercio electrónico para vender sus productos en línea, procedimientos para exportar; brindando también la oportunidad de utilizar herramientas de autoevaluación para diagnosticar necesidades de capacitación, así como métodos de evaluación de riesgos y gestión de crisis en sus negocios.",
    },
    {
      title: "Desarrollo de actividades empresariales",
      desc: "A través de los Hubs, SheTrades canaliza apoyo y orientación a empresas lideradas por mujeres de los diferentes países para su participación en ferias comerciales regionales e internacionales y misiones, propiciando la creación de oportunidades comerciales.",
    },
    {
      title: "Acceso a financiamiento",
      desc: "La iniciativa SheTrades permite que las emprendedoras de países en vías de desarrollo puedan acceder a información acerca de oportunidades de financiamiento disponibles a través del proyecto SheTrades Invest, que contempla eventos, actividades y una plataforma en línea (https://shetradesinvest. converve.io/) para conectar a empresas dirigidas por mujeres o pymes que benefician las mujeres elegibles, con proveedores de capital.",
    },
  ];

  return (
    <div className="bg-white h-full">
      <div>
        <div className="bg-red-700 p-10 flex justify-between xl:justify-center items-center">
          <Image
            src="/svg/logos/prodominicana.svg"
            alt="2020"
            width={100}
            height={100}
            className="w-6/12 lg:w-2/12"
          />
          <button onClick={toggleOpen}>
            <Bars3Icon className="text-white w-6 block xl:hidden" />
          </button>
        </div>
        <Collapse
          open={open}
          className="px-5 bg-[#042236] flex flex-col items-center xl:hidden"
        >
          {navbarMenuItems.map((item, index) => (
            <Link
              href={item.link}
              key={index}
              className="text-white hover:text-white/60 font-bold p-5 text-lg duration-300 uppercase"
            >
              {item.title}
            </Link>
          ))}
        </Collapse>
        <div className="bg-[#042236] xl:flex justify-center gap-10 uppercase hidden">
          {navbarMenuItems.map((item, index) => (
            <Link
              href={item.link}
              key={index}
              className="text-white hover:text-white/60 font-bold p-5 text-lg duration-300"
            >
              {item.title}
            </Link>
          ))}
        </div>
        <section
          id="home"
          className="bg-white flex items-center justify-between py-10"
        >
          <div className="w-full lg:w-6/12 flex justify-center">
            <div className="w-10/12 lg:w-8/12 flex flex-col items-center text-center gap-10 ">
              <Image
                src="/prodominicana.svg"
                alt="2020"
                width={100}
                height={100}
                className="w-6/12"
              />
              <div className="space-y-5 text-blueGray-400 text-lg lg:text-2xl">
                <p>Empoderando a mujeres en e-commerce</p>
                <p>
                  Únete al programa de aprendizaje virtual del Centro de
                  Comercio Internacional (ITC) para incursionar en el e-commerce
                  y expandir tus canales de venta en línea a nivel nacional e
                  internacional.
                </p>
              </div>
              <Link
                href="#register"
                className="bg-red-700 text-white lg:text-lg py-3 px-5 self-center rounded-full"
              >
                Registrate en el Programa
              </Link>
            </div>
          </div>
          <div className="hidden lg:block w-6/12">
            <Image
              src="/images/shetrades/home.jpg"
              alt="2020"
              width={6720}
              height={4480}
              className="lg:h-[70vh] object-cover"
            />
          </div>
        </section>
        <section id="trainings" className="bg-white py-20 flex justify-center">
          <div className="lg:w-11/12 xl:w-10/12 flex flex-col lg:flex-row gap-5 justify-center items-center">
            <div className="xl:w-4/12 lg:w-6/12 flex justify-center">
              <div className="size-72 lg:size-96 bg-red-700 rounded-full flex flex-col justify-center items-center text-white origin-bottom">
                <div className="-translate-y-5 flex flex-col justify-center items-center">
                  <Image
                    src="/svg/shetrades/trainingsIcon.svg"
                    alt="2020"
                    width={100}
                    height={100}
                    className="w-20"
                  />
                  <h1 className="uppercase text-2xl lg:text-4xl ">
                    Capacitaciones
                  </h1>
                </div>
              </div>
            </div>
            <div className="flex justify-center ">
              <ul className="w-8/12 list-disc text-xl space-y-5">
                <li>
                  Adopción de certificaciones internacionales en las
                  agroexportaciones.
                </li>
                <li>Nociones básicas de comercio internacional.</li>
                <li>Inteligencia en los negocios.</li>
                <li>Internacionalización de las pymes.</li>
                <li>Generación de confianza en la exportación.</li>
                <li>Certificación como herramienta de acceso.</li>
              </ul>
            </div>
          </div>
        </section>
        <section id="initiatives" className="w-full lg:h-[60vh] relative">
          <Image
            src={"/images/prodominicanabuilding.jpg"}
            width={6000}
            height={2195}
            alt="building"
            className="absolute inset-0 object-cover object-center w-full h-full -z-10"
          />
          <div className="bg-[#042236]/80 z-10 flex flex-col items-center text-center text-white py-20 h-full">
            <div className="text-2xl lg:text-5xl flex gap-2 font-light uppercase">
              Inicitativas <h1 className="font-bold">de prodominicana</h1>
            </div>
            <div className="w-10/12 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-20 h-full items-center">
              {initiatives.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center gap-5 text-center h-4/6"
                >
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={100}
                    height={100}
                    className="size-32"
                  />
                  <p className="text-lg text-center h-3/6">{item.title}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section
          id="benefits"
          className="bg-white py-20 flex flex-col items-center gap-5"
        >
          <h1 className="uppercase text-4xl">Beneficios</h1>
          <div className="w-8/12">
            <ul className="list-[upper-roman] marker:text-lightBlue-400 marker:font-light marker:text-5xl text-xl space-y-10">
              {benefits.map((item, index) => (
                <li key={index}>
                  <p className="text-gray-600">
                    <strong className="text-trueGray-600">
                      {item.title}: {""}
                    </strong>
                    {item.desc}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
