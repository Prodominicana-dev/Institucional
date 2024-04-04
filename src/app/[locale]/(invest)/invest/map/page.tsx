"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Map, AdvancedMarker, Pin, useMap } from "@vis.gl/react-google-maps";
import { useTranslations } from "next-intl";
import {
  Checkbox,
  Dialog,
  DialogBody,
  DialogHeader,
} from "@material-tailwind/react";

const airports = {
  name: "Aeropuertos",
  icon: "/svg/invest/whydrIcon.svg",
  positions: [
    {
      name: "Aeropuerto Internacional de las Américas",
      image: "/images/invest/airports/aeropuertolasamericas.jpg",
      link: "https://aeropuertolasamericas.com",
      description:
        "El Aeropuerto Internacional Las Américas Dr. José Francisco Peña Gómez se encuentra en Boca Chica, Santo Domingo. Es el segundo aeropuerto más importante de República Dominicana en cuanto al flujo de pasajeros. Cuenta con 2 terminales, 10 puentes de embarque y una pista de 3,354 metros de longitud. Tiene 13 posiciones para estacionamiento de carga aérea, a través de las cuales se mueven miles de toneladas de carga cada mes, perteneciendo al sector perecedero el 70% de la mercancía total.",
      coords: { lat: 18.4299, lng: -69.6684 },
    },
    {
      name: "Aeropuerto La Isabela",
      image: "/images/invest/airports/aeropuertolaisabela.jpg",
      link: "https://aeropuertolaisabela.com",
      description:
        "El Aeropuerto Internacional Joaquín Balaguer o La Isabela, se encuentra en la ciudad de Santo Domingo como aeropuerto secundario, a 10 km del centro de la ciudad. Moviliza más de 40 mil toneladas de carga aérea al año y cuenta con espacio para almacenar carga y equipo especializado para el manejo de carga farmacéutica y perecedera.",
      coords: { lat: 18.5723, lng: -69.9865 },
    },
    {
      name: "Aeropuerto Internacional Punta Cana",
      image: "/images/invest/airports/aeropuertopuntacana.jpg",
      link: "https://www.puntacanainternationalairport.com",
      description:
        "Varias líneas aéreas regulares y chárter vuelan a Punta Cana; más de 7,3 millones de pasajeros (llegadas y salidas combinadas) pasan por las terminales, movidas por casi 60.000 operaciones de aviones comerciales",
      coords: { lat: 18.5677, lng: -68.3634 },
    },
    {
      name: "Aeropuerto Internacional Cibao",
      image: "/images/invest/airports/aeropuertocibao.jpg",
      link: "https://aeropuertocibao.com.do",
      description:
        "El Aeropuerto Internacional del Cibao se encuentra en la provincia de Santiago en República Dominicana. Es el tercer aeropuerto más importante del país en cuanto al número de pasajeros. Cuenta con 3 terminales, 2 de pasajeros (una internacional y otra doméstica) y una de carga. Mueve más de 900 toneladas de carga aérea mensualmente, principalmente carga del sector perecedero, tabacalero, de alimentos y bebidas e industrial.",
      coords: { lat: 19.4061, lng: -70.6095 },
    },
    {
      name: "Aeropuerto Internacional de La Romana",
      image: "/images/invest/airports/aeropuertolaromana.jpg",
      link: "http://romanaairport.com",
      description:
        "También conocido como Aeropuerto Internacional Casa de Campo, se encuentra estratégicamente ubicado a unos 10 minutos de Casa de Campo Resort & Villas, y a 20 minutos de Bayahíbe. El aeropuerto también se encuentra a menos de dos horas de Santo Domingo y a una hora de Punta Cana.",
      coords: { lat: 18.4486, lng: -68.9118 },
    },
    {
      name: "Aeropuerto Maria Montez (Barahona)",
      image: "/images/invest/airports/aeropuertobarahona.jpg",
      link: "https://aerodom.com/airports/barahona/",
      description:
        "El Aeropuerto Internacional María Montez es un aeropuerto internacional ubicado a 5 km norte de Barahona, República Dominicana, cuenta con una terminal de 2,565 metros cuadrados y una pista de 3,000 metros de largo x 45 metros de ancho, con capacidad para recibir aeronaves de cuerpo ancho.",
      coords: { lat: 18.2496, lng: -71.1203 },
    },
    {
      name: "Aeropuerto Internacional El Catey (Samana)",
      image: "/images/invest/airports/aeropuertosamana.jpg",
      link: "https://aeropuertosamana.com",
      description:
        "El Aeropuerto Internacional El Catey (AZS) también conocido como Aeropuerto Internacional Juan Bosch, se encuentra a media hora de la ciudad de Santa Bárbara de Samaná, a media hora de Las Terrenas y a solo una hora de Las Galeras. Permite manejar adecuadamente la salida y entrada de un promedio de 600 pasajeros por hora.",
      coords: { lat: 19.25, lng: -69.745 },
    },
    {
      name: "Aeropuerto Internacional General Gregorio Luperón (Puerto Plata)",
      image: "/images/invest/airports/aeropuertopuertoplata.jpg",
      link: "https://aeropuertopuertoplata.com",
      description:
        "Es un aeropuerto internacional ubicado en la Provincia de Puerto Plata y que también es una de los aeropuertos principales de turismo de la República Dominicana. Es el cuarto aeropuerto más transitado del país por tráfico de pasajeros y movimientos de aeronaves, después de los aeropuertos Punta Cana, Las Américas, y Cibao. y es el tercero en tamaño y capacidad de pasajeros. teniendo la capacidad de operar hasta 2 millones de pasajeros al año.",
      coords: { lat: 19.25, lng: -69.745 },
    },
  ],
};

