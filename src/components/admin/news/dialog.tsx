"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Tooltip,
  Input,
  Textarea,
  Spinner,
  Switch,
} from "@material-tailwind/react";
import { Stepper, Step, Typography } from "@material-tailwind/react";
import {
  CogIcon,
  UserIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/outline";
import { createSection } from "@/services/section/service";
import { useUser } from "@auth0/nextjs-auth0/client";
import Select from "react-select";
import { Montserrat } from "next/font/google";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { set } from "date-fns";
import { FileWithPath } from "@mantine/dropzone";
import { createDocument } from "@/services/document/service";
import Editor from "../tools/rich-editor/config";
import TextEditor from "../tools/rich-editor/rich-editor";
import DropzoneImpl from "../transparency/document/dropzone";
import { XMarkIcon } from "@heroicons/react/24/solid";

export function NewsDialog({
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
  const [description] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);

  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

  const editorSpanish = Editor({
    placeholder: "Cuerpo de la noticia",
    content: description ? description : "",
  });

  const editorEnglish = Editor({
    placeholder: "News body",
    content: description ? description : "",
  });

  const steps = [
    {
      step: 1,
      section: (
        <div className={`flex flex-col gap-3`}>
          <div className="flex flex-col w-full">
            <label className="text-gray-700 text-xs font-light italic text-center">
              <InformationCircleIcon className="w-4 h-4 inline-block" /> Tienes
              que digitar la misma noticia, pero en inglés.
            </label>
            <label htmlFor="title" className="font-semibold text-black text-lg">
              Título <span className="text-bold text-red-700">*</span>
            </label>
            <Input
              crossOrigin={""}
              id="title"
              className="w-full"
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Título de la noticia"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-black text-lg">
              Cuerpo de la noticia{" "}
              <span className="text-bold text-red-700">*</span>
            </label>
            <TextEditor editor={editorSpanish} number={30} />
          </div>
        </div>
      ),
    },
    {
      step: 2,
      section: (
        <div className={`flex flex-col gap-3`}>
          <div className="flex flex-col w-full">
            <label className="text-gray-700 text-xs font-light italic text-center">
              <InformationCircleIcon className="w-4 h-4 inline-block" /> Tienes
              que digitar la misma noticia, pero en inglés.
            </label>
            <label htmlFor="title" className="font-semibold text-black text-lg">
              Title
            </label>
            <Input
              crossOrigin={""}
              id="title"
              className="w-full"
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Título de la noticia"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-black text-lg">
              News body
            </label>
            <TextEditor editor={editorEnglish} number={30} />
          </div>
        </div>
      ),
    },
    {
      step: 3,
      section: <div> PERRA </div>,
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
          className="font-black text-black font-montserrat flex flex-col gap-5"
        >
          <div className="w-full flex justify-between items-center">
            Agrega una nueva noticia
            <button onClick={handler}>
              <XMarkIcon className="size-7 text-black" />
            </button>
          </div>
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
                  onClick={() => setActiveStep(index)}
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
          className="flex flex-col overflow-y-auto no-scrollbar min-h-[25vh] max-h-[75vh] font-montserrat"
        >
          {steps.map((step, index) => (
            <div
              key={index}
              className={`${
                activeStep === index ? "block" : "hidden"
              } flex flex-col gap-3`}
            >
              {step.section}
            </div>
          ))}
        </DialogBody>
        <DialogFooter
          placeholder={undefined}
          className="space-x-4 font-montserrat"
        >
          <button
            onClick={handler}
            className="w-36 h-12 bg-white border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white hover:shadow-lg duration-300 rounded-xl"
          >
            Cancelar
          </button>
          <button className="w-36 h-12 bg-green-500 border-2 border-green-500 text-white hover:bg-white hover:text-green-500 hover:shadow-lg duration-300 rounded-xl flex items-center justify-center">
            {submitLoading ? <Spinner className="w-7 h-7" /> : "Guardar"}
          </button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
