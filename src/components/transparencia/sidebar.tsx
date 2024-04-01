"use client";
import React from "react";
import SidebarLink from "./sidebar-link";
import SidebarMenu from "./sidebar-menu";
import SidebarDocs from "./sidebar-docs";

export default function TransparencySidebar({ sections }: { sections: any }) {
  return (
    <div className="hidden lg:flex w-full h-full bg-blue-dark flex-col gap-2 rounded-lg items-center p-5">
      <SidebarLink
        title={"Inicio"}
        link={"/transparency"}
        openNewPage={false}
      />
      {sections?.map((section: any, index: number) => (
        <div key={index} className="w-full flex justify-center">
          {section.type === "url" && (
            <SidebarLink title={section.name} link={section.url} />
          )}
          {section.type === "" && (
            <SidebarMenu
              title={section.name}
              subsections={section.subsection}
              id={section.id}
            />
          )}
          {section.type === "document" && (
            <SidebarDocs title={section.name} id={section.id} />
          )}
        </div>
      ))}
    </div>
  );
}
