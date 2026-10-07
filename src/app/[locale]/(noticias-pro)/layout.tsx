"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Footer from "@/components/layout/footer/footer";
import FooterMobile from "@/components/layout/footer/footerMobile";
import Accesibility from "@/components/accessibility/accesScrip";

interface LayoutProps {
  children: React.ReactNode;
}

/* Noticias Pro trae su propia cabecera, la que diseñó el cliente. Por eso este
   grupo no monta el Navbar institucional, al contrario que (home). El pie sí
   se conserva. */
export default function NoticiasProLayout({ children }: LayoutProps) {
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
