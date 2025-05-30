"use client";
import React, { useEffect, useRef, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { Stepper, Step } from "@material-tailwind/react";
import { useDirections } from "@/services/structure-organizational/service";
import {
  ExclamationCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import Select from "react-select";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { createMember } from "@/services/structure-organizational/members/service";
import { HashLoader } from "react-spinners";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export function MembersDialog({
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
  const [roleEs, setRoleEs] = useState("");
  const [roleEn, setRoleEn] = useState("");
  const [regulationEs, setRegulationEs] = useState("");
  const [regulationEn, setRegulationEn] = useState("");
  const [functionsEs, setFunctionsEs] = useState<string[]>([""]);
  const [functionsEn, setFunctionsEn] = useState<string[]>([""]);
  const [image, setImage] = useState("");
  const [isDirector, setIsDirector] = useState(false);
  const [directionId, setDirectionId] = useState<any>("");
  const [directionsOptions, setDirectionsOptions] = useState<any>([]);
  const [warning, setWarning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const { data: directions, isLoading: directionsLoading } = useDirections();

  useEffect(() => {
    if (!directionsLoading && directions) {
      setDirectionsOptions(
        directions.map(({ id, nameEs }: { id: string; nameEs: string }) => ({
          value: id,
          label: nameEs,
        }))
      );
    }
  }, [directions, directionsLoading]);

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
      if (
        activeStep === 0 &&
        (name === "" || files.length === 0 || !directionId)
      ) {
        return setWarning(true);
      }

      if (
        activeStep === 1 &&
        (roleEs === "" ||
          regulationEs === "" ||
          functionsEs.some((e) => e === ""))
      ) {
        return setWarning(true);
      }

      if (
        activeStep === 2 &&
        (roleEn === "" ||
          regulationEn === "" ||
          functionsEn.some((e) => e === ""))
      ) {
        return setWarning(true);
      }

      !isLastStep && handleNext();
      if (isLastStep) {
        const formData = new FormData();
        setIsLoading(true);

        const es = {
          role: roleEs,
          regulation: regulationEs,
          functions: functionsEs,
          language: "es",
        };
        const en = {
          role: roleEn,
          regulation: regulationEn,
          functions: functionsEn,
          language: "en",
        };
        formData.append("name", name);
        formData.append("departmentId", directionId);
        formData.append("es", JSON.stringify(es));
        formData.append("en", JSON.stringify(en));
        formData.append("isDirector", JSON.stringify(isDirector));
        formData.append("image", image);
        if (files.length > 0) formData.append("images", files[0] as any);
        await createMember(formData, update, user?.sub as string);
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
            Nombre y apellidos <span className="text-red-600">*</span>
          </label>
          <Input
            crossOrigin={""}
            id="nameEs"
            className="w-full"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Nombre del colaborador"
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
          <div className="flex gap-5">
            <div className="w-full">
              {" "}
              <label
                htmlFor="nameEs"
                className="font-semibold text-black text-lg"
              >
                Dirección a la que pertenece{" "}
                <span className="text-red-600">*</span>
              </label>
              <Select
                onChange={(e: any) => {
                  setDirectionId(e.value);
                }}
                className="w-full z-50"
                options={directionsOptions}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 2,
                  colors: {
                    ...theme.colors,
                    primary: "black",
                  },
                })}
              />
            </div>
            <div className="w-full">
              {" "}
              <label
                htmlFor="nameEs"
                className="font-semibold text-black text-lg"
              >
                Es director? <span className="text-red-600">*</span>
              </label>
              <Select
                onChange={(e: any) => {
                  setIsDirector(e.value);
                }}
                className="w-full z-50"
                options={[
                  { value: true, label: "Sí" },
                  { value: false, label: "No" },
                ]}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 2,
                  colors: {
                    ...theme.colors,
                    primary: "black",
                  },
                })}
              />
            </div>
          </div>
          <label
            htmlFor="nameEs"
            className={`${
              warning && !directionId ? "block" : "hidden"
            } text-red-600 text-sm`}
          >
            <ExclamationCircleIcon className="size-5 inline-block" /> La
            dirección es obligatoria.
          </label>
          <label
            className={` text-black text-sm text-start flex items-start gap-1 w-11/12`}
          >
            <ExclamationCircleIcon className="size-5 inline-block" /> La imagen
            debe ser .JPG, .PNG o .JPEG y no debe pesar más de 2MB.
          </label>
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
        </div>
      ),
    },
    {
      step: 2,
      section: (
        <div className="flex flex-col w-full space-y-4 max-h-[60vh] overflow-auto">
          <label htmlFor="nameEn" className="font-semibold text-black text-lg">
            Posición del colaborador <span className="text-red-600">*</span>
          </label>
          <Input
            crossOrigin={""}
            id="nameEn"
            className="w-full"
            onChange={(e) => setRoleEs(e.target.value)}
            value={roleEs}
            placeholder="Nombre de la posición"
          />
          <label
            htmlFor="nameEn"
            className={`${
              warning && !roleEs ? "block" : "hidden"
            } text-red-600 text-sm`}
          >
            La posición es obligatoria.
          </label>
          <label htmlFor="nameEn" className="font-semibold text-black text-lg">
            Regulacines <span className="text-red-600">*</span>
          </label>
          <Input
            crossOrigin={""}
            id="nameEn"
            className="w-full"
            onChange={(e) => setRegulationEs(e.target.value)}
            value={regulationEs}
            placeholder="Regulaciones"
          />
          <label
            htmlFor="nameEn"
            className={`${
              warning && !regulationEs ? "block" : "hidden"
            } text-red-600 text-sm`}
          >
            Las regulaciones son obligatorias.
          </label>
          <label htmlFor="nameEn" className="font-semibold text-black text-lg">
            Funciones <span className="text-red-600">*</span>
          </label>
          <div className="w-full flex flex-row gap-2">
            <Input
              crossOrigin={""}
              id="nameEn"
              className="w-full"
              onChange={(e) => {
                // Cambiar la posicion 0 del array por el valor de e y la otra se queda igual
                setFunctionsEs([e.target.value, ...functionsEs.slice(1)]);
              }}
              value={functionsEs[0]}
              placeholder="Regulaciones"
            />
            <button
              onClick={() => setFunctionsEs(["", ...functionsEs.slice(1)])}
            >
              <XMarkIcon className="size-8 text-red-500" />
            </button>
          </div>
          <label
            htmlFor=""
            className={`${
              warning && functionsEs[0] === "" ? "block" : "hidden"
            } text-red-600 text-sm`}
          >
            La función es obligatoria.
          </label>

          {functionsEs.map((func, index) => {
            if (index === 0) return null;
            return (
              <div key={index} className="flex flex-col w-full space-y-4">
                <div className="w-full flex flex-row gap-2">
                  <Input
                    crossOrigin={""}
                    id="nameEn"
                    className="w-full"
                    onChange={(e) => {
                      // Cambiar la posicion index del array por el valor de e y las otras se quedan igual
                      setFunctionsEs([
                        ...functionsEs.slice(0, index),
                        e.target.value,
                        ...functionsEs.slice(index + 1),
                      ]);
                    }}
                    value={functionsEs[index]}
                    placeholder="Función..."
                  />
                  <button
                    onClick={() => {
                      setFunctionsEs([
                        ...functionsEs.slice(0, index),
                        ...functionsEs.slice(index + 1),
                      ]);
                      setFunctionsEn([
                        ...functionsEn.slice(0, index),
                        ...functionsEn.slice(index + 1),
                      ]);
                    }}
                  >
                    <XMarkIcon className="size-8 text-red-500" />
                  </button>
                </div>
                <label
                  htmlFor=""
                  className={`${
                    warning && functionsEs[index] === "" ? "block" : "hidden"
                  } text-red-600 text-sm`}
                >
                  Esta función es obligatoria, si no quieres agregarla,
                  elimínala. Pero, toma en cuenta que si la eliminas también se
                  eliminará del otro idioma.
                </label>
              </div>
            );
          })}
          <button
            onClick={() => {
              setFunctionsEs([...functionsEs, ""]);
              setFunctionsEn([...functionsEn, ""]);
            }}
            className="w-full border-[1px] border-dashed hover:border-solid duration-300 hover:shadow border-gray-400 text-gray-500 py-4 justify-center items-center flex rounded-lg"
          >
            Agregar otra función...
          </button>
        </div>
      ),
    },
    {
      step: 3,
      section: (
        <div className="flex flex-col w-full space-y-4 max-h-[60vh] overflow-auto">
          <label
            htmlFor="nameEn"
            className="font-light text-black text-sm flex gap-2"
          >
            <InformationCircleIcon className="size-5" /> Debes agregar el mismo
            contenido de la página anterior, pero en inglés, para la traducción
            de toda la página.
          </label>
          <label htmlFor="nameEn" className="font-semibold text-black text-lg">
            Posición del colaborador en inglés{" "}
            <span className="text-red-600">*</span>
          </label>
          <Input
            crossOrigin={""}
            id="nameEn"
            className="w-full"
            onChange={(e) => setRoleEn(e.target.value)}
            value={roleEn}
            placeholder="Nombre de la posición"
          />
          <label
            htmlFor=""
            className={`${
              warning && !roleEn ? "block" : "hidden"
            } text-red-600 text-sm`}
          >
            La posición en inglés es obligatoria.
          </label>
          <label
            htmlFor="regulation"
            className="font-semibold text-black text-lg"
          >
            Regulaciones en inglés <span className="text-red-600">*</span>
          </label>
          <Input
            crossOrigin={""}
            id="regulation"
            className="w-full"
            onChange={(e) => setRegulationEn(e.target.value)}
            value={regulationEn}
            placeholder="Regulaciones"
          />
          <label
            htmlFor="nameEn"
            className={`${
              warning && !regulationEs ? "block" : "hidden"
            } text-red-600 text-sm`}
          >
            Las regulaciones en inglés son obligatorias.
          </label>
          <label htmlFor="nameEn" className="font-semibold text-black text-lg">
            Funciones en inglés <span className="text-red-600">*</span>
          </label>
          <div className="w-full flex flex-row gap-2">
            <Input
              crossOrigin={""}
              id="nameEn"
              className="w-full"
              onChange={(e) => {
                // Cambiar la posicion 0 del array por el valor de e y la otra se queda igual
                setFunctionsEn([e.target.value, ...functionsEn.slice(1)]);
              }}
              value={functionsEn[0]}
              placeholder="Regulaciones"
            />
            <button
              onClick={() => setFunctionsEs(["", ...functionsEn.slice(1)])}
            >
              <XMarkIcon className="size-8 text-red-500" />
            </button>
          </div>
          <label
            htmlFor=""
            className={`${
              warning && functionsEn[0] === "" ? "block" : "hidden"
            } text-red-600 text-sm`}
          >
            La función en inglés es obligatoria.
          </label>

          {functionsEn.map((func, index) => {
            if (index === 0) return null;
            return (
              <div key={index} className="flex flex-col w-full space-y-4">
                <div className="w-full flex flex-row gap-2">
                  <Input
                    crossOrigin={""}
                    id="nameEn"
                    className="w-full"
                    onChange={(e) => {
                      // Cambiar la posicion index del array por el valor de e y las otras se quedan igual
                      setFunctionsEn([
                        ...functionsEn.slice(0, index),
                        e.target.value,
                        ...functionsEn.slice(index + 1),
                      ]);
                    }}
                    value={functionsEn[index]}
                    placeholder="Función..."
                  />
                  <button
                    onClick={() => {
                      setFunctionsEs([
                        ...functionsEs.slice(0, index),
                        ...functionsEs.slice(index + 1),
                      ]);
                      setFunctionsEn([
                        ...functionsEn.slice(0, index),
                        ...functionsEn.slice(index + 1),
                      ]);
                    }}
                  >
                    <XMarkIcon className="size-8 text-red-500" />
                  </button>
                </div>
                <label
                  htmlFor=""
                  className={`${
                    warning && functionsEs[index] === "" ? "block" : "hidden"
                  } text-red-600 text-sm`}
                >
                  Esta función es obligatoria, si no quieres agregarla,
                  elimínala. Pero, toma en cuenta que si la eliminas también se
                  eliminará del otro idioma.
                </label>
              </div>
            );
          })}
          <label
            htmlFor="nameEn"
            className="font-light text-black text-sm flex gap-2"
          >
            <InformationCircleIcon className="size-5" /> Si quieres agregar una
            nueva función debes volver al paso anterior y agregarla desde allí.
          </label>
        </div>
      ),
    },
  ];

  return (
    <>
      <Dialog open={open} onOpenChange={handler}>
        <DialogContent className="min-w-[800px] max-h-[90vh] flex flex-col font-montserrat space-y-4 overflow-y-auto no-scrollbar">
          <DialogHeader className="font-semibold flex flex-col items-start gap-1 font-montserrat">
            <DialogTitle className="text-black text-2xl">
              Agregar miembro
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
              {isLastStep ? (
                isLoading ? (
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
