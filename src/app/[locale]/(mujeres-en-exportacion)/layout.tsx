import type { Metadata } from "next";
import React from "react";
import localFont from "next/font/local";
import MujeresShell from "./shell";

/* Mujeres en Exportación trae su propia cabecera (diseño de Comunicaciones),
   así que este grupo no monta el Navbar institucional. El pie sí se conserva,
   igual que en Noticias Pro. */

const aeonik = localFont({
  src: [
    { path: "./fonts/Aeonik-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/Aeonik-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-aeonik",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Programa | Mujeres en Exportación 2026",
  description:
    "Programa del Encuentro Nacional Mujeres en Exportación, 18 y 19 de noviembre de 2026.",
  openGraph: {
    title: "Programa | Mujeres en Exportación 2026",
    description:
      "Programa del Encuentro Nacional Mujeres en Exportación, 18 y 19 de noviembre de 2026.",
    url: "https://prodominicana.gob.do/mujeres-en-exportacion",
    siteName: "ProDominicana",
    type: "website",
    images: [{ url: "/images/mujeres-en-exportacion/logo.png", width: 1673, height: 650 }],
  },
};

export default function MujeresLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={aeonik.variable}>
      <MujeresShell>{children}</MujeresShell>
    </div>
  );
}
