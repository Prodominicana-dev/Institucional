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
        "El Aeropuerto Internacional Las Américas Dr. José Francisco Peña Gómez se encuentra en Boca Chica, Santo Domingo. Es el segundo aeropuerto más importante de República Dominicana en cuanto al flujo de pasajeros. Cuenta con 2 terminales, 10 puentes de embarque y una pista de 3,354 metros de lng. Tiene 13 posiciones para estacionamiento de carga aérea, a través de las cuales se mueven miles de toneladas de carga cada mes, perteneciendo al sector perecedero el 70% de la mercancía total.",
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
      coords: { lat: 19.2705, lng: -69.7348 },
    },
    {
      name: "Aeropuerto Internacional General Gregorio Luperón (Puerto Plata)",
      image: "/images/invest/airports/aeropuertopuertoplata.jpg",
      link: "https://aeropuertopuertoplata.com",
      description:
        "Es un aeropuerto internacional ubicado en la Provincia de Puerto Plata y que también es una de los aeropuertos principales de turismo de la República Dominicana. Es el cuarto aeropuerto más transitado del país por tráfico de pasajeros y movimientos de aeronaves, después de los aeropuertos Punta Cana, Las Américas, y Cibao. y es el tercero en tamaño y capacidad de pasajeros. teniendo la capacidad de operar hasta 2 millones de pasajeros al año.",
      coords: { lat: 19.756, lng: -70.5636 },
    },
  ],
};

