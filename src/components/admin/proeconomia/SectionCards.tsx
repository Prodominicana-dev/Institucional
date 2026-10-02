"use client";
import React from "react";
import Link from "next/link";
import {
  EnvelopeOpenIcon,
  UsersIcon,
  NewspaperIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

const SECCIONES = [
  {
    titulo: "Boletines",
    descripcion: "Redacte, programe y envíe el boletín del Radar Económico.",
    url: "/admin/newsletter",
    Icono: EnvelopeOpenIcon,
  },
  {
    titulo: "Suscriptores",
    descripcion: "Consulte y exporte las personas suscritas al boletín.",
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
