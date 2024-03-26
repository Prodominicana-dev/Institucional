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
  ExclamationCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import DragNDrop from "../tools/dropzone/dropzone";
import {
  createGallery,
  editGallery,
  useGalleryById,
} from "@/services/gallery/service";

export function GalleryEditDialog({
  id,
  open,
  handler,
  update,
}: {
  id: string;
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
  const { data, isLoading: datLoading } = useGalleryById(id);

  useEffect(() => {
    if (data && !datLoading) {
      setTitleEs(data.title);
      setTitleEn(data.titleEn);
      setImage(data.cover);
    }
  }, [data, datLoading]);

  const openRef = useRef<() => void>(null);

  const handleNext = () => {
    !isLastStep && setActiveStep((cur) => cur + 1);
    setWarning(false);
  };
  const handlePrev = () => {
    !isFirstStep && setActiveStep((cur) => cur - 1);
    setWarning(false);
  };

  const handleDrop = (acceptedFiles: FileWithPath[]) => {
    setImage(acceptedFiles[0].name);
    setFiles(acceptedFiles);
  };

  const handleSubmit = async () => {
    if (!isLoading) {
      if (activeStep === 0 && titleEs === "") {
        return setWarning(true);
      }

      if (activeStep === 1 && titleEn === "") {
        return setWarning(true);
      }

      !isLastStep && handleNext();
      if (isLastStep) {
        const formData = new FormData();
        setIsLoading(true);
        formData.append("title", titleEs);
        formData.append("titleEn", titleEn);
        formData.append("cover", image);
        formData.append("created_By", user?.email as string);
        if (files.length > 0) formData.append("images", files[0] as any);
        if (imagesRelated.length > 0)
          imagesRelated.forEach((image: any) =>
            formData.append("images", image as any)
          );
        await editGallery(id, formData, update, user?.sub as string);
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
            Título <span className="text-red-600">*</span>
          </label>
          <Input
            crossOrigin={""}
            id="nameEs"
            className="w-full"
            onChange={(e) => setTitleEs(e.target.value)}
            value={titleEs}
            placeholder="Título de la galería"
          />
          <label
            htmlFor="nameEs"
            className={`${
              warning && !titleEs ? "block" : "hidden"
            } text-red-600 text-sm`}
          >
            <ExclamationCircleIcon className="size-5 inline-block" /> El título
            de la galería es obligatorio.
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
            Título en inglés <span className="text-red-600">*</span>
          </label>
          <Input
            crossOrigin={""}
            id="nameEn"
            className="w-full"
            onChange={(e) => setTitleEn(e.target.value)}
            value={titleEn}
            placeholder="Título de la galería"
          />
          <label
            htmlFor="nameEn"
            className={`${
              warning && !titleEn ? "block" : "hidden"
            } text-red-600 text-sm`}
          >
            <ExclamationCircleIcon className="size-5 inline-block" /> El título
            de la galería en inglés es obligatorio.
          </label>
        </div>
      ),
    },
    {
      step: 3,
      section: (
        <div className="flex flex-col w-full space-y-4 max-h-[60vh] overflow-auto">
          <label className="font-semibold text-black text-lg">
            Portada de la galería
          </label>
          <label
            className={` text-black text-sm text-start flex items-start gap-1 w-11/12`}
          >
            <ExclamationCircleIcon className="size-5 text-sm inline-block" /> La
            imagen debe ser .JPG, .PNG o .JPEG y no debe pesar más de 2MB.
          </label>
          <div className="w-full h-[30vh] relative flex justify-center items-center group">
            {files?.length > 0 ? (
              <button
                onClick={() => openRef.current?.()}
                className="w-full h-full z-10 absolute flex justify-center items-center group"
              >
                <Image
                  src={URL.createObjectURL(files[0])} // Use the preview URL directly
                  alt=""
                  width="500"
                  height="500"
                  className="w-full h-full absolute rounded-lg object-cover group-hover:blur-[2px] group-hover:opacity-40 duration-300" // Add bg-white for visibility
                />
              </button>
            ) : (
              <button
                onClick={() => openRef.current?.()}
                className="w-full h-full z-10 absolute flex justify-center items-center group"
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/gallery/${id}/img/${image}`} // Use the preview URL directly
                  alt=""
                  width="500"
                  height="500"
                  className="w-full h-full absolute rounded-lg object-cover group-hover:blur-[2px] group-hover:opacity-40 duration-300" // Add bg-white for visibility
                />
              </button>
            )}

            <Dropzone
              multiple={false}
              openRef={openRef}
              onDrop={handleDrop}
              accept={["image/png", "image/jpeg"]} // Ensure only images are accepted
              activateOnClick={true}
              className="w-full h-full border-dashed hover:border-double bg-transparent hover:bg-gray-100 hover:text-blue-dark hover:border-gray-100 duration-300 border-2 rounded-lg border-gray-200 flex justify-center items-center"
            >
              <button
                onClick={() => openRef.current?.()}
                className="w-full h-full"
              >
                Seleccione una imagen
              </button>
            </Dropzone>
          </div>
          <label
            className={`${
              warning && !image ? "block" : "hidden"
            } text-red-600 text-sm text-start flex items-start gap-1 w-11/12`}
          >
            <ExclamationCircleIcon className="size-5 inline-block" /> La imagen
            es obligatoria.
          </label>
          <div className="w-full flex flex-col gap-5">
            <label className="font-semibold text-black text-lg">
              Imágenes de la galería
            </label>
            <label
              htmlFor="nameEn"
              className="font-light text-black text-sm flex gap-2"
            >
              <InformationCircleIcon className="size-5" /> No es obligatorio
              agregar las imágenes de la galería en este paso, pero si deseas
              hacerlo, puedes arrastrar las imágenes aquí.
            </label>
            <DragNDrop data={imagesRelated} setData={setImagesRelated} />
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
          Agregar galería de fotos
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
