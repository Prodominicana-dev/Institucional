"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { Stepper, Step } from "@material-tailwind/react";
import { createDirection } from "@/services/structure-organizational/service";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import Day_Picker from "../tools/daypicker";
import { createSchedule } from "@/services/schedule/service";
import { HashLoader } from "react-spinners";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export function ScheduleDialog({
  open,
  handler,
  update,
}: {
  open: boolean;
  handler: () => void;
  update: () => void;
}) {
  const { user } = useUser();
  const [title, setTitle] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [date, setDate] = useState<any>();
  const today = new Date();
  const [warning, setWarning] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);

  useEffect(() => {}, [date]);

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
      if (activeStep === 0 && !title && date === undefined) {
        return setWarning(true);
      }

      if (activeStep === 1 && titleEn === "") {
        return setWarning(true);
      }

      !isLastStep && handleNext();
      if (isLastStep) {
        setIsLoading(true);
        const data = {
          title,
          titleEn,
          date,
          created_By: user?.email as string,
        };
        await createSchedule(data, update, user?.sub as string);
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
          <label htmlFor="title" className="font-semibold text-black text-lg">
            Título <span className="text-red-600">*</span>
          </label>
          <Input
            crossOrigin={""}
            id="title"
            className="w-full"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            placeholder="Nombre de la dirección"
          />
          <label
            htmlFor="title"
            className={`${
              warning && !title ? "block" : "hidden"
            } text-red-600 text-sm`}
          >
            El título es obligatorio.
          </label>
          <label htmlFor="date" className="text-lg font-semibold text-black">
            Fecha
          </label>
          <Day_Picker date={date} setDate={setDate} fromDate={today} />
          <label
            htmlFor="title"
            className={`${
              warning && date === undefined ? "block" : "hidden"
            } text-red-600 text-sm`}
          >
            La fecha es obligatoria.
          </label>
        </div>
      ),
    },
    {
      step: 2,
      section: (
        <div className="flex flex-col w-full space-y-4">
          <label
            htmlFor="titleEn"
            className="font-light text-black text-sm flex gap-2"
          >
            <InformationCircleIcon className="size-5" /> Debes agregar el mismo
            contenido de la página anterior, pero en inglés, para la traducción
            de toda la página.
          </label>
          <label htmlFor="titleEn" className="font-semibold text-black text-lg">
            Título en inglés <span className="text-red-600">*</span>
          </label>
          <Input
            crossOrigin={""}
            id="titleEn"
            className="w-full"
            onChange={(e) => setTitleEn(e.target.value)}
            value={titleEn}
            placeholder="Nombre de la dirección en inglés"
          />
          <label
            htmlFor="titleEn"
            className={`${
              warning && !titleEn ? "block" : "hidden"
            } text-red-600 text-sm`}
          >
            El título en inglés es obligatorio.
          </label>
        </div>
      ),
    },
  ];

  return (
    <Dialog open={open} onOpenChange={handler}>
      <DialogContent className="font-montserrat overflow-y-auto no-scrollbar">
        <DialogTitle className="text-black font-semibold text-2xl">
          Agregar evento a la agenda
        </DialogTitle>
        <DialogHeader className="font-semibold flex flex-col items-start gap-4 font-montserrat">
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
