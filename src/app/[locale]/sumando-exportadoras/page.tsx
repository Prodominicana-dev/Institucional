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

export default function Page() {
  return (
    <div className="bg-white flex flex-col gap-8 xl:gap-14 items-center">
      <Header />
      <HeroSection />
      <Dates />
      <InfoSection />
      <RegisterCard />
      <Benefits />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full h-5 bg-gradient-to-r from-[#00C6FF] via-[#8C5CCC] to-[#FF009C]" />
      <div className="w-10/12 flex justify-between items-center py-5">
        <Image
          width={1980}
          height={1080}
          alt="Prodominicana"
          src={"/svg/ProdominicanaPink.svg"}
          className="w-40"
        />
        <div className="flex gap-5 text-sm font-opensans font-medium ">
          <a href="#contacto" className="hover:text-[#FF009C] duration-200">
            Contacto
          </a>
          <Link
            target="_blank"
            href="/documents/sumando-exportadoras.pdf"
            className="hover:text-[#FF009C] duration-200"
          >
            Términos y condiciones
          </Link>
        </div>
      </div>
    </div>
  );
}

function HeroSection() {
  return (
    <div className="w-10/12 flex flex-col xl:flex-row justify-center items-center gap-5 xl:gap-1">
      <div className="flex flex-col gap-3 xl:w-5/12">
        <Image
          width={1980}
          height={1080}
          alt="Prodominicana"
          src={"/svg/sumando-exportadoras-logo.svg"}
          className="w-full"
        />
        <p className="font-medium text-gray-500 text-sm xl:text-lg">
          Es una iniciativa de ProDominicana, en el marco del evento Mujeres en
          Exportación, que busca identificar y apoyar a mujeres empresarias
          PYMES con potencial exportador. El programa proporciona una plataforma
          para presentar empresas, productos y planes de internacionalización, y
          ofrece acompañamiento especializado para ayudar a las seleccionadas a
          ingresar a mercados internacionales.
        </p>
      </div>
      <div className="xl:w-6/12">
        <Image
          width={1980}
          height={1080}
          alt="Prodominicana"
          src={"/images/sumando-exportadoras/hero.png"}
          className="w-full"
        />
      </div>
    </div>
  );
}

function Dates() {
  const data = [
    {
      day: "29",
      month: "Oct.",
      title: "Apertura convocatoria",
    },
    {
      day: "13",
      month: "Nov.",
      title: "Cierre de Inscripciones",
    },
    {
      day: "04",
      month: "Dic.",
      title:
        "Anuncio beneficiarias del Programa Auditorio ProDominicana 10:00 AM",
    },
  ];

  return (
    <div className="w-10/12 py-5 flex flex-col xl:flex-row gap-5 xl:justify-evenly border-y-2 border-gray-300">
      {data.map((item, key) => (
        <div
          className="flex justify-center items-center gap-2 text-[#FF009C] font-extrabold"
          key={key}
        >
          <div className="text-6xl xl:text-8xl">{item.day}</div>
          <div className="w-48">
            <div className="text-xl xl:text-2xl">{item.month}</div>
            <div className="text-sm xl:text-base font-semibold text-[#003875]">
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
    <div className="w-10/12">
      <Tabs value={value} className="w'full">
        <TabsHeader
          placeholder={"Requisitos"}
          className="bg-transparent h-16 m-0 p-0"
          indicatorProps={{
            className:
              "bg-gradient-to-r from-[#00C6FF] via-[#8C5CCC] to-[#FF009C] rounded-t-xl rounded-b-none !text-white",
          }}
        >
          <Tab
            key={"requirements"}
            value={"requirements"}
            className={`duration-500 ${
              value === "requirements" ? "text-white" : "text-black"
            }`}
            onClick={() => setValue("requirements")}
          >
            Quiénes participan
          </Tab>
          <Tab
            key={"process"}
            value={"process"}
            className={`duration-500 ${
              value === "process" ? "text-white" : "text-black"
            }`}
            onClick={() => setValue("process")}
          >
            Proceso de Aplicación
          </Tab>
        </TabsHeader>
        <div className="w-full rounded-b-lg shadow-xl flex justify-center items-center">
          <TabsBody className="w-10/12">
            <TabPanel key={"requirements"} value={"requirements"}>
              {requirements.map((item, key) => (
                <ul className="list-disc text-lg p-2 font-bold" key={key}>
                  <li>{item}</li>
                </ul>
              ))}
            </TabPanel>
          </TabsBody>
        </div>

        <div className="w-full rounded-b-lg shadow-xl flex justify-center items-center">
          <TabsBody className="w-10/12">
            <TabPanel key={"process"} value={"process"}>
              {process.map((item, key) => (
                <ul className="list-disc text-lg p-2 font-bold" key={key}>
                  <li>{item}</li>
                </ul>
              ))}
            </TabPanel>
          </TabsBody>
        </div>
      </Tabs>
    </div>
  );
}

function RegisterCard() {
  return (
    <div className="flex flex-col xl:flex-row justify-center items-center font-bold gap-5 xl:gap-20 w-10/12 py-10 xl:h-80 rounded-xl bg-gradient-to-r from-[#00C6FF] via-[#8C5CCC] to-[#FF009C]">
      <h1 className="text-2xl xl:text-5xl text-white xl:w-6/12 text-center">
        Regístrate, participa y transforma tu negocio
      </h1>
      <Button
        onClick={() =>
          window.open(
            "https://forms.office.com/pages/responsepage.aspx?id=ghXqEGP41EuvCTx0XnNcBZgOJ0Cq7tJGpzTnfk8Ka_ZUOTkyR0tMMFY3UTJJRUQ4VTVMVDFXNTBMSi4u&origin=lprLink&route=shorturl"
          )
        }
        placeholder={"Formulario en línea"}
        className="bg-white text-[#466FEB] font-bold text-base xl:text-lg h-16 rounded-xl normal-case"
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
    <div className="w-10/12 text-center space-y-10">
      <div className="w-full flex flex-col items-center gap-2">
        <h1 className="font-bold text-4xl">Beneficios que obtendrán:</h1>
        <p className="xl:w-6/12">
          Cada una de las 3 empresas seleccionadas recibirá acompañamiento
          especializado en el proceso de preparación para exportar, que
          incluirá:
        </p>
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-16">
        {data.map((item, key) => (
          <div className="flex flex-col items-center gap-5" key={key}>
            <Image
              width={1980}
              height={1080}
              alt={item.title}
              src={item.img}
              className="w-full rounded-xl"
            />
            <p className="font-medium text-lg xl:text-xl">{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Footer() {
  return (
    <section
      id="contacto"
      className="w-10/12 flex flex-col xl:flex-row gap-5 xl:gap-28 py-10 border-t-2 border-gray-300"
    >
      <Image
        width={1980}
        height={1080}
        alt="Prodominicana"
        src={"/svg/ProdominicanaPink.svg"}
        className="w-64 xl:w-80"
      />
      <div className="flex flex-col gap-5 text-sm xl:text-lg">
        <h1 className="font-bold text-lg">Contacto</h1>
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
      <div className="flex flex-col gap-5 text-sm xl:text-lg">
        <Link href="/shetrades" target="_blank">
          <Image
            width={2048}
            height={1080}
            src="/images/shetradesBanner.png"
            alt="Shretrades"
            className="w-90"
          />
        </Link>
        <h1 className="font-bold text-lg">Síguenos</h1>
        <div className="flex gap-5">
          <Link
            href="https://www.instagram.com/prodominicana"
            target="_blank"
            className="rounded-full p-2 border-2 border-black hover:border-[#FF009C] group duration-200"
          >
            <Icon
              icon="mdi:instagram"
              className="size-6 group-hover:text-[#FF009C] duration-200"
            />
          </Link>
          <Link
            href="https://www.facebook.com/Prodominicana"
            target="_blank"
            className="rounded-full p-2 border-2 border-black hover:border-[#FF009C] group duration-200"
          >
            <Icon
              icon="jam:facebook"
              className="size-6 group-hover:text-[#FF009C] duration-200"
            />
          </Link>
          <Link
            href="https://x.com/prodominicana"
            target="_blank"
            className="rounded-full p-2 border-2 border-black hover:border-[#FF009C] group duration-200"
          >
            <Icon
              icon="bi:twitter-x"
              className="size-6 group-hover:text-[#FF009C] duration-200"
            />
          </Link>
          <Link
            href="https://www.youtube.com/@ProDominicana"
            target="_blank"
            className="rounded-full p-2 border-2 border-black hover:border-[#FF009C] group duration-200"
          >
            <Icon
              icon="mdi:youtube"
              className="size-6 group-hover:text-[#FF009C] duration-200"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
