"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Spinner,
} from "@material-tailwind/react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Stepper, Step } from "@material-tailwind/react";
import { createDirection } from "@/services/structure-organizational/service";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
export function InvestmentDialog({
  investment,
  open,
  handler,
  update,
}: {
  investment: any;
  open: boolean;
  handler: () => void;
  update: () => void;
}) {
  return (
    <>
      <Dialog
        placeholder={undefined}
        open={open}
        handler={handler}
        className="p-2 "
      >
        <DialogHeader
          placeholder={undefined}
          className="font-semibold flex flex-col font-montserrat"
        >
          Agregar dirección
        </DialogHeader>

        <DialogBody
          placeholder={undefined}
          className="flex flex-col font-montserrat space-y-4 overflow-y-auto no-scrollbar"
        >
          a
        </DialogBody>
      </Dialog>
    </>
  );
}
