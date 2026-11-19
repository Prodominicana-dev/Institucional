"use client";
import Navbar, { NavbarExportMobile } from "@/components/layout/export/navbar";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navbarOptions = [
    {
      title: "Servicios",
      icon: "/svg/export/servicesIcon.svg",
      link: "/export/services",
    },
    {
      title: "Cómo exportar paso a paso",
      icon: "/svg/export/howtoexportIcon.svg",
      link: "/export/how-to-export",
    },
    {
      title: "Directorio de exportadores",
      icon: "/svg/export/exportersDirectoryIcon.svg",
      link: "/export/directory",
    },
    {
      title: "Documentos",
      icon: "/svg/export/docsIcon.svg",
      link: "/export/documents",
    },
  ];
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <NavbarExportMobile options={navbarOptions} />
      <Navbar options={navbarOptions} />
      {children}
    </QueryClientProvider>
  );
}
