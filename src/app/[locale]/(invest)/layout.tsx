import Navbar from "@/components/layout/invest/navbar";
import LanguagePicker from "@/components/layout/navbar/languagePicker";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navbarOptions = [
    {
      title: "¿Por qué República Dominicana?",
      icon: "/svg/invest/whydrIcon.svg",
      link: "/invest/why-dominican-republic",
    },
    {
      title: "Mapa de oportunidades",
      icon: "/svg/invest/reasonIcon.svg",
      link: "/invest/why-dominican-republic",
    },
    {
      title: "Sectores de inversión",
      icon: "/svg/invest/sectorsIcon.svg",
      link: "/invest/why-dominican-republic",
    },
    {
      title: "Establecerse en República Dominicana",
      icon: "/svg/invest/settleindrIcon.svg",
      link: "/invest/why-dominican-republic",
    },
    {
      title: "Guía de inversión",
      icon: "/svg/invest/investmentGuideIcon.svg",
      link: "/invest/why-dominican-republic",
    },
    {
      title: "Ventanilla única de inversión",
      icon: "/svg/logos/VuiIcon.svg",
      link: "https://vui.gob.do",
    },
  ];
  return (
    <html className="scroll-smooth">
      <body>
        <Navbar options={navbarOptions} />
        {children}
      </body>
    </html>
  );
}
