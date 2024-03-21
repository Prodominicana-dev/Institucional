"use client";
import { useEvents } from "@/services/events/service";
import {
  ArrowRightCircleIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Page({ params: { locale } }: any) {
  const [eventss, setEvents] = useState<any>([]);

  const { data, isLoading, refetch } = useEvents(locale);

  useEffect(() => {
    if (data && !isLoading) {
      console.log(data);
      setEvents(data);
    }
  }, [data, isLoading]);

  const t = useTranslations("events");
  return (
    <div>
      <div className="bg-blue-900 flex flex-col items-center justify-center sm:flex-row">
        <div className="w-4/12 hidden xl:block">
          <Image
            src="/svg/eventsMap.svg"
            alt="events"
            width={500}
            height={500}
            className="w-full h-[60vh] object-cover"
          />
        </div>
        <div className="w-full xl:w-8/12 text-white p-5">
          <h1 className="text-3xl sm:text-5xl font-bold">{t("title")}</h1>
          <Image
            src="/svg/2024.svg"
            alt="events"
            width={500}
            height={500}
            draggable={false}
            className="w-full"
          />
        </div>
      </div>
      <div className="flex justify-center items-center bg-[#9B1E2E] p-10 text-white">
        <div className="w-10/12 flex flex-col sm:flex-row justify-center items-center gap-10">
          <div className="flex items-center gap-5">
            <Image
              src="/svg/icons/achievementIcon.svg"
              alt="events"
              width={100}
              height={100}
              className="w-22 sm:w-9 md:w-16  lg:w-30 xl:w-32 2xl:w-36"
            />
            <div className="text-2xl font-extrabold uppercase sm:text-sm md:text-lg lg:text-xl xl:text-2xl 2xl:text-4xl">
              <p>LOGROS</p>
              <p>DEL 2023</p>
            </div>
          </div>
          <div className="bg-white  h-24 hidden sm:block xl:w-[2px] 2xl:w-[2px] "></div>
          <div className="flex items-center gap-5">
            <Image
              src="/svg/icons/businessExpoIcon.svg"
              alt="events"
              width={100}
              height={100}
              className="w-22 sm:w-9 md:w-16 lg:w-30 xl:w-32 2xl:w-36"
            />
            <div className="text-base font-bold uppercase sm:text-xs md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
              <p className="font-normal md:xl lg:text-2xl xl:text-3xl 2xl:text-4xl">
                17
              </p>
              <p>FERIAS</p>
              <p>Comerciales</p>
            </div>
          </div>
          <div className="bg-white  h-24 hidden sm:block xl:w-[2px] 2xl:w-[2px]"></div>
          <div className="flex items-center gap-5">
            <Image
              src="/svg/icons/benefitedCompaniesIcon.svg"
              alt="events"
              width={100}
              height={100}
              className="w-22 sm:w-9 md:w-16 lg:w-30 xl:w-32 2xl:w-36"
            />
            <div className="text-base font-bold uppercase sm:text-xs md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
              <p className="font-normal md:xl lg:text-2xl xl:text-3xl 2xl:text-4xl">
                260
              </p>
              <p>Empresas</p>
              <p>Beneficiadas</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center bg-white py-10">
        <div className="w-10/12 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10">
          {eventss?.map((event: any, index: number) => (
            <EventCard
              key={index}
              id={event.id}
              title={event.title}
              date={event.start_Date}
              locale={locale}
              image={event.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function EventCard({
  id,
  title,
  date,
  image,
  locale,
}: {
  id: string;
  title: string;
  date: string;
  image: string;
  locale: string;
}) {
  // Extraer mes y ponerlo en español o ingles dependiendo el locale como "enero" o "january"
  const dateFormated = new Date(date);
  // Extraer el mes
  const month = dateFormated.toLocaleString(locale, { month: "long" });

  return (
    <Link
      href={`/events/${id}`}
      className="w-full h-80 relative text-white cursor-pointer"
    >
      {!image ? (
        // <Image
        //   src={`/svg/prodominicana-logo.svg`}
        //   alt={title}
        //   width={200}
        //   height={200}
        //   className="w-full scale-50 object-center"
        // />
        <div className="w-full h-full flex justify-center items-center bg-white">
          <Image
            src="/svg/prodominicana-logo.svg"
            alt="events"
            width={100}
            height={100}
            className="size-36 object-cover"
          />
        </div>
      ) : (
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}/events/images/${id}/${image}`}
          alt={title}
          width={1920}
          height={1080}
          className="w-full object-cover h-full"
        />
      )}
      <div className="absolute inset-x-0 bg-blue-950/80 h-s bottom-0 flex justify-center">
        <div className="w-11/12 flex justify-between items-center py-5 ">
          <p className="w-8/12 sm:text-sm xl:text-xl font-bold">{title}</p>
          <div className="h-full flex flex-col items-end gap-2 justify-end">
            <Image
              src="https://flagcdn.com/es.svg"
              alt="es"
              width={100}
              height={100}
              className="w-8"
            />
            <div className="flex items-center gap-2 uppercase font-semibold">
              <CalendarDaysIcon className="w-5" />
              <p className=" text-[12px] 2xl:text-[16px]">{month}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
