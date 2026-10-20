"use client";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { SECCIONES } from "@/components/proeconomia/secciones";
import { prefijoIdioma } from "@/components/proeconomia/enlace";

/* Cabecera del detalle de una noticia de Noticias Pro. Repite la marca y las
   secciones de CategoryBar, pero aqui son ENLACES a la lista y no botones de
   filtro: desde el detalle no hay nada que filtrar. Es lo que evita que el
   lector tenga que salir a /noticias para seguir navegando. */
export default function CabeceraDetalle({
  locale,
  seccionActiva,
}: {
  locale: string;
  seccionActiva?: string;
}) {
  const t = useTranslations("proeconomia");
  const base = `${prefijoIdioma(locale)}/noticias-pro`;

  return (
    <div className="sticky top-0 z-40 border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 lg:h-24 lg:flex-row lg:items-center lg:justify-between lg:gap-6 lg:py-0 lg:px-8">
        <Link href={base} className="flex flex-shrink-0 items-center">
          <Image
            src="/svg/noticias-pro-logo.svg"
            alt={t("brandName")}
            width={759}
            height={146}
            priority
            className="h-8 w-auto lg:h-10"
          />
        </Link>

        <nav className="flex items-center gap-1 overflow-x-auto lg:gap-2">
          {SECCIONES.map(({ key, labelKey }) => (
            <Link
              key={key}
              href={`${base}?s=${encodeURIComponent(key)}`}
              className={cn(
                "whitespace-nowrap border-b-2 px-3 py-2 font-montserrat text-xs font-bold uppercase tracking-wide transition-colors lg:text-sm",
                seccionActiva === key
                  ? "border-[#C8102E] text-blue-dark"
                  : "border-transparent text-gray-500 hover:text-blue-dark"
              )}
            >
              {t(labelKey)}
            </Link>
          ))}
        </nav>

        <Link
          href={base}
          className="flex flex-shrink-0 items-center gap-2 font-montserrat text-sm font-semibold text-blue-dark hover:underline"
        >
          <ArrowLeftIcon className="size-4" />
          {t("backToList")}
        </Link>
      </div>
    </div>
  );
}
