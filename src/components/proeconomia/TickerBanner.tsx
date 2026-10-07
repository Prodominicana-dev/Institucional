"use client";
import { useTranslations } from "next-intl";

interface Props {
  news: any[];
}

export default function TickerBanner({ news }: Props) {
  const t = useTranslations("proeconomia");
  const titles = news.map((n: any) => n.title).filter(Boolean);

  if (titles.length === 0) return null;

  return (
    <div className="w-full bg-blue-950 py-2 overflow-hidden">
      <style>{`@keyframes ticker-move { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
      <div className="flex items-center">
        <span className="flex-shrink-0 px-4 text-white font-bold font-montserrat text-xs uppercase tracking-widest border-r border-white/30 mr-4">
          {t("tickerLabel")}
        </span>
        <div className="flex-1 overflow-hidden">
          <div
            className="flex whitespace-nowrap"
            style={{ animation: "ticker-move 60s linear infinite" }}
          >
            {[...titles, ...titles].map((title, i) => (
              <span
                key={i}
                className="text-white text-sm font-montserrat mx-6 opacity-90"
              >
                {title}
                <span className="text-blue-300 mx-4">·</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
