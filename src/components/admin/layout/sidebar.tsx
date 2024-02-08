"use client";
// @ts-ignore
import { useEffect, useRef, useState } from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Button,
} from "@material-tailwind/react";
import { ChevronDownIcon, CogIcon } from "@heroicons/react/24/outline";
import { useHover } from "usehooks-ts";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useAtom } from "jotai";
import React from "react";
import { sideBarAtom } from "@/states/states";

export function SideBar() {
  const [open, setOpen] = useState(0);
  const hoverRef = useRef(null);
  const isHover = useHover(hoverRef);
  const [openNewness, setOpenNewness] = useState(0);
  const hoverNewnessRef = useRef(null);
  const isHoveringNewness = useHover(hoverRef);
  const [isConfig, setIsConfig] = useState(false);
  const [isVisible, setIsVisible] = useAtom(sideBarAtom);

  const handleNewnessOpen = (value: any) => {
    setOpenNewness(openNewness === value ? 0 : value);
  };

  const handleOpen = (value: any) => {
    setOpen(open === value ? 0 : value);
  };

  useEffect(() => {
    if (!isHover) {
      setOpen(0);
      setOpenNewness(0);
    }
  }, [setOpen, isHover]);

  return (
    <div
      ref={hoverRef}
      className={`h-full flex flex-col justify-between hover:w-72 duration-700 group  ${
        isVisible ? "w-28 p-4" : "w-0 p-0"
      }
        ${isConfig ? "bg-[#051544]" : "bg-blue-dark"}
      `}
    >
      <div className="h-full overflow-x-hidden overflow-y-auto no-scrollbar">
        <div className="p-4 mb-2 text-white">
          <Link href={"/"}>
            <Image
              src={"/svg/logos/prodominicana.svg"}
              alt=""
              width={1920}
              height={1080}
            />
          </Link>
        </div>
        <List
          placeholder={undefined}
          className={` ${
            isVisible ? "opacity-100 visible" : "opacity-0 invisible"
          } duration-200 h-4/6`}
        >
          <SidebarItem
            title={"Inicio"}
            url={"/admin"}
            iconUrl={"/svg/layout/sidebar/home.svg"}
          />
          <SidebarItem
            title={"Sobre Nosotros"}
            url={"/admin/about"}
            iconUrl={"/svg/layout/sidebar/about.svg"}
          />
          <SidebarItem
            title={"Documentos"}
            url={"/admin/documents"}
            iconUrl={"/svg/layout/sidebar/documents.svg"}
          />
          <Accordion
            ref={hoverNewnessRef}
            placeholder={undefined}
            open={openNewness === 1}
            icon={
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform opacity-0 group-hover:opacity-100 hidden group-hover:flex text-white ${
                  openNewness === 1 ? "rotate-180" : ""
                }`}
              />
            }
          >
            <ListItem
              placeholder={undefined}
              className="p-0 bg-transparent"
              selected={openNewness === 0}
            >
              <AccordionHeader
                placeholder={undefined}
                onClick={() => handleNewnessOpen(1)}
                className="p-3 border-b-0"
              >
                <ListItemPrefix placeholder={undefined} className="">
                  <Image
                    src={"/svg/layout/sidebar/news.svg"}
                    width={600}
                    height={600}
                    draggable={false}
                    alt=""
                    className="w-8 h-8 text-white duration-700 group-hover:h-5 group-hover:w-5 mr-5"
                  />
                </ListItemPrefix>
                <Typography
                  placeholder={undefined}
                  color="white"
                  className="hidden mr-auto font-normal duration-300 opacity-0 group-hover:flex group-hover:opacity-100"
                >
                  Novedades
                </Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
              {openNewness === 1 && (
                <List placeholder={undefined} className="p-0 text-white">
                  <SidebarMenuItem title={"Noticias"} url={"/admin/news"} />
                  <SidebarMenuItem title={"Eventos"} url={"/admin/events"} />
                  <SidebarMenuItem
                    title={"Galería de Fotos"}
                    url={"/admin/gallery"}
                  />
                </List>
              )}
            </AccordionBody>
          </Accordion>

          <SidebarItem
            title={"Inversión"}
            url={"/admin/investment"}
            iconUrl={"/svg/layout/sidebar/investment.svg"}
          />
          <SidebarItem
            title={"Exportación"}
            url={"/admin/export"}
            iconUrl={"/svg/layout/sidebar/export.svg"}
          />
          <SidebarItem
            title={"Capacitación"}
            url={"/admin/training"}
            iconUrl={"/svg/layout/sidebar/training.svg"}
          />
          <Accordion
            placeholder={undefined}
            open={open === 1}
            icon={
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform opacity-0 group-hover:opacity-100 hidden group-hover:flex text-white ${
                  open === 1 ? "rotate-180" : ""
                }`}
              />
            }
          >
            <ListItem
              placeholder={undefined}
              className="p-0 bg-transparent"
              selected={open === 0}
            >
              <AccordionHeader
                placeholder={undefined}
                onClick={() => handleOpen(1)}
                className="p-3 border-b-0 "
              >
                <ListItemPrefix placeholder={undefined} className="">
                  <Image
                    src={"/svg/layout/sidebar/transparency.svg"}
                    width={600}
                    height={600}
                    draggable={false}
                    alt=""
                    className="w-8 h-8 text-white duration-700 group-hover:h-5 group-hover:w-5 mr-5"
                  />
                </ListItemPrefix>
                <Typography
                  placeholder={undefined}
                  color="white"
                  className="hidden mr-auto font-normal duration-300 opacity-0 group-hover:flex group-hover:opacity-100"
                >
                  Transparencia
                </Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
              {open === 1 && (
                <List placeholder={undefined} className="p-0 text-white">
                  <SidebarMenuItem
                    title={"Secciones"}
                    url={"/admin/transparency/section"}
                  />
                  <SidebarMenuItem
                    title={"Subsecciones"}
                    url={"/admin/transparency/subsection"}
                  />
                  <SidebarMenuItem
                    title={"Documentos"}
                    url={"/admin/transparency/documents"}
                  />
                </List>
              )}
            </AccordionBody>
          </Accordion>

          <SidebarItem
            title={"Contactos"}
            url={"/admin/contacts"}
            iconUrl={"/svg/layout/sidebar/contacts.svg"}
          />
        </List>
      </div>
    </div>
  );
}

function SidebarItem({ title, url, iconUrl }: any) {
  return (
    <Link href={url}>
      <ListItem placeholder={undefined} className="bg-transparent space-x-5">
        <ListItemPrefix placeholder={undefined}>
          <Image
            src={iconUrl}
            width={600}
            height={600}
            draggable={false}
            alt=""
            className="w-8 h-8 text-white duration-700 group-hover:h-5 group-hover:w-5"
          />
        </ListItemPrefix>
        <Typography
          placeholder={undefined}
          color="white"
          className="hidden mr-auto font-normal duration-300 opacity-0 group-hover:opacity-100 group-hover:flex"
        >
          {title}
        </Typography>
      </ListItem>
    </Link>
  );
}

function SidebarMenuItem({ title, url }: any) {
  return (
    <Link href={url}>
      <ListItem placeholder={undefined} className="bg-transparent space-x-5">
        <ListItemPrefix placeholder={undefined}>
          <div></div>
        </ListItemPrefix>
        <Typography
          placeholder={undefined}
          color="white"
          className="hidden mr-auto font-normal duration-300 opacity-0 group-hover:opacity-100 group-hover:flex"
        >
          {title}
        </Typography>
      </ListItem>
    </Link>
  );
}
