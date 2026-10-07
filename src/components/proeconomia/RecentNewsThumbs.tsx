"use client";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { nombreCategoria } from "./categoria";

interface Props {
  news: any[];
  locale: string;
}

export default function RecentNewsThumbs({ news, locale }: Props) {
  const t = useTranslations("proeconomia");

  if (news.length === 0) return null;

  return (
    <section>
      <h2 className="text-blue-900 uppercase font-extrabold text-xl lg:text-2xl font-opensans mb-5">
        {t("recentNews")}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {news.map((item: any) => (
          <Link
            key={item.id}
            href={`/news/${item.id}`}
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
              <span className="text-red-700 text-xs font-bold uppercase tracking-widest font-montserrat block">
                {locale === "es"
                  ? nombreCategoria(item.category, "es")
                  : nombreCategoria(item.category, "en")}
              </span>
              <p className="text-blue-950 text-sm font-bold font-montserrat line-clamp-3">
                {item.title}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
