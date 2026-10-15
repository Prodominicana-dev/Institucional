"use client";
import CoversCarousel from "./CoversCarousel";
import FeaturedCarousel from "./FeaturedCarousel";
import { useTranslations } from "next-intl";
import {
  useFeaturedNews,
  useNewspaperCovers,
} from "@/services/proeconomia/service";

interface Props {
  locale: string;
  seccion: string;
}

export default function HeroSection({ locale, seccion }: Props) {
  const t = useTranslations("proeconomia");
  const { data: featuredRaw, isLoading: featLoading } = useFeaturedNews(locale);
  const { data: coversRaw, isLoading: covLoading } = useNewspaperCovers(8);
  /* La API devuelve el arreglo de destacadas. Si delante hay un build viejo
     que todavia responde con una sola noticia, se envuelve y se pinta igual. */
  const featured: any[] = Array.isArray(featuredRaw)
    ? featuredRaw
    : featuredRaw?.id
      ? [featuredRaw]
      : [];
  const todasLasPortadas: any[] = Array.isArray(coversRaw) ? coversRaw : [];
  /* Una portada sin seccion sale en todas: es como se cargaron las que ya
     estaban antes de que el campo existiera. */
  const covers =
    seccion === "all"
      ? todasLasPortadas
      : todasLasPortadas.filter((c) => !c.section || c.section === seccion);

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* La altura fija en lg es lo que hace que la columna de portadas acabe
          a la misma altura que la noticia destacada. */}
      <div className="grid grid-cols-1 gap-6 lg:h-[500px] lg:grid-cols-[1fr_320px]">
        {/* Noticias destacadas */}
        {featLoading ? (
          <div className="h-[420px] animate-pulse rounded-md bg-gray-100 lg:h-full" />
        ) : featured.length > 0 ? (
          <FeaturedCarousel noticias={featured} locale={locale} />
        ) : (
          <div className="flex h-[420px] items-center justify-center rounded-md bg-gray-50 lg:h-full">
            <p className="font-montserrat text-sm text-gray-400">
              {t("noFeatured")}
            </p>
          </div>
        )}

        {/* Portadas Diarias */}
        <div className="flex flex-col gap-3 lg:h-full">
          <h3 className="font-opensans text-lg font-extrabold uppercase text-blue-900">
            {t("dailyCovers")}
          </h3>
          {covLoading ? (
            <div className="h-64 animate-pulse rounded-md bg-gray-100 lg:h-auto lg:min-h-0 lg:flex-1" />
          ) : covers.length > 0 ? (
            <div className="lg:min-h-0 lg:flex-1">
              <CoversCarousel covers={covers} titulo={t("dailyCovers")} />
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center rounded-md bg-gray-50 lg:h-auto lg:min-h-0 lg:flex-1">
              <p className="font-montserrat text-sm text-gray-400">
                {t("noCovers")}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
