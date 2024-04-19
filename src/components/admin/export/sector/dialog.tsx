"use client";
import React, { useEffect, useRef, useState } from "react";
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
import {
  createDirection,
  useDirections,
} from "@/services/structure-organizational/service";
import {
  ExclamationCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import Select from "react-select";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { createMember } from "@/services/structure-organizational/members/service";
import axios from "axios";
import { createProduct } from "@/services/export/product/service";
import { createSector } from "@/services/export/sector/service";

export function SectorDialog({
  open,
  handler,
  update,
}: {
  open: boolean;
  handler: () => void;
  update: () => void;
}) {
  const { user } = useUser();
  const [name, setName] = useState("");
  const [alias, setAlias] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [aliasEn, setAliasEn] = useState("");
  const [code, setCode] = useState("");
  const [warning, setWarning] = useState(false);
  const [codeLoading, setCodeLoading] = useState(false);
  const [codeWarning, setCodeWarning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);

  useEffect(() => {
    if (code.length > 0) {
      (async () => {
        setCodeLoading(true);
        const url = `${process.env.NEXT_PUBLIC_API_URL}/sector/${code}`;
        const { data } = await axios.get(url);
        data && setCodeWarning(true);
        data === "" && setCodeWarning(false);
        setCodeLoading(false);
      })();
    } else {
      setCodeWarning(false);
    }
  }, [code]);

  const openRef = useRef<() => void>(null);

  const handleNext = () => {
    !isLastStep && setActiveStep((cur) => cur + 1);
    setWarning(false);
  };
  const handlePrev = () => {
    !isFirstStep && setActiveStep((cur) => cur - 1);
    setWarning(false);
  };

  const handleSubmit = async () => {
    if (!isLoading) {
      if (activeStep === 0 && (name === "" || code === "" || codeWarning)) {
        return setWarning(true);
      }
      if (activeStep === 1 && nameEn === "") {
        return setWarning(true);
      }

      !isLastStep && handleNext();
      if (isLastStep) {
        const data = {
          code,
          name,
          alias,
          nameEn,
          aliasEn,
        };

        await createSector(data, update, user?.sub as string);
        setIsLoading(false);
        handler();
      }
    }
  };

  const steps = [
    {
      step: 1,
      section: (
        <div className="flex flex-col w-full space-y-4">
          <label htmlFor="nameEs" className="font-semibold text-black text-lg">
            Capítulo <span className="text-red-600">*</span>
          </label>
          <Input
            // disabled={codeLoading}
            crossOrigin={""}
            id="nameEs"
            className={`w-full ${
              codeWarning ? "text-red-600" : "text-black"
            } duration-150`}
            onChange={(e) => setCode(e.target.value)}
            value={code}
            placeholder="Capítulo del sector"
          />
          <label
            htmlFor="nameEs"
            className={`${
              codeWarning ? "block" : "hidden"
            } text-red-600 text-sm`}
          >
            <ExclamationCircleIcon className="size-5 inline-block" /> El
            capítulo {'"'}
            {code}
            {'"'} ya existe.
          </label>
          <label
            htmlFor="nameEs"
            className={`${
              warning && !code ? "block" : "hidden"
            } text-red-600 text-sm`}
          >
            <ExclamationCircleIcon className="size-5 inline-block" /> El
            capítulo es obligatorio.
          </label>
          <label htmlFor="nameEs" className="font-semibold text-black text-lg">
            Nombre <span className="text-red-600">*</span>
          </label>
          <Input
            crossOrigin={""}
            id="nameEs"
            className="w-full"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Nombre del capítulo"
          />
          <label
            htmlFor="nameEs"
            className={`${
              warning && !name ? "block" : "hidden"
            } text-red-600 text-sm`}
          >
            <ExclamationCircleIcon className="size-5 inline-block" /> El nombre
            es obligatorio.
          </label>
          <label htmlFor="nameEs" className="font-semibold text-black text-lg">
            Alias
          </label>
          <Input
            crossOrigin={""}
            id="nameEs"
            className="w-full"
            onChange={(e) => setAlias(e.target.value)}
            value={alias}
            placeholder="Alias del capítulo"
          />
        </div>
      ),
    },
    {
      step: 2,
      section: (
        <div className="flex flex-col w-full space-y-4 max-h-[60vh] overflow-auto">
          <label htmlFor="nameEs" className="font-semibold text-black text-lg">
            Nombre en inglés <span className="text-red-600">*</span>
          </label>
          <Input
            crossOrigin={""}
            id="nameEs"
            className="w-full"
            onChange={(e) => setNameEn(e.target.value)}
            value={nameEn}
            placeholder="Nombre del capítulo en inglés"
          />
          <label
            htmlFor="nameEs"
            className={`${
              warning && !name ? "block" : "hidden"
            } text-red-600 text-sm`}
          >
            <ExclamationCircleIcon className="size-5 inline-block" /> El nombre
            en inglés es obligatorio.
          </label>
          <label htmlFor="nameEs" className="font-semibold text-black text-lg">
            Alias en inglés
          </label>
          <Input
            crossOrigin={""}
            id="nameEs"
            className="w-full"
            onChange={(e) => setAliasEn(e.target.value)}
            value={aliasEn}
            placeholder="Alias del capítulo en inglés"
          />
        </div>
      ),
    },
  ];

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
          className="font-semibold flex flex-col items-start gap-1 font-montserrat"
        >
          Agregar sector
          <Stepper
            placeholder={undefined}
            activeStep={activeStep}
            isLastStep={(value) => setIsLastStep(value)}
            isFirstStep={(value) => setIsFirstStep(value)}
          >
            {steps.map((step, index) => (
              <>
                <Step
                  key={index}
                  placeholder={undefined}
                  className="font-montserrat text-white font-black text-lg bg-blue-dark cursor-pointer"
                >
                  {step.step}
                </Step>
              </>
            ))}
          </Stepper>
        </DialogHeader>

        <DialogBody
          placeholder={undefined}
          className="flex flex-col font-montserrat space-y-4 overflow-y-auto no-scrollbar"
        >
          <form action={handleSubmit}>
            {steps.map((step, index) => (
              <div
                key={index}
                className={`${
                  activeStep === index ? "block" : "hidden"
                } flex flex-col gap-3 w-full h-full`}
              >
                {step.section}
              </div>
            ))}
          </form>
        </DialogBody>
        <DialogFooter
          placeholder={undefined}
          className="space-x-4 font-montserrat"
        >
          <button
            onClick={handlePrev}
            className={`${
              isFirstStep ? "hidden" : "block"
            } w-36 h-12 bg-white border-2 border-black text-black hover:bg-black hover:text-white hover:shadow-lg duration-300 rounded-xl`}
          >
            Anterior
          </button>
          <button
            onClick={handleSubmit}
            className={`${
              isLastStep
                ? "w-36 h-12 bg-green-500 border-2 border-green-500 text-white hover:bg-white hover:text-green-500 hover:shadow-lg duration-300 rounded-xl flex items-center justify-center"
                : "w-36 h-12 bg-white border-2 border-black text-black hover:bg-black hover:text-white hover:shadow-lg duration-300 rounded-xl"
            }`}
          >
            {isLastStep ? (
              isLoading ? (
                <Spinner className="w-7 h-7" />
              ) : (
                "Guardar"
              )
            ) : (
              "Siguiente"
            )}
          </button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
