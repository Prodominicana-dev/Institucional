"use client";
import React, { useState, useEffect } from "react";
import SidebarLink from "./sidebar-link";
import SidebarMenu from "./sidebar-menu";
import SidebarDocs from "./sidebar-docs";
import { useSection } from "@/services/section/service";

export default function TransparencySidebar() {
  const { data, isLoading } = useSection();
  const [sections, setSections] = useState([]);
  useEffect(() => {
    if (!isLoading) {
      setSections(data);
      console.log(data);
    }
  }, [data, isLoading]);
  return (
    <div className=" hidden lg:flex w-full h-full bg-blue-dark flex-col gap-2 rounded-lg items-center p-5">
      <SidebarLink
        title={"Inicio"}
        link={"/transparency"}
        openNewPage={false}
      />
      {sections?.map((section: any, index) => (
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
      <SidebarLink
        title={"Inicio"}
        link={"/transparency"}
        openNewPage={false}
      />
      <SidebarLink
        title={"Inicio"}
        link={"/transparency"}
        openNewPage={false}
      />
      <SidebarLink
        title={"Inicio"}
        link={"/transparency"}
        openNewPage={false}
      />
      <SidebarLink
        title={"Inicio"}
        link={"/transparency"}
        openNewPage={false}
      />
      <SidebarLink
        title={"Inicio"}
        link={"/transparency"}
        openNewPage={false}
      />
      <SidebarLink
        title={"Inicio"}
        link={"/transparency"}
        openNewPage={false}
      />
      <SidebarLink
        title={"Inicio"}
        link={"/transparency"}
        openNewPage={false}
      />
      <SidebarLink
        title={"Inicio"}
        link={"/transparency"}
        openNewPage={false}
      />
      <SidebarLink
        title={"Inicio"}
        link={"/transparency"}
        openNewPage={false}
      />
      <SidebarLink
        title={"Inicio"}
        link={"/transparency"}
        openNewPage={false}
      />
      <SidebarLink
        title={"Inicio"}
        link={"/transparency"}
        openNewPage={false}
      />
      <SidebarLink
        title={"Inicio"}
        link={"/transparency"}
        openNewPage={false}
      />
      <SidebarLink
        title={"Inicio"}
        link={"/transparency"}
        openNewPage={false}
      />
      <SidebarLink
        title={"Inicio"}
        link={"/transparency"}
        openNewPage={false}
      />
      <SidebarLink
        title={"Inicio"}
        link={"/transparency"}
        openNewPage={false}
      />
      <SidebarLink
        title={"Inicio"}
        link={"/transparency"}
        openNewPage={false}
      />
      <SidebarLink
        title={"Inicio"}
        link={"/transparency"}
        openNewPage={false}
      />
      <SidebarLink
        title={"Inicio"}
        link={"/transparency"}
        openNewPage={false}
      />
    </div>
  );
}
