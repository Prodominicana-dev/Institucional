import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  const stepsToExport = [
    {
      name: "Registro de nombre comercial",
      logo: "/svg/logos/onapi.svg",
      icon: "/svg/export/steps/exportStepIcon.svg",
      icon2: "/svg/export/steps/stepIcon.svg",
      link: "https://www.onapi.gov.do/index.php/servicios/signos-distintivos/nombres-comerciales/item/564-registro-de-nombre-comercial-2023",
    },
    {
      name: "Registro Mercantil",
      logo: "",
      icon: "/svg/export/steps/exportStepIcon1.svg",
      icon2: "/svg/export/steps/stepIcon1.svg",
      link: "https://app.registromercantil.do/login",
    },
    {
      name: "Registro Nacional del Contribuyente",
      logo: "/svg/logos/dgii.svg",
      icon: "/svg/export/steps/exportStepIcon2.svg",
      icon2: "/svg/export/steps/stepIcon2.svg",
      link: "https://dgii.gov.do/cicloContribuyente/registroRNC/Paginas/default.aspx",
    },
    {
      name: "Factura Comercial",
      logo: "/svg/logos/dga.svg",
      icon: "/svg/export/steps/exportStepIcon3.svg",
      icon2: "/svg/export/steps/stepIcon3.svg",
      link: "",
    },
    {
      name: "Lista de Empaque",
      logo: "",
      icon: "/svg/export/steps/exportStepIcon4.svg",
      icon2: "/svg/export/steps/stepIcon4.svg",
      link: "",
    },
    {
      name: "Registro del Exportador",
      logo: "/svg/logos/dga.svg",
      icon: "/svg/export/steps/exportStepIcon5.svg",
      icon2: "/svg/export/steps/stepIcon5.svg",
      link: "",
    },
    {
      name: "Formulario DUA",
      logo: "/svg/logos/dga.svg",
      icon: "/svg/export/steps/exportStepIcon6.svg",
      icon2: "/svg/export/steps/stepIcon6.svg",
      link: "",
    },
    {
      name: "Certificación de Origen",
      logo: "/svg/logos/dga.svg",
      icon: "/svg/export/steps/exportStepIcon7.svg",
      icon2: "/svg/export/steps/stepIcon7.svg",
      link: "",
    },
    {
      name: "Cumplimiento de requisitos especiales agrícolas",
      logo: "/svg/logos/agricultura.svg",
      icon: "/svg/export/steps/exportStepIcon8.svg",
      icon2: "/svg/export/steps/stepIcon8.svg",
      link: "",
    },
    {
      name: "Documento de Embarque",
      logo: "",
      icon: "/svg/export/steps/exportStepIcon9.svg",
      icon2: "/svg/export/steps/stepIcon9.svg",
      link: "",
    },
    {
      name: "Inspección",
      logo: "",
      icon: "/svg/export/steps/exportStepIcon10.svg",
      icon2: "/svg/export/steps/stepIcon10.svg",
      link: "",
    },
  ];
  return (
    <div>
      <div className="relative h-[40vh] sm:h-[80vh]">
        <Image
          width={5378}
          height={3589}
          src={"/images/export/cargoship.jpg"}
          alt="directory"
          className="w-full h-full object-cover"
        />
        <div className="bg-black/30 absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3 text-white text-center pt-10">
            <div className="uppercase w-full font-bold text-xl sm:text-5xl">
              Como exportar paso a paso
            </div>
            <div className="w-6/12 text-lg">
              Descubre cómo exportar desde República Dominicana, sigue nuestros
              pasos para llevar tus productos al mercado internacional y
              expandir tu negocio.
            </div>
          </div>
        </div>
      </div>
      <div className="h-full bg-white flex justify-center py-10">
        <div className="w-10/12 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-10">
          {stepsToExport.map((step, index) => (
            <StepCard
              key={index}
              index={index}
              name={step.name}
              logo={step.logo}
              icon={step.icon}
              icon2={step.icon2}
              link={step.link}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function StepCard({ name, desc, logo, icon, icon2, link, index }: any) {
  return (
    <Link
      href={link}
      className="flex h-80 rounded-2xl overflow-hidden bg-white relative"
    >
      <div className="w-full h-full absolute flex items-end pl-3">
        <Image
          width={500}
          height={500}
          src={icon2}
          draggable="false"
          alt="steps"
          className="w-11/12 object-cover"
        />
      </div>
      <div
        className={`w-2/12 h-full ${
          index % 2 === 0 ? "bg-lightBlue-500" : "bg-gray-300"
        } `}
      ></div>
      <div className="w-10/12 h-full flex flex-col items-center justify-center gap-2 text-black text-center">
        <Image
          width={500}
          height={500}
          src={icon}
          alt="directory"
          className="size-20 object-cover"
        />
        <div className="w-8/12 flex flex-col gap-1">
          <div className="text-lg font-bold">{name}</div>
        </div>
        {logo && (
          <Image
            width={500}
            height={500}
            src={logo}
            alt="logo"
            className="w-20 object-cover"
          />
        )}
      </div>
    </Link>
  );
}
