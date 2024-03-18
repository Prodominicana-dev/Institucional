import { CalendarDaysIcon, MapPinIcon } from "@heroicons/react/24/outline";
import React from "react";

export default function Page({ params }: { params: { eventId: string } }) {
  const event = {
    title: "FITUR: FERIA INTERNACIONAL DE TURISMO",
    desc: "FITUR, la segunda Feria de Turismo más importante a nivel global, es la primera cita anual para los profesionales del turismo mundial.",
    address:
      "AV. DEL PARTENÓN, 5,BARAJAS, 28042 MADRID, ESPAÑA. PABELLÓN 3 STAND 3C01",
    date: "24 - 28 ENE 2024",
  };

  return (
    <div className="bg-blue-950 py-10">
      <section className="flex justify-center items-center">
        <div className="w-10/12 flex text-white">
          <div className="w-8/12 text-center flex flex-col items-center gap-5">
            <div className="flex flex-col items-center">
              <h1 className="text-3xl sm:text-4xl text-lightBlue-500 font-extrabold">
                {event.title}
              </h1>
              <p className="w-8/12">{event.desc}</p>
            </div>
            <div>INFORMACION DEL EVENTO:</div>
            <div className="w-6/12 flex justify-center text-sm gap-20">
              <div className="flex items-center w-6/12">
                <div>
                  <MapPinIcon className="size-16 text-lightBlue-500" />
                </div>
                <div>{event.address}</div>
              </div>
              <div className="flex items-center w-6/12">
                <div>
                  <CalendarDaysIcon className="size-16 text-lightBlue-500" />
                </div>
                <div>{event.date}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
