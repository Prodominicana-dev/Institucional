"use client";
import Image from "next/image";
import TextContent from "@/components/news/text";
import { SECCIONES } from "@/components/proeconomia/secciones";

/* Cuerpo de la noticia dentro de Noticias Pro. A diferencia del detalle del
   portal, la cabecera no es la franja azul institucional: lleva la seccion en
   rojo de la marca, como la maqueta de Noticias Pro. */
export default function ArticuloPro({
  noticia,
  locale,
}: {
  noticia: any;
  locale: string;
}) {
  const seccion = SECCIONES.find((s) => s.key === noticia?.seccion);
  const fecha = noticia?.date
    ? new Date(noticia.date).toLocaleDateString(
        locale === "en" ? "en-US" : "es-DO",
        { day: "2-digit", month: "long", year: "numeric" }
      )
    : "";

  return (
    <article className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3 font-montserrat text-xs font-bold uppercase tracking-wide">
          {seccion && (
            <span className="rounded-sm bg-[#C8102E] px-2.5 py-1 text-white">
              {seccion.nombre}
            </span>
          )}
          {fecha && <span className="font-semibold text-gray-400">{fecha}</span>}
        </div>

        <h1 className="font-montserrat text-3xl font-extrabold leading-tight text-blue-dark lg:text-4xl">
          {noticia?.title}
        </h1>

        {noticia?.description && (
          <div
            className="font-opensans text-lg leading-relaxed text-gray-600"
            dangerouslySetInnerHTML={{ __html: noticia.description }}
          />
        )}
      </div>

      {noticia?.cover && (
        <Image
          width={1920}
          height={1080}
          alt={noticia?.title ?? ""}
          src={`${process.env.NEXT_PUBLIC_API_URL}/news/images/${noticia?.id}/${noticia?.cover}`}
          className="my-8 max-h-[70vh] w-full rounded-md object-cover object-center"
        />
      )}

      <TextContent text={noticia?.content} />
    </article>
  );
}
