"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Spinner,
} from "@material-tailwind/react";
import { Stepper, Step } from "@material-tailwind/react";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { useUser } from "@auth0/nextjs-auth0";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { FileWithPath } from "@mantine/dropzone";
import Editor from "../tools/rich-editor/config";
import TextEditor from "../tools/rich-editor/rich-editor";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Dropzone } from "@mantine/dropzone";
import Image from "next/image";
import Select from "react-select";
import { useServiceCategory } from "@/services/service/categories/service";
import { useServiceType } from "@/services/service/type/service";
import { createService } from "@/services/service/service";

export function ServiceDialog({
  open,
  handler,
  update,
}: {
  open: boolean;
  handler: () => void;
  update: () => void;
}) {
  const { user } = useUser();
  const [spanishName, setSpanishName] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [dirigidoEs, setDirigidoEs] = useState("");
  const [areaEs, setAreaEs] = useState("");
  const [costoEs, setCostoEs] = useState("RD$ ");
  const [tiempoEs, setTiempoEs] = useState("");
  const [horarioEs, setHorarioEs] = useState("");
  const [canalesEs, setCanalesEs] = useState("");
  const [englishName, setEnglishName] = useState("");
  const [dirigidoEn, setDirigidoEn] = useState("");
  const [areaEn, setAreaEn] = useState("");
  const [costoEn, setCostoEn] = useState("RD$ ");
  const [tiempoEn, setTiempoEn] = useState("");
  const [horarioEn, setHorarioEn] = useState("");
  const [canalesEn, setCanalesEn] = useState("");
  const [description] = useState("");
  const [warningAlert, setWarningAlert] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);
  const [categoryOptions, setCategoryOptions] = useState<any>([]);
  const [categoryId, setCategoryId] = useState("");
  const [typeId, setTypeId] = useState("");
  const [access, setAccess] = useState("");
  const [typeOptions, setTypeOptions] = useState<any>([]);
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const { data: categories, isLoading: categoriesLoading } =
    useServiceCategory();

  const { data: types, isLoading: typesLoading } = useServiceType();

  useEffect(() => {
    if (!categoriesLoading && categories) {
      setCategoryOptions(
        categories.map(({ id, name }: { id: string; name: string }) => ({
          value: id,
          label: name,
        }))
      );
    }
  }, [categories, categoriesLoading]);

  useEffect(() => {
    if (!typesLoading && types) {
      setTypeOptions(
        types.map(({ id, nameEs }: { id: string; nameEs: string }) => ({
          value: id,
          label: nameEs,
        }))
      );
    }
  }, [types, typesLoading]);

  const handleDrop = (acceptedFiles: FileWithPath[]) => {
    setFiles(acceptedFiles);
  };

  const openRef = useRef<() => void>(null);
  const handleNext = () => {
    !isLastStep && setActiveStep((cur) => cur + 1);
    setWarningAlert(false);
  };
  const handlePrev = () => {
    !isFirstStep && setActiveStep((cur) => cur - 1);
    setWarningAlert(false);
  };

  const descriptionEs = Editor({
    placeholder: "Descripción del servicio...",
    contentEs: description ? description : "",
  });

  const requerimientosEs = Editor({
    placeholder: "Colocar los requerimientos para obtener el servicio...",
    contentEs: description ? description : "",
  });

  const procedimientosEs = Editor({
    placeholder: "Colocar los procedimientos para obtener el servicio...",
    contentEs: description ? description : "",
  });

  const informacionesEs = Editor({
    placeholder: "Colocar toda la información extra necesaria...",
    contentEs: description ? description : "",
  });

  const descriptionEn = Editor({
    placeholder: "Descripción del servicio en inglés...",
    contentEs: description ? description : "",
  });

  const requerimientosEn = Editor({
    placeholder:
      "Colocar los requerimientos para obtener el servicio en inglés...",
    contentEs: description ? description : "",
  });

  const procedimientosEn = Editor({
    placeholder:
      "Colocar los procedimientos para obtener el servicio en inglés...",
    contentEs: description ? description : "",
  });

  const informacionesEn = Editor({
    placeholder: "Colocar toda la información extra necesaria en inglés...",
    contentEs: description ? description : "",
  });

  const handleButton = async () => {
    if (activeStep === 0 && (!typeId || !categoryId || files.length === 0)) {
      return setWarningAlert(true);
    }

    if (
      activeStep === 1 &&
      (spanishName === "" ||
        descriptionEs?.getText() === "" ||
        !telefono ||
        !email ||
        !dirigidoEs ||
        !areaEs ||
        !costoEs ||
        !tiempoEs ||
        !horarioEs ||
        !canalesEs ||
        costoEs === "RD$ " ||
        costoEs === "RD$" ||
        costoEs === "RD")
    ) {
      return setWarningAlert(true);
    }

    !isLastStep && handleNext();

    if (
      (isLastStep &&
        (englishName === "" ||
          descriptionEn?.getText() === "" ||
          !telefono ||
          !email ||
          !dirigidoEn ||
          !areaEn ||
          !costoEn ||
          !tiempoEn ||
          !horarioEn ||
          !canalesEn)) ||
      costoEn === "RD$ " ||
      costoEn === "RD$" ||
      costoEn === "RD"
    ) {
      return setWarningAlert(true);
    }

    if (isLastStep) {
      setSubmitLoading(true);
      const es_data = {
        name: spanishName,
        description: descriptionEs?.getHTML(),
        to: dirigidoEs,
        area: areaEs,
        price: costoEs,
        time: tiempoEs,
        horario: horarioEs,
        channel: canalesEs,
        access: access,
        info: informacionesEs?.getHTML(),
        requirement: requerimientosEs?.getHTML(),
        process: procedimientosEs?.getHTML(),
        tel: telefono,
        email: email,
        language: "es",
      };
      const en_data = {
        name: englishName,
        description: descriptionEn?.getHTML(),
        to: dirigidoEn,
        area: areaEn,
        price: costoEn,
        time: tiempoEn,
        horario: horarioEn,
        channel: canalesEn,
        access: access,
        info: informacionesEn?.getHTML(),
        requirement: requerimientosEn?.getHTML(),
        process: procedimientosEn?.getHTML(),
        tel: telefono,
        email: email,
        language: "en",
      };

      const formData = new FormData();

      formData.append("es", JSON.stringify(es_data));
      formData.append("en", JSON.stringify(en_data));
      formData.append("categoryId", categoryId);
      formData.append("typeId", typeId);
      formData.append("created_By", user?.email as string);
      files.length > 0 && files.map((file) => formData.append("image", file));

      const data2 = {
        es: es_data,
        en: en_data,
        categoryId: categoryId,
        typeId: typeId,
        created_By: user?.email as string,
      };
      await createService(formData, update, user?.sub as string);
      setSubmitLoading(false);
      handler();
    }
  };

  const steps = [
    {
      step: 1,
      section: (
        <div className="w-full h-full flex flex-col gap-5 items-center ">
          <label className="text-black text-sm text-start w-full">
            <InformationCircleIcon className="size-5 inline-block" />{" "}
            {`Si no encuentras una categoría o tipo, puedes agregar uno nuevo en la sección de categorías y tipos de servicios.`}
          </label>
          <div className="w-full flex flex-col lg:flex-row gap-4">
            <div className="w-full lg:w-6/12">
              <label
                htmlFor="nameEs"
                className="font-semibold text-black text-lg"
              >
                Categoría a la que pertenece el servicio{" "}
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
            <div className="w-full lg:w-6/12">
              <label
                htmlFor="nameEs"
                className="font-semibold text-black text-lg"
              >
                Tipo al que pertenece el servicio{" "}
                <span className="text-red-600">*</span>
              </label>
              <Select
                onChange={(e: any) => {
                  setTypeId(e.value);
                }}
                className="w-full z-50"
                options={typeOptions}
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
                <ExclamationCircleIcon className="size-5 inline-block" /> El
                tipo es obligatorio.
              </label>
            </div>
          </div>

          <div className="w-full flex flex-col">
            <label
              htmlFor="nameEs"
              className="font-semibold text-black text-lg"
            >
              Ícono del servicio <span className="text-red-600">*</span>
            </label>
            <label
              htmlFor="nameEs"
              className={` text-black text-sm pt-3 flex items-center gap-1`}
            >
              <ExclamationCircleIcon className="size-5 inline-block" /> El único
              formato permitido para el ícono es .SVG
            </label>
          </div>
          <div className="w-full h-[40vh] relative flex justify-center items-center group">
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
                  className="w-full h-full absolute rounded-lg object-center scale-75 group-hover:blur-[2px] group-hover:opacity-40 duration-300" // Add bg-white for visibility
                />
              </button>
            )}

            <Dropzone
              multiple={false}
              openRef={openRef}
              onDrop={handleDrop}
              accept={["image/svg+xml"]} // Ensure only images are accepted
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
            htmlFor="nameEs"
            className={`${
              warningAlert && files.length === 0 ? "block" : "hidden"
            } text-red-600 text-sm pt-3 w-full text-left`}
          >
            <ExclamationCircleIcon className="size-5 inline-block" /> El ícono
            es obligatorio.
          </label>
        </div>
      ),
    },
    {
      step: 2,
      section: (
        <div className={`flex flex-col gap-5 `}>
          <div className="flex flex-col w-full">
            <label className="text-black text-sm font-light  text-center py-3">
              <InformationCircleIcon className="w-4 h-4 inline-block" /> Tienes
              que digitar el mismo servicio, pero en inglés.
            </label>
            <div className="w-full flex gap-4">
              <div className="flex flex-col gap-2 w-full">
                <div>
                  <label
                    htmlFor="title"
                    className="font-semibold text-black text-lg"
                  >
                    Nombre representativo o coloquial (si aplica){" "}
                    <span className="text-bold text-red-700">*</span>
                  </label>
                  <input
                    id="title"
                    className="w-full h-9 ring-1 ring-gray-300 rounded-md px-2"
                    onChange={(e) => setSpanishName(e.target.value)}
                    value={spanishName}
                    placeholder="Nombre del servicio..."
                  />
                </div>
                <label
                  className={`${
                    warningAlert && !spanishName ? "block" : "hidden"
                  } text-red-600 text-sm text-start flex items-center gap-1`}
                >
                  <ExclamationCircleIcon className="size-5 inline-block" /> El
                  nombre del servicio es obligatorio.
                </label>
              </div>
            </div>
          </div>
          <div className="flex flex-col ">
            <label className="font-semibold text-black text-lg">
              Descripción del servicio
            </label>
            <TextEditor editor={descriptionEs} number={15} />
            <label
              className={`${
                warningAlert && descriptionEs?.getText() === ""
                  ? "block"
                  : "hidden"
              } text-red-600 text-sm text-start flex items-center gap-1`}
            >
              <ExclamationCircleIcon className="size-5 inline-block" /> Este
              campo es obligatorio.
            </label>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <div>
              <label
                htmlFor="title"
                className="font-semibold text-black text-lg"
              >
                A quién va dirigido este servicio{" "}
                <span className="text-bold text-red-700">*</span>
              </label>
              <input
                id="title"
                className="w-full h-9 ring-1 ring-gray-300 rounded-md px-2"
                onChange={(e) => setDirigidoEs(e.target.value)}
                value={dirigidoEs}
                placeholder="A quiénes va dirigido el servicio..."
              />
            </div>
            <label
              className={`${
                warningAlert && !dirigidoEs ? "block" : "hidden"
              } text-red-600 text-sm text-start flex items-center gap-1`}
            >
              <ExclamationCircleIcon className="size-5 inline-block" /> Este
              campo es obligatorio.
            </label>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <div>
              <label
                htmlFor="title"
                className="font-semibold text-black text-lg"
              >
                Área responsable de ofrecer el servicio dentro del organismo{" "}
                <span className="text-bold text-red-700">*</span>
              </label>
              <input
                id="title"
                className="w-full h-9 ring-1 ring-gray-300 rounded-md px-2"
                onChange={(e) => setAreaEs(e.target.value)}
                value={areaEs}
                placeholder="Área responsable de ofrecer el servicio dentro del organismo..."
              />
            </div>
            <label
              className={`${
                warningAlert && !areaEs ? "block" : "hidden"
              } text-red-600 text-sm text-start flex items-center gap-1`}
            >
              <ExclamationCircleIcon className="size-5 inline-block" /> Este
              campo es obligatorio.
            </label>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="title" className="font-semibold text-black text-lg">
              Contacto
            </label>

            <div className="flex flex-row gap-5 w-full">
              <div className="flex flex-col gap-2 w-full">
                <div>
                  <label
                    htmlFor="title"
                    className="font-semibold text-black text-lg"
                  >
                    Teléfono <span className="text-bold text-red-700">*</span>
                  </label>
                  <input
                    id="title"
                    className="w-full h-9 ring-1 ring-gray-300 rounded-md px-2"
                    onChange={(e) => setTelefono(e.target.value)}
                    value={telefono}
                    placeholder="Teléfono para contactar..."
                    type="tel"
                  />
                </div>
                <label
                  className={`${
                    warningAlert && !telefono ? "block" : "hidden"
                  } text-red-600 text-sm text-start flex items-center gap-1`}
                >
                  <ExclamationCircleIcon className="size-5 inline-block" /> Este
                  campo es obligatorio.
                </label>
              </div>
              <div className="flex flex-col gap-2 w-full">
                <div>
                  <label
                    htmlFor="title"
                    className="font-semibold text-black text-lg"
                  >
                    Correo electrónico{" "}
                    <span className="text-bold text-red-700">*</span>
                  </label>
                  <input
                    id="title"
                    className="w-full h-9 ring-1 ring-gray-300 rounded-md px-2"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type="email"
                    placeholder="Correo electrónico para contactar..."
                  />
                </div>
                <label
                  className={`${
                    warningAlert && !email ? "block" : "hidden"
                  } text-red-600 text-sm text-start flex items-center gap-1`}
                >
                  <ExclamationCircleIcon className="size-5 inline-block" /> Este
                  campo es obligatorio.
                </label>
              </div>
            </div>
          </div>
          <div className="flex flex-col ">
            <label className="font-semibold text-black text-lg">
              Requerimientos para obtener el servicio
            </label>
            <TextEditor editor={requerimientosEs} number={15} />
            <label
              className={`${
                warningAlert && requerimientosEs?.getText() === ""
                  ? "block"
                  : "hidden"
              } text-red-600 text-sm text-start flex items-center gap-1`}
            >
              <ExclamationCircleIcon className="size-5 inline-block" /> Este
              campo es obligatorio.
            </label>
          </div>
          <div className="flex flex-col ">
            <label className="font-semibold text-black text-lg">
              Procedimiento a seguir para obtener el servicio
            </label>
            <TextEditor editor={procedimientosEs} number={15} />
            <label
              className={`${
                warningAlert && procedimientosEs?.getText() === ""
                  ? "block"
                  : "hidden"
              } text-red-600 text-sm text-start flex items-center gap-1`}
            >
              <ExclamationCircleIcon className="size-5 inline-block" /> Este
              campo es obligatorio.
            </label>
          </div>
          <div className="flex flex-row gap-5 w-full">
            <div className="flex flex-col gap-2 w-full">
              <div>
                <label
                  htmlFor="title"
                  className="font-semibold text-black text-lg"
                >
                  Costo del servicio{" "}
                  <span className="text-bold text-red-700">*</span>
                </label>
                <input
                  id="title"
                  className="w-full h-9 ring-1 ring-gray-300 rounded-md px-2"
                  onChange={(e) => setCostoEs(e.target.value)}
                  value={costoEs}
                  placeholder="Costo..."
                  type="text"
                />
              </div>
              <label
                className={`${
                  warningAlert &&
                  (!costoEs ||
                    costoEs === "RD$ " ||
                    costoEs === "RD$" ||
                    costoEs === "RD")
                    ? "block"
                    : "hidden"
                } text-red-600 text-sm text-start flex items-center gap-1`}
              >
                <ExclamationCircleIcon className="size-5 inline-block" /> Este
                campo es obligatorio.
              </label>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <div>
                <label
                  htmlFor="title"
                  className="font-semibold text-black text-lg"
                >
                  Tiempo de realización del servicio{" "}
                  <span className="text-bold text-red-700">*</span>
                </label>
                <input
                  id="title"
                  className="w-full h-9 ring-1 ring-gray-300 rounded-md px-2"
                  onChange={(e) => setTiempoEs(e.target.value)}
                  value={tiempoEs}
                  placeholder="Tiempo de realización del servicio..."
                />
              </div>
              <label
                className={`${
                  warningAlert && !tiempoEs ? "block" : "hidden"
                } text-red-600 text-sm text-start flex items-center gap-1`}
              >
                <ExclamationCircleIcon className="size-5 inline-block" /> Este
                campo es obligatorio.
              </label>
            </div>
          </div>
          <div className="flex flex-row gap-5 w-full">
            <div className="flex flex-col gap-2 w-full">
              <div>
                <label
                  htmlFor="title"
                  className="font-semibold text-black text-lg"
                >
                  Horario de prestación del servicio{" "}
                  <span className="text-bold text-red-700">*</span>
                </label>
                <input
                  id="title"
                  className="w-full h-9 ring-1 ring-gray-300 rounded-md px-2"
                  onChange={(e) => setHorarioEs(e.target.value)}
                  value={horarioEs}
                  placeholder="Horario de prestación del servicio..."
                  type="text"
                />
              </div>
              <label
                className={`${
                  warningAlert && !horarioEs ? "block" : "hidden"
                } text-red-600 text-sm text-start flex items-center gap-1`}
              >
                <ExclamationCircleIcon className="size-5 inline-block" /> Este
                campo es obligatorio.
              </label>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <div>
                <label
                  htmlFor="title"
                  className="font-semibold text-black text-lg"
                >
                  Canales de prestación del servicio{" "}
                  <span className="text-bold text-red-700">*</span>
                </label>
                <input
                  id="title"
                  className="w-full h-9 ring-1 ring-gray-300 rounded-md px-2"
                  onChange={(e) => setCanalesEs(e.target.value)}
                  value={canalesEs}
                  placeholder="Canales de prestación del servicio..."
                />
              </div>
              <label
                className={`${
                  warningAlert && !canalesEs ? "block" : "hidden"
                } text-red-600 text-sm text-start flex items-center gap-1`}
              >
                <ExclamationCircleIcon className="size-5 inline-block" /> Este
                campo es obligatorio.
              </label>
            </div>
          </div>
          <div className="flex flex-col ">
            <label className="font-semibold text-black text-lg">
              Acceso al servicio (enlace)
            </label>
            <input
              id="title"
              className="w-full h-9 ring-1 ring-gray-300 rounded-md px-2"
              onChange={(e) => setAccess(e.target.value)}
              value={access}
              type="url"
              placeholder="https://ejemplo.com"
            />
          </div>
          <label
            className={`${
              access !== "" || !access.startsWith("https://")
                ? "block"
                : "hidden"
            } text-red-600 text-sm text-start flex items-center gap-1`}
          >
            <ExclamationCircleIcon className="size-5 inline-block" /> El enlace
            debe empezar con https://. Puedes copiarlo directamente desde el
            navegador.
          </label>
          <label
            className={`${
              warningAlert && access === "" ? "block" : "hidden"
            } text-red-600 text-sm text-start flex items-center gap-1`}
          >
            <ExclamationCircleIcon className="size-5 inline-block" /> Este campo
            es obligatorio.
          </label>

          <div className="flex flex-col ">
            <label className="font-semibold text-black text-lg">
              Informaciones adicionales del servicio
            </label>
            <TextEditor editor={informacionesEs} number={15} />
            <label
              className={`${
                warningAlert && informacionesEs?.getText() === ""
                  ? "block"
                  : "hidden"
              } text-red-600 text-sm text-start flex items-center gap-1`}
            >
              <ExclamationCircleIcon className="size-5 inline-block" /> Este
              campo es obligatorio.
            </label>
          </div>
        </div>
      ),
    },
    {
      step: 3,
      section: (
        <div className={`flex flex-col gap-5 `}>
          <div className="flex flex-col w-full">
            <label className="text-black text-sm font-light  text-center py-3">
              <InformationCircleIcon className="w-4 h-4 inline-block" /> Tienes
              que digitar el mismo servicio, pero en inglés.
            </label>
            <div className="w-full flex gap-4">
              <div className="flex flex-col gap-2 w-full">
                <div>
                  <label
                    htmlFor="title"
                    className="font-semibold text-black text-lg"
                  >
                    Nombre representativo o coloquial (si aplica) en inglés{" "}
                    <span className="text-bold text-red-700">*</span>
                  </label>
                  <input
                    id="title"
                    className="w-full h-9 ring-1 ring-gray-300 rounded-md px-2"
                    onChange={(e) => setEnglishName(e.target.value)}
                    value={englishName}
                    placeholder="Nombre del servicio en inglés..."
                  />
                </div>
                <label
                  className={`${
                    warningAlert && !englishName ? "block" : "hidden"
                  } text-red-600 text-sm text-start flex items-center gap-1`}
                >
                  <ExclamationCircleIcon className="size-5 inline-block" /> El
                  nombre del servicio es obligatorio.
                </label>
              </div>
            </div>
          </div>
          <div className="flex flex-col ">
            <label className="font-semibold text-black text-lg">
              Descripción del servicio en inglés
            </label>
            <TextEditor editor={descriptionEn} number={15} />
            <label
              className={`${
                warningAlert && descriptionEn?.getText() === ""
                  ? "block"
                  : "hidden"
              } text-red-600 text-sm text-start flex items-center gap-1`}
            >
              <ExclamationCircleIcon className="size-5 inline-block" /> Este
              campo es obligatorio.
            </label>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <div>
              <label
                htmlFor="title"
                className="font-semibold text-black text-lg"
              >
                A quién va dirigido este servicio{" "}
                <span className="text-bold text-red-700">*</span>
              </label>
              <input
                id="title"
                className="w-full h-9 ring-1 ring-gray-300 rounded-md px-2"
                onChange={(e) => setDirigidoEn(e.target.value)}
                value={dirigidoEn}
                placeholder="A quiénes va dirigido el servicio en inglés..."
              />
            </div>
            <label
              className={`${
                warningAlert && !dirigidoEn ? "block" : "hidden"
              } text-red-600 text-sm text-start flex items-center gap-1`}
            >
              <ExclamationCircleIcon className="size-5 inline-block" /> Este
              campo es obligatorio.
            </label>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <div>
              <label
                htmlFor="title"
                className="font-semibold text-black text-lg"
              >
                Área responsable de ofrecer el servicio dentro del organismo en
                inglés <span className="text-bold text-red-700">*</span>
              </label>
              <input
                id="title"
                className="w-full h-9 ring-1 ring-gray-300 rounded-md px-2"
                onChange={(e) => setAreaEn(e.target.value)}
                value={areaEn}
                placeholder="Área responsable de ofrecer el servicio dentro del organismo en inglés..."
              />
            </div>
            <label
              className={`${
                warningAlert && !areaEn ? "block" : "hidden"
              } text-red-600 text-sm text-start flex items-center gap-1`}
            >
              <ExclamationCircleIcon className="size-5 inline-block" /> Este
              campo es obligatorio.
            </label>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="title" className="font-semibold text-black text-lg">
              Contacto
            </label>

            <div className="flex flex-row gap-5 w-full">
              <div className="flex flex-col gap-2 w-full">
                <div>
                  <label
                    htmlFor="title"
                    className="font-semibold text-black text-lg"
                  >
                    Teléfono <span className="text-bold text-red-700">*</span>
                  </label>
                  <input
                    id="title"
                    className="w-full h-9 ring-1 ring-gray-300 rounded-md px-2"
                    onChange={(e) => setTelefono(e.target.value)}
                    value={telefono}
                    placeholder="Teléfono para contactar..."
                    type="tel"
                  />
                </div>
                <label
                  className={`${
                    warningAlert && !telefono ? "block" : "hidden"
                  } text-red-600 text-sm text-start flex items-center gap-1`}
                >
                  <ExclamationCircleIcon className="size-5 inline-block" /> Este
                  campo es obligatorio.
                </label>
              </div>
              <div className="flex flex-col gap-2 w-full">
                <div>
                  <label
                    htmlFor="title"
                    className="font-semibold text-black text-lg"
                  >
                    Correo electrónico{" "}
                    <span className="text-bold text-red-700">*</span>
                  </label>
                  <input
                    id="title"
                    className="w-full h-9 ring-1 ring-gray-300 rounded-md px-2"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    placeholder="Correo electrónico para contactar..."
                  />
                </div>
                <label
                  className={`${
                    warningAlert && !email ? "block" : "hidden"
                  } text-red-600 text-sm text-start flex items-center gap-1`}
                >
                  <ExclamationCircleIcon className="size-5 inline-block" /> Este
                  campo es obligatorio.
                </label>
              </div>
            </div>
          </div>
          <div className="flex flex-col ">
            <label className="font-semibold text-black text-lg">
              Requerimientos para obtener el servicio en inglés
            </label>
            <TextEditor editor={requerimientosEn} number={15} />
            <label
              className={`${
                warningAlert && requerimientosEn?.getText() === ""
                  ? "block"
                  : "hidden"
              } text-red-600 text-sm text-start flex items-center gap-1`}
            >
              <ExclamationCircleIcon className="size-5 inline-block" /> Este
              campo es obligatorio.
            </label>
          </div>
          <div className="flex flex-col ">
            <label className="font-semibold text-black text-lg">
              Procedimiento a seguir para obtener el servicio en inglés
            </label>
            <TextEditor editor={procedimientosEn} number={15} />
            <label
              className={`${
                warningAlert && procedimientosEn?.getText() === ""
                  ? "block"
                  : "hidden"
              } text-red-600 text-sm text-start flex items-center gap-1`}
            >
              <ExclamationCircleIcon className="size-5 inline-block" /> Este
              campo es obligatorio.
            </label>
          </div>
          <div className="flex flex-row gap-5 w-full">
            <div className="flex flex-col gap-2 w-full">
              <div>
                <label
                  htmlFor="title"
                  className="font-semibold text-black text-lg"
                >
                  Costo del servicio{" "}
                  <span className="text-bold text-red-700">*</span>
                </label>
                <input
                  id="title"
                  className="w-full h-9 ring-1 ring-gray-300 rounded-md px-2"
                  onChange={(e) => setCostoEn(e.target.value)}
                  value={costoEn}
                  placeholder="Costo (si es gratis ponerlo en inglés)..."
                  type="text"
                />
              </div>
              <label
                className={`${
                  warningAlert &&
                  (!costoEn ||
                    costoEn === "RD$ " ||
                    costoEn === "RD$" ||
                    costoEn === "RD")
                    ? "block"
                    : "hidden"
                } text-red-600 text-sm text-start flex items-center gap-1`}
              >
                <ExclamationCircleIcon className="size-5 inline-block" /> Este
                campo es obligatorio.
              </label>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <div>
                <label
                  htmlFor="title"
                  className="font-semibold text-black text-lg"
                >
                  Tiempo de realización del servicio en inglés{" "}
                  <span className="text-bold text-red-700">*</span>
                </label>
                <input
                  id="title"
                  className="w-full h-9 ring-1 ring-gray-300 rounded-md px-2"
                  onChange={(e) => setTiempoEn(e.target.value)}
                  value={tiempoEn}
                  placeholder="Tiempo de realización del servicio..."
                />
              </div>
              <label
                className={`${
                  warningAlert && !tiempoEn ? "block" : "hidden"
                } text-red-600 text-sm text-start flex items-center gap-1`}
              >
                <ExclamationCircleIcon className="size-5 inline-block" /> Este
                campo es obligatorio.
              </label>
            </div>
          </div>
          <div className="flex flex-row gap-5 w-full">
            <div className="flex flex-col gap-2 w-full">
              <div>
                <label
                  htmlFor="title"
                  className="font-semibold text-black text-lg"
                >
                  Horario de prestación del servicio en inglés{" "}
                  <span className="text-bold text-red-700">*</span>
                </label>
                <input
                  id="title"
                  className="w-full h-9 ring-1 ring-gray-300 rounded-md px-2"
                  onChange={(e) => setHorarioEn(e.target.value)}
                  value={horarioEn}
                  placeholder="Horario de prestación del servicio en inglés..."
                  type="text"
                />
              </div>
              <label
                className={`${
                  warningAlert && !horarioEn ? "block" : "hidden"
                } text-red-600 text-sm text-start flex items-center gap-1`}
              >
                <ExclamationCircleIcon className="size-5 inline-block" /> Este
                campo es obligatorio.
              </label>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <div>
                <label
                  htmlFor="title"
                  className="font-semibold text-black text-lg"
                >
                  Canales de prestación del servicio en inglés{" "}
                  <span className="text-bold text-red-700">*</span>
                </label>
                <input
                  id="title"
                  className="w-full h-9 ring-1 ring-gray-300 rounded-md px-2"
                  onChange={(e) => setCanalesEn(e.target.value)}
                  value={canalesEn}
                  placeholder="Canales de prestación del servicio en inglés..."
                />
              </div>
              <label
                className={`${
                  warningAlert && !canalesEn ? "block" : "hidden"
                } text-red-600 text-sm text-start flex items-center gap-1`}
              >
                <ExclamationCircleIcon className="size-5 inline-block" /> Este
                campo es obligatorio.
              </label>
            </div>
          </div>
          <div className="flex flex-col ">
            <label className="font-semibold text-black text-lg">
              Acceso al servicio (enlace)
            </label>
            <input
              id="title"
              className="w-full h-9 ring-1 ring-gray-300 rounded-md px-2"
              onChange={(e) => setAccess(e.target.value)}
              value={access}
              type="url"
              placeholder="https://ejemplo.com"
            />
          </div>
          <label
            className={`${access !== "" || !access.startsWith("https://")})
                ? "block"
                : "hidden"
            } text-red-600 text-sm text-start flex items-center gap-1`}
          >
            <ExclamationCircleIcon className="size-5 inline-block" /> El enlace
            debe empezar con https://. Puedes copiarlo directamente desde el
            navegador.
          </label>
          <label
            className={`${
              warningAlert && access === "" ? "block" : "hidden"
            } text-red-600 text-sm text-start flex items-center gap-1`}
          >
            <ExclamationCircleIcon className="size-5 inline-block" /> Este campo
            es obligatorio.
          </label>

          <div className="flex flex-col ">
            <label className="font-semibold text-black text-lg">
              Informaciones adicionales del servicio en inglés
            </label>
            <TextEditor editor={informacionesEn} number={15} />
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
        justify-center
        handler={handler}
        className="p-10 flex items-center"
        size="xxl"
      >
        <DialogHeader
          placeholder={undefined}
          className="font-black text-black font-montserrat flex flex-col gap-5 w-8/12"
        >
          <div className="w-full flex justify-between items-center">
            Agrega un nuevo servicio
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
          className="flex flex-col w-8/12 overflow-y-auto no-scrollbar min-h-[25vh] max-h-[75vh] font-montserrat"
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
          className="space-x-4 font-montserrat w-8/12"
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
                <Spinner
                  className="w-7 h-7"
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                />
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
