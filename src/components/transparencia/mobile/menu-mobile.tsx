"use client";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import { Collapse } from "@material-tailwind/react";
import Link from "next/link";

export default function TransparencyMenuMobile() {
  const [title, setTitle] = useState("Inicio");
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen((cur) => !cur);

  const portalsListItems = [
    {
      title: "Portal del Estado Dominicano",
      link: "https://www.gob.do/",
      icon: "/svg/logos/portals/gobdo.svg",
    },
    {
      title: "Sistema de Atención Ciudadana",
      link: "https://311.gob.do/",
      icon: "/svg/logos/portals/311.svg",
    },
    {
      title: "911",
      link: "https://911.gob.do/",
      icon: "/svg/logos/portals/911.svg",
    },
    {
      title: "Observatorio Nacional",
      link: "https://observatorioserviciospublicos.gob.do",
      icon: "/svg/logos/portals/observatorioserviciospublicos.svg",
    },
    {
      title: "Beca tu futuro",
      link: "https://becas.gob.do",
      icon: "/svg/logos/portals/becatufuturo.svg",
    },
    {
      title: "Reporte de Abuso Sexual Infantil",
      link: "https://report.iwf.org.uk/do/",
      icon: "/svg/logos/portals/iwf.svg",
    },
    {
      title: "Centro Nacional de Ciberseguridad",
      link: "https://cncs.gob.do",
      icon: "/svg/logos/portals/cncs.svg",
    },
  ];
  return (
    <div className="w-11/12 space-y-2">
      <button
        onClick={toggleOpen}
        className="w-full py-3 border-2 border-gray-300 rounded-lg px-4 flex justify-between items-center"
      >
        <p className="text-black text-lg font-bold font-montserrat">{title}</p>
        <ChevronRightIcon
          className={`size-6 ${open ? "transform rotate-90" : ""} duration-300`}
        />
      </button>
      <Collapse
        open={open}
        className={`${!open ? "" : "border-2 rounded-lg border-gray-300"} `}
      >
        {portalsListItems?.map(({ title, link }, index) => (
          <div key={index} className="p-3">
            <Link
              href={link ? link : "/"}
              className="w-full flex justify-between outline-none items-center text-blue-950 text-left font-normal text-base py-2"
            >
              {title}
            </Link>
          </div>
        ))}
      </Collapse>
    </div>
  );
}
