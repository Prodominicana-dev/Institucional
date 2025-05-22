"use client";
import { Button, Typography } from "@material-tailwind/react";
import React from "react";
import Link from "next/link";
import NewsCard from "./newsCard";
import Schedule from "./schedule";
import { useTranslations } from "next-intl";
import { useLastTwoNews } from "@/services/news/service";

export default function NewsSection({ locale }: { locale: string }) {
  const t = useTranslations("PressRoom");
  const { data, isLoading } = useLastTwoNews(locale);
  const [news, setNews] = React.useState([]);
  React.useEffect(() => {
    if (!isLoading) {
      setNews(data);
    }
  }, [data, isLoading]);
  return (
    <section className="p-5 xl:p-10 sm:p-16 flex flex-col xl:flex-row gap-10">
      <div className="w-full xl:w-8/12 space-y-10">
        <div className="w-full flex flex-wrap sm:flex-nowrap items-center justify-between gap-4 sm:gap-0">
          <Typography className="w-8/12 text-blue-900 uppercase font-extrabold text-xl lg:text-3xl font-opensans">
            {t("title")}
          </Typography>
          <Link
            href="/news"
            className="sm:w-2/12 text-cyan-600 flex flex-col items-end group font-gotham"
          >
            {t("buttonText")}
            <div className="bg-cyan-600 rounded-full h-1 w-8 group-hover:w-16 duration-500"></div>
          </Link>
        </div>
        <div className="flex flex-col lg:flex-row gap-10">
          {news?.map((item: any, index) => (
            <NewsCard
              key={index}
              id={item.id}
              title={item.title}
              category={item.category.nameEs}
              date={item.date}
              image={item.cover}
              locale={locale}
            />
          ))}
        </div>
      </div>
      <Schedule locale={locale} />
    </section>
  );
}
