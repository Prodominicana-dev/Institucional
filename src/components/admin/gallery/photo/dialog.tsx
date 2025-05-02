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
import { useUser } from "@auth0/nextjs-auth0";
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
import DragNDrop from "../../tools/dropzone/dropzone";
import { createGallery } from "@/services/gallery/service";
import { createPhoto } from "@/services/gallery/photo/service";

export function PhotoDialog({
  galleryId,
  open,
  handler,
  update,
}: {
  galleryId: string;
  open: boolean;
  handler: () => void;
  update: () => void;
}) {
  const { user } = useUser();
  const [titleEs, setTitleEs] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [image, setImage] = useState("");
  const [warning, setWarning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [imagesRelated, setImagesRelated] = useState<any>([]);

  const openRef = useRef<() => void>(null);

  const handleDrop = (acceptedFiles: FileWithPath[]) => {
    setImage(acceptedFiles[0].name);
    setFiles(acceptedFiles);
  };

  const handleSubmit = async () => {
    if (!isLoading && imagesRelated.length === 0) {
      return setWarning(true);
    }
    if (!isLoading && imagesRelated.length > 0) {
      const formData = new FormData();
      setIsLoading(true);
      formData.append("galleryId", galleryId);
      formData.append("created_By", user?.email as string);
      if (imagesRelated.length > 0)
        imagesRelated.forEach((image: any) =>
          formData.append("images", image as any)
        );
      await createPhoto(galleryId, formData, update, user?.sub as string);
      setIsLoading(false);
      handler();
    }
  };

  const steps = [
    {
      step: 3,
      section: (
        <div className="flex flex-col w-full space-y-4 max-h-[60vh] overflow-auto">
          <div className="w-full flex flex-col gap-5">
            <label className="font-semibold text-black text-lg">
              Imágenes de la galería
            </label>

            <DragNDrop data={imagesRelated} setData={setImagesRelated} />
            {warning && imagesRelated.length === 0 && (
              <label
                htmlFor="nameEn"
                className="font-light text-red-500 text-sm flex gap-2"
              >
                <InformationCircleIcon className="size-5" /> Es obligatorio
                agregar imágenes para poder cargarlas.
              </label>
            )}
          </div>
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
          className="font-bold flex flex-col items-start gap-1 font-montserrat"
        >
          Agregar fotos a la galería
        </DialogHeader>

        <DialogBody
          placeholder={undefined}
          className="flex flex-col font-montserrat space-y-4 overflow-y-auto no-scrollbar"
        >
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
        </DialogBody>
        <DialogFooter
          placeholder={undefined}
          className="space-x-4 font-montserrat"
        >
          <button
            onClick={handleSubmit}
            className={`
              
                w-36 h-12 bg-green-500 border-2 border-green-500 text-white hover:bg-white hover:text-green-500 hover:shadow-lg duration-300 rounded-xl flex items-center justify-center
                
            `}
          >
            {isLoading ? (
              <Spinner
                className="w-7 h-7"
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              />
            ) : (
              "Guardar"
            )}
          </button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
