"use client";
import {
  ArrowRightCircleIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Page() {
  const events = [
    { title: "Americas Lodging Investment Summit", date: "enero" },
    { title: "Americas Lodging Investment Summit", date: "enero" },
    { title: "Americas Lodging Investment Summit", date: "enero" },
  ];
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
          <h1 className="text-3xl sm:text-5xl font-bold">
            EVENTOS, FERIAS Y MISIONES INTERNACIONALES
          </h1>
          <Image
            src="/svg/2024.svg"
            alt="events"
            width={500}
            height={500}
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
              className="w-36"
            />
            <div className="text-4xl font-extrabold uppercase">
              <p>LOGROS</p>
              <p>DEL 2023</p>
            </div>
          </div>
          <div className="bg-white w-[2px] h-24 hidden sm:block"></div>
          <div className="flex items-center gap-5">
            <Image
              src="/svg/icons/businessExpoIcon.svg"
              alt="events"
              width={100}
              height={100}
              className="w-36"
            />
            <div className="text-2xl font-bold uppercase">
              <p className="font-normal text-4xl">17</p>
              <p>FERIAS</p>
              <p>Comerciales</p>
            </div>
          </div>
          <div className="bg-white w-[2px] h-24 hidden sm:block"></div>
          <div className="flex items-center gap-5">
            <Image
              src="/svg/icons/benefitedCompaniesIcon.svg"
              alt="events"
              width={100}
              height={100}
              className="w-36"
            />
            <div className="text-2xl font-bold uppercase">
              <p className="font-normal text-4xl">260</p>
              <p>Empresas</p>
              <p>Beneficiadas</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center bg-white py-10">
        <div className="w-10/12 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10">
          {events.map((event, index) => (
            <EventCard key={index} title={event.title} date={event.date} />
          ))}
        </div>
      </div>
    </div>
  );
}

function EventCard({ title, date }: any) {
  return (
    <div className="w-full h-full relative text-white cursor-pointer">
      <Image
        src="/images/event1.jpg"
        alt="events"
        width={500}
        height={500}
        className="w-full object-cover"
      />
      <div className="absolute inset-x-0 bg-blue-950/80 h-[7rem] bottom-0  flex justify-center">
        <div className="w-11/12 flex justify-between items-center py-5 ">
          <div className="w-6/12 h-3/6 flex flex-col self-start">
            <Image
              src="https://flagcdn.com/es.svg"
              alt="es"
              width={100}
              height={100}
              className="w-8"
            />
            <p className="text-sm sm:text-xl font-bold">{title}</p>
          </div>
          <div className="w-6/12 h-full flex flex-col items-end gap-2 justify-end">
            <div className="flex items-center gap-2 uppercase font-semibold">
              <CalendarDaysIcon className="w-5" />
              <p>{date}</p>
            </div>
            <Link
              href="/es/home/events/fitur"
              className="bg-[#9B1E2E] px-2 py-1 font-bold rounded-full flex gap-2"
            >
              <ArrowRightCircleIcon className="w-5" />
              <p>Conoce más</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
