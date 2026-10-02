"use client";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  useFeaturedNews,
  useNewspaperCovers,
} from "@/services/proeconomia/service";

interface Props {
  locale: string;
}

export default function HeroSection({ locale }: Props) {
  const t = useTranslations("proeconomia");
  const { data: featured, isLoading: featLoading } = useFeaturedNews(locale);
  const { data: coversRaw, isLoading: covLoading } = useNewspaperCovers(1);
  const cover = Array.isArray(coversRaw) ? coversRaw[0] : undefined;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-6">
        {/* Noticia destacada */}
        {featLoading ? (
          <div className="h-[420px] bg-gray-100 rounded-md animate-pulse" />
        ) : featured ? (
          <Link
            href={`/news/${featured.id}`}
            className="relative h-[420px] lg:h-[500px] rounded-md overflow-hidden block group"
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}/news/images/${featured.id}/${featured.cover}`}
              alt={featured.title ?? ""}
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-dark via-blue-dark/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <span className="text-red-400 text-xs font-bold uppercase tracking-widest font-montserrat">
                {locale === "es"
                  ? featured.category?.nameEs
                  : featured.category?.nameEn}
              </span>
              <h2 className="text-white font-extrabold text-2xl lg:text-3xl uppercase font-montserrat mt-2 line-clamp-3">
                {featured.title}
              </h2>
            </div>
          </Link>
        ) : (
          <div className="h-[420px] bg-gray-50 rounded-md flex items-center justify-center">
            <p className="text-gray-400 font-montserrat text-sm">
              {t("noFeatured")}
            </p>
          </div>
        )}

        {/* Portadas Diarias */}
        <div className="flex flex-col gap-3">
          <h3 className="text-blue-900 font-extrabold text-lg font-opensans uppercase">
            {t("dailyCovers")}
          </h3>
          {covLoading ? (
            <div className="h-64 bg-gray-100 rounded-md animate-pulse" />
          ) : cover ? (
            <a
              href={cover.link ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-md overflow-hidden border border-gray-200 hover:shadow-md transition-shadow"
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}/newspaper-cover/${cover.id}/img/${cover.image}`}
                alt={cover.media ?? t("dailyCovers")}
                width={260}
                height={380}
                className="w-full object-cover"
              />
              {cover.media && (
                <div className="p-2 bg-blue-950">
                  <p className="text-white text-xs font-montserrat truncate">
                    {cover.media}
                  </p>
                </div>
              )}
            </a>
          ) : (
            <div className="h-64 bg-gray-50 rounded-md flex items-center justify-center">
              <p className="text-gray-400 font-montserrat text-sm">
                {t("noCovers")}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
