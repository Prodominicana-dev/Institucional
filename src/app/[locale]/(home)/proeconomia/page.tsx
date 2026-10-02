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

export default function ProeconomiaPage() {
  const { locale } = useParams<{ locale: string }>();
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const { data: newsRaw } = useNews(locale);
  const news: any[] = Array.isArray(newsRaw) ? newsRaw : [];

  const filteredNews = useMemo(() => {
    let list = news;
    if (activeCategory !== "all") {
      list = list.filter((n: any) =>
        n.category?.nameEs?.toLowerCase().includes(activeCategory.toLowerCase())
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
        <NewsCards news={filteredNews.slice(3, 6)} locale={locale} />
        <ScheduleCarousel locale={locale} />
        <ColumnedNews news={news} locale={locale} />
        <IndicatorsRow locale={locale} />
        <NewsletterForm />
      </div>
    </div>
  );
}
