"use client";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { enlaceNoticia } from "@/components/proeconomia/enlace";

interface Props {
  noticias: any[];
  locale: string;
}

/* Noticias destacadas del encabezado. Con una sola se ve igual que antes:
   las flechas y los puntos solo aparecen cuando hay mas de una. */
export default function FeaturedCarousel({ noticias, locale }: Props) {
  /* Avanza solo cada 6 segundos. Se detiene al pasar el raton por encima y no
     se reanuda si la persona usa las flechas o los puntos: si esta leyendo un
     titular, no se le debe mover debajo. */
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 6000, stopOnMouseEnter: true, stopOnInteraction: true }),
  ]);
  const [activo, setActivo] = useState(0);

  const alSeleccionar = useCallback(() => {
    if (emblaApi) setActivo(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", alSeleccionar);
    alSeleccionar();
    return () => {
      emblaApi.off("select", alSeleccionar);
    };
  }, [emblaApi, alSeleccionar]);

  const varias = noticias.length > 1;

  return (
    <div className="relative h-[420px] overflow-hidden rounded-md lg:h-full">
      <div className="h-full overflow-hidden" ref={emblaRef}>
        <div className="flex h-full">
          {noticias.map((noticia) => (
            <div key={noticia.id} className="h-full min-w-0 flex-[0_0_100%]">
              <Link
                {...enlaceNoticia(noticia, locale)}
                className="group relative block h-full overflow-hidden rounded-md"
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/news/images/${noticia.id}/${noticia.cover}`}
                  alt={noticia.title ?? ""}
                  fill
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-dark via-blue-dark/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="font-montserrat text-xs font-bold uppercase tracking-widest text-red-400">
                    {locale === "es"
                      ? noticia.category?.nameEs
                      : noticia.category?.nameEn}
                  </span>
                  <h2 className="mt-2 line-clamp-3 font-montserrat text-2xl font-extrabold uppercase text-white lg:text-3xl">
                    {noticia.title}
                  </h2>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {varias && (
        <>
          <button
            type="button"
            aria-label="Noticia anterior"
            onClick={() => emblaApi?.scrollPrev()}
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow hover:bg-white"
          >
            <ChevronLeftIcon className="size-5 text-blue-dark" />
          </button>
          <button
            type="button"
            aria-label="Noticia siguiente"
            onClick={() => emblaApi?.scrollNext()}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow hover:bg-white"
          >
            <ChevronRightIcon className="size-5 text-blue-dark" />
          </button>
          {/* Los puntos van encima de la imagen: si fueran debajo, el bloque
              dejaria de medir lo mismo que la columna de portadas. */}
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5">
            {noticias.map((n, i) => (
              <button
                key={n.id}
                type="button"
                aria-label={`Noticia ${i + 1}`}
                onClick={() => emblaApi?.scrollTo(i)}
                className={`h-1.5 rounded-full duration-200 ${
                  i === activo ? "w-5 bg-white" : "w-1.5 bg-white/50"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
