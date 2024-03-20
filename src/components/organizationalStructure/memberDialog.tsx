"use client";
import { Dialog, DialogBody } from "@material-tailwind/react";
import React from "react";
import Image from "next/image";

interface props {
  member: any;
  open: boolean;
  handleOpen: () => void;
}

export default function MemberDialog({ member, open, handleOpen }: props) {
  return (
    <Dialog
      open={open}
      handler={handleOpen}
      size="md"
      placeholder={undefined}
      className="h-[90vh] py-10  overflow-auto no-scrollbar"
    >
      <DialogBody
        placeholder={undefined}
        className="flex flex-col items-center gap-5"
      >
        <div className="flex flex-col gap-5 justify-center items-center">
          <Image
            width={1000}
            height={1000}
            alt="emp"
            src={"/images/EdgarEspinal.jpg"}
            className="rounded-full object-cover w-48 aspect-square"
          />
          <div className="text-center">
            <h1 className="text-sm xl:text-3xl font-bold text-blue-dark">
              {member.name}
            </h1>
            <p className="text-xs xl:text-xl text-gray-400">{member.role}</p>
          </div>
        </div>
        <div className="w-10/12 flex flex-col gap-3">
          <h1 className="text-2xl border-b-2 font-bold text-blue-dark border-blue-dark">
            Normativa
          </h1>
          <p className="text-black">{member.regulation}</p>
        </div>
        <div className="w-10/12 flex flex-col gap-3">
          <h1 className="text-2xl border-b-2 font-bold text-blue-dark border-blue-dark">
            Funciones
          </h1>
          <ol className="text-black list-inside list-disc space-y-2">
            {member.functions.map((func: string, index: number) => (
              <li key={index}>{func}</li>
            ))}
          </ol>
        </div>
      </DialogBody>
    </Dialog>
  );
}
