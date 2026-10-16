"use client";
import { useParams, useSearchParams } from "next/navigation";
import { useState, useMemo } from "react";
import { useNews } from "@/services/news/service";
import CategoryBar from "@/components/proeconomia/CategoryBar";
import { SECCIONES } from "@/components/proeconomia/secciones";
import TickerBanner from "@/components/proeconomia/TickerBanner";
import HeroSection from "@/components/proeconomia/HeroSection";
import RecentNewsThumbs from "@/components/proeconomia/RecentNewsThumbs";
import NewsCards from "@/components/proeconomia/NewsCards";
import IndicatorsRow from "@/components/proeconomia/IndicatorsRow";
import NewsletterForm from "@/components/proeconomia/NewsletterForm";
import { useTranslations } from "next-intl";
import DataDashboard from "@/components/home/dataDashboard";
import DataDashboardMobile from "@/components/home/dataDashboardMobile";

/* Lo que se pinta sin tocar "Ver mas": las 6 mas recientes pasan en el
   carrusel de Noticias Recientes y las 9 siguientes salen en tarjetas. */
const RECIENTES = 6;
const TARJETAS = 9;

export default function ProeconomiaPage() {
  const { locale } = useParams<{ locale: string }>();
  /* La cabecera del detalle vuelve aqui con ?s=<seccion>, para que el lector
     no pierda la seccion que venia viendo. Un valor desconocido no filtra. */
  const sParam = useSearchParams().get("s");
  const [activeCategory, setActiveCategory] = useState(
    SECCIONES.some((x) => x.key === sParam) ? (sParam as string) : "all"
  );
  const [search, setSearch] = useState("");
  // Se muestran 15 y el resto queda tras "Ver más": si cargan muchas, la
  // pagina no se vuelve interminable de entrada.
  const [verTodas, setVerTodas] = useState(false);
  const t = useTranslations("proeconomia");
  const { data: newsRaw } = useNews(locale);
  /* Noticias Pro solo muestra lo que el redactor marcó con una sección: el
     resto de noticias del portal no pinta aquí. */
  const news: any[] = (Array.isArray(newsRaw) ? newsRaw : []).filter(
    (n: any) => n.seccion
  );

  const filteredNews = useMemo(() => {
    let list = news;
    if (activeCategory !== "all") {
      list = list.filter((n: any) => n.seccion === activeCategory);
    }
    if (search.trim()) {
      list = list.filter((n: any) =>
        n.title?.toLowerCase().includes(search.toLowerCase())
      );
    }
    return list;
  }, [news, activeCategory, search]);

  const recientes = filteredNews.slice(0, RECIENTES);
  const tarjetas = verTodas
    ? filteredNews.slice(RECIENTES)
    : filteredNews.slice(RECIENTES, RECIENTES + TARJETAS);

  return (
    <div className="w-full bg-white">
      <CategoryBar
        activeCategory={activeCategory}
        search={search}
        onCategoryChange={setActiveCategory}
        onSearchChange={setSearch}
      />
      <TickerBanner news={news} />
      <HeroSection locale={locale} seccion={activeCategory} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 py-10">
        <RecentNewsThumbs news={recientes} locale={locale} />
        <NewsCards news={tarjetas} locale={locale} />
        {!verTodas && filteredNews.length > RECIENTES + TARJETAS && (
          <div className="flex justify-center">
            <button
              onClick={() => setVerTodas(true)}
              className="rounded-md border border-blue-dark px-6 py-2.5 font-montserrat text-sm font-semibold text-blue-dark duration-150 hover:bg-blue-dark hover:text-white"
            >
              {t("seeMore")}
            </button>
          </div>
        )}
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <IndicatorsRow locale={locale} />
      </div>
      <DataDashboard />
      <DataDashboardMobile />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <NewsletterForm />
      </div>
    </div>
  );
}
