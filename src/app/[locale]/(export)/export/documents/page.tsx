"use client";
import React from "react";
import Image from "next/image";
import DocsCard from "@/components/docs/docsCard";

export default function page() {
  const docs = [
    {
      name: "Estructura Organica de la Institucion 2023",
      document: "/documents/Estructura_Organica_de_la_Institucion_2023.pdf",
      cover: "/images/export/ship.jpg",
    },
  ];
  return (
    <div>
      <div className="relative h-[40vh] sm:h-[80vh]">
        <Image
          width={5378}
          height={3589}
          src={"/images/export/ship.jpg"}
          alt="directory"
          className="w-full h-full object-cover"
        />
        <div className="bg-black/30 absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3 text-white text-center pt-10">
            <div className="uppercase w-full font-bold text-xl sm:text-5xl">
              Documentos
            </div>
            <div className="w-6/12 text-lg">
              Optimiza tu experiencia exportadora con nuestra amplia gama de
              documentos.
            </div>
          </div>
        </div>
      </div>
      <div className="h-full bg-white flex justify-center py-10">
        <div className="w-10/12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {docs.map((doc, index) => (
            <DocsCard
              key={index}
              id={index}
              title={doc.name}
              pdf={doc.document}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
