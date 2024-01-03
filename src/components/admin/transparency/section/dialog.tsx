"use client";
import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Tooltip,
  Input,
  Textarea,
} from "@material-tailwind/react";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import { Montserrat } from "next/font/google";
import { Group, Text, rem } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { Dropzone, FileWithPath } from "@mantine/dropzone";
import { XMarkIcon } from "@heroicons/react/24/solid";
const monserratStyle = Montserrat({ subsets: ["latin"] });
const colourOptions = [
  { value: "ocean", label: "Ocean" },
  { value: "blue", label: "Blue" },
  { value: "purple", label: "Purple" },
  { value: "red", label: "Red" },
  { value: "orange", label: "Orange" },
  { value: "yellow", label: "Yellow" },
  { value: "ocean", label: "Ocean" },
  { value: "blue", label: "Blue" },
  { value: "purple", label: "Purple" },
  { value: "red", label: "Red" },
  { value: "orange", label: "Orange" },
  { value: "yellow", label: "Yellow" },
  { value: "ocean", label: "Ocean" },
  { value: "blue", label: "Blue" },
  { value: "purple", label: "Purple" },
  { value: "red", label: "Red" },
  { value: "orange", label: "Orange" },
  { value: "yellow", label: "Yellow" },
];

const typeOptions = [
  { value: "document", label: "Documento" },
  { value: "url", label: "URL" },
];
export function SectionDialog({
  open,
  handler,
}: {
  open: boolean;
  handler: () => void;
}) {
  return (
    <>
      <Dialog
        placeholder={false}
        open={open}
        handler={handler}
        className="p-2 "
      >
        <DialogHeader
          placeholder={false}
          className="font-semibold "
          style={monserratStyle.style}
        >
          Agregar sección
        </DialogHeader>
        <DialogBody
          placeholder={false}
          className="flex flex-col space-y-4 overflow-y-auto no-scrollbar min-h-[40vh] max-h-[75vh]"
          style={monserratStyle.style}
        >
          <div className="flex flex-col w-full">
            <label htmlFor="name" className="font-semibold text-black text-lg">
              Nombre
            </label>
            <Input
              crossOrigin={""}
              id="name"
              className="w-full"
              placeholder="Nombre de la sección"
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="name" className="font-semibold text-black text-lg">
              Descripción{" "}
              <span className="font-normal text-xs italic">(?)</span>
            </label>
            <Textarea size="md" />
          </div>
          <label className="text-black text-xs font-light italic text-right">
            (?) = Opcional
          </label>
        </DialogBody>
        <DialogFooter
          placeholder={false}
          style={monserratStyle.style}
          className="space-x-4"
        >
          <button
            onClick={handler}
            className="w-36 h-12 bg-white border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white hover:shadow-lg duration-300 rounded-xl"
          >
            Cancelar
          </button>
          <button
            onClick={handler}
            className="w-36 h-12 bg-green-500 border-2 border-green-500 text-white hover:bg-white hover:text-green-500 hover:shadow-lg duration-300 rounded-xl"
          >
            Confirmar
          </button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
