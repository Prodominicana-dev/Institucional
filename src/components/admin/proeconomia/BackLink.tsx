"use client";
import React from "react";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

/* Vuelta a la pantalla anterior. Estas pantallas cuelgan de Proeconomia, que
   es una sola entrada del sidebar: sin esto hay que navegar de nuevo desde el
   menu para pasar de una a otra. */
export function BackLink({
  href = "/admin/proeconomia",
  label = "Volver a Noticias Pro",
}: {
  href?: string;
  label?: string;
}) {
  return (
    <Link
      href={href}
      className="mb-4 inline-flex items-center gap-1.5 font-montserrat text-sm font-semibold text-blue-900 hover:underline"
    >
      <ArrowLeftIcon className="size-4" />
      {label}
    </Link>
  );
}
