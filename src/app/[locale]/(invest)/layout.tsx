"use client";
import Navbar from "@/components/layout/invest/navbar";
import LanguagePicker from "@/components/layout/navbar/languagePicker";
import Image from "next/image";
import Link from "next/link";
import React, { use } from "react";
import { APIProvider } from "@vis.gl/react-google-maps";
import { useTranslations } from "next-intl";

interface RootLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export default function RootLayout({ children, params }: RootLayoutProps) {
  const t = useTranslations("invest");
  const navbarOptions = [
    {
      title: t("navbar.whydominicanrepublic"),
      icon: "/svg/invest/whydrIcon.svg",
      link: "/invest/why-dominican-republic",
    },
    {
      title: t("navbar.strategicdevelopmentmap"),
      icon: "/svg/invest/reasonIcon.svg",
      link: "/invest/map",
    },
    {
      title: t("navbar.sectors"),
      icon: "/svg/invest/sectorsIcon.svg",
      link: "/invest/sectors",
    },
    {
      title: t("navbar.investmentguide"),
      icon: "/svg/invest/investmentGuideIcon.svg",
      link: "/invest/investment-guide",
    },
    {
      title: t("navbar.vui"),
      icon: "/svg/logos/vuiIcon.svg",
      link: "https://vui.gob.do",
    },
  ];
  return (
    <html className="scroll-smooth">
      <body>
        <APIProvider
          apiKey={`${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`}
          language={params.locale}
        >
          <Navbar options={navbarOptions} />
          {children}
        </APIProvider>
      </body>
    </html>
  );
}
