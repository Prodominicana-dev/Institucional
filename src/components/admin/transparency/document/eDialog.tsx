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
  Spinner,
  Switch,
  Typography,
} from "@material-tailwind/react";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import { Montserrat } from "next/font/google";
import { Group, Text, rem } from "@mantine/core";
import { Dropzone, FileWithPath } from "@mantine/dropzone";
import { XMarkIcon } from "@heroicons/react/24/solid";
import {
  createSubsection,
  editSubsection,
  useSectionSubsAdmin,
  useSubsectionDocAdmin,
} from "@/services/subsection/service";
import SectionPopover from "../section/popover";
import { useUser } from "@auth0/nextjs-auth0";
import SubsectionPopover from "../subsection/popover";
import {
  createSection,
  editSection,
  useSection,
} from "@/services/section/service";
import { createDocument, editDocument } from "@/services/document/service";
import { Document } from "@/models/document";
import Day_Picker from "../../tools/daypicker";
import { Section } from "@/models/section";
import { Subsection } from "@/models/subsection";
const monserratStyle = Montserrat({ subsets: ["latin"] });

const typeOptions = [
  { value: "document", label: "Documento" },
  { value: "url", label: "URL" },
];
export function EditDocumentDialog({
  document,
  open,
  handler,
  update,
}: {
  document: Document;
  open: boolean;
  handler: () => void;
  update: () => void;
}) {
  const { user, isLoading } = useUser();
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [dropzoneLoading, setDropzoneLoading] = useState(false);
  const [dropzoneError, setDropzoneError] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [sectionId, setSectionId] = useState("");
  const [date, setDate] = useState<Date>(new Date());
  const [subsectionId, setSubsectionId] = useState("");
  const [checked, setChecked] = useState(false);
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  const handleChecked = () => {
    setChecked(!checked);
  };

  useEffect(() => {
    setSectionId(document.sectionId || "");
    setSubsectionId(document.subsectionId || "");
    setDate(new Date(document.date));
    setName(document.name || "");
    setLink(document.url || "");
  }, [document]);

  /* Funcion para cuando droppeen un documento se agregue a la lista ya existente */
  const handleDrop = (acceptedFiles: FileWithPath[]) => {
    setDropzoneLoading(true);
    const newFiles = [...files, ...acceptedFiles];
    setTimeout(() => {
      setFiles(newFiles);
      setDropzoneError(false);
      setDropzoneLoading(false);
    }, 1500);
  };

  /* Handle para manejar cuando haya un error, de esta manera activamos el texto del error. */
  const handleError = () => {
    setDropzoneLoading(true);
    setTimeout(() => {
      setDropzoneError(true);
      setDropzoneLoading(false);
    }, 1500);
  };

  /* Handle para manejar cuando se elimine un documento del arreglo, lo actualizamos. */
  const handleDelete = (index: number) => () => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  /* Handle para el submit, ya sea para crear los archivos en la BD o simplemente agregar la URL al cuerpo de la subseccion o de la seccion. */
  const handleSubmit = () => {
    setSubmitLoading(true);
    if (user && !isLoading) {
      const formData = new FormData();
      formData.append("sectionId", sectionId);
      formData.append("date", date.toISOString());

      // Agrega el subsectionId, si tiene.
      if (subsectionId !== "") {
        formData.append("subsectionId", subsectionId);
      }
      // Agrega cada archivo al FormData
      if (files.length > 0) {
        files.forEach((file) => {
          formData.append("files", file);
        });
      }

      if (document.url) {
        formData.append("url", link);
        formData.append("name", name);
      }

      // Envía el FormData al servidor
      editDocument(
        document.id as string,
        formData,
        update,
        user.sub as string
      ).then(() => {
        handler();
        setSubmitLoading(false);
      });
    }
  };
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
          className="font-semibold "
          style={monserratStyle.style}
        >
          Editar documento
        </DialogHeader>
        <DialogBody
          placeholder={undefined}
          className="flex flex-col space-y-4 overflow-y-auto no-scrollbar min-h-[25vh] max-h-[75vh]"
          style={monserratStyle.style}
        >
          <p className="font-normal text-gray-400 text-xs italic ">
            (i): No se puede editar ni la sección, ni la subsección. Actualiza
            el documento y/o el período.
          </p>
          <div className="flex flex-row space-x-4 w-full justify-center">
            <div className="flex flex-row justify-end items-end space-x-4 w-6/12">
              <div className="flex flex-col w-full">
                <label
                  htmlFor="section"
                  className="font-semibold text-black text-lg"
                >
                  Sección
                </label>
                <Select
                  placeholder="Seleccione..."
                  id="section"
                  className="w-full"
                  maxMenuHeight={200}
                  options={[]}
                  isDisabled={true}
                  value={{
                    value: document.section?.id,
                    label: document.section?.name,
                  }}
                />
              </div>
            </div>
            <div className="flex flex-row justify-start items-end space-x-4 w-6/12">
              <div className="flex flex-col w-full">
                <label
                  htmlFor="section"
                  className="font-semibold text-black text-lg"
                >
                  Subsección
                </label>
                <Select
                  placeholder="Seleccione..."
                  id="subsection"
                  className="w-full"
                  maxMenuHeight={200}
                  options={[]}
                  isDisabled={true}
                  value={{
                    value: document.subsection?.id,
                    label: document.subsection?.name,
                  }}
                />
              </div>
            </div>
          </div>

          <div className="w-full flex flex-row space-x-4">
            <div className="w-6/12 flex flex-col">
              <Day_Picker date={date} setDate={setDate} />
            </div>
          </div>
          <div className="w-full flex">
            <Switch
              onChange={handleChecked}
              checked={checked}
              crossOrigin={""}
              label={
                <div>
                  <label
                    htmlFor="section"
                    className="font-semibold text-black text-base"
                  >
                    {`${
                      !document.url
                        ? "Cambiar el documento..."
                        : "Cambiar enlace al documento..."
                    }`}{" "}
                    <span className="font-normal text-xs italic">(?)</span>
                  </label>
                  <p className="text-gray-400 text-xs">
                    {`${
                      !document.url
                        ? "Al cambiar el documento se perderá el anterior."
                        : "Al cambiar el enlace se perderá el anterior."
                    }`}
                  </p>
                </div>
              }
            />
          </div>

          <div className={`${checked && !document.url ? "block" : "hidden"}`}>
            <Dropzone
              loading={dropzoneLoading}
              onDrop={handleDrop}
              onReject={handleError}
              maxSize={10 * 1024 ** 2}
              accept={[
                "application/pdf",
                "application/vnd.ms-excel",
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
              ]}
            >
              <Group
                justify="center"
                gap="lg"
                mih={110}
                style={{ pointerEvents: "none" }}
              >
                <div>
                  <Text size="lg" inline>
                    Arrastre un nuevo documento aquí
                  </Text>
                  <Text size="sm" c="dimmed" inline mt={7}>
                    El tamaño máximo por documento es de 10MB. Al agregar este
                    nuevo documento se perderá el otro.
                  </Text>
                </div>
              </Group>
            </Dropzone>
          </div>
          <div className={`${checked && document.url ? "block" : "hidden"}`}>
            <div className="w-full flex flex-row space-x-4">
              <div className="flex flex-col w-full">
                <label className="font-semibold text-black text-lg">
                  Título del documento
                </label>
                <Input
                  crossOrigin={""}
                  id="name"
                  className="w-full"
                  type="text"
                  value={name}
                  placeholder="Título del documento en línea"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="font-semibold text-black text-lg">
                  Enlace al documento
                </label>
                <Input
                  crossOrigin={""}
                  id="name"
                  className="w-full"
                  type="url"
                  value={link}
                  placeholder="Enlace directo al documento"
                  onChange={(e) => setLink(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className={`${dropzoneError ? "flex" : "hidden"} text-red-600`}>
            El documento no puede sobrepasar los 10MB.
          </div>
          <div
            className={`${
              files.length > 0 ? "flex" : "hidden"
            } w-full flex-col space-y-2`}
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
                    onClick={handleDelete(index)}
                    className="flex justify-center items-center w-10 h-10 rounded-lg bg-red-600 hover:bg-red-600/80 hover:text-white/80 hover:shadow-lg duration-300 text-white"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </DialogBody>
        <DialogFooter
          placeholder={undefined}
          style={monserratStyle.style}
          className="space-x-4"
        >
          <button
            onClick={handler}
            className="w-36 h-12 bg-white border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white hover:shadow-lg duration-300 rounded-xl"
          >
            Cancelar
          </button>
          <button
            disabled={
              submitLoading ||
              !date ||
              (document.url && !name && !link) ||
              (!date && !document.url)
            }
            onClick={handleSubmit}
            className="w-36 h-12 bg-green-500 border-2 border-green-500 text-white hover:bg-white hover:text-green-500 hover:shadow-lg duration-300 rounded-xl flex items-center justify-center"
          >
            {submitLoading ? (
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
