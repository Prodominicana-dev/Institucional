"use client";
import React, { useEffect, useRef, useState } from "react";
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
  ExclamationTriangleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { createSection } from "@/services/section/service";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Montserrat } from "next/font/google";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { set } from "date-fns";
import { FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { createDocument } from "@/services/document/service";
import Editor from "../tools/rich-editor/config";
import TextEditor from "../tools/rich-editor/rich-editor";
import DropzoneImpl from "../transparency/document/dropzone";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Dropzone } from "@mantine/dropzone";
import Image from "next/image";
import Select from "react-select";
import { is } from "date-fns/locale";
import {
  createNews,
  editNews,
  useCategoriesNews,
  useNewsById,
} from "@/services/news/service";
import { Autocomplete } from "@mantine/core";

export function NewsEditDialog({
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
  const [spanishTitle, setSpanishTitle] = useState("");
  const [spanishCategory, setSpanishCategory] = useState("");
  const [spanishDescription, setSpanishDescription] = useState("");
  const [englishTitle, setEnglishTitle] = useState("");
  const [englishCategory, setEnglishCategory] = useState("");
  const [englishDescription, setEnglishDescription] = useState("");
  const [description] = useState("");
  const [warningAlert, setWarningAlert] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [spanishCategories, setSpanishCategories] = useState([]);
  const [englishCategories, setEnglishCategories] = useState([]);
  const { data, isLoading } = useNewsById(id);
  const [image, setImage] = useState("");
  const {
    data: categories,
    refetch: categoriesRefetch,
    isLoading: categoriesLoading,
  } = useCategoriesNews();

  useEffect(() => {
    if (data && !isLoading) {
      const { es, en, image } = data;
      setSpanishTitle(es.title);
      setSpanishCategory(es.category);
      setSpanishDescription(es.description);
      setEnglishTitle(en.title);
      setEnglishCategory(en.category);
      setEnglishDescription(en.description);
      setImage(image);
    }
  }, [data, isLoading]);

  useEffect(() => {
    if (!categoriesLoading) {
      const { es, en } = categories;
      const es_options = es.map((category: any) => {
        return category.category;
      });
      console.log(es_options);
      const en_options = en.map((category: any) => {
        return category.category;
      });
      setSpanishCategories(es_options);
      setEnglishCategories(en_options);
    }
  }, [categories, categoriesLoading]);

  console.log(spanishCategories, englishCategories);
  const openRef = useRef<() => void>(null);
  const handleNext = () => {
    !isLastStep && setActiveStep((cur) => cur + 1);
    setWarningAlert(false);
  };
  const handlePrev = () => {
    !isFirstStep && setActiveStep((cur) => cur - 1);
    setWarningAlert(false);
  };

  const editorSpanish = Editor({
    placeholder: "Cuerpo de la noticia",
    content: description ? description : "",
  });

  const editorEnglish = Editor({
    placeholder: "News body",
    content: description ? description : "",
  });

  /* Funcion para cuando droppeen un documento se agregue a la lista ya existente */
  const handleDrop = (acceptedFiles: FileWithPath[]) => {
    setFiles(acceptedFiles);
    console.log(acceptedFiles);
  };

  const handleButton = async () => {
    if (
      activeStep === 0 &&
      (spanishTitle === "" ||
        spanishCategory === "" ||
        editorSpanish?.getText() === "")
    ) {
      return setWarningAlert(true);
    }

    if (
      activeStep === 1 &&
      (englishTitle === "" ||
        englishCategory === "" ||
        editorEnglish?.getText() === "")
    ) {
      return setWarningAlert(true);
    }

    !isLastStep && handleNext();

    if (isLastStep) {
      setSubmitLoading(true);
      const es_data = {
        title: spanishTitle,
        category: spanishCategory,
        description: editorSpanish?.getHTML(),
        language: "es",
      };
      const en_data = {
        title: englishTitle,
        category: englishCategory,
        description: editorEnglish?.getHTML(),
        language: "en",
      };

      const formData = new FormData();
      formData.append("es", JSON.stringify(es_data));
      formData.append("en", JSON.stringify(en_data));
      files.length > 0 && files.map((file) => formData.append("files", file));
      await editNews(id, formData, update, user?.sub as string);
      setSubmitLoading(false);
      handler();
    }
  };

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
            <div className="w-full flex gap-4">
              <div className="flex flex-col gap-2 w-6/12">
                <div>
                  <label
                    htmlFor="title"
                    className="font-semibold text-black text-lg"
                  >
                    Título <span className="text-bold text-red-700">*</span>
                  </label>
                  <Input
                    crossOrigin={""}
                    id="title"
                    className="w-full"
                    onChange={(e) => setSpanishTitle(e.target.value)}
                    value={spanishTitle}
                    placeholder="Título de la noticia"
                  />
                </div>
                <label
                  className={`${
                    warningAlert && !spanishTitle && activeStep === 0
                      ? "block"
                      : "hidden"
                  } text-red-600 text-sm text-start flex items-center gap-1`}
                >
                  <ExclamationCircleIcon className="size-5 inline-block" /> El
                  título es obligatorio.
                </label>
              </div>
              <div className="flex flex-col gap-2 w-6/12">
                <div className="w-full">
                  <label
                    htmlFor="title"
                    className="font-semibold text-black text-lg"
                  >
                    Categoría <span className="text-bold text-red-700">*</span>
                  </label>
                  <Autocomplete
                    onChange={(e) => {
                      setSpanishCategory(e);
                    }}
                    value={spanishCategory}
                    data={spanishCategories}
                  />
                </div>
                <label
                  className={`${
                    warningAlert && !spanishCategory && activeStep === 0
                      ? "block"
                      : "hidden"
                  } text-red-600 text-sm text-start flex items-center gap-1`}
                >
                  <ExclamationCircleIcon className="size-5 inline-block" /> La
                  categoría es obligatoria.
                </label>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-black text-lg">
              Cuerpo de la noticia{" "}
              <span className="text-bold text-red-700">*</span>
            </label>
            <TextEditor
              editor={editorSpanish}
              number={30}
              description={spanishDescription}
            />
          </div>
          <label
            className={`${
              warningAlert && !editorSpanish?.getText() && activeStep === 0
                ? "block"
                : "hidden"
            } text-red-600 text-sm text-start flex items-center gap-1`}
          >
            <ExclamationCircleIcon className="size-5 inline-block" /> El cuerpo
            de la noticia es obligatorio.
          </label>
        </div>
      ),
    },
    {
      step: 2,
      section: (
        <div className={`flex flex-col gap-3`}>
          <div className="flex flex-col w-full">
            <div className="w-full flex gap-4">
              <div className="flex flex-col gap-2 w-6/12">
                <div>
                  <label
                    htmlFor="title"
                    className="font-semibold text-black text-lg"
                  >
                    Title <span className="text-bold text-red-700">*</span>
                  </label>
                  <Input
                    crossOrigin={""}
                    id="title"
                    className="w-full"
                    onChange={(e) => setEnglishTitle(e.target.value)}
                    value={englishTitle}
                    placeholder="Title of the news"
                  />
                </div>
                <label
                  className={`${
                    warningAlert && !englishTitle && activeStep === 1
                      ? "block"
                      : "hidden"
                  } text-red-600 text-sm text-start flex items-center gap-1`}
                >
                  <ExclamationCircleIcon className="size-5 inline-block" /> The
                  title is required.
                </label>
              </div>
              <div className="flex flex-col gap-2 w-6/12">
                <div>
                  <label
                    htmlFor="title"
                    className="font-semibold text-black text-lg"
                  >
                    Category <span className="text-bold text-red-700">*</span>
                  </label>
                  <Autocomplete
                    onChange={(e) => {
                      setEnglishCategory(e);
                    }}
                    value={englishCategory}
                    data={englishCategories}
                  />
                </div>
                <label
                  className={`${
                    warningAlert && !englishCategory && activeStep === 1
                      ? "block"
                      : "hidden"
                  } text-red-600 text-sm text-start flex items-center gap-1`}
                >
                  <ExclamationCircleIcon className="size-5 inline-block" /> The
                  category is required.
                </label>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-black text-lg">
              News body
            </label>
            <TextEditor
              editor={editorEnglish}
              number={30}
              description={englishDescription}
            />
          </div>
        </div>
      ),
    },
    {
      step: 3,
      section: (
        <div className="w-full h-full flex flex-col gap-5 justify-center items-center">
          <div className="w-11/12 h-[30vh] relative flex justify-center items-center group">
            {files.length > 0 ? (
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
                  src={`${process.env.NEXT_PUBLIC_API_URL}/news/images/${id}/${image}`} // Use the preview URL directly
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
              accept={IMAGE_MIME_TYPE} // Ensure only images are accepted
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
              warningAlert && activeStep === 2 ? "block" : "hidden"
            } text-red-600 text-sm text-start flex items-start gap-1 w-11/12`}
          >
            <ExclamationCircleIcon className="size-5 inline-block" /> La imagen
            es obligatoria.
          </label>

          <label className="text-gray-500 text-sm text-center w-11/12">
            <InformationCircleIcon className="size-5 inline-block" /> Agregue la
            imagen de la noticia, no importa si se ve "cortada" o "agrandada",
            en este cuadro la imagen se centrara, pero no perderá su tamaño
            original.
          </label>
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
                  onClick={handleButton}
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
            onClick={handleButton}
            className={`${
              isLastStep
                ? "w-36 h-12 bg-green-500 border-2 border-green-500 text-white hover:bg-white hover:text-green-500 hover:shadow-lg duration-300 rounded-xl flex items-center justify-center"
                : "w-36 h-12 bg-white border-2 border-black text-black hover:bg-black hover:text-white hover:shadow-lg duration-300 rounded-xl"
            }`}
          >
            {isLastStep ? (
              submitLoading ? (
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