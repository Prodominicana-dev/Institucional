"use client";
import React from "react";
import Footer from "@/components/layout/footer/footer";
import FooterMobile from "@/components/layout/footer/footerMobile";
import Accesibility from "@/components/accessibility/accesScrip";

/* Parte de cliente del layout: el pie institucional. Se separa del layout
   porque los metadatos solo se pueden exportar desde un componente de servidor. */
export default function MujeresShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Accesibility />
      <Footer />
      <FooterMobile />
    </>
  );
}
