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
    <section className="bg-white">
      <div className="mb-6 flex items-center justify-center gap-3">
        <span className="h-px w-10 bg-[#C8102E]" />
        <p className="text-center font-montserrat text-[11px] font-bold uppercase tracking-[0.2em] text-[#C8102E]">
          {t("scheduleSubtitle")}
        </p>
        <span className="h-px w-10 bg-[#C8102E]" />
      </div>
      <h2 className="mb-8 text-center font-opensans text-2xl font-extrabold text-blue-dark sm:text-3xl">
        {t("scheduleTitle")}
      </h2>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-5">
          {schedule.map((item: any) => {
            const { day, month } = getDateParts(item.date);
            const title = locale === "es" ? item.title : item.titleEn;
            return (
              <div
                key={item.id}
                className="flex flex-none gap-4 rounded-md border border-gray-200 border-b-4 border-b-blue-dark bg-white p-4 shadow-sm w-64 sm:w-72"
              >
                <div className="w-14 flex-shrink-0 rounded-md bg-blue-dark px-2 py-2 text-center">
                  <p className="font-montserrat text-[11px] font-bold text-white">
                    {month}
                  </p>
                  <p className="mt-0.5 font-montserrat text-2xl font-extrabold leading-none text-white">
                    {day}
                  </p>
                </div>
                <p className="line-clamp-3 flex-1 font-montserrat text-sm font-semibold text-blue-dark">
                  {title}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      {scrollSnaps.length > 1 && (
        <div className="mt-6 flex justify-center gap-2">
          {scrollSnaps.map((_, i) => (
            <button
              key={i}
              aria-label={`Ir a diapositiva ${i + 1}`}
              onClick={() => emblaApi?.scrollTo(i)}
              className={`h-2 w-2 rounded-full transition-colors ${
                i === selectedIndex ? "bg-blue-dark" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
