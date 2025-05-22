"use client";
import { useTranslations } from "next-intl";
import React from "react";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export default function Page({ params: { locale } }: any) {
  const t = useTranslations("faqs");
  const [open, setOpen] = React.useState(0);
  const handleOpen = (value: any) => setOpen(value);
  const faqs = {
    title: t("title"),
    questionsEs: [
      {
        question: "¿Qué es ProDominicana?",
        answer:
          "ProDominicana es el Centro de Exportación e Inversión de la República Dominicana, una institución pública, autónoma y descentralizada, creada para promover y facilitar la exportación de bienes y servicios, así como la inversión extranjera en el país.",
      },
      {
        question: "¿Cuál es la misión de ProDominicana?",
        answer:
          "La misión de ProDominicana es promover el desarrollo sostenible del comercio exterior y la inversión extranjera directa en la República Dominicana, contribuyendo así al crecimiento económico y la generación de empleo.",
      },
      {
        question: "¿Qué servicios ofrece ProDominicana?",
        answer:
          "ProDominicana ofrece una amplia gama de servicios para apoyar a las empresas interesadas en exportar e invertir en la República Dominicana. Esto incluye asesoramiento sobre procesos de exportación e inversión, identificación de oportunidades de negocio, facilitación de contactos comerciales, promoción de productos y servicios dominicanos en mercados internacionales, entre otros.",
      },
      {
        question: "¿Cómo puedo contactar a ProDominicana?",
        answer:
          "Puedes contactar a ProDominicana a través de los siguientes medios:\n- Por correo electrónico: servicios@prodominicana.gob.do\n- Por teléfono: (809) 530-5505\n- Visitando sus oficinas en Avenida 27 de Febrero esquina Avenida Gregorio Luperón, Plaza de la Bandera, Santo Domingo de Guzmán, Distrito Nacional, República Dominicana.",
      },
      {
        question: "¿Cuál es el objetivo de ProDominicana?",
        answer:
          "El objetivo de ProDominicana es impulsar el desarrollo económico del país mediante la promoción de las exportaciones y la atracción de inversiones, contribuyendo así al aumento de la competitividad de las empresas dominicanas en los mercados internacionales.",
      },
      {
        question: "¿Cuales son los requisitos para convertirse en exportador?",
        answer:
          "Se define como los aportes provenientes del exterior, propiedad de personas físicas o morales extranjeras o de personas físicas nacionales residentes en el exterior, al capital de una empresa que opera en el territorio nacional.",
      },
      {
        question: "¿Qué es la Inversión Extranjera Directa o IED?",
        answer:
          "Antes de comenzar a exportar se necesita agotar un proceso detallado el cual se describe en el siguiente enlace que le dará acceso al documento Guia practica/como iniciarse en las exportaciones, donde se indican los pasos a seguir.",
      },
      {
        question: "¿A qué llamamos reinversión extranjera o de utilidades?  ",
        answer:
          "Es el proceso mediante el cual una empresa o persona jurídica extranjera realiza una solicitud en el CEI-RD, respecto a su inversión y una vez evaluado y validado el expediente se emite un Certificado de Registro de Inversión Extranjera y/o Transferencia de Tecnología, según lo establece la Ley No. 16-95 y su Reglamento de Aplicación.",
      },
      {
        question: "¿Que es un acuerdo de libre comercio? ",
        answer:
          "Un acuerdo libre comercio es un acuerdo comercial que amplía el mercado de bienes y servicios, promoviendo y facilitando las inversiones entre los países partes que integran el acuerdo. Un acuerdo o tratado de libre comercio (TLC) consiste en la eliminación o reducción sustancial de los aranceles de importación para los bienes de los países las partes, y acuerdos en materia de servicios.",
      },
      {
        question:
          "¿Es la República Dominicana miembro de la Comunidad del Caribe (CARICOM)? ",
        answer:
          "No, la República Dominicana no es miembro de la Comunidad del Caribe (CARICOM), solo ha suscrito un acuerdo de libre comercio con CARICOM, que le permite intercambiar bienes y servicios en el marco de un régimen de preferencias recíprocas con los países que integran el acuerdo comercial.",
      },
    ],
    questionsEn: [
      {
        question: "What is ProDominicana?",
        answer:
          "ProDominicana is the Center for Export and Investment of the Dominican Republic, a public, autonomous, and decentralized institution created to promote and facilitate the export of goods and services, as well as foreign investment in the country.",
      },
      {
        question: "What is ProDominicana's mission?",
        answer:
          "ProDominicana's mission is to promote sustainable development of foreign trade and foreign direct investment in the Dominican Republic, thereby contributing to economic growth and job creation.",
      },
      {
        question: "What services does ProDominicana offer?",
        answer:
          "ProDominicana offers a wide range of services to support companies interested in exporting and investing in the Dominican Republic. This includes advice on export and investment processes, identification of business opportunities, facilitation of business contacts, promotion of Dominican products and services in international markets, among others.",
      },
      {
        question: "How can I contact ProDominicana?",
        answer:
          "You can contact ProDominicana through the following means:\n- By email: servicios@prodominicana.gob.do\n- By phone: (809) 530-5505\n- Visiting their offices at Avenida 27 de Febrero esquina Avenida Gregorio Luperón, Plaza de la Bandera, Santo Domingo de Guzmán, Distrito Nacional, Dominican Republic.",
      },
      {
        question: "What is ProDominicana's objective?",
        answer:
          "ProDominicana's objective is to promote the economic development of the country by promoting exports and attracting investments, thereby increasing the competitiveness of Dominican companies in international markets.",
      },
      {
        question: "What are the requirements to become an exporter?",
        answer:
          "It is defined as contributions from abroad, owned by foreign individuals or legal entities or by national individuals residing overseas, to the capital of a company operating within the national territory.",
      },
      {
        question: "What is Foreign Direct Investment (FDI)?",
        answer:
          "Before starting to export, you must complete a detailed process. The steps are outlined in the following link, which provides access to the document Practical Guide/How to Get Started in Exports, where the necessary procedures are explained",
      },
      {
        question:
          "What do we call foreign reinvestment or profit reinvestment?",
        answer:
          "It is the process by which a foreign company or legal entity submits an application to the CEI-RD (Export and Investment Center of the Dominican Republic) regarding its investment. Once the file is evaluated and validated, a Certificate of Registration of Foreign Investment and/or Technology Transfer is issued, as established by Law No. 16-95 and its Implementing Regulations.",
      },
      {
        question: "What is a free trade agreement (FTA)?",
        answer:
          "A free trade agreement (FTA) is a commercial agreement that expands the market for goods and services, promoting and facilitating investments between the member countries of the agreement. A free trade agreement or treaty (FTA) involves the elimination or substantial reduction of import tariffs on goods from the member countries, as well as agreements on services.",
      },
      {
        question:
          "Is the Dominican Republic a member of the Caribbean Community (CARICOM)?",
        answer:
          "No, the Dominican Republic is not a member of the Caribbean Community (CARICOM). It has only signed a free trade agreement (FTA) with CARICOM, which enables the exchange of goods and services under a framework of reciprocal trade preferences with the countries that are part of the trade agreement.",
      },
    ],
  };

  return (
    <div className="flex justify-center py-10 bg-white">
      <div className="w-10/12 sm:w-8/12 flex flex-col gap-5">
        <h1 className="text-4xl font-bold">{faqs.title}</h1>
        {locale === "es"
          ? faqs.questionsEs.map((faq: any, index: number) => (
              <FaqCard
                key={index}
                id={index}
                question={faq.question}
                answer={faq.answer}
                open={open}
                handleOpen={handleOpen}
              />
            ))
          : faqs.questionsEn.map((faq: any, index: number) => (
              <FaqCard
                key={index}
                id={index}
                question={faq.question}
                answer={faq.answer}
                open={open}
                handleOpen={handleOpen}
              />
            ))}
      </div>
    </div>
  );
}

function FaqCard({ id, question, answer, open, handleOpen }: any) {
  return (
    <Accordion
      open={open === id}
      icon={
        <ChevronDownIcon
          className={`${
            id === open ? "rotate-180" : ""
          } h-5 w-5 transition-transform`}
        />
      }
    >
      <AccordionHeader onClick={() => handleOpen(id)}>
        {question}
      </AccordionHeader>
      <AccordionBody>{answer}</AccordionBody>
    </Accordion>
  );
}
