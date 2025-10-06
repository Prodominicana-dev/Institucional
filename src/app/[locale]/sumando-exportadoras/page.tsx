"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import {
  Button,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";

// ...existing code...
export default function Page() {
  return (
    <div className="bg-[#000f41] flex flex-col items-center">
      <div className="relative w-full overflow-hidden sm:h-[810px] min-h-[350px]">
        <div className="absolute inset-0 z-0 hidden xl:block overflow-hidden">
          <Image
            src="/images/sumando-exportadoras/heroNew.jpg"
            alt="Mujeres en exportación"
            fill
            priority
            className="object-cover translate-x-[5%] scale-110"
          />
        </div>

        <div className="relative z-10 flex flex-col items-center">
          <Header />

          <div
            className=" relative w-full top-3 sm:top-10 md:top-16 lg:top-9 sm:mx-auto sm:right-0 sm:flex sm:justify-center md:mx-auto md:right-0 md:flex md:justify-center lg:mx-0 xl:right-12 lg:flex lg:justify-start "
          >
            <HeroSection />
          </div>
        </div>

        <div className="block xl:hidden relative w-full h-[350px]  -translate-x-[5%] sm:translate-x-0  md:-translate-x-[6%]  sm:h-[400px] md:h-[200px] overflow-hidden">
          <Image
            src="/images/sumando-exportadoras/heroNew.jpg"
            alt="Mujeres en exportación"
            fill
            priority
            className="object-cover object-center"
          />
        </div>
      </div>

      <div className="flex flex-col gap-8 xl:gap-14 items-center w-full">
        <Dates />
        <InfoSection />
        <RegisterCard />
        <Benefits />
      </div>

      <Footer />
    </div>
  );
}

function Header() {
  return (
    <>
      <div className="w-full h-2 sm:h-5 bg-gradient-to-r from-[#00C6FF] via-[#8C5CCC] to-[#FF009C]" />
      <div className="w-11/12 max-w-7xl mx-auto flex flex-col sm:flex-row items-center py-3 sm:py-5 gap-3 sm:gap-1">
        <Image
          width={1980}
          height={1080}
          alt="Prodominicana"
          src={"/svg/ProdominicanaPink.svg"}
          className="w-32 sm:w-40 flex-shrink-0"
        />

        <div className="sm:ml-auto flex gap-3 sm:gap-5 lg:gap-10 xl:gap-7 text-xs sm:text-sm font-opensans font-medium">
          <a
            href="#contacto"
            className="hover:text-[#FF009C] duration-200 text-white"
          >
            Contacto
          </a>
          <Link
            target="_blank"
            href="/documents/sumando-exportadoras.pdf"
            className="hover:text-[#FF009C] duration-200 text-white"
          >
            Términos y condiciones
          </Link>
        </div>
      </div>
    </>
  );
}

function HeroSection() {
  return (
    <div className=" w-full xl:w-10/12 mx-auto flex flex-col xl:flex-row py-6 sm:py-10 items-center translate-y-0 md:-translate-y-16  lg:-translate-y-16  xl:translate-y-0">
      {/* Contenido de texto alineado a la izquierda */}
      <div className="flex flex-col gap-3 xl:w-5/12 w-full items-center xl:items-start">
        <Image
          width={1980}
          height={1080}
          alt="Sumando Exportadoras Logo"
          src={"/svg/sumando-exportadoras-logo-White1.svg"}
          className="w-96 sm:w-[32rem] md:w-[32rem] lg:w-[36rem] xl:w-full xl:max-w-md"
        />
        <p className="font-medium text-white -translate-x-0 text-md px-11 sm:text-lg md:text-lg xl:text-lg 2xl:text-2xl mt-4 text-center xl:text-left lg:px-12 xl:px-8 xl:-translate-x-8 2xl:-translate-x-14  ">
          Es una iniciativa de ProDominicana, en el marco del{" "}
          <span className="text-[#FF009C] text-base sm:text-2xl xl:text-xl 2xl:text-2xl font-bold">
            Encuentro Nacional Mujeres En Exportación.
          </span>{" "}
          Su objetivo es apoyar a empresarios MIPYMES con potencial exportador,
          brindándoles una plataforma para mostrar sus negocios y acompañamiento
          especializado para acceder a mercados internacionales.
        </p>
      </div>
    </div>
  );
}

