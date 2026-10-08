"use client";
import { useEffect, useState } from "react";
import { BackLink } from "./BackLink";

/* El enlace de vuelta solo se pinta si se llego desde el panel de Noticias Pro.
   A /admin/news tambien se entra por el menu lateral, y ahi un "Volver a
   Noticias Pro" confundiria.

   Se mira la direccion con window.location en vez de useSearchParams porque
   ese hook obliga a envolver la pagina en Suspense o el build falla. */
export function BackLinkSiViene({ desde = "proeconomia" }: { desde?: string }) {
  const [mostrar, setMostrar] = useState(false);

  useEffect(() => {
    const from = new URLSearchParams(window.location.search).get("from");
    setMostrar(from === desde);
  }, [desde]);

  if (!mostrar) return null;
  return <BackLink />;
}
