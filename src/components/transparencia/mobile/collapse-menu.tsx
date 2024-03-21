import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import {
  Collapse,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import React, { useState } from "react";
import MenuLink from "../menu/menu-link";
import MenuDocs from "../menu/menu-docs";
import CollapseLink from "./collapse-link";
import CollapseMenuDocs from "./menu/menu-docs";
import CollapseMenuLink from "./menu/menu-link";

export default function CollapseMenu({
  title,
  subsections,
  id,
}: {
  title: string;
  subsections: any;
  id: string;
}) {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen((cur) => !cur);

  return (
    <div className="w-11/12">
      <button
        onClick={toggleOpen}
        className="w-full h-14 bg-transparent hover:bg-white/30 duration-300 flex flex-row items-center justify-between rounded-lg group"
      >
        <h1 className="text-black font-montserrat ">{title}</h1>
        <ChevronRightIcon
          className={`${
            open ? "rotate-90" : "rotate-0 "
          }  duration-300 transform size-4 text-black`}
        />
      </button>
      <Collapse open={open}>
        {subsections.map((subsection: any, index: number) => (
          <>
            {subsection.type === "url" && (
              <CollapseMenuLink title={subsection.name} link={subsection.url} />
            )}
            {subsection.type === "document" && (
              <CollapseMenuDocs
                title={subsection.name}
                sectionId={id}
                subsectionId={subsection.id}
              />
            )}
          </>
        ))}
      </Collapse>
    </div>
  );
}