const ports = {
  name: "Puertos Maritimos",
  icon: "/svg/invest/whydrIcon.svg",
  positions: [
    {
      name: "Puerto Cabo Rojo",
      province: "Pedernales",
      image: "/images/invest/ports/puertocaborojo.jpg",
      description:
        "Puerto de carga y turismo. Capacidad para 1,000 atraques. Ofrece servicios de reparación, mantenimiento y abastecimiento de combustible.",
      coords: {
        lat: 17.9256,
        lng: -71.6575,
      },
      operation: "Carga y turístico",
      administration: "Privada",
    },
    {
      name: "Puerto de Barahona",
      province: "Barahona",
      image: "/images/invest/ports/puertobarahona.jpg",
      description:
        "Se encuentra en la región sur del país en la provincia Barahona. Es utilizado principalmente como un puerto para la carga de mercancías a granel de azúcar, yeso y carbón. En este puerto no se recibe actualmente cargas en contenedores, sino carga suelta, tal como sal, yeso, carbón mineral, Clinker y combustible para las plantas eléctricas. En general, el arribo de buques en estos muelles sureños no es muy frecuente. En ocasiones, el puerto ha servido para descargar automóviles, en desahogo de los puertos de la capital cuando están congestionados.",
      coords: {
        lat: 18.2076,
        lng: -71.0921,
      },
      operation: "Carga y descarga",
      administration: "Privada",
    },
    {
      name: "Puerto de Azua",
      province: "Azua",
      image: "/images/invest/ports/puertoazua.jpg",
      description:
        "Se utiliza para importación y recepción de gas licuado de petróleo, y carga a granel líquida y seca (clinker y cemento a granel).",
      coords: {
        lat: 18.3469,
        lng: -70.8363,
      },
      operation: "Carga y descarga",
      administration: "Privada",
    },
    {
      name: "Puerto Rio Haina",
      province: "Santo Domingo",
      image: "/images/invest/ports/puertoriohaina.jpg",
      description:
        "Es una instalación portuaria versátil que se dedica a la carga y descarga de diversos tipos de buques, incluyendo cargueros, graneleros, tanqueros, remolcadores y barcazas. Ofrece servicios de importación y exportación que abarcan una amplia gama de cargas, desde carga general suelta y contenerizada hasta carga sólida y líquida. Su ubicación estratégica lo convierte en un punto clave para el comercio regional y ofrece oportunidades de inversión en su expansión y modernización.",
      coords: {
        lat: 18.4196,
        lng: -70.0156,
      },
      operation: "Carga y descarga",
      administration: "Privada",
    },
    {
      name: "Puerto de Santo Domingo",
      province: "Santo Domingo",
      image: "/images/invest/ports/puertosantodomingo.jpg",
      description:
        "El Puerto de Santo Domingo es el más antiguo del Sistema Portuario Nacional. Está ubicado en la costa sur central, en la desembocadura del río Ozama. Está situado sólo a pasos de la atractiva e histórica Ciudad Colonial, Patrimonio de la Humanidad. Posee dos terminales turísticas concebidas para la recepción de cruceros: Don Diego y Sans Souci. En este puerto funciona también la terminal molinos modernos, especializada en la importación de trigo para la elaboración de harina. Este puerto, ubicado en la provincia de Santo Domingo, consta con un calado promedio de atraque de 20-24-29 pies; y un c anal de entrada con 30 pies de profundidad. El ancho es de 455 metros de longitud y 2,310 metros de lineales de muelles, y un círculo de maniobra de 320 metros.",
      coords: {
        lat: 18.4689,
        lng: -69.8833,
      },
      operation: "Carga y descarga",
      administration: "Privada",
    },
    {
      name: "Terminal Don Diego",
      province: "Santo Domingo",
      image: "/images/invest/ports/puertodondiego.jpg",
      description:
        "Se encuentra en una ubicación estratégica a lo largo del río Ozama, lo que la convierte en un punto clave para el comercio marítimo en la región. La terminal cuenta con muelles, áreas de almacenamiento, equipos de manipulación de carga y facilidades aduaneras.",
      coords: {
        lat: 18.475,
        lng: -69.8817,
      },
      operation: "Carga y descarga",
      administration: "Privada",
    },
    {
      name: "Terminal San Souci",
      province: "Santo Domingo",
      image: "/images/invest/ports/puertosansouci.jpg",
      description:
        "Situada en la desembocadura del río Ozama, ofrece servicios de carga y descarga de una variedad de buques, incluyendo cargueros, graneleros, contenedores y barcazas. Además de las operaciones portuarias básicas, la terminal proporciona instalaciones de almacenamiento temporales y servicios logísticos para facilitar el movimiento eficiente de mercancías. Es un componente esencial de la infraestructura comercial de Santo Domingo y contribuye significativamente al transporte marítimo y la economía regional.",
      coords: {
        lat: 18.4709,
        lng: -69.8762,
      },
      operation: "Carga y descarga",
      administration: "Privada",
    },
    {
      name: "Puerto Multimodal Caucedo",
      province: "Santo Domingo",
      image: "/images/invest/ports/puertomultimodalcaucedo.jpg",
      description:
        "La Terminal Multimodal Caucedo es una destacada instalación portuaria ubicada en la costa sur de la República Dominicana, cerca de Santo Domingo. Operando como un puerto de aguas profundas y terminal de contenedores, cuenta con muelles modernos y equipos de carga de última generación para la manipulación eficiente de mercancías. Estratégicamente ubicada cerca del Aeropuerto Internacional Las Américas y importantes redes de transporte terrestre, la terminal sirve como un punto clave para el comercio regional e internacional en el Caribe. Ofrece servicios integrales que incluyen almacenamiento, distribución, transporte terrestre y servicios logísticos, convirtiéndola en un centro logístico vital en la región.",
      coords: {
        lat: 18.4245,
        lng: -69.6323,
      },
      operation: "Carga y descarga",
      administration: "Privada",
    },
    {
      name: "Puerto Boca Chica",
      province: "Santo Domingo",
      image: "/images/invest/ports/puertobocachica.jpg",
      description:
        "Este puerto, de menor escala en comparación con otros puertos importantes del país, ofrece servicios para embarcaciones de tamaño mediano y pequeño, así como para actividades relacionadas con la pesca artesanal y el turismo náutico. La ubicación cerca de la capital y de áreas turísticas lo convierte en un punto de partida conveniente para excursiones de pesca, buceo y navegación recreativa.",
      coords: {
        lat: 18.4417,
        lng: -69.6305,
      },
      operation: "Carga y descarga",
      administration: "Privada",
    },
    {
      name: "Puerto San Pedro de Macorís",
      province: "San Pedro de Macorís",
      image: "/images/invest/ports/puertosanpedrodemacoris.jpg",
      description:
        "El Puerto de San Pedro de Macorís es una infraestructura portuaria clave en la costa suroriental de la República Dominicana, destacándose por la importación y exportación de una variedad de productos, desde azúcar y melaza hasta cemento, carga a granel, carbón y fertilizantes. Ofrece servicios integrales para la manipulación eficiente de carga general y a granel, abarcando desde clinker y cemento hasta combustibles, lo que lo posiciona como un nodo logístico vital para el comercio regional e internacional.",
      coords: {
        lat: 18.4444,
        lng: -69.3107,
      },
      operation: "Carga y descarga",
      administration: "Privada",
    },
    {
      name: "Puerto La Romana",
      province: "La Romana",
      image: "/images/invest/ports/puertolaromana.jpg",
      description:
        "Está ubicado en la desembocadura del río Chavón y funciona dentro de las instalaciones del Central Romana. Tiene dos atracaderos: el muelle comercial y la terminal turística, que funcionan en la margen oriental y occidental, respectivamente. Sus operaciones incluyen: Exportación de azúcar y melaza, producida en el Central Romana; además, manejo de carga en contenedores, cargas sueltas (zona franca); y combustibles; además del servicios de cruceros.",
      coords: {
        lat: 18.4166,
        lng: -68.959,
      },
      operation: "Carga y turístico",
      administration: "Privada",
    },
    {
      name: "Puerto Arroyo Barril",
      province: "Samaná",
      image: "/images/invest/ports/puertoarroyobarril.jpg",
      description:
        " Este puerto desempeña un papel fundamental en el transporte marítimo y el turismo en la región. Con su ubicación estratégica en la Bahía de Samaná, el puerto facilita el acceso a una de las áreas turísticas más populares del país y sirve como punto de entrada para visitantes que llegan a la región en barco. Además, el Puerto Arroyo Barril es utilizado para el transporte de carga, incluyendo productos agrícolas, mercancías generales y suministros para la industria local.",
      coords: {
        lat: 19.1986,
        lng: -69.4471,
      },
      operation: "Carga y turístico",
      administration: "Privada",
    },
    {
      name: "Puerto de Puerto Plata",
      province: "Puerto Plata",
      image: "/images/invest/ports/puertodepuertoplata.jpg",
      description:
        "Reconocido como uno de los puertos más importantes del país, desempeña un papel fundamental en el comercio marítimo y el turismo de la región. Con muelles modernos y equipos de manipulación de carga de vanguardia, el puerto facilita la importación y exportación de una amplia gama de productos, desde productos agrícolas hasta bienes manufacturados. Además, Puerto Plata es un destino turístico popular, y el puerto recibe regularmente cruceros de lujo que traen visitantes de todo el mundo. Esta combinación de actividad comercial y turística lo convierte en un motor económico clave para la provincia y una puerta de entrada vital para el comercio internacional en el Caribe.",
      coords: {
        lat: 19.8011,
        lng: -70.7008,
      },
      operation: "Carga y turístico",
      administration: "Privada",
    },
    {
      name: "Puerto Amber Cove",
      province: "Puerto Plata",
      image: "/images/invest/ports/puertoambercove.jpg",
      description:
        "Puerto Amber Cove es una moderna terminal de cruceros ubicada en la costa norte de la República Dominicana, cerca de la ciudad de Puerto Plata. Esta instalación portuaria, gestionada por Carnival Corporation, es conocida por su infraestructura de vanguardia y su capacidad para recibir cruceros de gran tamaño. Amber Cove sirve como puerta de entrada para miles de turistas que visitan la República Dominicana, ofreciendo una amplia gama de servicios y actividades, desde excursiones en tierra hasta compras y entretenimiento. Además de su importancia para el turismo, Amber Cove también actúa como un centro logístico para la distribución de bienes y productos locales. Su impacto en la economía local y su papel en la promoción del turismo en la región lo convierten en un activo invaluable para el desarrollo económico de Puerto Plata y sus alrededores.",
      coords: {
        lat: 19.8328,
        lng: -70.7736,
      },
      operation: "Turístico",
      administration: "Privada",
    },
    {
      name: "Puerto Taíno Bay",
      province: "Puerto Plata",
      image: "/images/invest/ports/puertotainobay.jpg",
      description:
        "Esta moderna instalación portuaria es un punto de llegada para numerosos cruceros que visitan la isla caribeña. Taino Bay se destaca por su infraestructura de calidad y sus servicios turísticos integrales, que incluyen tiendas, restaurantes, actividades recreativas y opciones de excursiones en tierra. La terminal juega un papel fundamental en el impulso del turismo en Puerto Plata y sus alrededores, siendo un punto de encuentro para visitantes internacionales que desean explorar la belleza natural, la cultura y las atracciones de la región norte de la República Dominicana.",
      coords: {
        lat: 19.8005,
        lng: -70.701,
      },
      operation: "Turístico",
      administration: "Privada",
    },
    {
      name: "Puerto de Manzanillo",
      province: "Montecristi",
      image: "/images/invest/ports/puertomanzanillo.jpg",
      description:
        "El Puerto de Manzanillo en la República Dominicana es una infraestructura portuaria significativa ubicada en la costa norte del país, en la provincia de Monte Cristi. Este puerto juega un papel importante en el comercio marítimo de la región y es un punto de conexión vital para la importación y exportación de bienes. Con sus muelles modernos y equipos de manipulación de carga avanzados, el Puerto de Manzanillo facilita la carga y descarga eficiente de una variedad de productos, incluyendo contenedores, productos agrícolas y mercancías generales. Además de su contribución al comercio, el puerto también impulsa la economía local al generar empleo y promover el desarrollo económico en la provincia de Monte Cristi y sus alrededores.",
      coords: {
        lat: 19.7072,
        lng: -71.743,
      },
      operation: "Carga y descarga",
      administration: "Privada",
    },
  ],
};

export default function Page() {
  const [activeAirports, setActiveAirports] = useState(true);
  const [activePorts, setActivePorts] = useState(true);
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
          {activePorts &&
            ports.positions.map((port: any, index: number) => (
              <PortPin
                key={index}
                name={port.name}
                description={port.description}
                image={port.image}
                coords={port.coords}
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
          <Checkbox
            label={ports.name}
            className="checked:bg-blue-dark checked:border-transparent"
            crossOrigin={undefined}
            checked={activePorts}
            onChange={() => {
              setActivePorts(!activePorts);
            }}
          />
        </div>
      </div>
    </div>
  );
}

function PortPin({ name, description, link, image, coords }: any) {
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
          src="/svg/invest/shipPinIcon.svg"
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
          src="/svg/invest/planePinIcon.svg"
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
