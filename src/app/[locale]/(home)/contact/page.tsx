"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Input, Textarea, button } from "@material-tailwind/react";
import {
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { title } from "process";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  useMap,
} from "@vis.gl/react-google-maps";

export default function page() {
  const map = useMap();
  const cards = [
    {
      title: "Llamanos",
      description:
        "Contactate con nosotros de lunes a viernes, 8:30AM - 4:30PM. ",
      info: "+1 (809) 530 5505",
      link: "tel:+18095305505",
      icon: PhoneIcon,
    },
    {
      title: "Habla con nosotros",
      description: "Envianos un correo si tienes alguna duda.",
      info: "servicios@prodominicana.gob.do",
      link: "mailto:servicios@prodominicana.gob.do",
      icon: EnvelopeIcon,
    },
    {
      title: "Visitanos",
      description:
        "Av. 27 de Febrero esq. Av. Gregorio Luperón, frente a la Plaza de la Bandera, Santo Domingo, 10137.",
      info: "Abrir en Google Maps",
      link: "https://maps.app.goo.gl/2ML9NU6YSL3MmkR18",
      icon: MapPinIcon,
    },
  ];

  const branches = [
    {
      title: "Santo Domingo",
      address:
        "Av. 27 de Febrero esq. Av. Gregorio Luperón, frente a la Plaza de la Bandera, Santo Domingo, 10137.",
      phone: "+1 (809) 530 5505",
      coords: { lat: 18.450663528127134, lng: -69.97308595432206 },
      email: "servicios@prodominicana.gob.do",
    },
    {
      title: "Santiago",
      address:
        "Av. Juan Pablo Duarte, Esq. Av. Bartolomé Colón, Edificio de la Gobernación, 2do. Nivel, Santiago de los Caballeros.",
      phone: "+1 (809) 724 7700",
      coords: { lat: 19.451663528127134, lng: -70.97308595432206 },
      email: "",
    },
  ];

  const [activeMarker, setActiveMarker] = useState(branches[0]);
  useEffect(() => {
    if (!map) return;
    map.setCenter(activeMarker.coords);
  }, [map, activeMarker]);

  return (
    <div className="bg-white">
      <section className="flex justify-center py-10">
        <div className="w-10/12 flex items-center gap-10">
          <Image
            width={2000}
            height={2000}
            src={"/images/prodominicanabuilding.jpg"}
            alt={""}
            className="rounded-3xl object-cover h-[70vh] w-6/12 hidden xl:block"
          />
          <div className="flex flex-col gap-5 py-2 text-blue-950 w-full">
            <div>
              <h1 className="text-4xl font-extrabold">Contacto</h1>
              <p className="font-semibold">
                Si aún tienes alguna duda, ¡Escríbenos!
              </p>
            </div>
            <div className="flex gap-5">
              <FormInput label="Nombre" placeholder="John" />
              <FormInput label="Apellido" placeholder="Doe" />
            </div>
            <FormInput
              label="Correo Electronico"
              placeholder="example@email.com"
            />
            <div className="flex gap-5">
              <FormInput label="Identificacion" placeholder="000-00000000-0" />
              <FormInput label="Actividad" placeholder="Exportador" />
            </div>
            <div className="w-full flex flex-col gap-2">
              <div className="font-bold text-xl">Mensaje</div>
              <Textarea
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                className="w-full h-40 border-t-blue-gray-200 focus:border-t-blue-950 bg-white"
              ></Textarea>
            </div>
            <button className="bg-blue-950 w-full py-5 text-xl text-white font-bold text-center rounded-xl">
              Enviar
            </button>
          </div>
        </div>
      </section>
      <section className="flex justify-center items-center py-10">
        <div className="w-8/12 flex flex-col gap-10">
          <div className="text-center text-blue-950">
            <h1 className="font-bold text-4xl">Contactanos directamente</h1>
            <p className="text-lg text-gray-500">
              Utiliza cualquiera de nuestras vias de contacto
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10">
            {cards.map((card: any, index: number) => (
              <ContactCard
                key={index}
                title={card.title}
                description={card.description}
                info={card.info}
                link={card.link}
                icon={card.icon}
              />
            ))}
          </div>
        </div>
      </section>
      <section className="flex justify-center py-10">
        <div className="w-10/12 flex flex-col gap-5">
          <div className="text-blue-950">
            <h1 className="text-4xl font-extrabold">Oficinas Regionales</h1>
            <p>Visítanos en la oficina regional más cercana.</p>
          </div>
          <div className="flex flex-col xl:flex-row gap-10">
            <div className="w-full xl:w-9/12 h-[70vh]">
              <GoogleMap activeMarker={activeMarker} />
            </div>
            <div className="xl:w-3/12 flex flex-col gap-5 order-first xl:order-last">
              {branches.map((branch: any, index: number) => (
                <button
                  key={index}
                  onClick={() => {
                    setActiveMarker(branches[index]);
                  }}
                  className={`flex items-center gap-3 border-2 h-20 text-start border-gray-200 text-2xl font-bold text-gray-500  rounded-xl ${
                    activeMarker?.title === branch.title
                      ? "bg-rose-100 text-red-700 border-none"
                      : ""
                  }`}
                >
                  <div className="w-2/12 h-full rounded-l-xl bg-red-700 flex justify-center items-center">
                    <MapPinIcon className="h-8 w-8 text-white" />
                  </div>
                  {branch.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function FormInput({ label, placeholder }: any) {
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="font-bold text-xl">{label}</div>
      <Input
        placeholder={placeholder}
        className=" !border-t-blue-gray-200 focus:!border-t-blue-950 bg-white"
        containerProps={{ className: "h-12" }}
        labelProps={{
          className: "before:content-none after:content-none",
        }}
        crossOrigin={undefined}
      />
    </div>
  );
}

function ContactCard({ title, description, info, link, icon }: any) {
  return (
    <Link
      href={link}
      target="_blank"
      className="border-2 border-gray-200 hover:bg-blue-950 hover:border-blue-950 duration-300 h-72 p-4 flex flex-col justify-between rounded-2xl group"
    >
      <div className="flex border-2 border-gray-200 p-2 gap-2 items-center rounded-md size-12">
        {React.createElement(icon, {
          strokeWidth: 2,
          className: "text-black group-hover:text-white",
        })}
      </div>
      <div className="flex flex-col h-3/6 justify-between">
        <div>
          <div className="font-bold text-lg group-hover:text-white">
            {title}
          </div>
          <div className="text-gray-500 text-sm group-hover:text-gray-200">
            {description}
          </div>
        </div>
        <div className="font-bold group-hover:underline group-hover:text-white">
          {info}
        </div>
      </div>
    </Link>
  );
}

function GoogleMap(activeMarker: any) {
  const coords = activeMarker.activeMarker.coords;
  return (
    <Map
      mapId={"fbaf3dc9f8865313"}
      defaultZoom={15}
      defaultCenter={coords}
      style={{ borderRadius: "1rem" }}
    >
      <AdvancedMarker position={coords}>
        <Pin scale={2} />
      </AdvancedMarker>
    </Map>
  );
}