const ports = {
  name: "Puertos Maritimos",
  icon: "/svg/invest/whydrIcon.svg",
  positions: [
    {
      name: "Puerto de Haina",
      description:
        "El Puerto de Haina es el puerto más grande de la República Dominicana y uno de los más importantes de América Latina. Se encuentra ubicado en la costa sur de la isla, en la provincia de San Cristóbal, a unos 20 kilómetros al oeste de la ciudad de Santo Domingo. Es un puerto multipropósito que maneja contenedores, carga general, graneles sólidos y líquidos, y carga rodante.",
      coords: { lat: 18.4317, lng: -70.0144 },
    },
    {
      name: "Puerto San Souci",
      link: "https://sansouci.com.do",
      description:
        "El Puerto Santo Domingo, gestionado por SANSOUCI desde 2005, destaca como el principal puerto multipropósito de la República Dominicana y el primero de América. Situado en el corazón de la ciudad de Santo Domingo, se distingue por ser el líder en procesamiento de vehículos en el país. Además, sirve como enlace comercial, turístico y cultural entre la República Dominicana y Puerto Rico a través de Ferries del Caribe. Es el único puerto en la ciudad de Santo Domingo que realiza operaciones de pasajeros, reforzando su importancia como punto neurálgico para la actividad económica y de transporte en la región.",
      coords: { lat: 18.4818, lng: -69.8667 },
    },
  ],
};

export default function Page() {
  const [activeAirports, setActiveAirports] = useState(false);
  const [activePorts] = useState(false);
  const defaultCoords = { lat: 18.7357, lng: -70.1627 };
  return (
    <div>
      <div className="w-full h-screen relative">
        <Map
          mapId={"fbaf3dc9f8865313"}
          defaultZoom={8}
          mapTypeId={"satellite"}
          defaultCenter={defaultCoords}
          disableDefaultUI
        >
          {activeAirports &&
            airports.positions.map((airport: any, index: number) => (
              <AirportPin
                key={index}
                name={airport.name}
                description={airport.description}
                image={airport.image}
                coords={airport.coords}
              />
            ))}
        </Map>
        <div className="absolute bottom-0 right-0 h-min w-2/12 bg-white p-5 rounded-tl-xl">
          <h1 className="font-bold text-blue-dark">Filtros</h1>
          <Checkbox
            label={airports.name}
            className="checked:bg-blue-dark checked:border-transparent"
            crossOrigin={undefined}
            checked={activeAirports}
            onChange={() => {
              setActiveAirports(!activeAirports);
            }}
          />
        </div>
      </div>
    </div>
  );
}

function AirportPin({ name, description, link, image, coords }: any) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  return (
    <div>
      <AdvancedMarker
        position={coords}
        className="cursor-pointer"
        onClick={handleOpen}
      >
        <Image
          width={100}
          height={100}
          src="/svg/avatar.svg"
          alt=""
          className="w-10"
        />
      </AdvancedMarker>
      <Dialog
        open={open}
        handler={handleOpen}
        placeholder={undefined}
        className="p-5"
        size="lg"
      >
        <DialogHeader placeholder={undefined} className="text-blue-dark">
          {name}
        </DialogHeader>
        <DialogBody placeholder={undefined}>
          <Image
            width={3840}
            height={2160}
            src={image}
            alt={name}
            className="rounded-xl h-[60vh] mb-5 object-cover"
          ></Image>
          <div className="text-gray-500">{description}</div>
        </DialogBody>
      </Dialog>
    </div>
  );
}
