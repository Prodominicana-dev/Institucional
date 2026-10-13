"use client";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { prefijoIdioma } from "@/components/proeconomia/enlace";

/* Anterior y siguiente dentro de Noticias Pro. La API ya devuelve solo
   noticias del mismo apartado (getPrevNextNews filtra por seccion), asi que
   aqui basta con que los enlaces se queden en /noticias-pro. */
export default function AnteriorSiguientePro({
  prevNext,
  locale,
}: {
  prevNext: any;
  locale: string;
}) {
  const t = useTranslations("proeconomia");
  const base = `${prefijoIdioma(locale)}/noticias-pro`;
  const anterior = prevNext?.prev?.id ? prevNext.prev : null;
  const siguiente = prevNext?.next?.id ? prevNext.next : null;

  if (!anterior && !siguiente) return null;

  return (
    <div
      className={`mx-auto flex max-w-4xl gap-8 border-t border-gray-200 px-4 py-8 sm:px-6 lg:px-8 ${
        anterior ? "justify-between" : "justify-end"
      }`}
    >
      {anterior && (
        <Link href={`${base}/${anterior.id}`} className="w-6/12 space-y-2">
          <div className="flex items-center gap-2 font-montserrat text-xs font-bold uppercase tracking-wide text-gray-500">
            <ArrowLeftIcon className="size-4" />
            {t("prev")}
          </div>
          <p className="font-montserrat text-sm font-bold text-blue-dark hover:underline lg:text-lg">
            {anterior.title}
          </p>
        </Link>
      )}
      {siguiente && (
        <Link
          href={`${base}/${siguiente.id}`}
          className="flex w-6/12 flex-col items-end space-y-2 text-right"
        >
          <div className="flex items-center gap-2 font-montserrat text-xs font-bold uppercase tracking-wide text-gray-500">
            {t("next")}
            <ArrowRightIcon className="size-4" />
          </div>
          <p className="font-montserrat text-sm font-bold text-blue-dark hover:underline lg:text-lg">
            {siguiente.title}
          </p>
        </Link>
      )}
    </div>
  );
}
