"use client";
import { useParams } from "next/navigation";
import { useState, useMemo } from "react";
import { useNews } from "@/services/news/service";
import CategoryBar from "@/components/proeconomia/CategoryBar";
import TickerBanner from "@/components/proeconomia/TickerBanner";
import HeroSection from "@/components/proeconomia/HeroSection";
import RecentNewsThumbs from "@/components/proeconomia/RecentNewsThumbs";
import NewsCards from "@/components/proeconomia/NewsCards";
import ScheduleCarousel from "@/components/proeconomia/ScheduleCarousel";
import ColumnedNews from "@/components/proeconomia/ColumnedNews";
import IndicatorsRow from "@/components/proeconomia/IndicatorsRow";
import NewsletterForm from "@/components/proeconomia/NewsletterForm";
import { useTranslations } from "next-intl";
import { nombreCategoria } from "@/components/proeconomia/categoria";

export default function ProeconomiaPage() {
  const { locale } = useParams<{ locale: string }>();
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  // Se muestran 6 y el resto queda tras "Ver más": si cargan muchas, la
  // pagina no se vuelve interminable de entrada.
  const [verTodas, setVerTodas] = useState(false);
  const t = useTranslations("proeconomia");
  const { data: newsRaw } = useNews(locale);
  const news: any[] = Array.isArray(newsRaw) ? newsRaw : [];

  const filteredNews = useMemo(() => {
    let list = news;
    if (activeCategory !== "all") {
      list = list.filter((n: any) =>
        nombreCategoria(n.category)
          .toLowerCase()
          .includes(activeCategory.toLowerCase())
      );
    }
    if (search.trim()) {
      list = list.filter((n: any) =>
        n.title?.toLowerCase().includes(search.toLowerCase())
      );
    }
    return list;
  }, [news, activeCategory, search]);

  return (
    <div className="w-full bg-white pt-20 md:pt-20 xl:pt-0">
      <CategoryBar
        activeCategory={activeCategory}
        search={search}
        onCategoryChange={setActiveCategory}
        onSearchChange={setSearch}
      />
      <TickerBanner news={news} />
      <HeroSection locale={locale} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 py-10">
        <RecentNewsThumbs news={filteredNews.slice(0, 3)} locale={locale} />
        <NewsCards
          news={verTodas ? filteredNews.slice(3) : filteredNews.slice(3, 6)}
          locale={locale}
        />
        {!verTodas && filteredNews.length > 6 && (
          <div className="flex justify-center">
            <button
              onClick={() => setVerTodas(true)}
              className="rounded-md border border-blue-dark px-6 py-2.5 font-montserrat text-sm font-semibold text-blue-dark duration-150 hover:bg-blue-dark hover:text-white"
            >
              {t("seeMore")}
            </button>
          </div>
        )}
        <ScheduleCarousel locale={locale} />
        <ColumnedNews news={news} locale={locale} />
        <IndicatorsRow locale={locale} />
        <NewsletterForm />
      </div>
    </div>
  );
}
