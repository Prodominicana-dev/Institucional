import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { format } from "path";
import React, { useEffect } from "react";
import prettyBytes from "pretty-bytes";

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
    title: string;
    subsectionId: string;
  };
}) {
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
      <div className="flex flex-col sm:flex-row items-center gap-3 w-10/12">
        <Image
          width={100}
          height={100}
          alt={""}
          src={`/svg/icons/${icon}.svg`}
          className="w-12"
        />
        <div className="space-y-3 sm:space-y-0">
          <p className="text-lg text-black uppercase font-bold font-montserrat line-clamp-2">
            {doc.title ? doc.title : doc.name}
          </p>
          <div className="w-full flex gap-5">
            <p
              className={`${
                !doc.url ? "block" : "hidden"
              } text-black font-medium w-auto font-montserrat`}
            >
              {prettyBytes(Number(doc.size))}
            </p>
            <p className=" text-black font-medium font-montserrat">{date}</p>
          </div>
        </div>
      </div>
      {!doc.url && !doc.subsectionId && (
        <Link
          href={
            extension === "pdf"
              ? `${process.env.NEXT_PUBLIC_API_URL}/section/pdf/${doc.sectionId}/${doc.name}`
              : `${process.env.NEXT_PUBLIC_API_URL}/section/excel/${doc.sectionId}/${doc.name}`
          }
          target="_blank"
          rel="noopener noreferrer"
          download
          //onClick={handleClick}
          className="bg-transparent border-2 border-red-600 text-red-600 hover:text-white hover:bg-red-600 duration-300 w-full md:w-44 h-12 rounded-lg flex justify-center items-center"
        >
          {"Descargar"}
        </Link>
      )}
      {doc.url && !doc.subsectionId && (
        <a
          href={doc.url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-transparent border-2 border-red-600 text-red-600 hover:text-white hover:bg-red-600 duration-300 w-full md:w-44 h-12 rounded-lg flex justify-center items-center"
        >
          {"Ingresar"}
        </a>
      )}
      {!doc.url && doc.subsectionId && (
        <Link
          href={
            extension === "pdf"
              ? `${process.env.NEXT_PUBLIC_API_URL}/subsection/pdf/${doc.sectionId}/${doc.subsectionId}/${doc.name}`
              : `${process.env.NEXT_PUBLIC_API_URL}/subsection/excel/${doc.sectionId}/${doc.subsectionId}/${doc.name}`
          }
          target="_blank"
          rel="noopener noreferrer"
          download
          //onClick={handleClick}
          className="bg-transparent border-2 border-red-600 text-red-600 hover:text-white hover:bg-red-600 duration-300 w-full md:w-44 h-12 rounded-lg flex justify-center items-center"
        >
          {"Descargar"}
        </Link>
      )}
      {doc.url && doc.subsectionId && (
        <a
          href={doc.url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-transparent border-2 border-red-600 text-red-600 hover:text-white hover:bg-red-600 duration-300 w-full md:w-44 h-12 rounded-lg flex justify-center items-center"
        >
          {"Ingresar"}
        </a>
      )}
    </div>
  );
}
