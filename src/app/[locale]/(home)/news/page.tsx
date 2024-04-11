"use client";
import NewsCard from "@/components/home/newsCard";
import { useNews } from "@/services/news/service";
import { Typography } from "@material-tailwind/react";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";

export default function Page({ params: { locale } }: any) {
  const t = useTranslations("PressRoom");
  const { data, isLoading } = useNews(locale);
  const [news, setNews] = useState<any>();
  useEffect(() => {
    if (!isLoading && data) {
      setNews(data);
    }
  }, [data, isLoading]);

  return (
    <div className="w-full bg-white flex justify-center ">
      <div className="p-10 lg:p-20 space-y-5 w-full">
        <Typography
          placeholder={undefined}
          className="text-blue-900 uppercase font-extrabold text-xl lg:text-3xl font-opensans"
        >
          {t("title")}
        </Typography>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 w-full gap-10 ">
          {news?.map((item: any, index: number) => (
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
    </div>
  );
}
