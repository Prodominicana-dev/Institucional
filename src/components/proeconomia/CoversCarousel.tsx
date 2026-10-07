"use client";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface Props {
  covers: any[];
  titulo: string;
}

/* Portadas de los periodicos del dia. Con una sola se ve igual que antes:
   las flechas y los puntos solo aparecen cuando hay mas de una. */
export default function CoversCarousel({ covers, titulo }: Props) {
  /* Avanza solo cada 5 segundos. Se detiene al pasar el raton por encima y
     no se reanuda si la persona usa las flechas o los puntos: si esta
     mirando una portada concreta, no se le debe mover debajo. */
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnMouseEnter: true, stopOnInteraction: true }),
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

  const varias = covers.length > 1;

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-md" ref={emblaRef}>
        <div className="flex">
          {covers.map((cover) => (
            <div key={cover.id} className="min-w-0 flex-[0_0_100%]">
              <a
                href={cover.link ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="block overflow-hidden rounded-md border border-gray-200 transition-shadow hover:shadow-md"
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/newspaper-cover/${cover.id}/img/${cover.image}`}
                  alt={cover.media ?? titulo}
                  width={260}
                  height={380}
                  className="w-full object-cover"
                />
                {cover.media && (
                  <div className="bg-blue-950 p-2">
                    <p className="truncate font-montserrat text-xs text-white">
                      {cover.media}
                    </p>
                  </div>
                )}
              </a>
            </div>
          ))}
        </div>
      </div>

      {varias && (
        <>
          <button
            type="button"
            aria-label="Portada anterior"
            onClick={() => emblaApi?.scrollPrev()}
            className="absolute left-1 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-1.5 shadow hover:bg-white"
          >
            <ChevronLeftIcon className="size-4 text-blue-dark" />
          </button>
          <button
            type="button"
            aria-label="Portada siguiente"
            onClick={() => emblaApi?.scrollNext()}
            className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-1.5 shadow hover:bg-white"
          >
            <ChevronRightIcon className="size-4 text-blue-dark" />
          </button>
          <div className="mt-3 flex justify-center gap-1.5">
            {covers.map((c, i) => (
              <button
                key={c.id}
                type="button"
                aria-label={`Portada ${i + 1}`}
                onClick={() => emblaApi?.scrollTo(i)}
                className={`h-1.5 rounded-full duration-200 ${
                  i === activo ? "w-5 bg-blue-dark" : "w-1.5 bg-gray-300"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
