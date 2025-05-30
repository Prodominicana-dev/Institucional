"use client";
import React, { useEffect, useRef, useState } from "react";
import { Stepper, Step } from "@material-tailwind/react";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { useUser } from "@auth0/nextjs-auth0";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import Editor from "../tools/rich-editor/config";
import TextEditor from "../tools/rich-editor/rich-editor";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Dropzone } from "@mantine/dropzone";
import Image from "next/image";
import Select from "react-select";
import { useCategoriesNews } from "@/services/news/service";
import Day_Picker from "../tools/daypicker";
import { editEvents, useEventById } from "@/services/events/service";
import { useEventCategory } from "@/services/events/categories/service";
import { HashLoader } from "react-spinners";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export function EventEditDialog({
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
  const [spanishDescription, setSpanishDescription] = useState("");
  const [englishTitle, setEnglishTitle] = useState("");
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
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [coordinates, setCoordinates] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categoriesOptions, setCategoriesOptions] = useState([]);
  const { data, isLoading } = useEventById(id);

  const { data: catEvent, isLoading: catLoading } = useEventCategory();

  useEffect(() => {
    if (catEvent && !catLoading) {
      setCategoriesOptions(
        catEvent.map((category: any) => ({
          value: category.id,
          label: category.name,
        }))
      );
    }
  }, [catEvent, catLoading]);

  useEffect(() => {
    if (startDate > endDate) {
      setEndDate(startDate);
    }
  }, [startDate]);

  useEffect(() => {
    if (endDate < startDate) {
      setStartDate(endDate);
    }
  }, [endDate]);

  const {
    data: categories,
    refetch: categoriesRefetch,
    isLoading: categoriesLoading,
  } = useCategoriesNews();

  useEffect(() => {
    if (data && !isLoading) {
      setSpanishTitle(data.es.title);
      setSpanishDescription(data.es.description);
      setEnglishTitle(data.en.title);
      setEnglishDescription(data.en.description);
      setLatitude(data.lat);
      setLongitude(data.lng);
      setAddress(data.address);
      setCoordinates(`${data.lat}, ${data.lng}`);
      setStartDate(new Date(data.start_Date));
      setEndDate(new Date(data.end_Date));
      setCategoryId(data.categoryId);
    }
  }, [data, isLoading]);

  useEffect(() => {
    if (!categoriesLoading) {
      const { es, en } = categories;
      const es_options = es.map((category: any) => {
        return category.category;
      });
      const en_options = en.map((category: any) => {
        return category.category;
      });
      setSpanishCategories(es_options);
      setEnglishCategories(en_options);
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
  };

  const handleButton = async () => {
    if (
      activeStep === 0 &&
      (spanishTitle === "" || editorSpanish?.getText() === "")
    ) {
      return setWarningAlert(true);
    }

    if (
      activeStep === 1 &&
      (englishTitle === "" || editorEnglish?.getText() === "")
    ) {
      return setWarningAlert(true);
    }

    !isLastStep && handleNext();

    if (isLastStep && (!startDate || !categoryId || !coordinates)) {
      return setWarningAlert(true);
    }

    if (isLastStep) {
      setSubmitLoading(true);
      const es_data = {
        title: spanishTitle,
        description: editorSpanish?.getHTML(),
        language: "es",
      };
      const en_data = {
        title: englishTitle,
        description: editorEnglish?.getHTML(),
        language: "en",
      };

      const formData = new FormData();
      formData.append("start_Date", startDate.toISOString());
      formData.append("end_Date", endDate.toISOString());
      formData.append("lat", latitude.trimStart());
      formData.append("lng", longitude.trimStart());
      formData.append("address", address.trimStart());
      formData.append("es", JSON.stringify(es_data));
      formData.append("en", JSON.stringify(en_data));
      formData.append("categoryId", categoryId);
      formData.append("updated_By", user?.email as string);
      files.length > 0 && files.map((file) => formData.append("files", file));
      await editEvents(id, formData, update, user?.sub as string);
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
              <div className="flex flex-col gap-2 w-full">
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
                    onChange={(e) =>
                      setSpanishTitle(e.target.value.trimStart())
                    }
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
            </div>
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-black text-lg">
              Descripción del evento{" "}
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
            <ExclamationCircleIcon className="size-5 inline-block" /> La
            descripción del evento es obligatoria.
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
              <div className="flex flex-col gap-2 w-full">
                <div>
                  <label
                    htmlFor="title"
                    className="font-semibold text-black text-lg"
                  >
                    Título en inglés{" "}
                    <span className="text-bold text-red-700">*</span>
                  </label>
                  <Input
                    crossOrigin={""}
                    id="title"
                    className="w-full"
                    onChange={(e) =>
                      setEnglishTitle(e.target.value.trimStart())
                    }
                    value={englishTitle}
                    placeholder="Título del evento en inglés..."
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
              Descripción del evento en inglés{" "}
              <span className="text-bold text-red-700">*</span>
            </label>
            <TextEditor
              editor={editorEnglish}
              description={englishDescription}
              number={30}
            />
          </div>
          <label
            className={`${
              warningAlert && !editorEnglish?.getText() ? "block" : "hidden"
            } text-red-600 text-sm text-start flex items-center gap-1`}
          >
            <ExclamationCircleIcon className="size-5 inline-block" /> La
            descripción en inglés es obligatoria.
          </label>
        </div>
      ),
    },
    {
      step: 3,
      section: (
        <div className="w-full h-full flex flex-col gap-5 justify-center items-center">
          <div className="w-full flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-6/12">
              <label className="font-semibold text-black text-lg">
                Fecha inicio del evento{" "}
                <span className="text-bold text-red-700">*</span>
              </label>
              <Day_Picker date={startDate} setDate={setStartDate} />
              <label
                className={`${
                  warningAlert && !startDate && activeStep === 2
                    ? "block"
                    : "hidden"
                } text-red-600 text-sm text-start flex items-center gap-1`}
              >
                <ExclamationCircleIcon className="size-5 inline-block" /> La
                fecha de inicio es obligatoria.
              </label>
            </div>
            <div className="w-full md:w-6/12">
              <label className="font-semibold text-black text-lg">
                Fecha final del evento{" "}
              </label>
              <Day_Picker
                date={endDate}
                setDate={setEndDate}
                fromDate={startDate}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="title" className="font-semibold text-black text-lg">
              Categoría del evento{" "}
              <span className="text-bold text-red-700">*</span>
            </label>
            <Select
              onChange={(e: any) => {
                setCategoryId(e.value);
              }}
              className="w-full z-50"
              options={categoriesOptions}
              theme={(theme) => ({
                ...theme,
                borderRadius: 2,
                colors: {
                  ...theme.colors,
                  primary: "black",
                },
              })}
              value={categoriesOptions.find(
                (option: any) => option.value === categoryId
              )}
            />
            <label
              className={`${
                warningAlert && !categoryId ? "block" : "hidden"
              } text-red-600 text-sm text-start flex items-center gap-1`}
            >
              <ExclamationCircleIcon className="size-5 inline-block" /> La
              categoría es obligatoria.
            </label>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <div>
              <label
                htmlFor="title"
                className="font-semibold text-black text-lg"
              >
                Coordenadas de la ubicación extraídas de Google Maps{" "}
                <span className="text-bold text-red-700">*</span>
              </label>
              <Input
                crossOrigin={""}
                id="title"
                className="w-full"
                onChange={(e) => setCoordinates(e.target.value.trimStart())}
                value={coordinates}
                placeholder="Coordenadas extraídas de Google Maps..."
              />
            </div>
            <label
              className={`${
                warningAlert && !coordinates ? "block" : "hidden"
              } text-red-600 text-sm text-start flex items-center gap-1`}
            >
              <ExclamationCircleIcon className="size-5 inline-block" /> Las
              coordenadas son obligatorias. Además, deben estar separadas por
              una coma (,).
            </label>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <div>
              <label
                htmlFor="title"
                className="font-semibold text-black text-lg"
              >
                Dirección del lugar{" "}
                <span className="text-bold text-red-700">*</span>
              </label>
              <Input
                crossOrigin={""}
                id="title"
                className="w-full"
                onChange={(e) => setAddress(e.target.value.trimStart())}
                value={address}
                placeholder="Dirección del lugar..."
              />
            </div>
            <label
              className={`${
                warningAlert && !coordinates ? "block" : "hidden"
              } text-red-600 text-sm text-start flex items-center gap-1`}
            >
              <ExclamationCircleIcon className="size-5 inline-block" /> La
              dirección es obligatoria.
            </label>
          </div>
          <div className="w-full h-[30vh] relative flex justify-center items-center group">
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
          <label className="text-gray-500 text-sm text-center w-11/12">
            <InformationCircleIcon className="size-5 inline-block" />{" "}
            {`Agregue la
            imagen de la noticia, no importa si se ve "cortada" o "agrandada",
            en este cuadro la imagen se centrara, pero no perderá su tamaño
            original.`}
          </label>
        </div>
      ),
    },
  ];

  return (
    <>
      <Dialog open={open} onOpenChange={handler}>
        <DialogContent className="min-w-[1000px] overflow-y-auto no-scrollbar min-h-[30vh] max-h-[90vh] not-first:font-montserrat">
          <DialogHeader className="font-black text-black font-montserrat flex flex-col gap-5">
            <div className="w-full flex justify-between items-center">
              <DialogTitle className="text-2xl">Editar evento</DialogTitle>
            </div>
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
          </DialogHeader>
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
