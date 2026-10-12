"use client";
import { useState } from "react";
import {
  EyeIcon,
  EyeSlashIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";

type Accion = "" | "vista" | "editar" | "estado" | "eliminar";

/* Barra inferior de la tarjeta. Al pasar el raton sobre un boton, los demas
   se esconden y ese ocupa todo el ancho con su etiqueta. */
export function BarraAccionesPro({
  publicada,
  onVistaPrevia,
  onEditar,
  onCambiarEstado,
  onEliminar,
}: {
  publicada: boolean;
  onVistaPrevia: () => void;
  onEditar: () => void;
  onCambiarEstado: () => void;
  onEliminar: () => void;
}) {
  const [encima, setEncima] = useState<Accion>("");

  const slot = (
    accion: Exclude<Accion, "">,
    color: string,
    etiqueta: string,
    Icono: typeof EyeIcon,
    onClick: () => void
  ) => (
    <div
      onMouseEnter={() => setEncima(accion)}
      onMouseLeave={() => setEncima("")}
      className={`w-1/4 h-full relative duration-100 flex items-center justify-center ${
        encima !== "" && encima !== accion ? "hidden" : "group-hover:w-full"
      }`}
    >
      <button
        onClick={onClick}
        className={`w-8/12 h-4/6 flex gap-2 justify-center items-center rounded-lg ${color} group-hover:absolute group-hover:w-full group-hover:h-full group-hover:rounded-t-none group-hover:rounded-b-lg group-hover:animate-pulse duration-100`}
      >
        <Icono className="size-8 text-white" />
        <p
          className={`${
            encima === accion ? "block" : "hidden"
          } text-white font-semibold font-montserrat`}
        >
          {etiqueta}
        </p>
      </button>
    </div>
  );

  return (
    <div className="w-full h-1/6 flex gap-2 relative justify-center items-center group rounded-lg">
      {slot(
        "vista",
        "bg-slate-600",
        "Vista previa",
        MagnifyingGlassIcon,
        onVistaPrevia
      )}
      {slot("editar", "bg-blue-500", "Editar", PencilSquareIcon, onEditar)}
      {publicada
        ? slot("estado", "bg-black", "Ocultar", EyeSlashIcon, onCambiarEstado)
        : slot(
            "estado",
            "bg-green-500",
            "Publicar",
            EyeIcon,
            onCambiarEstado
          )}
      {slot("eliminar", "bg-red-500", "Eliminar", TrashIcon, onEliminar)}
    </div>
  );
}
