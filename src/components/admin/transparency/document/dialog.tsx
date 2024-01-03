"use client";
import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Tooltip,
  Input,
} from "@material-tailwind/react";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import { Montserrat } from "next/font/google";
import { Group, Text, rem } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { Dropzone, FileWithPath } from "@mantine/dropzone";
import { XMarkIcon } from "@heroicons/react/24/solid";
const monserratStyle = Montserrat({ subsets: ["latin"] });
const colourOptions = [
  { value: "ocean", label: "Ocean" },
  { value: "blue", label: "Blue" },
  { value: "purple", label: "Purple" },
  { value: "red", label: "Red" },
  { value: "orange", label: "Orange" },
  { value: "yellow", label: "Yellow" },
  { value: "ocean", label: "Ocean" },
  { value: "blue", label: "Blue" },
  { value: "purple", label: "Purple" },
  { value: "red", label: "Red" },
  { value: "orange", label: "Orange" },
  { value: "yellow", label: "Yellow" },
  { value: "ocean", label: "Ocean" },
  { value: "blue", label: "Blue" },
  { value: "purple", label: "Purple" },
  { value: "red", label: "Red" },
  { value: "orange", label: "Orange" },
  { value: "yellow", label: "Yellow" },
];

const typeOptions = [
  { value: "document", label: "Documento" },
  { value: "url", label: "URL" },
];
export function DocumentDialog({
  open,
  handler,
}: {
  open: boolean;
  handler: () => void;
}) {
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [dropzoneLoading, setDropzoneLoading] = useState(false);
  const [dropzoneError, setDropzoneError] = useState(false);
  const [type, setType] = useState("document");
  const handleDrop = (acceptedFiles: FileWithPath[]) => {
    setDropzoneLoading(true);
    const newFiles = [...files, ...acceptedFiles];
    setTimeout(() => {
      setFiles(newFiles);
      setDropzoneError(false);
      setDropzoneLoading(false);
    }, 1500);
  };
  const handleError = () => {
    setDropzoneLoading(true);
    setTimeout(() => {
      setDropzoneError(true);
      setDropzoneLoading(false);
    }, 1500);
  };

  const handleDelete = (index: number) => () => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    console.log(newFiles);
  };
  return (
    <>
      <Dialog
        placeholder={false}
        open={open}
        handler={handler}
        className="p-2 "
      >
        <DialogHeader
          placeholder={false}
          className="font-semibold "
          style={monserratStyle.style}
        >
          Agregar documento
        </DialogHeader>
        <DialogBody
          placeholder={false}
          className="flex flex-col space-y-4 overflow-y-auto no-scrollbar min-h-[40vh] max-h-[75vh]"
          style={monserratStyle.style}
        >
          <div className="flex flex-row space-x-4 w-full justify-center">
            <div className="w-6/12 flex flex-col">
              <label
                htmlFor="section"
                className="font-semibold text-black text-lg"
              >
                Sección
              </label>
              <CreatableSelect
                id="section"
                className="w-full"
                isClearable
                maxMenuHeight={200}
                options={colourOptions}
              />
            </div>
            <div className="w-6/12 flex flex-col">
              <label
                htmlFor="subsection"
                className="font-semibold text-black text-lg"
              >
                Subsección
              </label>
              <CreatableSelect
                id="subsection"
                className="w-full"
                isClearable
                maxMenuHeight={200}
                options={colourOptions}
              />
            </div>
          </div>
          <div className="flex flex-col w-full">
            <label
              htmlFor="subsection"
              className="font-semibold text-black text-lg"
            >
              Tipo
            </label>
            <Select
              id="subsection"
              className="w-full"
              options={typeOptions}
              defaultValue={typeOptions[0]}
              onChange={(e) => setType(e?.value || "")}
            />
          </div>
          <div
            className={`${
              type === "document" ? "flex" : "hidden"
            } w-full flex-col space-y-2`}
          >
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
              multiple
            >
              <Group
                justify="center"
                gap="lg"
                mih={110}
                style={{ pointerEvents: "none" }}
              >
                <div>
                  <Text size="lg" inline>
                    Arrastre los documentos aquí o haga clic para cargarlos
                  </Text>
                  <Text size="sm" c="dimmed" inline mt={7}>
                    El tamaño máximo por documento es de 10MB.
                  </Text>
                </div>
              </Group>
            </Dropzone>
            <div
              className={`${dropzoneError ? "flex" : "hidden"} text-red-600`}
            >
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
                <div className="w-full border-2 border-gray-400 rounded-lg grid grid-cols-3 p-2 items-center text-center">
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
          </div>
          <div
            className={`${type === "url" ? "flex" : "hidden"} w-full flex-col`}
          >
            <label
              htmlFor="subsection"
              className="font-semibold text-black text-lg"
            >
              Enlace
            </label>
            <Input
              crossOrigin={""}
              label=""
              id="subsection"
              className="w-full"
              placeholder="https://www.google.com"
            />
          </div>
        </DialogBody>
        <DialogFooter placeholder={false} style={monserratStyle.style}>
          <Button
            placeholder={false}
            variant="text"
            color="red"
            onClick={handler}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            placeholder={false}
            variant="gradient"
            color="green"
            onClick={handler}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
