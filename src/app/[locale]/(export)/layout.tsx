"use client";
import Navbar from "@/components/layout/export/navbar";
import LanguagePicker from "@/components/layout/navbar/languagePicker";
import React from "react";
import { APIProvider } from "@vis.gl/react-google-maps";

interface RootLayoutProps {
  children: React.ReactNode;
  locale: string;
}

export default function RootLayout({ children, locale }: RootLayoutProps) {
  const navbarOptions = [
    {
      title: "Servicios",
      icon: "/svg/icons/exportIcon.svg",
      link: "/invest/services",
    },
    {
      title: "Como exportar paso a paso",
      icon: "/svg/icons/exportIcon.svg",
      link: "/export/how-to-export",
    },
    {
      title: "Directorio de exportadores",
      icon: "/svg/icons/exportIcon.svg",
      link: "/export/directory",
    },
    {
      title: "Testimonios",
      icon: "/svg/icons/exportIcon.svg",
      link: "/export/why-dominican-republic",
    },
    {
      title: "Documentos",
      icon: "/svg/icons/exportIcon.svg",
      link: "/export/documents",
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
