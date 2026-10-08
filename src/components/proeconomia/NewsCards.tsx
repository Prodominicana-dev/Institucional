"use client";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { nombreCategoria } from "./categoria";
import { enlaceNoticia } from "@/components/proeconomia/enlace";

interface Props {
  news: any[];
  locale: string;
}

export default function NewsCards({ news, locale }: Props) {
  const t = useTranslations("proeconomia");

  if (news.length === 0) return null;

  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((item: any) => (
          <Link
            key={item.id}
            {...enlaceNoticia(item)}
            className="flex flex-col group"
          >
            <div className="h-48 sm:h-[25vh] xl:h-[30vh] w-full overflow-hidden rounded-md">
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}/news/images/${item.id}/${item.cover}`}
                alt={item.title ?? ""}
                width={2048}
                height={1080}
                className="w-full h-full object-cover object-center group-hover:scale-110 duration-300"
              />
            </div>
            <div className="mt-2 space-y-1">
              <span className="text-[#C8102E] font-normal tracking-widest uppercase font-montserrat text-sm block">
                {locale === "es"
                  ? nombreCategoria(item.category, "es")
                  : nombreCategoria(item.category, "en")}
              </span>
              <h3 className="text-blue-950 font-bold font-montserrat text-xl line-clamp-3 break-words">
                {item.title}
              </h3>
              {item.date && (
                <p className="text-cyan-600 font-normal font-montserrat text-sm">
                  {new Date(item.date).toLocaleDateString(
                    locale === "es" ? "es-ES" : "en-US",
                    { year: "numeric", month: "long", day: "numeric" }
                  )}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
