import React from "react";
import { Input, Tooltip } from "@material-tailwind/react";
import { Group, Text, rem } from "@mantine/core";
import { Dropzone, FileWithPath } from "@mantine/dropzone";
import { XMarkIcon } from "@heroicons/react/24/solid";

export default function DropzoneImpl({
  type,
  files,
  name,
  link,
  setName,
  setLink,
  dropzoneError,
  dropzoneLoading,
  handleDrop,
  handleError,
  handleDelete,
}: {
  type: string;
  files: FileWithPath[];
  name: string;
  link: string;
  setName: any;
  setLink: any;
  dropzoneError: boolean;
  dropzoneLoading: boolean;
  handleDrop: any;
  handleError: any;
  handleDelete: any;
}) {
  return (
    <>
      <div className={`${type === "document" ? "block" : "hidden"}`}>
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
          className={`${dropzoneError ? "flex" : "hidden"} pt-2 text-red-600`}
        >
          El documento no puede sobrepasar los 10MB.
        </div>
        <div
          className={`${
            files.length > 0 ? "flex" : "hidden"
          } pt-2 w-full flex-col space-y-2`}
        >
          <label className="text-black font-semibold text-lg">Documentos</label>
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
      </div>
      <div className={`${type === "url" ? "block" : "hidden"}`}>
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
    </>
  );
}
