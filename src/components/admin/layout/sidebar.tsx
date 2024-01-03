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
import axios from "axios";
import React from "react";
import { sideBarAtom } from "@/states/states";
import SidebarMenu from "./sidebarMenu";

export function SideBar() {
  const [open, setOpen] = useState(0);
  const hoverRef = useRef(null);
  const isHover = useHover(hoverRef);
  const [isConfig, setIsConfig] = useState(false);
  const path = usePathname();
  const router = useRouter();
  const [isVisible, setIsVisible] = useAtom(sideBarAtom);

  const handleOpen = (value: any) => {
    setOpen(open === value ? 0 : value);
  };

  useEffect(() => {
    if (!isHover) {
      setOpen(0);
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
              src={"/png/layout/sidebar/prodominicana.png"}
              alt=""
              width={1920}
              height={1080}
            />
          </Link>
        </div>
        <List
          placeholder={false}
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

          <SidebarItem
            title={"Noticias"}
            url={"/admin/news"}
            iconUrl={"/svg/layout/sidebar/news.svg"}
          />

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
            placeholder={false}
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
            <ListItem placeholder={false} className="p-0" selected={open === 0}>
              <AccordionHeader
                placeholder={false}
                onClick={() => handleOpen(1)}
                className="p-3 border-b-0"
              >
                <ListItemPrefix placeholder={false} className="">
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
                  placeholder={false}
                  color="white"
                  className="hidden mr-auto font-normal duration-300 opacity-0 group-hover:flex group-hover:opacity-100"
                >
                  Transparencia
                </Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
              {open === 1 && (
                <List placeholder={false} className="p-0 text-white">
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
                    url={"/admin/transparency/"}
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
      <ListItem placeholder={false} className="focus:bg-transparent space-x-5">
        <ListItemPrefix placeholder={false}>
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
          placeholder={false}
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
      <ListItem placeholder={false} className="focus:bg-transparent space-x-5">
        <ListItemPrefix placeholder={false}>
          <div></div>
        </ListItemPrefix>
        <Typography
          placeholder={false}
          color="white"
          className="hidden mr-auto font-normal duration-300 opacity-0 group-hover:opacity-100 group-hover:flex"
        >
          {title}
        </Typography>
      </ListItem>
    </Link>
  );
}
