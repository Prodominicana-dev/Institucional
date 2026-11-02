"use client";
import React, { useRef, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { Stepper, Step } from "@material-tailwind/react";
import {
  ExclamationCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import DragNDrop from "../tools/dropzone/dropzone";
import { createGallery } from "@/services/gallery/service";
import { uploadGalleryPhotos } from "@/services/gallery/upload";
import { compressImage } from "@/lib/image-compression";
import { notifications } from "@mantine/notifications";
import Day_Picker from "../tools/daypicker";
import { HashLoader } from "react-spinners";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export function GalleryDialog({
  open,
  handler,
  update,
}: {
  open: boolean;
  handler: () => void;
  update: () => void;
}) {
  const { user } = useUser();
  const [titleEs, setTitleEs] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [date, setDate] = useState<Date>(new Date());
  const [image, setImage] = useState("");
  const [warning, setWarning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [imagesRelated, setImagesRelated] = useState<any>([]);
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null);

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
        setIsLoading(true);
        /* 1) Se crea la galeria solo con su portada (liviana).
           2) Las demas fotos se suben despues, en tandas, con progreso.
           Antes iba todo en una sola peticion y, si fallaba, el error se
           perdia y el modal se cerraba como si hubiera salido bien. */
        const cover = files.length > 0 ? await compressImage(files[0]) : null;
        const formData = new FormData();
        formData.append("title", titleEs);
        formData.append("titleEn", titleEn);
        formData.append("date", date.toISOString());
        /* El API reconoce la portada por el nombre del archivo: tiene que ser
           el del archivo ya comprimido, que puede cambiar la extension. */
        formData.append("cover", cover ? cover.name : image);
        formData.append("created_By", user?.email as string);
        if (cover) formData.append("images", cover as any);

        const created = await createGallery(
          formData,
          update,
          user?.sub as string
        );
        if (!created.ok) {
          /* No se cierra el modal: la persona no pierde lo que escribio. */
          setIsLoading(false);
          return;
        }

        if (imagesRelated.length > 0) {
          if (!created.id) {
            notifications.show({
              id: "gallery-photos",
              autoClose: 8000,
              title: "Galería creada sin fotos",
              message:
                "La galería se creó, pero el servidor no permitió subir las fotos. Agréguelas con la opción de agregar fotos.",
              color: "orange",
            });
          } else {
            const { failed } = await uploadGalleryPhotos(
              created.id,
              imagesRelated,
              user?.email as string,
              user?.sub as string,
              (done, total) => setProgress({ done, total })
            );
            notifications.show({
              id: "gallery-photos",
              autoClose: 8000,
              title:
                failed.length === 0
                  ? "Galería creada"
                  : "Algunas fotos no se subieron",
              message:
                failed.length === 0
                  ? "La galería y todas sus fotos se guardaron correctamente."
                  : `No se pudieron subir ${failed.length} de ${imagesRelated.length} fotos. La galería ya existe: agregue las que faltan con la opción de agregar fotos.`,
              color: failed.length === 0 ? "green" : "orange",
            });
            update();
          }
        } else {
          notifications.show({
            id: "gallery-photos",
            autoClose: 5000,
            title: "Galería creada",
            message: "La galería se ha creado correctamente.",
            color: "green",
          });
        }
        setProgress(null);
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
            Fecha de la galería
          </label>
          <div className="w-full">
            <Day_Picker date={date} setDate={setDate} />
          </div>
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
      <Dialog open={open} onOpenChange={() => !isLoading && handler()}>
        <DialogContent className="min-w-[800px] flex flex-col font-montserrat space-y-4 overflow-y-auto no-scrollbar">
          <DialogHeader className="font-bold flex flex-col items-start gap-1 font-montserrat">
            <DialogTitle className="text-black text-2xl">
              Agregar galería de fotos
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
            {progress && (
              <span className="mr-auto self-center text-sm text-gray-600">
                Subiendo fotos: {progress.done} de {progress.total}
              </span>
            )}
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
