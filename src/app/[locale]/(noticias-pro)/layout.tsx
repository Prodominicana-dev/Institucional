import type { Metadata } from "next";
import React from "react";
import NoticiasProShell from "./shell";

/* Noticias Pro trae su propia cabecera, la que diseñó el cliente. Por eso este
   grupo no monta el Navbar institucional, al contrario que (home). El pie sí
   se conserva.

   El icono va aquí y no como archivo icon.png del segmento: el layout raíz
   declara sus iconos por la API de metadatos y esa declaración gana a los
   archivos de convención de las rutas hijas. */
export const metadata: Metadata = {
  icons: {
    icon: [
      {
        url: "/images/noticias-pro/icono-32.png",
        type: "image/png",
        sizes: "32x32",
      },
      {
        url: "/images/noticias-pro/icono.png",
        type: "image/png",
        sizes: "512x512",
      },
    ],
  },
  /* La imagen de compartir va declarada y no como archivo opengraph-image del
     segmento: para esos archivos Next ignora metadataBase y arma la direccion
     con el origen del servidor, que fuera de Vercel es localhost. */
  openGraph: {
    url: "https://prodominicana.gob.do/noticias-pro",
    siteName: "ProDominicana",
    type: "website",
    images: [{ url: "/images/noticias-pro/og.png", width: 1200, height: 630 }],
  },
};

export default function NoticiasProLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <NoticiasProShell>{children}</NoticiasProShell>;
}
