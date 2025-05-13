"use client";
import { Button, Typography } from "@material-tailwind/react";
import React, { use, useEffect, useRef, useState } from "react";
import UpcomingEventsCard from "./upcomingEventsCard";
import Autoplay from "embla-carousel-autoplay";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEvents } from "@/services/events/service";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function UpcomingEvents({ locale }: { locale: string }) {
  const { data, isLoading } = useEvents(locale);
  const [events, setEvents] = useState([]);
  useEffect(() => {
    if (!isLoading && data) {
      console.log(data);
      setEvents(data);
    }
  });
  const t = useTranslations("UpcomingEvents");
  return (
    <section className="bg-blue-950 py-10 flex flex-col items-center justify-center gap-5">
      <div className="w-11/12 space-y-5">
        <div className="flex justify-between items-center">
          <Typography
            placeholder={undefined}
            className="text-white font-extrabold text-sm sm:text-2xl uppercase font-opensans"
          >
            {t("title")}
          </Typography>
          <Link
            href="/events"
            className="w-32 text-center py-2 text-lg bg-transparent border-2 rounded-full border-white text-white font-gotham hover:bg-white hover:text-blue-950 hover:border-transparent transition-all duration-500 ease-in-out"
          >
            {t("buttonText")}
          </Link>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 5000,
            }),
          ]}
        >
          <CarouselContent>
            {events.map((event: any, index) => (
              <CarouselItem key={index} className="xl:basis-1/3">
                <UpcomingEventsCard
                  id={event.id}
                  title={event.title}
                  date={event.start_Date}
                  location={event.location}
                  image={event.image}
                  locale={locale}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden xl:flex" />
          <CarouselNext className="hidden xl:flex" />
        </Carousel>
      </div>
    </section>
  );
}
