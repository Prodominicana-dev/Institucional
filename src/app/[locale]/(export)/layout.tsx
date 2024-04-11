"use client";
import Navbar from "@/components/layout/export/navbar";
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
      icon: "/svg/icons/exportIcon.svg",
      link: "/export/services",
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
      title: "Documentos",
      icon: "/svg/icons/exportIcon.svg",
      link: "/export/documents",
    },
  ];
  const queryClient = new QueryClient();
  return (
    <html className="scroll-smooth">
      <body>
        <QueryClientProvider client={queryClient}>
          <Navbar options={navbarOptions} />
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
