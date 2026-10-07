"use client";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { nombreCategoria } from "./categoria";

interface Props {
  news: any[];
  locale: string;
}

const COLUMNS = [
  { key: "importación", labelKey: "colImport" },
  { key: "inversión", labelKey: "colInvest" },
  { key: "economía", labelKey: "colEconomy" },
];

function NewsCol({ items, label }: { items: any[]; label: string }) {
  const [main, ...rest] = items;
  if (!main) return null;
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-blue-900 font-extrabold text-base uppercase font-opensans border-l-4 border-red-700 pl-3">
        {label}
      </h3>
      <Link href={`/news/${main.id}`} className="group block space-y-2">
        <div className="h-40 w-full overflow-hidden rounded-md">
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}/news/images/${main.id}/${main.cover}`}
            alt={main.title ?? ""}
            width={2048}
            height={1080}
            className="w-full h-full object-cover object-center group-hover:scale-110 duration-300"
          />
        </div>
        <p className="text-blue-950 font-bold font-montserrat text-sm line-clamp-2">
          {main.title}
        </p>
      </Link>
      {rest.map((item: any) => (
        <Link
          key={item.id}
          href={`/news/${item.id}`}
          className="flex gap-3 group border-t border-gray-100 pt-3"
        >
          <div className="relative w-16 h-14 flex-shrink-0 rounded-md overflow-hidden">
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}/news/images/${item.id}/${item.cover}`}
              alt={item.title ?? ""}
              fill
              className="object-cover object-center group-hover:scale-110 duration-300"
            />
          </div>
          <p className="text-blue-950 text-xs font-montserrat font-semibold line-clamp-3">
            {item.title}
          </p>
        </Link>
      ))}
    </div>
  );
}

export default function ColumnedNews({ news, locale }: Props) {
  const t = useTranslations("proeconomia");
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {COLUMNS.map(({ key, labelKey }) => {
        const items = news.filter((n: any) =>
          nombreCategoria(n.category).toLowerCase().includes(key)
        );
        return (
          <NewsCol key={key} items={items} label={t(labelKey)} />
        );
      })}
    </section>
  );
}
