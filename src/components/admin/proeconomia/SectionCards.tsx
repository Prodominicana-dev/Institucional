"use client";
import React from "react";
import Link from "next/link";
import {
  UsersIcon,
  NewspaperIcon,
  ChartBarIcon,
  StarIcon,
} from "@heroicons/react/24/outline";

const SECCIONES = [
  {
    titulo: "Noticia destacada",
    descripcion: "Elija la noticia que encabeza la página de Noticias Pro.",
    url: "/admin/proeconomia/destacada",
    Icono: StarIcon,
  },
  {
    titulo: "Noticias",
    descripcion:
      "Redacte las noticias que salen en Noticias Pro y elija su sección.",
    url: "/admin/news?from=proeconomia",
    Icono: NewspaperIcon,
  },
  {
    titulo: "Suscriptores",
    descripcion: "Consulte y exporte las personas suscritas.",
    url: "/admin/newsletter/subscribers",
    Icono: UsersIcon,
  },
  {
    titulo: "Portadas Diarias",
    descripcion: "Cargue las portadas de los periódicos del día.",
    url: "/admin/newspaper-covers",
    Icono: NewspaperIcon,
  },
  {
    titulo: "Indicadores",
    descripcion: "Actualice el dólar, el euro, el petróleo y el flete marítimo.",
    url: "/admin/indicators",
    Icono: ChartBarIcon,
  },
];

export function SectionCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {SECCIONES.map(({ titulo, descripcion, url, Icono }) => (
        <Link
          key={url}
          href={url}
          className="bg-gray-100 rounded-lg p-6 flex flex-col items-center text-center hover:bg-gray-200 duration-150"
        >
          <Icono className="size-10 text-navy mb-3" />
          <span className="text-xl font-semibold text-navy mb-2">{titulo}</span>
          <span className="text-gray-500 text-sm">{descripcion}</span>
        </Link>
      ))}
    </div>
  );
}
