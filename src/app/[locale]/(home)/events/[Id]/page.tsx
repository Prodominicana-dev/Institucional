"use client";
import GoogleMap from "@/components/map/map";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CalendarDaysIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { Input, Textarea } from "@material-tailwind/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Page({ params: { locale, id } }: any) {
  const t = useTranslations("events");
  const event = {
    title: "FITUR: FERIA INTERNACIONAL DE TURISMO",
    desc: "FITUR, la segunda Feria de Turismo más importante a nivel global, es la primera cita anual para los profesionales del turismo mundial.",
    address:
      "AV. DEL PARTENÓN, 5,BARAJAS, 28042 MADRID, ESPAÑA. PABELLÓN 3 STAND 3C01",
    date: "24 - 28 ENE 2024",
    lat: 40.46428309587341,
    lng: -3.6131547578501975,
    lastEventImages: [
      "/images/event1.jpg",
      "/images/flags.jpg",
      "/images/edgar.jpg",
      "/images/event1.jpg",
      "/images/event1.jpg",
      "/images/event1.jpg",
    ],
  };
  const route = `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}/news/${id}`;

  return (
    <div className="bg-blue-950">
      <section className="flex justify-center items-center py-10">
        <div className="w-10/12 flex flex-col xl:flex-row text-white items-center gap-5">
          <div className="xl:w-8/12 w-10/12 text-center flex flex-col items-center gap-5">
            <div className="flex flex-col items-center">
              <h1 className="text-3xl sm:text-4xl text-lightBlue-500 font-extrabold">
                {event.title}
              </h1>
              <p className="xl:w-8/12">{event.desc}</p>
            </div>
            <div className="underline underline-offset-2 uppercase">
              {t("eventInfo")}:
            </div>
            <div className="xl:w-6/12 flex flex-col xl:flex-row justify-center text-sm gap-5 xl:gap-20 font-bold text-left">
              <div className="flex flex-col xl:flex-row items-center xl:w-8/12 gap-5">
                <div>
                  <MapPinIcon className="size-16 text-lightBlue-500" />
                </div>
                <div>{event.address}</div>
              </div>
              <div className="flex flex-col xl:flex-row items-center gap-5">
                <div>
                  <CalendarDaysIcon className="size-16 text-lightBlue-500" />
                </div>
                <div>{event.date}</div>
              </div>
            </div>
            <div className="flex flex-col xl:flex-row gap-5">
              <button className="border-2 border-lightBlue-500 text-lightBlue-500 px-10 py-3 rounded-full uppercase font-bold text-lg hover:bg-lightBlue-500 hover:text-white duration-300">
                {t("receiveReminder")}
              </button>
              <button className="text-white bg-[#9B1E2E] px-10 py-3 rounded-full uppercase font-bold text-lg hover:text-white/70 duration-300">
                {t("wantToParticipate")}
              </button>
            </div>
            <div className="flex flex-col xl:flex-row items-center gap-5">
              <div className="uppercase text-sm">{t("shareEvent")}</div>
              <div className="flex flex-wrap gap-5 w-full">
                <Link
                  href={`https://www.facebook.com/sharer/sharer.php?u=${route}&src=sdkpreparse`}
                  target="_blank"
                  className="border-2 border-white hover:bg-blue-500 hover:border-blue-500 duration-300 size-10 flex justify-center items-center rounded-full"
                >
                  <FontAwesomeIcon
                    icon={["fab", "facebook-f"]}
                    className="text-white"
                  />
                </Link>
                <Link
                  href={`https://api.whatsapp.com/send?text=${event?.title} ${route}`}
                  target="_blank"
                  className="border-2 border-white hover:bg-green-500 hover:border-green-500 duration-300 size-10 flex justify-center items-center rounded-full"
                >
                  <FontAwesomeIcon
                    icon={["fab", "whatsapp"]}
                    className="text-white"
                  />
                </Link>
                <Link
                  href={`https://www.x.com/share?url=${route}&text=${event?.title}`}
                  target="_blank"
                  className="border-2 border-white hover:bg-black hover:border-black duration-300 size-10 flex justify-center items-center rounded-full"
                >
                  <FontAwesomeIcon
                    icon={["fab", "x-twitter"]}
                    className="text-white"
                  />
                </Link>
                <Link
                  href={`mailto:?subject=${event?.title}&body=${route}`}
                  target="_blank"
                  className="border-2 border-white hover:bg-black hover:border-black duration-300 size-10 flex justify-center items-center rounded-full"
                >
                  <FontAwesomeIcon
                    icon={["far", "envelope"]}
                    className="text-white"
                  />
                </Link>
              </div>
            </div>
          </div>
          <div className="xl:w-4/12 order-first xl:order-last">
            <Image
              src="/images/event1.jpg"
              width={2000}
              height={2000}
              alt=""
              className="border-[16px] object-cover border-white"
            />
          </div>
        </div>
      </section>
      <section>
        <div className="w-full bg-[#9B1E2E] py-5 text-center font-extrabold text-white text-4xl">
          {t("address")}
        </div>
        <GoogleMap lat={event.lat} lng={event.lng} locale={locale} />
      </section>
      <section className="py-10 flex justify-center">
        <div className="w-10/12 flex flex-col items-center gap-10">
          <h1 className="font-extrabold text-2xl xl:text-4xl text-white flex flex-wrap items-center gap-1">
            <div className="bg-[#9B1E2E] p-2">{t("imageGallery.title")}</div>
            {t("imageGallery.title2")}
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {event.lastEventImages.map((image: string, index: number) => (
              <Image
                key={index}
                src={image}
                width={2000}
                height={2000}
                alt=""
                className="object-cover h-80 w-full"
              />
            ))}
          </div>
        </div>
      </section>
      <section id="form" className="py-10 flex justify-center">
        <div className="w-10/12 xl:w-5/12 flex flex-col items-center gap-10">
          <h1 className="font-extrabold text-2xl xl:text-4xl text-white flex flex-wrap items-center gap-1">
            <div className="bg-[#9B1E2E] p-2">{t("form.title")}</div>
            <div className="text-white">{t("form.title2")}</div>
          </h1>
          <div className="flex flex-col gap-10 text-white text-lg w-full">
            <div className="flex flex-col xl:flex-row gap-10">
              <div className="w-full">
                <div>{t("form.name")}</div>
                <Input
                  placeholder="John Doe"
                  size="lg"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900 bg-white"
                  containerProps={{ className: "h-16" }}
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  crossOrigin={undefined}
                />
              </div>
              <div className="w-full">
                <div>{t("form.email")}</div>
                <Input
                  placeholder="example@email.com"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900 bg-white"
                  containerProps={{ className: "h-16" }}
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  crossOrigin={undefined}
                />
              </div>
            </div>
            <div className="w-full">
              <div>{t("form.entity")}</div>
              <Input
                placeholder={t("form.entity")}
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900 bg-white"
                containerProps={{ className: "h-16" }}
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                crossOrigin={undefined}
              />
            </div>
            <button className="w-full py-5 bg-[#9B1E2E] text-2xl font-bold rounded-xl duration-300 hover:text-white/60">
              {t("form.button")}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
