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
} from "@material-tailwind/react";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import { Montserrat } from "next/font/google";
import { Group, Text, rem } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { Dropzone, FileWithPath } from "@mantine/dropzone";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useSectionSubsAdmin } from "@/services/subsection/service";
import SectionPopover from "../section/popover";
import { createSection } from "@/services/section/service";
import { useUser } from "@auth0/nextjs-auth0/client";
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
  const { user, isLoading } = useUser();
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [dropzoneLoading, setDropzoneLoading] = useState(false);
  const [dropzoneError, setDropzoneError] = useState(false);
  const [type, setType] = useState("document");
  const [submitLoading, setSubmitLoading] = useState(false);
  const { data, refetch, isLoading: dataLoaded } = useSectionSubsAdmin();
  const [section, setSection] = useState([
    { value: "", label: "Selecciona una sección..." },
  ]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [sectionId, setSectionId] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [openPopover, setOpenPopover] = useState(false);
  const [sectionName, setSectionName] = useState("");
  const [sectionDescription, setSectionDescription] = useState("");
  const [sectionLoading, setSectionLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);

  useEffect(() => {
    if (data && !dataLoaded) {
      setSection(data);
    }
  }, [data, dataLoaded]);

  const handleSectionRefresh = () => {
    setRefresh(!refresh);
  };

  useEffect(() => {
    refetch().then((e) => {
      setSection(e.data);
    });
  }, [refresh]);

  useEffect(() => {
    refetch().then((e) => {
      setSection(e.data);
    });
  }, [refresh]);

  const handleSectionSubmit = () => {
    setSectionLoading(true);
    if (user) {
      const data = {
        name: sectionName,
        description: sectionDescription,
      };
      createSection(data, handleSectionRefresh, user.sub as string).then(() => {
        setTimeout(() => {
          setSectionLoading(false);
          setSectionName("");
          setSectionDescription("");
          handlePopOver();
        }, 1000);
      });
    }
  };

  const handlePopOver = () => {
    setOpenPopover(!openPopover);
  };

  const sectionTriggers = {
    onMouseEnter: () => setOpenPopover(true),
    onMouseLeave: () => setOpenPopover(false),
  };

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
  };

  const handleSubmit = () => {};
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
            <div className="flex flex-row justify-end items-end space-x-4 w-6/12">
              <div className="flex flex-col w-10/12">
                <label
                  htmlFor="section"
                  className="font-semibold text-black text-lg"
                >
                  Sección
                </label>
                <Select
                  placeholder="Seleccione..."
                  id="subsection"
                  className="w-full"
                  maxMenuHeight={200}
                  options={section}
                  onChange={(e) => {
                    setSectionId(e?.value as string);
                  }}
                />
              </div>
              <SectionPopover
                handleOpen={handlePopOver}
                openPopover={openPopover}
                handleSectionSubmit={handleSectionSubmit}
                sectionName={sectionName}
                setSectionName={setSectionName}
                sectionDescription={sectionDescription}
                setSectionDescription={setSectionDescription}
                sectionLoading={sectionLoading}
                sectionTriggers={sectionTriggers}
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
              maxMenuHeight={200}
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
              type="url"
            />
          </div>
        </DialogBody>
        <DialogFooter
          placeholder={false}
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
            onClick={handleSubmit}
            className="w-36 h-12 bg-green-500 border-2 border-green-500 text-white hover:bg-white hover:text-green-500 hover:shadow-lg duration-300 rounded-xl flex items-center justify-center"
          >
            {submitLoading ? <Spinner className="w-7 h-7" /> : "Guardar"}
          </button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
