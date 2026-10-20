"use client";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import { rotuloSeccion } from "./secciones";
import { enlaceNoticia } from "@/components/proeconomia/enlace";

interface Props {
  news: any[];
  locale: string;
}

/* Noticias Recientes en carrusel: tres miniaturas por vista en pantalla
   grande y una en movil. Con tres o menos no aparecen ni flechas ni puntos. */
export default function RecentNewsThumbs({ news, locale }: Props) {
  const t = useTranslations("proeconomia");
  /* Avanza solo cada 5 segundos, igual que la destacada. Se detiene al pasar
     el raton por encima y no se reanuda si la persona usa las flechas: si
     esta leyendo un titular, no se le debe mover debajo. El loop es lo que
     deja que siga girando al llegar a la ultima. */
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: true }, [
    Autoplay({ delay: 5000, stopOnMouseEnter: true, stopOnInteraction: true }),
  ]);
  const [activo, setActivo] = useState(0);
  const [puntos, setPuntos] = useState<number[]>([]);

  const alSeleccionar = useCallback(() => {
    if (emblaApi) setActivo(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setPuntos(emblaApi.scrollSnapList());
    emblaApi.on("select", alSeleccionar);
    alSeleccionar();
    return () => {
      emblaApi.off("select", alSeleccionar);
    };
  }, [emblaApi, alSeleccionar, news]);

  if (news.length === 0) return null;

  const varias = puntos.length > 1;

  return (
    <section>
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="text-blue-900 uppercase font-extrabold text-xl lg:text-2xl font-opensans">
          {t("recentNews")}
        </h2>
        {/* Las flechas van aqui y no sobre las miniaturas: encima tapaban la
            portada de la primera y la ultima noticia. */}
        {varias && (
          <div className="flex flex-shrink-0 gap-2">
            <button
              type="button"
              aria-label="Noticia anterior"
              onClick={() => emblaApi?.scrollPrev()}
              className="rounded-full border border-gray-300 p-1.5 text-blue-dark duration-150 hover:bg-gray-100"
            >
              <ChevronLeftIcon className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Noticia siguiente"
              onClick={() => emblaApi?.scrollNext()}
              className="rounded-full border border-gray-300 p-1.5 text-blue-dark duration-150 hover:bg-gray-100"
            >
              <ChevronRightIcon className="size-4" />
            </button>
          </div>
        )}
      </div>
      <div className="relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-6">
            {news.map((item: any) => (
              <div
                key={item.id}
                className="min-w-0 flex-[0_0_100%] pl-6 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
              >
                <Link
                  {...enlaceNoticia(item, locale)}
                  className="flex gap-3 group"
                >
                  <div className="relative w-24 h-20 flex-shrink-0 rounded-md overflow-hidden">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_URL}/news/images/${item.id}/${item.cover}`}
                      alt={item.title ?? ""}
                      fill
                      className="object-cover object-center group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1 min-w-0 space-y-1">
                    <span className="text-[#C8102E] text-xs font-bold uppercase tracking-widest font-montserrat block">
                      {rotuloSeccion(item.seccion) && t(rotuloSeccion(item.seccion)!)}
                    </span>
                    <p className="text-blue-950 text-sm font-bold font-montserrat line-clamp-3">
                      {item.title}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {varias && (
          <div className="mt-4 flex justify-center gap-1.5">
            {puntos.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Noticia ${i + 1}`}
                onClick={() => emblaApi?.scrollTo(i)}
                className={`h-1.5 rounded-full duration-200 ${
                  i === activo ? "w-5 bg-blue-dark" : "w-1.5 bg-gray-300"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