function Dates() {
  const data = [
    {
      day: "19",
      month: "Sept.",
      title: "Apertura convocatoria",
    },
    {
      day: "18",
      month: "Oct.",
      title: "Cierre de Inscripciones",
    },
    {
      day: "20",
      month: "Nov.",
      title:
        "Anuncio beneficiarias del Programa Auditorio ProDominicana 10:00 AM",
    },
  ];

  return (
    <div className="w-11/12 max-w-7xl py-5 flex flex-col xl:flex-row gap-5 xl:justify-evenly border-y-2 border-[#FF009C]/50 ">
      {data.map((item, key) => (
        <div
          className="flex justify-center items-center gap-2 text-[#FF009C] font-extrabold"
          key={key}
        >
          <div className="text-5xl sm:text-6xl xl:text-8xl">{item.day}</div>
          <div className="w-32 sm:w-48">
            <div className="text-lg sm:text-xl xl:text-2xl">{item.month}</div>
            <div className="text-xs sm:text-sm xl:text-base font-semibold text-white">
              {item.title}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function InfoSection() {
  const requirements = [
    "Empresas PYMES registradas en la República Dominicana con al menos un 51% de propiedad femenina y/o liderada por mujer.",
    "Empresas que no hayan exportado previamente o que tengan, si han exportado, un nuevo producto de exportación.",
    "Tener mínimo 1 año comercializando.",
    "Poseer instalaciones productivas.",
  ];
  const process = [
    "Las participantes deben completar este formulario en línea con la información requerida sobre su empresa y producto.",
    "Posteriormente, deberán realizar un video de 1 a 3 minutos en el que presenten su empresa, su producto y sus metas de exportación. Le estaremos contactando para coordinar la recepción del mismo.",
  ];
  const [value, setValue] = useState("requirements");
  return (
    <div className="w-11/12 max-w-7xl bg-white border border-solid rounded-xl shadow-[7px_14px_16px_0px_rgb(255_255_255_/_0.7)]">
      <Tabs value={value} className="w-full">
        <TabsHeader
          placeholder={"Requisitos"}
          className="bg-pink-100 h-14 sm:h-16 m-0 p-0 rounded-t-xl"
          indicatorProps={{
            className:
              "bg-gradient-to-r from-[#00C6FF] via-[#8C5CCC] to-[#FF009C] rounded-t-xl !text-white",
          }}
        >
          <Tab
            key={"requirements"}
            value={"requirements"}
            className={`duration-500 ${
              value === "requirements" ? "text-white" : "text-[#8C5CCC]"
            }`}
            onClick={() => setValue("requirements")}
          >
            Quiénes participan
          </Tab>
          <Tab
            key={"process"}
            value={"process"}
            className={`duration-500 ${
              value === "process" ? "text-white" : "text-[#8C5CCC]"
            }`}
            onClick={() => setValue("process")}
          >
            Proceso de Aplicación
          </Tab>
        </TabsHeader>

        <TabsBody className="w-full p-3 sm:p-6 rounded-b-xl">
          <TabPanel key={"requirements"} value={"requirements"}>
            {requirements.map((item, key) => (
              <ul
                className="list-disc text-base sm:text-lg p-2 font-bold"
                key={key}
              >
                <li>{item}</li>
              </ul>
            ))}
          </TabPanel>

          <TabPanel key={"process"} value={"process"}>
            {process.map((item, key) => (
              <ul
                className="list-disc text-base sm:text-lg p-2 font-bold"
                key={key}
              >
                <li>{item}</li>
              </ul>
            ))}
          </TabPanel>
        </TabsBody>
      </Tabs>
    </div>
  );
}

function RegisterCard() {
  return (
    <div className="flex flex-col xl:flex-row justify-center items-center font-bold gap-5 xl:gap-20 w-11/12 max-w-7xl py-8 sm:py-10 xl:h-80 rounded-xl bg-gradient-to-r from-[#00C6FF] via-[#8C5CCC] to-[#FF009C]">
      <h1 className="text-xl sm:text-2xl xl:text-5xl text-white xl:w-6/12 text-center">
        Regístrate, participa y transforma tu negocio
      </h1>
      <Button
        onClick={() =>
          window.open(
            "https://forms.office.com/pages/responsepage.aspx?id=ghXqEGP41EuvCTx0XnNcBUy-re8YHXBPqc4Y2V6tPD5UN05GRlNCUFc3TVpQREFEM01EVjZIRjJQMS4u&route=shorturl"
          )
        }
        placeholder={"Formulario en línea"}
        className="bg-white text-[#466FEB] font-bold text-base xl:text-lg h-14 sm:h-16 rounded-xl normal-case px-6 cursor-pointer"
      >
        Formulario en línea
      </Button>
    </div>
  );
}

function Benefits() {
  const data = [
    {
      title: "Asesoría y evaluación técnica especializada",
      img: "/images/sumando-exportadoras/benefit-1.jpg",
    },
    {
      title: "Fotografía y video profesional de sus productos",
      img: "/images/sumando-exportadoras/benefit-2.jpg",
    },
    {
      title:
        "Visibilidad en medios de comunicación seleccionados por ProDominicana",
      img: "/images/sumando-exportadoras/benefit-3.jpg",
    },
    {
      title:
        "Acceso a programas de capacitación de ProDominicana, incluyendo un cupo en uno de nuestros diplomados",
      img: "/images/sumando-exportadoras/benefit-4.jpg",
    },
    {
      title:
        "Asistencia y apoyo para la participación en ferias y misiones comerciales nacionales e internacionales",
      img: "/images/sumando-exportadoras/benefit-5.jpg",
    },
  ];
  return (
    <div className="w-11/12 max-w-7xl text-center space-y-10 -translate-y-3 mb-9">
      <div className="w-full flex flex-col items-center gap-2">
        <h1 className="font-bold text-2xl sm:text-4xl text-white">
          Beneficios que obtendrán:
        </h1>
        <p className="xl:w-6/12 text-white text-base sm:text-lg">
          Cada una de las 3 empresas seleccionadas recibirá acompañamiento
          especializado en el proceso de preparación para exportar, que
          incluirá:
        </p>
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 sm:gap-12 xl:gap-16">
        <div className="w-full text-center xl:hidden col-span-3 flex flex-col gap-8">
          {data.map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-5">
              <Image
                width={1980}
                height={1080}
                alt={item.title}
                src={item.img}
                className="w-full rounded-xl object-cover"
              />
              <p className="font-medium  text-base sm:text-2xl xl:text-xl text-white">
                {item.title}
              </p>
            </div>
          ))}
        </div>

        <div className="hidden xl:grid xl:grid-cols-3 xl:gap-8 col-span-3">
          {data.slice(0, -2).map((item, i) => (
            <div key={i} className="flex flex-col items-start gap-5">
              <Image
                width={1980}
                height={1080}
                alt={item.title}
                src={item.img}
                className="w-full rounded-xl object-cover"
              />
              <p className="font-medium  text-base sm:text-lg xl:text-xl text-white">
                {item.title}
              </p>
            </div>
          ))}
        </div>

        <div className="hidden xl:flex xl:justify-center xl:gap-8 col-span-3 mt-8">
          {data.slice(-2).map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-5 w-full max-w-xs"
            >
              <Image
                width={1980}
                height={1080}
                alt={item.title}
                src={item.img}
                className="w-full rounded-xl object-cover"
              />
              <p className="font-medium text-base sm:text-lg xl:text-xl text-white text-center">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <section
      id="contacto"
      className="w-11/12 max-w-7xl flex flex-col xl:flex-row gap-8 xl:gap-28 py-8 sm:py-10 border-t-2 border-[#FF009C]/50 text-white"
    >
      <Image
        width={1980}
        height={1080}
        alt="Prodominicana"
        src={"/svg/ProdominicanaPink.svg"}
        className="w-40 sm:w-64 xl:w-80"
      />
      <div className="flex flex-col gap-3 sm:gap-5 text-xs sm:text-sm xl:text-lg">
        <h1 className="font-bold text-base sm:text-lg">Contacto</h1>
        <p>
          Teléfono:{" "}
          <Link
            href="tel:+18095305505"
            className="hover:text-[#FF009C] hover:underline duration-200"
          >
            +1 809-530-5505
          </Link>{" "}
          Ext. 304
        </p>
        <p>
          Correo:{" "}
          <Link
            href="mailto:sumandoexportadoras@prodominicana.gob.do"
            className="hover:text-[#FF009C] hover:underline duration-200"
          >
            sumandoexportadoras@prodominicana.gob.do
          </Link>
        </p>
        <Link
          href="prodominicana.gob.do"
          target="_blank"
          className="font-bold hover:text-[#FF009C] duration-200"
        >
          www.prodominicana.gob.do
        </Link>
      </div>
      <div className="flex flex-col gap-3 sm:gap-5 text-xs sm:text-sm xl:text-lg">
        <Link href="/shetrades" target="_blank">
          <Image
            width={2048}
            height={1080}
            src="/images/shetradesWhiteBanner.png"
            alt="Shretrades"
            className="w-40 sm:w-64 xl:w-90"
          />
        </Link>
        <h1 className="font-bold text-base sm:text-lg">Síguenos</h1>
        <div className="flex gap-3 sm:gap-5">
          <Link
            href="https://www.instagram.com/prodominicana"
            target="_blank"
            className="rounded-full p-2 border-2 border-white hover:border-[#FF009C] group duration-200"
          >
            <Icon
              icon="mdi:instagram"
              className="size-5 sm:size-6 group-hover:text-[#FF009C] duration-200"
            />
          </Link>
          <Link
            href="https://www.facebook.com/Prodominicana"
            target="_blank"
            className="rounded-full p-2 border-2 border-white hover:border-[#FF009C] group duration-200"
          >
            <Icon
              icon="jam:facebook"
              className="size-5 sm:size-6 group-hover:text-[#FF009C] duration-200"
            />
          </Link>
          <Link
            href="https://x.com/prodominicana"
            target="_blank"
            className="rounded-full p-2 border-2 border-white hover:border-[#FF009C] group duration-200"
          >
            <Icon
              icon="bi:twitter-x"
              className="size-5 sm:size-6 group-hover:text-[#FF009C] duration-200"
            />
          </Link>
          <Link
            href="https://www.youtube.com/@ProDominicana"
            target="_blank"
            className="rounded-full p-2 border-2 border-white hover:border-[#FF009C] group duration-200"
          >
            <Icon
              icon="mdi:youtube"
              className="size-5 sm:size-6 group-hover:text-[#FF009C] duration-200"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
