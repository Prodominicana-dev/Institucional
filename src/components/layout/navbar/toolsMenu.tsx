import {
  Collapse,
  ListItem,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import { title } from "process";
import React from "react";
import Image from "next/image";
import ToolsMenuCollapse from "./toolsMenuCollapse";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function ToolsMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

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
      icon: "/svg/logos/portals/IWF.svg",
    },
    {
      title: "Centro Nacional de Ciberseguridad",
      link: "https://cncs.gob.do",
      icon: "/svg/logos/portals/CNCS.svg",
    },
  ];
  const ventanillaListItems = [
    {
      title: "Ventanilla Única de Inversión",
      link: "https://vui.gob.do/",
      icon: "/svg/logos/VuiIcon.svg",
    },
  ];

  return (
    <Menu
      open={isMenuOpen}
      handler={setIsMenuOpen}
      offset={{ mainAxis: 20 }}
      placement="bottom-end"
    >
      <MenuHandler>
        <div className="flex items-center justify-center w-8 h-8 flex-shrink-0 overflow-hidden cursor-pointer">
          <Image
            src={"/svg/icons/appsIcon.svg"}
            alt="Logo de ventanilla"
            width={32}
            height={32}
            className="object-cover w-full h-full p-0 m-0 block"
          />
        </div>
      </MenuHandler>
      <MenuList className=" no-hover-effects max-w-screen-xl rounded-xl p-5 w-[350px] max-h-[517.56px] overflow-y-auto lg:flex flex-col z-50">
        <div className="relative -space-y-2 md:-space-y-4 flex flex-col -mb-4 flex-shrink">
          <div onClick={(e) => e.stopPropagation()} className="relative">
            <button
              className="flex items-center justify-between w-full cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setIsMenuOpen(false);
              }}
            >
              <span className="flex-grow text-start whitespace-nowrap overflow-hidden text-ellipsis text-lg font-extrabold text-blue-950">
                Enlaces de Interés
              </span>
              <XMarkIcon className="h-4 w-4 text-red-600 hover:text-red-800 cursor-pointer absolute  -top-2 -right-2" />
            </button>
            <ToolsMenuCollapse
              title={"Portales"}
              defaultOpen={true}
              content={portalsListItems}
            />
          </div>
          <div onClick={(e) => e.stopPropagation()}>
            <ToolsMenuCollapse
              title={"Ventanillas"}
              content={ventanillaListItems}
            />
          </div>
        </div>
      </MenuList>
    </Menu>
  );
}
