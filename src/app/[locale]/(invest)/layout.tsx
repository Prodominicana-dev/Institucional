"use client";
import Navbar from "@/components/layout/invest/navbar";
import LanguagePicker from "@/components/layout/navbar/languagePicker";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { APIProvider } from "@vis.gl/react-google-maps";

interface RootLayoutProps {
  children: React.ReactNode;
  locale: string;
}

export default function RootLayout({ children, locale }: RootLayoutProps) {
  const navbarOptions = [
    {
      title: "¿Por qué República Dominicana?",
      icon: "/svg/invest/whydrIcon.svg",
      link: "/invest/why-dominican-republic",
    },
    {
      title: "Mapa de desarrollo estratégico",
      icon: "/svg/invest/reasonIcon.svg",
      link: "/invest/map",
    },
    {
      title: "Sectores de inversión",
      icon: "/svg/invest/sectorsIcon.svg",
      link: "/invest/sectors",
    },
    {
      title: "Guía de inversión",
      icon: "/svg/invest/investmentGuideIcon.svg",
      link: "/invest/why-dominican-republic",
    },
    {
      title: "Ventanilla única de inversión",
      icon: "/svg/logos/vuiIcon.svg",
      link: "https://vui.gob.do",
    },
  ];
  return (
    <html className="scroll-smooth">
      <body>
        <APIProvider
          apiKey={`${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`}
          language={locale}
        >
          <Navbar options={navbarOptions} />
          {children}
        </APIProvider>
      </body>
    </html>
  );
}
