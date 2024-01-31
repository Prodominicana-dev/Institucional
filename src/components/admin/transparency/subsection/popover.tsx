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
import { Section } from "@/models/section";
const monserratStyle = Montserrat({ subsets: ["latin"] });

export default function SubsectionPopover({
  openPopover,
  handleOpen,
  subsectionName,
  setSubsectionName,
  subsectionDescription,
  setSubsectionDescription,
  subsectionLoading,
  handleSubsectionSubmit,
  subsectionTriggers,
  sectionId,
}: {
  openPopover: boolean;
  handleOpen: any;
  subsectionName: string;
  setSubsectionName: any;
  subsectionDescription: string;
  setSubsectionDescription: any;
  subsectionLoading: boolean;
  handleSubsectionSubmit: any;
  subsectionTriggers: any;
  sectionId: string;
}) {
  return (
    <Popover open={openPopover} handler={handleOpen} placement="bottom">
      <PopoverHandler {...subsectionTriggers}>
        <div
          style={monserratStyle.style}
          className="w-full h-10 bg-blue-dark rounded-lg text-white flex items-center justify-center hover:cursor-pointer"
        >
          <PlusIcon className="w-7 h-7" />{" "}
        </div>
      </PopoverHandler>
      <PopoverContent
        placeholder={undefined}
        {...subsectionTriggers}
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
            onChange={(e) => setSubsectionName(e.target.value)}
            placeholder="Nombre de la sección"
          />
        </div>
        <div style={monserratStyle.style} className="flex flex-col w-full">
          <label htmlFor="name" className="font-semibold text-black text-lg">
            Descripción <span className="font-normal text-xs italic">(?)</span>
          </label>
          <Textarea
            size="md"
            onChange={(e) => setSubsectionDescription(e.target.value)}
          />
        </div>
        <label
          style={monserratStyle.style}
          className="text-black text-xs font-light italic text-right"
        >
          (?) = Opcional
        </label>
        <button
          disabled={!subsectionName}
          onClick={handleSubsectionSubmit}
          className="w-full h-12 hover:bg-white border-2 border-blue-dark hover:text-blue-dark duration-300 hover:shadow-md bg-blue-dark rounded-lg text-white justify-center items-center flex"
        >
          {subsectionLoading ? <Spinner className="w-7 h-7" /> : "Agregar"}
        </button>
      </PopoverContent>
    </Popover>
  );
}
