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
      placeholder={undefined}
    >
      <AccordionHeader onClick={() => handleOpen(id)} placeholder={undefined}>
        {question}
      </AccordionHeader>
      <AccordionBody placeholder={undefined}>{answer}</AccordionBody>
    </Accordion>
  );
}
