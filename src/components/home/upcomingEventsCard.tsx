import { Carousel } from "@mantine/carousel";
import React from "react";
import Image from "next/image";
import { CalendarDaysIcon, MapPinIcon } from "@heroicons/react/24/outline";

export default function UpcomingEventsCard() {
  return (
    <Carousel.Slide className="h-5/6 flex flex-col sm:flex-row items-center sm:space-x-3 space-y-3 sm:space-y-0">
      <Image
        width={2048}
        height={1080}
        src={
          "https://hoy.com.do/wp-content/uploads/2023/09/WhatsApp-Image-2023-09-05-at-1.36.14-PM-1.jpeg"
        }
        alt={"news"}
        className="h-44 sm:h-5/6 w-full object-cover object-center rounded-sm"
      />
      <div className="space-y-2">
        <div className="w-full flex sm:space-x-2">
          <div className="w-2/12">
            <CalendarDaysIcon className="w-full h-6 text-red-700" />
          </div>
          <div className="w-10/12 flex items-center text-xs text-white font-light">
            18 DE DICIEMBRE 2023 | 09:23
          </div>
        </div>
        <div className="w-full flex space-x-2">
          <div className="w-2/12">
            <MapPinIcon className="w-full h-6 text-cyan-600" />
          </div>
          <div className="w-10/12 flex items-center text-sm text-cyan-600 font-bold">
            Miami, “Americas Food and Beverage Show & Conference (AF&B)
          </div>
        </div>
      </div>
    </Carousel.Slide>
  );
}
