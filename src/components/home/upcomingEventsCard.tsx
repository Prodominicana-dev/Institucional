import { Carousel } from "@mantine/carousel";
import React from "react";
import Image from "next/image";
import { CalendarDaysIcon, MapPinIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface Props {
  id: number;
  title: string;
  date: any;
  location: string;
  image: string;
  locale: string;
}

export default function UpcomingEventsCard({
  id,
  title,
  date,
  location,
  image,
  locale,
}: Props) {
  return (
    <Carousel.Slide>
      <Link href={`/events/${id}`} className="flex flex-col gap-2">
        {image ? (
          <Image
            width={2048}
            height={1080}
            src={`${process.env.NEXT_PUBLIC_API_URL}/events/images/${id}/${image}`}
            alt={"news"}
            className="h-60 object-cover rounded-sm"
          />
        ) : (
          <Image
            width={2048}
            height={1080}
            src={"/svg/prodominicana-logo.svg"}
            alt={"news"}
            className="h-60 object-contain rounded-sm bg-white"
          />
        )}
        <div className="flex flex-col gap-2">
          <div className="w-full flex items-center gap-2">
            <div>
              <CalendarDaysIcon className="w-full h-6 text-red-700" />
            </div>
            <div className="text-xs text-white font-light font-montserrat">
              {new Date(date).toLocaleDateString(locale, {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </div>
          </div>
          <div className="text-lg text-cyan-600 font-bold font-montserrat line-clamp-3">
            {title}
          </div>
        </div>
      </Link>
    </Carousel.Slide>
  );
}
