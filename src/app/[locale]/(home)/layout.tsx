"use client";
import FooterMobile from "@/components/layout/footer/footerMobile";
import NavBarMobile from "@/components/layout/navbar/navBarMobile";
import Footer from "@/components/layout/footer/footer";
import Navbar from "@/components/layout/navbar/navbar";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <NavBarMobile />
        {children}
        <Footer />
        <FooterMobile />
      </QueryClientProvider>
    </div>
  );
}
