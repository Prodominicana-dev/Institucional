"use client";
import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Tooltip,
  Input,
  Textarea,
  Popover,
  PopoverHandler,
  PopoverContent,
  Typography,
  Chip,
  Spinner,
} from "@material-tailwind/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Montserrat } from "next/font/google";
const monserratStyle = Montserrat({ subsets: ["latin"] });

export default function SectionPopover({
  openPopover,
  handleOpen,
  sectionName,
  setSectionName,
  sectionDescription,
  setSectionDescription,
  sectionLoading,
  handleSectionSubmit,
  sectionTriggers,
}: {
  openPopover: boolean;
  handleOpen: any;
  sectionName: string;
  setSectionName: any;
  sectionDescription: string;
  setSectionDescription: any;
  sectionLoading: boolean;
  handleSectionSubmit: any;
  sectionTriggers: any;
}) {
  return (
    <Popover open={openPopover} handler={handleOpen} placement="bottom">
      <PopoverHandler {...sectionTriggers}>
        <div
          style={monserratStyle.style}
          className="w-2/12 h-10 bg-blue-dark rounded-lg text-white flex items-center justify-center hover:cursor-pointer"
        >
          <PlusIcon className="w-7 h-7" />{" "}
        </div>
      </PopoverHandler>
      <PopoverContent
        placeholder={""}
        {...sectionTriggers}
        className="z-[9999] w-96 flex flex-col space-y-4 p-4 bg-white rounded-xl shadow-xl"
      >
        <div style={monserratStyle.style} className="flex flex-col w-full">
          <label htmlFor="name" className="font-semibold text-black text-lg">
            Nombre
          </label>
          <Input
            crossOrigin={""}
            id="name"
            className="w-full"
            onChange={(e) => setSectionName(e.target.value)}
            placeholder="Nombre de la sección"
          />
        </div>
        <div style={monserratStyle.style} className="flex flex-col w-full">
          <label htmlFor="name" className="font-semibold text-black text-lg">
            Descripción <span className="font-normal text-xs italic">(?)</span>
          </label>
          <Textarea
            size="md"
            onChange={(e) => setSectionDescription(e.target.value)}
          />
        </div>
        <label
          style={monserratStyle.style}
          className="text-black text-xs font-light italic text-right"
        >
          (?) = Opcional
        </label>
        <button
          disabled={!sectionName}
          onClick={handleSectionSubmit}
          className="w-full h-12 hover:bg-white border-2 border-blue-dark hover:text-blue-dark duration-300 hover:shadow-md bg-blue-dark rounded-lg text-white justify-center items-center flex"
        >
          {sectionLoading ? <Spinner className="w-7 h-7" /> : "Agregar"}
        </button>
      </PopoverContent>
    </Popover>
  );
}
