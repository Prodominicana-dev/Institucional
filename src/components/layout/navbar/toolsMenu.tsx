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
        <Image
          alt=""
          width={50}
          height={50}
          src={"/svg/icons/appsIcon.svg"}
          className="w-12 cursor-pointer"
        />
      </MenuHandler>
      <MenuList
        placeholder={undefined}
        className="hidden max-w-screen-xl rounded-xl lg:block p-5 w-3/12 max-h-[70vh] overflow-y-auto"
      >
        <ToolsMenuCollapse
          title={"Portales"}
          defaultOpen={true}
          content={portalsListItems}
        />
        <ToolsMenuCollapse
          title={"Ventanillas"}
          content={ventanillaListItems}
        />
      </MenuList>
    </Menu>
  );
}
