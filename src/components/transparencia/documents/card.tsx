import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { format } from "path";
import React from "react";

export default function DocsCard({
  doc,
}: {
  doc: {
    id: string;
    name: string;
    date: Date;
    size: string;
    url: string;
    sectionId: string;
  };
}) {
  const handleClick = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/files/docs/${doc.sectionId}/${doc.name}`
      );

      if (!response.ok) {
        throw new Error(
          `Error al descargar el archivo: ${response.statusText}`
        );
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = doc.name;
      a.click();

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error al descargar el archivo:", error);
      // Mostrar mensaje al usuario o redirigir a página de error
    }
  };
  const date = new Date(doc.date).toLocaleDateString("es-ES");

  // Convertir el size a number, luego de KB a MB y solo mostrar 2 decimales
  const size = (Number(doc.size) / 1024 / 1000).toFixed(3);

  // Extraer la extensión del archivo
  const extension = doc.name.split(".").pop();
  const icon =
    extension === "pdf"
      ? "pdf"
      : extension === "xlsx"
      ? "xls"
      : doc.url !== "" && "url";

  return (
    <div
      className={`w-full border-2 border-gray-300 rounded-xl p-5 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-3`}
    >
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <Image
          width={100}
          height={100}
          alt={""}
          src={`/svg/icons/${icon}.svg`}
          className="w-12"
        />
        <div className="space-y-3 sm:space-y-0">
          <p className="text-lg text-black uppercase font-bold font-montserrat line-clamp-2">
            {doc.name}
          </p>
          <div className="w-full flex gap-5">
            <p
              className={`${
                !doc.url ? "block" : "hidden"
              } text-black font-medium w-auto font-montserrat`}
            >
              {size} MB
            </p>
            <p className=" text-black font-medium font-montserrat">{date}</p>
          </div>
        </div>
      </div>
      <button
        onClick={handleClick}
        className="bg-transparent border-2 border-red-600 text-red-600 hover:text-white hover:bg-red-600 duration-300 w-full md:w-44 h-12 rounded-lg flex justify-center items-center"
      >
        {!doc.url ? "Descargar" : "Ingresar"}
      </button>
    </div>
  );
}
