"use client";
import { Button, Typography } from "@material-tailwind/react";
import { Carousel } from "@mantine/carousel";
import React, { useRef } from "react";
import UpcomingEventsCard from "./upcomingEventsCard";
import Autoplay from "embla-carousel-autoplay";
import { useTranslations } from "next-intl";

export default function UpcomingEvents() {
  const t = useTranslations("UpcomingEvents");
  const autoplay = useRef(Autoplay({ delay: 5000 }));
  return (
    <section className="bg-blue-950 p-10 sm:p-16 space-y-5">
      <div className="flex justify-between items-center">
        <Typography
          placeholder={undefined}
          className="text-white font-extrabold text-sm sm:text-2xl uppercase font-opensans"
        >
          {t("title")}
        </Typography>
        <Button
          placeholder={undefined}
          className="w-32 sm:w-44 text-sm bg-transparent border-2 rounded-full border-white font-gotham"
        >
          {t("buttonText")}
        </Button>
      </div>
      <Carousel
        withIndicators
        withControls={false}
        slideSize={{ base: "100%", sm: "50%", md: "33.333333%" }}
        slideGap={{ base: 0, sm: "md" }}
        height={260}
        loop
        align="start"
        plugins={[autoplay.current]}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.reset}
        classNames={{ indicators: "fill-black" }}
        className="h-[35vh]"
      >
        <UpcomingEventsCard />
        <UpcomingEventsCard />
        <UpcomingEventsCard />
        <UpcomingEventsCard />
      </Carousel>
    </section>
  );
}
