"use client";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { urlExterna } from "@/components/proeconomia/enlace";

interface Props {
  covers: any[];
  titulo: string;
}

/* Portadas de los periodicos del dia. Con una sola se ve igual que antes:
   las flechas y los puntos solo aparecen cuando hay mas de una.

   En pantalla grande la columna tiene altura fija, asi que el carrusel se
   estira para que la portada acabe a la misma altura que la destacada. */
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
    <div className="relative lg:flex lg:h-full lg:flex-col">
      <div
        className="overflow-hidden rounded-md lg:min-h-0 lg:flex-1"
        ref={emblaRef}
      >
        <div className="flex lg:h-full">
          {covers.map((cover) => {
            /* Sin enlace no se pinta un <a>: antes iba a "#" con target
               _blank, asi que abria una pestana en blanco. */
            const href = urlExterna(cover.link);
            const Contenedor: any = href ? "a" : "div";
            return (
              <div
                key={cover.id}
                className="min-w-0 flex-[0_0_100%] lg:h-full"
              >
                <Contenedor
                  href={href}
                  target={href ? "_blank" : undefined}
                  rel={href ? "noopener noreferrer" : undefined}
                  className="block overflow-hidden rounded-md border border-gray-200 transition-shadow hover:shadow-md lg:flex lg:h-full lg:flex-col"
                >
                  <div className="lg:min-h-0 lg:flex-1">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_URL}/newspaper-cover/${cover.id}/img/${cover.image}`}
                      alt={cover.media ?? titulo}
                      width={320}
                      height={460}
                      className="w-full object-cover lg:h-full"
                    />
                  </div>
                  {cover.media && (
                    <div className="bg-blue-950 p-2">
                      <p className="truncate font-montserrat text-xs text-white">
                        {cover.media}
                      </p>
                    </div>
                  )}
                </Contenedor>
              </div>
            );
          })}
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
