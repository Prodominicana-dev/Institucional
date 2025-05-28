"use client";
import React, { useEffect, useRef, useState } from "react";
import { Stepper, Step } from "@material-tailwind/react";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { useUser } from "@auth0/nextjs-auth0";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import Editor from "../tools/rich-editor/config";
import TextEditor from "../tools/rich-editor/rich-editor";
import { Dropzone } from "@mantine/dropzone";
import Image from "next/image";
import { createNews, useCategoriesNews } from "@/services/news/service";
import Day_Picker from "../tools/daypicker";
import { useNewsCategories } from "@/services/news/categories/service";
import Select from "react-select";
import { HashLoader } from "react-spinners";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";

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
  const [spanishTitle, setSpanishTitle] = useState("");
  const [englishTitle, setEnglishTitle] = useState("");
  const [description] = useState("");
  const [cover, setCover] = useState("");
  const [warningAlert, setWarningAlert] = useState(false);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [imagesRelated, setImagesRelated] = useState<FileWithPath[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [submittion, setSubmittion] = useState(false);
  const [date, setDate] = useState<any>(new Date());
  const [categoryOptions, setCategoryOptions] = useState<any>([]);
  const [categoryId, setCategoryId] = useState("");
  const { data: categories, isLoading: categoriesLoading } =
    useNewsCategories();

  useEffect(() => {
    if (!categoriesLoading && categories) {
      setCategoryOptions(
        categories.map(({ id, nameEs }: { id: string; nameEs: string }) => ({
          value: id,
          label: nameEs,
        }))
      );
    }
  }, [categories, categoriesLoading]);

  const openRef = useRef<() => void>(null);
  const handleNext = () => {
    !isLastStep && setActiveStep((cur) => cur + 1);
    setWarningAlert(false);
  };
  const handlePrev = () => {
    !isFirstStep && setActiveStep((cur) => cur - 1);
    setWarningAlert(false);
  };

  const minidescriptionEs = Editor({
    placeholder: "Breve descripción...",
    contentEs: description ? description : "",
  });

  const contentEs = Editor({
    placeholder: "Contenido de la noticia...",
    contentEs: description ? description : "",
  });

  const minidescriptionEn = Editor({
    placeholder: "Breve descripción en inglés...",
    contentEs: description ? description : "",
  });

  const contentEn = Editor({
    placeholder: "Contenido de la noticia en inglés...",
    contentEs: description ? description : "",
  });

  /* Funcion para cuando droppeen un documento se agregue a la lista ya existente */
  const handleDrop = (acceptedFiles: FileWithPath[]) => {
    setCover(acceptedFiles[0].name);
    setFiles(acceptedFiles);
  };

  useEffect(() => {
    if (imagesRelated.length > 0) {
      setImages(imagesRelated.map((file) => file.name));
    }
    if (imagesRelated.length === 0) {
      setImages([]);
    }
  }, [imagesRelated]);

  const handleButton = async () => {
    if (activeStep === 0 && (files.length === 0 || !categoryId)) {
      return setWarningAlert(true);
    }

    if (
      activeStep === 1 &&
      (spanishTitle === "" || contentEs?.getText() === "")
    ) {
      return setWarningAlert(true);
    }

    !isLastStep && handleNext();

    if (isLastStep && (englishTitle === "" || contentEn?.getText() === "")) {
      return setWarningAlert(true);
    }

    if (
      isLastStep &&
      englishTitle !== "" &&
      contentEn?.getText() !== "" &&
      !submitLoading
    ) {
      setSubmittion(true);
      setSubmitLoading(true);
      const es_data = {
        title: spanishTitle,
        content: contentEs?.getHTML(),
        description: minidescriptionEs?.getHTML(),
        language: "es",
      };
      const en_data = {
        title: englishTitle,
        content: contentEn?.getHTML(),
        description: minidescriptionEn?.getHTML(),
        language: "en",
      };
      setSubmittion(false);

      const formData = new FormData();
      formData.append("es", JSON.stringify(es_data));
      formData.append("en", JSON.stringify(en_data));
      formData.append("date", date.toISOString());
      formData.append("cover", cover);
      formData.append("categoryId", categoryId);
      formData.append("images", JSON.stringify(images));
      formData.append("created_By", user?.email as string);
      files.length > 0 && files.map((file) => formData.append("files", file));
      // imagesRelated.length > 0 &&
      //   imagesRelated.map((file) => formData.append("files", file));
      await createNews(formData, update, user?.sub as string);
      setSubmitLoading(false);
      handler();
    }
  };

  const steps = [
    {
      step: 1,
      section: (
        <div className="w-full h-full flex flex-col gap-5 justify-center items-center ">
          <div className="w-full flex flex-col lg:flex-row gap-4">
            <div className="w-full lg:w-6/12">
              <label className="font-semibold text-black text-lg">
                Fecha de la noticia
              </label>
              <div className="w-full">
                <Day_Picker date={date} setDate={setDate} />
              </div>
            </div>
            <div className="w-full lg:w-6/12">
              <label
                htmlFor="nameEs"
                className="font-semibold text-black text-lg"
              >
                Categoría a la que pertenece la noticia{" "}
                <span className="text-red-600">*</span>
              </label>
              <Select
                onChange={(e: any) => {
                  setCategoryId(e.value);
                }}
                className="w-full z-50"
                options={categoryOptions}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 2,
                  colors: {
                    ...theme.colors,
                    primary: "black",
                  },
                })}
              />
              <label
                htmlFor="nameEs"
                className={`${
                  warningAlert && !categoryId ? "block" : "hidden"
                } text-red-600 text-sm pt-3`}
              >
                <ExclamationCircleIcon className="size-5 inline-block" /> La
                categoría es obligatoria.
              </label>
            </div>
          </div>

          <div className="w-full">
            <label
              htmlFor="nameEs"
              className="font-semibold text-black text-lg"
            >
              Portada de la noticia <span className="text-red-600">*</span>
            </label>
          </div>
          <div className="w-full h-[50vh] relative flex justify-center items-center group">
            {files.length > 0 && (
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
              warningAlert && files.length === 0 ? "block" : "hidden"
            } text-red-600 text-sm text-start flex items-start gap-1 w-full`}
          >
            <ExclamationCircleIcon className="size-5 inline-block" /> La imagen
            es obligatoria.
          </label>

          <label className="text-black text-sm text-start w-full">
            <InformationCircleIcon className="size-5 inline-block" />{" "}
            {`Agregue la
            imagen de la noticia, no importa si se ve "cortada" o "agrandada",
            en este cuadro la imagen se centrara, pero no perderá su tamaño
            original.`}
          </label>
          {/* <div className="w-full flex flex-col gap-5">
            <label className="font-semibold text-black text-lg">
              Fotos relacionadas con la noticia
            </label>
            <DragNDrop data={imagesRelated} setData={setImagesRelated} />
          </div> */}
        </div>
      ),
    },
    {
      step: 2,
      section: (
        <div className={`flex flex-col gap-3`}>
          <div className="flex flex-col w-full">
            <label className="text-black text-sm font-light  text-center py-3">
              <InformationCircleIcon className="w-4 h-4 inline-block" /> Tienes
              que digitar la misma noticia, pero en inglés.
            </label>
            <div className="w-full flex gap-4">
              <div className="flex flex-col gap-2 w-full">
                <div>
                  <label
                    htmlFor="title"
                    className="font-semibold text-black text-lg"
                  >
                    Título <span className="text-bold text-red-700">*</span>
                  </label>
                  <input
                    id="title"
                    className="w-full h-9 ring-1 ring-gray-300 rounded-md px-2"
                    onChange={(e) => setSpanishTitle(e.target.value)}
                    value={spanishTitle}
                    placeholder="Título de la noticia"
                  />
                </div>
                <label
                  className={`${
                    warningAlert && !spanishTitle ? "block" : "hidden"
                  } text-red-600 text-sm text-start flex items-center gap-1`}
                >
                  <ExclamationCircleIcon className="size-5 inline-block" /> El
                  título es obligatorio.
                </label>
              </div>
            </div>
          </div>
          <div className="flex flex-col ">
            <label className="font-semibold text-black text-lg">
              Breve descripción de la noticia
            </label>
            <TextEditor editor={minidescriptionEs} number={15} />
          </div>
          <div className="flex flex-col ">
            <label className="font-semibold text-black text-lg">
              Cuerpo de la noticia{" "}
              <span className="text-bold text-red-700">*</span>
            </label>
            <TextEditor editor={contentEs} />
            <label
              className={`${
                warningAlert && !contentEs?.getText() ? "block" : "hidden"
              } text-red-600 text-sm text-start flex items-center gap-1 py-2`}
            >
              <ExclamationCircleIcon className="size-5 inline-block" /> El
              cuerpo de la noticia en inglés es obligatorio.
            </label>
          </div>
        </div>
      ),
    },
    {
      step: 3,
      section: (
        <div className={`flex flex-col gap-3`}>
          <div className="flex flex-col w-full">
            <label className="text-black text-sm font-light  text-center py-3">
              <InformationCircleIcon className="w-4 h-4 inline-block" /> Tienes
              que digitar la misma noticia, pero en inglés.
            </label>
            <div className="w-full flex gap-4">
              <div className="flex flex-col gap-2 w-full">
                <div>
                  <label
                    htmlFor="title"
                    className="font-semibold text-black text-lg"
                  >
                    Título en inglés{" "}
                    <span className="text-bold text-red-700">*</span>
                  </label>
                  <input
                    id="title"
                    className="w-full h-9 ring-1 ring-gray-300 rounded-md px-2"
                    onChange={(e) => setEnglishTitle(e.target.value)}
                    value={englishTitle}
                    placeholder="Título de la noticia"
                  />
                </div>
                <label
                  className={`${
                    warningAlert && !englishTitle ? "block" : "hidden"
                  } text-red-600 text-sm text-start flex items-center gap-1`}
                >
                  <ExclamationCircleIcon className="size-5 inline-block" /> El
                  título en inglés es obligatorio.
                </label>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-black text-lg">
              Breve descripción de la noticia en inglés
            </label>
            <TextEditor editor={minidescriptionEn} number={15} />
          </div>
          <div className="flex flex-col ">
            <label className="font-semibold text-black text-lg">
              Cuerpo de la noticia en inglés{" "}
              <span className="text-bold text-red-700">*</span>
            </label>
            <TextEditor editor={contentEn} />
            <label
              className={`${
                warningAlert && !contentEn?.getText() ? "block" : "hidden"
              } text-red-600 text-sm text-start flex items-center gap-1 py-2`}
            >
              <ExclamationCircleIcon className="size-5 inline-block" /> El
              cuerpo de la noticia en inglés es obligatorio.
            </label>
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <Dialog open={open} onOpenChange={handler}>
        <DialogContent className="min-w-[1000px] overflow-y-auto no-scrollbar min-h-[30vh] max-h-[90vh] not-first:font-montserrat">
          <DialogTitle className="w-full flex justify-between items-center text-2xl font-bold">
            Agrega una nueva noticia
          </DialogTitle>
          <Stepper
            activeStep={activeStep}
            isLastStep={(value) => setIsLastStep(value)}
            isFirstStep={(value) => setIsFirstStep(value)}
          >
            {steps.map((step, index) => (
              <Step
                key={index}
                onClick={handleButton}
                className="font-montserrat text-white font-black text-lg bg-black cursor-pointer"
                activeClassName="bg-blue-dark"
                completedClassName="bg-black"
              >
                {step.step}
              </Step>
            ))}
          </Stepper>
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
              onClick={handleButton}
              className={`${
                isLastStep
                  ? "w-36 h-12 bg-green-500 border-2 border-green-500 text-white hover:bg-white hover:text-green-500 hover:shadow-lg duration-300 rounded-xl flex items-center justify-center"
                  : "w-36 h-12 bg-white border-2 border-black text-black hover:bg-black hover:text-white hover:shadow-lg duration-300 rounded-xl"
              }`}
            >
              {isLastStep ? (
                submitLoading ? (
                  <HashLoader />
                ) : (
                  "Guardar"
                )
              ) : (
                "Siguiente"
              )}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
