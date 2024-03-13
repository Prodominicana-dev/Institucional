"use client";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import { Collapse } from "@material-tailwind/react";
import Link from "next/link";
import CollapseLink from "./collapse-link";
import { useSection } from "@/services/section/service";
import CollapseMenu from "./collapse-menu";
import CollapseDocs from "./collapse-docs";

export default function TransparencyMenuMobile() {
  const [title, setTitle] = useState("Menú de Transparencia");
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useSection();
  const [sections, setSections] = useState([]);
  useEffect(() => {
    if (!isLoading) {
      setSections(data);
      console.log(data);
    }
  }, [data, isLoading]);
  const toggleOpen = () => setOpen((cur) => !cur);

  return (
    <div className="w-11/12 lg:hidden space-y-2">
      <button
        onClick={toggleOpen}
        className="w-full py-3 border-2 border-gray-300 rounded-lg px-4 flex justify-between items-center"
      >
        <p className="text-black text-lg font-bold font-montserrat">{title}</p>
        <ChevronRightIcon
          className={`size-6 ${open ? "transform rotate-90" : ""} duration-300`}
        />
      </button>
      <Collapse open={open}>
        <div className="w-full flex flex-col items-center">
          <CollapseLink
            title={"Inicio"}
            link={"/transparency"}
            openNewPage={false}
          />
          {sections?.map((section: any, index) => (
            <div key={index} className="w-full flex justify-center">
              {section.type === "url" && (
                <CollapseLink title={section.name} link={section.url} />
              )}
              {section.type === "" && (
                <CollapseMenu
                  title={section.name}
                  subsections={section.subsection}
                  id={section.id}
                />
              )}
              {section.type === "document" && (
                <CollapseDocs title={section.name} id={section.id} />
              )}
            </div>
          ))}
        </div>
      </Collapse>
    </div>
  );
}
