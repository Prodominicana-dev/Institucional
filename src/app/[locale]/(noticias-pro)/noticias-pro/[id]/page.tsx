"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { HashLoader } from "react-spinners";
import { useNewsById, usePrevNextById } from "@/services/news/service";
import { prefijoIdioma } from "@/components/proeconomia/enlace";
import CabeceraDetalle from "@/components/proeconomia/detalle/CabeceraDetalle";
import ArticuloPro from "@/components/proeconomia/detalle/ArticuloPro";
import CompartirPro from "@/components/proeconomia/detalle/CompartirPro";
import AnteriorSiguientePro from "@/components/proeconomia/detalle/AnteriorSiguientePro";

/* Detalle propio de Noticias Pro. Vive en el grupo (noticias-pro), asi que
   hereda su layout: sin el navbar institucional. Antes estas noticias se leian
   en /noticias/[id] y el lector salia del apartado.

   Una noticia sin seccion NO se muestra aqui: el cruce esta cortado en los dos
   sentidos, igual que en las listas. */
export default function NoticiaProPage() {
  const { locale, id } = useParams<{ locale: string; id: string }>();
  const t = useTranslations("proeconomia");
  const { data: noticia, isLoading } = useNewsById(locale, id);
  const { data: prevNext } = usePrevNextById(locale, id);

  if (isLoading) {
    return (
      <div className="flex h-[85vh] w-full items-center justify-center bg-white">
        <HashLoader />
      </div>
    );
  }

  if (!noticia?.seccion) {
    return (
      <div className="min-h-[85vh] w-full bg-white">
        <CabeceraDetalle locale={locale} />
        <div className="mx-auto max-w-4xl space-y-4 px-4 py-20 text-center sm:px-6 lg:px-8">
          <p className="font-montserrat text-lg font-bold text-blue-dark">
            {t("notInPro")}
          </p>
          <Link
            href={`${prefijoIdioma(locale)}/noticias-pro`}
            className="inline-block rounded-md border border-blue-dark px-6 py-2.5 font-montserrat text-sm font-semibold text-blue-dark duration-150 hover:bg-blue-dark hover:text-white"
          >
            {t("backToList")}
          </Link>
        </div>
      </div>
    );
  }

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}${prefijoIdioma(
    locale
  )}/noticias-pro/${id}`;

  return (
    <div className="w-full bg-white">
      <CabeceraDetalle locale={locale} seccionActiva={noticia.seccion} />
      <ArticuloPro noticia={noticia} locale={locale} />
      <CompartirPro titulo={noticia.title ?? ""} url={url} />
      <AnteriorSiguientePro prevNext={prevNext} locale={locale} />
    </div>
  );
}
