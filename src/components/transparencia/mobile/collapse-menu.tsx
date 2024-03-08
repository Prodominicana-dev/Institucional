import { ChevronDownIcon } from "@heroicons/react/24/solid";
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
    <>
      <button
        onClick={toggleOpen}
        className="w-11/12 h-14 bg-transparent hover:bg-white/30 duration-300 flex flex-row items-center justify-between rounded-lg px-5 group"
      >
        <h1 className="text-white font-montserrat text-lg font-semibold">
          {title}
        </h1>
        <ChevronDownIcon
          className={`${
            open ? "rotate-90" : "rotate-0 "
          } group-hover:-rotate-90 duration-300 transform size-6 text-white`}
        />
      </button>
      <Collapse open={open}>
        {subsections.map((subsection: any, index: number) => (
          <>
            {subsection.type === "url" && (
              <MenuLink title={subsection.name} link={subsection.url} />
            )}
            {subsection.type === "document" && (
              <MenuDocs
                title={subsection.name}
                sectionId={id}
                subsectionId={subsection.id}
              />
            )}
          </>
        ))}
      </Collapse>
    </>
  );
}
