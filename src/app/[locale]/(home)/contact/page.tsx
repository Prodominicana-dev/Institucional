"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Button,
  Input,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Select,
  Textarea,
  Option,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { Map, AdvancedMarker, Pin, useMap } from "@vis.gl/react-google-maps";
import { useTranslations } from "next-intl";

export default function page() {
  const map = useMap();
  const t = useTranslations("contact");
  const [openMenu, setOpenMenu] = React.useState(false);
  const cards = [
    {
      title: t("contactInfo.phone.title"),
      description: t("contactInfo.phone.description"),
      info: "+1 (809) 530 5505",
      link: "tel:+18095305505",
      icon: PhoneIcon,
    },
    {
      title: t("contactInfo.email.title"),
      description: t("contactInfo.email.description"),
      info: "servicios@prodominicana.gob.do",
      link: "mailto:servicios@prodominicana.gob.do",
      icon: EnvelopeIcon,
    },
    {
      title: t("contactInfo.address.title"),
      description:
        "Av. 27 de Febrero esq. Av. Gregorio Luperón, frente a la Plaza de la Bandera, Santo Domingo, 10137.",
      info: t("contactInfo.address.info"),
      link: "https://maps.app.goo.gl/2ML9NU6YSL3MmkR18",
      icon: MapPinIcon,
    },
  ];

  const branches = [
    {
      province: "Santo Domingo",
      phone: "+1 809 530 5505",
      address:
        "Av. 27 de Febrero esq. Av. Gregorio Luperón, frente a la Plaza de la Bandera, Santo Domingo, 10137.",
      coords: { lat: 18.450663528127134, lng: -69.97308595432206 },
    },
    {
      province: "La Altagracia",
      phone: "+1 829 292 7490",
      address:
        "Calle Manuel Monteagudo esquina Hicayagua #1, Sector San Martin, Higuey.",
      coords: { lat: 18.611143380672146, lng: -68.71593638310102 },
    },
    {
      province: "La Vega",
      phone: "+1 829 891 0304",
      address:
        "Calle Gral. Juan Rodríguez 94, Plaza Jiminián, Apto. 1-01, La Vega.",
      coords: { lat: 19.2253606919866, lng: -70.5289678205116 },
    },
    {
      province: "Monseñor Nouel",
      phone: "+1 829 745 2902",
      address: "C. San Lorenzo de los Santos 132, Bonao.",
      coords: { lat: 18.94247868206842, lng: -70.4090543088343 },
    },
    {
      province: "Pedernales",
      phone: "+1 829 745 1870",
      address: "Calle braulio mendez esq.mella, Pedernales.",
      coords: { lat: 18.036363807306678, lng: -71.7459708340409 },
    },
    {
      province: "Samaná",
      phone: "+1 829 745 1620",
      address: "Calle Restauración No. 02 esq. 27 de Febrero, Samaná.",
      coords: { lat: 19.20409571821329, lng: -69.33094288983054 },
    },
    {
      province: "San Cristóbal",
      phone: "+1 829 344 7799",
      address: "Av. Constitución 95, San Cristóbal.",
      coords: { lat: 18.436508406695598, lng: -70.11319768177877 },
    },
    {
      province: "La Romana",
      phone: "+1 829 796 5943",
      address: "Maria Teresa Toda 12, La Romana.",
      coords: { lat: 18.433208514955567, lng: -68.96683377820547 },
    },
    {
      province: "Puerto Plata",
      phone: "",
      address: "Calle Beller 17, San Felipe de Puerto Plata.",
      coords: { lat: 19.798600441642346, lng: -70.69454200859732 },
    },
    {
      province: "Peravia",
      phone: "+1 849 360 1003",
      address:
        "Calle Canela Mota Edificio para Oficinas Gubernamentales Esq, Av. Pdte. Billini, Bani.",
      coords: { lat: 18.278620345047152, lng: -70.32797283403397 },
    },
    {
      province: "Espaillat",
      phone: "+1 829 504 1266",
      address: "Calle Hostos 9, Moca.",
      coords: { lat: 19.396833399376472, lng: -70.52015004749518 },
    },
    {
      province: "Hato Mayor",
      phone: "+1 829 451 4350",
      address: "Av. Melchor Contin Alfau 7, A-R Plaza Centro, Hato Mayor.",
      coords: { lat: 18.7639977713771, lng: -69.25678658576709 },
    },
    {
      province: "Dajabón",
      phone: "+1 829 424 7400",
      address: "Calle 27 de Febrero 25, esquina Duarte, Dajabón.",
      coords: { lat: 19.548204838188294, lng: -71.70900997817222 },
    },
    {
      province: "San Juan",
      phone: "+1 849 873 6316",
      address: "Calle Mella esquina Independencia, San Juan.",
      coords: { lat: 18.655595919037175, lng: -71.33506091866549 },
    },
    {
      province: "María Trinidad Sánchez",
      phone: "+1 829 875 7889",
      address: "Calle 27 de Febrero 92, Nagua.",
      coords: { lat: 19.373874744092845, lng: -69.85338459167191 },
    },
    {
      province: "Hermanas Mirabal",
      phone: "+1 849 276 1414",
      address: "Calle Duarte 1, Salcedo.",
      coords: { lat: 19.379228914686284, lng: -70.41736874191675 },
    },
  ];

  const [activeMarker, setActiveMarker] = useState(branches[0]);
  useEffect(() => {
    if (!map) return;
    map.setCenter(activeMarker.coords);
    map.setZoom(15);
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
              <h1 className="text-4xl font-extrabold">{t("title")}</h1>
              <p className="font-semibold">{t("description")}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-5">
              <FormInput label={t("form.name")} placeholder="John" />
              <FormInput label={t("form.lastName")} placeholder="Doe" />
            </div>
            <FormInput
              label={t("form.email")}
              placeholder="example@email.com"
            />
            <div className="flex flex-col sm:flex-row gap-5">
              <FormInput
                label={t("form.identity")}
                placeholder="000-00000000-0"
              />
              <div className="w-full flex flex-col gap-2">
                <div className="font-bold text-xl">{t("form.activity")}</div>
                <Select
                  className=" !border-t-blue-gray-200 focus:!border-t-blue-950 bg-white"
                  containerProps={{ className: "h-12" }}
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  placeholder={undefined}
                >
                  <Option>Exportador</Option>
                  <Option>Inversionista</Option>
                  <Option>Otro</Option>
                </Select>
              </div>
            </div>
            <div className="w-full flex flex-col gap-2">
              <div className="font-bold text-xl">{t("form.message")}</div>
              <Textarea
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                className="w-full h-40 border-t-blue-gray-200 focus:border-t-blue-950 bg-white"
              ></Textarea>
            </div>
            <button className="bg-blue-950 w-full py-5 text-xl text-white font-bold text-center rounded-xl">
              {t("form.button")}
            </button>
          </div>
        </div>
      </section>
      <section className="flex justify-center items-center py-10">
        <div className="w-10/12 sm:w-8/12 flex flex-col gap-10">
          <div className="text-center text-blue-950">
            <h1 className="font-bold text-4xl">{t("contactInfo.title")}</h1>
            <p className="text-lg text-gray-500">
              {t("contactInfo.description")}
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
          <div className="flex flex-col sm:flex-row justify-between">
            <div className="text-blue-950 sm:w-10/12">
              <h1 className="text-3xl sm:text-4xl font-extrabold">
                {t("regionalOffices.title")}
              </h1>
              <p>{t("regionalOffices.description")}</p>
            </div>
            <Menu>
              <MenuHandler>
                <Button
                  variant="text"
                  className="flex justify-between items-center gap-3 text-base font-normal capitalize tracking-normal"
                  placeholder={undefined}
                >
                  {activeMarker.province}{" "}
                  <ChevronDownIcon
                    strokeWidth={2.5}
                    className={`h-3.5 w-3.5 transition-transform ${
                      openMenu ? "rotate-180" : ""
                    }`}
                  />
                </Button>
              </MenuHandler>
              <MenuList className="w-10/12 sm:max-h-72" placeholder={undefined}>
                {branches.map((branch: any, index: number) => (
                  <MenuItem
                    key={index}
                    onClick={() => {
                      setActiveMarker(branches[index]);
                    }}
                    placeholder={undefined}
                  >
                    {branch.province}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          </div>
          <div className="flex flex-col xl:flex-row gap-10">
            <div className="w-full h-[80vh] relative">
              <GoogleMap activeMarker={activeMarker} />
              <div className="w-full sm:w-10/12 xl:w-3/12 h-min bg-white rounded-xl p-5 absolute inset-0 sm:m-3 xl:m-5 border-2 border-gray-200">
                <h1 className="text-xl text-red-700 font-bold">
                  {activeMarker.province}
                </h1>
                <p className="text-gray-400 text-sm">{activeMarker.address}</p>
                <p className="text-red-700 font-semibold">{`Tel: ${activeMarker.phone}`}</p>
              </div>
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
        <div className="font-bold group-hover:underline group-hover:text-white break-words">
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
      zoomControl
      disableDefaultUI
    >
      <AdvancedMarker position={coords}>
        <Pin scale={2} />
      </AdvancedMarker>
    </Map>
  );
}
