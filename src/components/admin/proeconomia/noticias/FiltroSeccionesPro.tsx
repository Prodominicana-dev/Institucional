"use client";
import { SECCIONES } from "@/components/proeconomia/secciones";

/* Botonera de secciones. Botones y no desplegable: son cuatro y conviene ver
   de un golpe cuantas noticias tiene cada seccion. */
export function FiltroSeccionesPro({
  activa,
  setActiva,
  conteos,
  total,
}: {
  activa: string;
  setActiva: (v: string) => void;
  conteos: Record<string, number>;
  total: number;
}) {
  const opciones = [
    { key: "", nombre: "Todas", cantidad: total },
    ...SECCIONES.map(({ key, nombre }) => ({
      key,
      nombre,
      cantidad: conteos[key] ?? 0,
    })),
  ];

  return (
    <div className="w-full flex flex-wrap gap-3">
      {opciones.map(({ key, nombre, cantidad }) => (
        <button
          key={key || "todas"}
          onClick={() => setActiva(key)}
          className={`h-10 rounded-full px-5 font-montserrat text-sm font-semibold duration-150 ${
            activa === key
              ? "bg-[#C8102E] text-white"
              : "border border-gray-300 text-gray-600 hover:bg-gray-100"
          }`}
        >
          {nombre} ({cantidad})
        </button>
      ))}
    </div>
  );
}
