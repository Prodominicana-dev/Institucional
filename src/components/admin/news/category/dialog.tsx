"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { Stepper, Step } from "@material-tailwind/react";
import { createDirection } from "@/services/structure-organizational/service";
import {
  ExclamationCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { createNewsCategory } from "@/services/news/categories/service";
import { HashLoader } from "react-spinners";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export function NewsCategoriesDialog({
  open,
  handler,
  update,
}: {
  open: boolean;
  handler: () => void;
  update: () => void;
}) {
  const { user } = useUser();
  const [nameEs, setNameEs] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [warning, setWarning] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);

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
      if (activeStep === 0 && nameEs === "") {
        return setWarning(true);
      }

      if (activeStep === 1 && nameEn === "") {
        return setWarning(true);
      }

      !isLastStep && handleNext();
      if (isLastStep) {
        setIsLoading(true);
        const data = {
          nameEs,
          nameEn,
          created_By: user?.email,
        };
        await createNewsCategory(data, update, user?.sub as string);
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
            Nombre <span className="text-red-600">*</span>
          </label>
          <Input
            crossOrigin={""}
            id="nameEs"
            className="w-full"
            onChange={(e) => setNameEs(e.target.value)}
            value={nameEs}
            placeholder="Nombre de la categoría"
          />
          <label
            htmlFor="nameEs"
            className={`${
              warning ? "block" : "hidden"
            } text-red-600 text-sm flex items-center gap-2`}
          >
            <ExclamationCircleIcon className="size-5" />
            El nombre es obligatorio.
          </label>
        </div>
      ),
    },
    {
      step: 2,
      section: (
        <div className="flex flex-col w-full space-y-4">
          <label
            htmlFor="nameEn"
            className="font-light text-black text-sm flex gap-2"
          >
            <InformationCircleIcon className="size-5" /> Debes agregar el mismo
            contenido de la página anterior, pero en inglés, para la traducción
            de toda la página.
          </label>
          <label htmlFor="nameEn" className="font-semibold text-black text-lg">
            Nombre en inglés <span className="text-red-600">*</span>
          </label>
          <Input
            crossOrigin={""}
            id="nameEn"
            className="w-full"
            onChange={(e) => setNameEn(e.target.value)}
            value={nameEn}
            placeholder="Nombre de la categoría en inglés"
          />
          <label
            htmlFor="nameEn"
            className={`${
              warning ? "block" : "hidden"
            } text-red-600 text-sm flex items-center gap-2`}
          >
            <ExclamationCircleIcon className="size-5" />
            El nombre es obligatorio.
          </label>
        </div>
      ),
    },
  ];

  return (
    <Dialog open={open} onOpenChange={handler}>
      <DialogContent className="flex flex-col font-montserrat space-y-4 overflow-y-auto no-scrollbar">
        <DialogHeader className="font-semibold flex flex-col font-montserrat items-start gap-2">
          <DialogTitle className="text-black text-2xl">
            Crear categoría de noticias
          </DialogTitle>
          <Stepper
            activeStep={activeStep}
            isLastStep={(value) => setIsLastStep(value)}
            isFirstStep={(value) => setIsFirstStep(value)}
          >
            {steps.map((step, index) => (
              <Step
                key={index}
                className="font-montserrat text-white font-black text-lg bg-black cursor-pointer"
                activeClassName="bg-blue-dark"
                completedClassName="bg-black"
              >
                {step.step}
              </Step>
            ))}
          </Stepper>
        </DialogHeader>
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
        <DialogFooter className="space-x-4 font-montserrat">
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
            {isLastStep ? isLoading ? <HashLoader /> : "Guardar" : "Siguiente"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
