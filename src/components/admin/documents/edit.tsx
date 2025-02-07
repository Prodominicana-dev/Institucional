"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Spinner,
  Tooltip,
} from "@material-tailwind/react";
import { useUser } from "@auth0/nextjs-auth0/client";
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
import {
  Dropzone,
  FileWithPath,
  IMAGE_MIME_TYPE,
  PDF_MIME_TYPE,
} from "@mantine/dropzone";
import Select from "react-select";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { createMember } from "@/services/structure-organizational/members/service";
import CreatableSelect from "react-select/creatable";
import { createDocs, editDocs, useDocsById } from "@/services/gen-docs/service";

export function EditDocumentDialog({
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
  const [title, setTitle] = useState("");
  const [oldTitle, setOldTitle] = useState("");
  const [image, setImage] = useState("");
  const [warning, setWarning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [tags, setTags] = useState<any>([]);
  const [tagsOption, setTagsOption] = useState<any>([]);
  const openRef = useRef<() => void>(null);
  const { data, isLoading: docsLoading, refetch } = useDocsById(id);

  useEffect(() => {
    if (!docsLoading && data) {
      console.log(data);
      setTitle(data.title);
      setOldTitle(data.title);
      setTags(data.tags);
      setTagsOption(data.tags.map((tag: any) => ({ value: tag, label: tag })));
    }
  }, [docsLoading, data]);

  const handleDrop = (acceptedFiles: FileWithPath[]) => {
    setTitle(acceptedFiles[0].name);
    setFiles(acceptedFiles);
  };

  const handleDelete = (index: any) => {
    // Eliminar el documento en la posicion index del arreglo de files y el title borrarlo
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    setTitle("");
  };

  const handleSubmit = async () => {
    if (!title || tags.length === 0) {
      setWarning(true);
      return;
    }
    if (!isLoading) {
      const formData = new FormData();
      setIsLoading(true);
      formData.append("title", title);
      formData.append("tags", tags.toString());
      formData.append("created_By", user?.email as string);
      if (files.length > 0) formData.append("files", files[0] as any);
      await editDocs(id, formData, update, user?.sub as string);
      setIsLoading(false);
      handler();
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
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            placeholder="Título del documento"
          />
          <label
            htmlFor="nameEs"
            className={`${
              warning && !title ? "block" : "hidden"
            } text-red-600 text-sm`}
          >
            <ExclamationCircleIcon className="size-5 inline-block" /> El título
            es obligatorio.
          </label>
          <div className="flex flex-col w-full gap-4">
            <label
              htmlFor=""
              className="font-montserrat text-black text-lg font-semibold"
            >
              Tags
            </label>
            <CreatableSelect
              isMulti
              onChange={(e) => {
                // ELiminar de tagsOptions los tags que ya no esten en tags
                console.log(e);
                setTags(e.map((tag: any) => tag.value));
              }}
              onCreateOption={(newValue) => {
                setTagsOption([
                  ...tagsOption,
                  { value: newValue, label: newValue },
                ]);
                setTags([...tags, newValue]);
              }}
              options={tagsOption}
              value={tagsOption.filter((tag: any) => tags.includes(tag.value))}
            />
            <label
              className={`${
                warning && tags.length === 0 ? "block" : "hidden"
              } text-red-600 text-sm text-start flex items-start gap-1 w-11/12`}
            >
              <ExclamationCircleIcon className="size-5 inline-block" /> Al menos
              un tag es necesario.
            </label>
          </div>

          <label
            className={` text-black text-sm text-start flex items-start gap-1 w-11/12`}
          >
            <ExclamationCircleIcon className="size-5 inline-block" /> Los
            documentos solo pueden ser .PDF y no debe exceder los 50MB de
            tamaño.
          </label>
          <div className="w-full h-[30vh] flex justify-center items-center group">
            <Dropzone
              multiple={false}
              openRef={openRef}
              onDrop={handleDrop}
              accept={PDF_MIME_TYPE} // Ensure only images are accepted
              maxSize={50 * 1024 ** 2} // 50MB
              activateOnClick={true}
              className="w-full h-full border-dashed hover:border-double bg-transparent hover:bg-gray-100 hover:text-blue-dark hover:border-gray-100 duration-300 border-2 rounded-lg border-gray-200 flex justify-center items-center"
            >
              <button
                onClick={() => openRef.current?.()}
                className="w-full h-full"
              >
                Seleccione un documento
              </button>
            </Dropzone>
          </div>
          <div
            className={`${
              files.length > 0 ? "flex" : "hidden"
            } pt-2 w-full flex-col space-y-2`}
          >
            <label className="text-black font-semibold text-lg">
              Documentos
            </label>
            <div className="w-full  border-2 border-gray-400 rounded-lg grid grid-cols-3 p-2 justify-center items-center text-center">
              <label>Nombre</label>
              <label>Tipo</label>
              <label>Acción</label>
            </div>
            {files.map((file, index) => (
              <div
                key={index}
                className="w-full border-2 border-gray-400 rounded-lg grid grid-cols-3 p-2 items-center text-center"
              >
                <label className="truncate">
                  <Tooltip content={file.name}>{file.name}</Tooltip>
                </label>
                <label className="truncate">
                  {file.type.includes("pdf") ? "PDF" : "Excel"}
                </label>
                <div className="flex justify-center">
                  <button
                    onClick={() => {
                      handleDelete(index);
                    }}
                    className="flex justify-center items-center w-10 h-10 rounded-lg bg-red-600 hover:bg-red-600/80 hover:text-white/80 hover:shadow-lg duration-300 text-white"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <label
            className={`${
              warning && !image ? "block" : "hidden"
            } text-red-600 text-sm text-start flex items-start gap-1 w-11/12`}
          >
            <ExclamationCircleIcon className="size-5 inline-block" /> El
            documento es obligatorio.
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
          className="font-semibold flex flex-col items-start gap-1 font-montserrat"
        >
          Editar documento
        </DialogHeader>

        <DialogBody
          placeholder={undefined}
          className="flex flex-col font-montserrat space-y-4 overflow-y-auto no-scrollbar"
        >
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
        </DialogBody>
        <DialogFooter
          placeholder={undefined}
          className="space-x-4 font-montserrat"
        >
          <button
            onClick={handleSubmit}
            className={`${"w-36 h-12 bg-green-500 border-2 border-green-500 text-white hover:bg-white hover:text-green-500 hover:shadow-lg duration-300 rounded-xl flex items-center justify-center"}`}
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
