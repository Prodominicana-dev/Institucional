"use client";
import useEmblaCarousel from "embla-carousel-react";
import { useTranslations } from "next-intl";
import { useAllSchedule } from "@/services/schedule/service";
import { useEffect, useState, useCallback } from "react";

interface Props {
  locale: string;
}

export default function ScheduleCarousel({ locale }: Props) {
  const t = useTranslations("proeconomia");
  const { data: scheduleRaw, isLoading } = useAllSchedule();
  const schedule: any[] = Array.isArray(scheduleRaw) ? scheduleRaw : [];

  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: false });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect, schedule]);

  const getDateParts = (dateStr: string) => {
    const d = new Date(dateStr);
    return {
      day: d.getDate().toString().padStart(2, "0"),
      month: d
        .toLocaleString(locale === "es" ? "es-ES" : "en-US", { month: "short" })
        .toUpperCase(),
    };
  };

  if (isLoading)
    return <div className="h-32 bg-gray-100 rounded-md animate-pulse" />;
  if (schedule.length === 0) return null;

  return (
    <section className="bg-blue-dark rounded-md p-6 sm:p-8">
      <p className="text-red-400 text-xs font-bold uppercase tracking-widest font-montserrat">
        {t("scheduleSubtitle")}
      </p>
      <h2 className="text-white font-extrabold text-xl sm:text-2xl font-opensans mb-6">
        {t("scheduleTitle")}
      </h2>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {schedule.map((item: any) => {
            const { day, month } = getDateParts(item.date);
            const title = locale === "es" ? item.title : item.titleEn;
            return (
              <div
                key={item.id}
                className="flex-none w-64 sm:w-72 bg-white/10 rounded-md p-4 flex gap-4"
              >
                <div className="flex-shrink-0 w-12 text-center">
                  <p className="text-red-400 font-bold text-xs font-montserrat">
                    {month}
                  </p>
                  <p className="text-white font-extrabold text-2xl font-montserrat leading-none mt-1">
                    {day}
                  </p>
                </div>
                <p className="text-white text-sm font-montserrat line-clamp-3 flex-1">
                  {title}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      {scrollSnaps.length > 1 && (
        <div className="flex justify-center gap-2 mt-5">
          {scrollSnaps.map((_, i) => (
            <button
              key={i}
              aria-label={`Ir a diapositiva ${i + 1}`}
              onClick={() => emblaApi?.scrollTo(i)}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === selectedIndex ? "bg-white" : "bg-white/30"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
