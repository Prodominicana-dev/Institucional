"use client";
import {
  Bars4Icon,
  CalendarDaysIcon,
  MagnifyingGlassIcon,
  NewspaperIcon,
  PhotoIcon,
  ScaleIcon,
  SquaresPlusIcon,
  UserGroupIcon,
  UserIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";
import {
  IconButton,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import NavbarMenu from "./navbarMenu";
import ToolsMenu from "./toolsMenu";
import AboutIcon from "../icons/aboutIcon";
import OrganizationIcon from "../icons/organizationIcon";

export default function Navbar() {
  const aboutListItems = [
    {
      title: "Quienes Somos",
      description: "Explora la pasión que nos impulsa.",
      icon: AboutIcon,
    },
    {
      title: "Despacho de la directora",
      description: "Conoce el corazón de nuestro liderazgo",
      icon: UserIcon,
    },
    {
      title: "Estructura organizacional",
      description: "Nuestro organigrama detallado.",
      icon: OrganizationIcon,
    },
    {
      title: "Marco legal",
      description: "Nuestro Compromiso Legal.",
      icon: ScaleIcon,
    },
  ];

  const newsListItems = [
    {
      title: "Noticias",
      description: "Explora la pasión que nos impulsa.",
      icon: NewspaperIcon,
    },
    {
      title: "Eventos",
      description: "Conoce el corazón de nuestro liderazgo",
      icon: CalendarDaysIcon,
    },
    {
      title: "Prodominicana TV",
      description: "Nuestro organigrama detallado.",
      icon: VideoCameraIcon,
    },
    {
      title: "Galería de fotos",
      description: "Nuestro Compromiso Legal.",
      icon: PhotoIcon,
    },
  ];

  const servicesListItems = [
    {
      title: "Inversión",
      description: "Explora la pasión que nos impulsa.",
      icon: NewspaperIcon,
    },
    {
      title: "Exportación",
      description: "Conoce el corazón de nuestro liderazgo",
      icon: CalendarDaysIcon,
    },
  ];
  return (
    <div>
      <div className="h-10 bg-white px-10 flex items-center space-x-1">
        <Image
          alt=""
          width={1920}
          height={1080}
          src={"/images/RD.jpg"}
          className="w-10 p-2"
        />
        <p className="text-black text-xs">
          Esta es una web oficial del Gobierno de la República Dominicana
        </p>
        <Link href="https://www.gob.do/" className="text-sky-500 text-xs">
          Así es como puedes saberlo
        </Link>
      </div>
      <div className="h-36 md:px-10 lg:px-20 bg-white flex items-center justify-between">
        <Image
          alt=""
          width={1920}
          height={1080}
          src={"prodominicana.svg"}
          className="w-56 cursor-pointer"
        />
        <div className="flex flex-col space-y-4">
          <div className="w-72 flex items-center space-x-4">
            <div className="h-12 w-10/12 border-2 border-blue-950 rounded-full p-2 flex items-center justify-between">
              <input
                type="text"
                placeholder="Buscar"
                className="h-full w-8/12 text-blue-950 bg-white outline-none pl-2"
              />
              <IconButton
                className="bg-red-700 rounded-full w-8 h-8"
                placeholder={undefined}
              >
                <MagnifyingGlassIcon className="w-5 h-5" />
              </IconButton>
            </div>
            <ToolsMenu toolsMenuItems={aboutListItems} />
          </div>
          <div className="flex justify-between md:px-3 lg:px-1">
            <IconButton
              className="bg-blue-950 rounded-full w-12"
              placeholder={undefined}
            >
              <Image
                alt=""
                width={50}
                height={50}
                src={"svg/social/instagram.svg"}
                className="w-12"
              />
            </IconButton>
            <IconButton
              className="bg-blue-950 rounded-full w-12"
              placeholder={undefined}
            >
              <Image
                alt=""
                width={50}
                height={50}
                src={"svg/social/twitter.svg"}
                className="w-12"
              />
            </IconButton>
            <IconButton
              className="bg-blue-950 rounded-full w-12"
              placeholder={undefined}
            >
              <Image
                alt=""
                width={50}
                height={50}
                src={"svg/social/linkedin.svg"}
                className="w-12"
              />
            </IconButton>
            <IconButton
              className="bg-blue-950 rounded-full w-12"
              placeholder={undefined}
            >
              <Image
                alt=""
                width={50}
                height={50}
                src={"svg/social/youtube.svg"}
                className="w-12"
              />
            </IconButton>
          </div>
        </div>
      </div>
      <div className="w-full h-20 bg-blue-950 flex justify-center items-center">
        <div className="bg-red-700 h-full p-5 ">
          <Image
            alt=""
            width={50}
            height={50}
            src={"svg/icons/homeProdominicana.svg"}
            className="w-10 cursor-pointer"
          />
        </div>
        <NavbarMenu title={"Nosotros"} navListMenuItems={aboutListItems} />
        <NavbarMenu title={"Servicios"} navListMenuItems={servicesListItems} />
        <NavbarMenu title={"Novedades"} navListMenuItems={newsListItems} />
        <NavbarMenu title={"Capacitacion"} navListMenuItems={newsListItems} />
        <div className="flex items-center h-20 px-5 text-center bg-transparent rounded-none hover:bg-transparent hover:text-white text-cyan-600 cursor-pointer">
          <Link href="/transparencia">Transparencia</Link>
        </div>
        <div className="flex space-x-3">
          <button className="bg-red-700 h-10 flex items-center px-3 rounded-full gap-2">
            <Image
              alt=""
              width={50}
              height={50}
              src={"svg/icons/investIcon.svg"}
              className="w-8 cursor-pointer"
            />
            Invertir
          </button>
          <button className="bg-red-700 h-10 flex items-center px-3 rounded-full gap-2">
            <Image
              alt=""
              width={50}
              height={50}
              src={"svg/icons/exportIcon.svg"}
              className="w-8 cursor-pointer"
            />
            Exportar
          </button>
        </div>
      </div>
    </div>
  );
}
