"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Footer from "@/components/layout/footer/footer";
import FooterMobile from "@/components/layout/footer/footerMobile";
import Accesibility from "@/components/accessibility/accesScrip";

/* Parte de cliente del layout: el proveedor de react-query y el pie. Se separa
   del layout porque los metadatos (el icono propio de Noticias Pro) solo se
   pueden exportar desde un componente de servidor. */
export default function NoticiasProShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Accesibility />
      <Footer />
      <FooterMobile />
    </QueryClientProvider>
  );
}
