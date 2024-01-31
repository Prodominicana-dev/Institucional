"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Spinner,
} from "@material-tailwind/react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import Select from "react-select";
import { Montserrat } from "next/font/google";
import { useSubsection } from "@/services/subsection/service";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useSection } from "@/services/section/service";

import { createDocument } from "@/services/document/service";
import { Subsection } from "@/models/subsection";
import Day_Picker from "../../tools/daypicker";
import DropzoneImpl from "./dropzone";
import { Section } from "@/models/section";
import { FileWithPath } from "@mantine/dropzone";
const monserratStyle = Montserrat({ subsets: ["latin"] });

const typeOptions = [
  { value: "document", label: "Documento" },
  { value: "url", label: "Enlace" },
];
export function DocumentDialog({
  open,
  handler,
  update,
}: {
  open: boolean;
  handler: () => void;
  update: () => void;
}) {
  const { user, isLoading } = useUser();
  const [date, setDate] = React.useState<any>(new Date());
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [dropzoneLoading, setDropzoneLoading] = useState(false);
  const [dropzoneError, setDropzoneError] = useState(false);
  const [type, setType] = useState("document");
  const [submitLoading, setSubmitLoading] = useState(false);
  const { data, refetch, isLoading: dataLoaded } = useSection();
  const [section, setSection] = useState([
    { value: "", label: "Selecciona una sección..." },
  ]);
  const [link, setLink] = useState("");
  const [name, setName] = useState("");

  const [sectionId, setSectionId] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [openPopover, setOpenPopover] = useState(false);
  const [sectionName, setSectionName] = useState("");
  const [sectionDescription, setSectionDescription] = useState("");

  /* Subsection const */
  const {
    data: subsectionData,
    refetch: ssRefetch,
    isLoading: ssLoading,
  } = useSubsection();
  const [openSSPopover, setOpenSSPopover] = useState(false);
  const [subsectionName, setSubsectionName] = useState("");
  const [subsectionDescription, setSubsectionDescription] = useState("");
  const [subsectionLoading, setSubsectionLoading] = useState(false);
  const [subsectionId, setSubsectionId] = useState("");
  const [subsectionRefresh, setSubsectionRefresh] = useState(false);
  const [subsection, setSubsection] = useState([{ value: "", label: "" }]);

  // Validar que se reviso subsection
  const [subsectionChecked, setSubsectionChecked] = useState(false);

  /* Colocar data de los section en el estado: section para el select */
  useEffect(() => {
    if (data && !dataLoaded) {
      const section = data
        .filter((e: Section) => e.type === "")
        .map((section: Section) => ({
          value: section.id,
          label: section.name,
        }));
      setSection(section);
    }
  }, [data, dataLoaded]);

  /* Handle para indicar cuando refrescar la data del select de los section. Solo ocurre cuando agregan uno. */
  const handleSectionRefresh = () => {
    setRefresh(!refresh);
  };

  /* Cuando se refresca la data, capturamos la señal con "refresh" y refrescamos toda la data con el refetch. */
  useEffect(() => {
    refetch().then((e) => {
      setSection(e.data);
    });
  }, [refresh]);

  /* Colocar data de los subsection en el estado: subsection para el select */
  useEffect(() => {
    if (data && sectionId) {
      setSubsectionChecked(false);
      const subsection = data
        .filter((e: Section) => e.type === "" && e.id === sectionId)
        .flatMap((section: Section) => {
          console.log(section);
          return (section.subsection ?? [])
            .filter((e: Subsection) => e.type === "document")
            .map((e: Subsection) => ({ value: e.id, label: e.name }));
        });
      console.log(subsection);
      if (subsection.length === 0) setSubsectionChecked(true);
      setSubsection(subsection);
    }
  }, [sectionId, subsectionData]);

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

  /* Handle para agregar URL a los subsection o section */
  const handleURL = () => {
    if (user) {
      const data = {
        name,
        url: link,
        date,
        sectionId,
        subsectionId,
      };
      createDocument(data, update, user.sub as string).then(() => {
        handler();
        setSubmitLoading(false);
      });
    }
  };

  /* Handle para el submit, ya sea para crear los archivos en la BD o simplemente agregar la URL al cuerpo de la subseccion o de la seccion. */
  const handleSubmit = () => {
    setSubmitLoading(true);
    if (user) {
      if (type === "url") {
        return handleURL();
      }
      const formData = new FormData();
      formData.append("sectionId", sectionId);
      formData.append("subsectionId", subsectionId);
      formData.append("date", date.toISOString());

      // Agrega cada archivo al FormData
      files.forEach((file) => {
        formData.append(`files`, file);
      });

      // Envía el FormData al servidor
      createDocument(formData, update, user.sub as string).then(() => {
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
          Agregar documento
        </DialogHeader>
        <DialogBody
          placeholder={undefined}
          className="flex flex-col space-y-4 overflow-y-auto no-scrollbar min-h-[25vh] max-h-[75vh]"
          style={monserratStyle.style}
        >
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
                  options={section}
                  onChange={(e) => {
                    // Resetear el estado relacionado con Subsection
                    setSubsectionId("");
                    setSubsection([]); // Otra opción para vaciar las opciones del Select Subsection
                    // Actualizar el estado de Section
                    setSectionId(e?.value as string);
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
                  isDisabled={sectionId === "" || subsectionChecked}
                  placeholder="Seleccione..."
                  id="subsection"
                  className="w-full"
                  maxMenuHeight={200}
                  options={subsection}
                  onChange={(e) => {
                    setSubsectionId(e?.value || "");
                  }}
                  value={
                    subsection.find(
                      (option) => option.value === subsectionId
                    ) || null
                  }
                />
              </div>
            </div>
          </div>
          <div className="w-full">
            <label
              className={`${
                subsectionChecked ? "block" : "hidden"
              } font-normal text-red-500 text-xs text-center pt-4`}
            >
              <InformationCircleIcon className="w-4 h-4 inline-block" /> Esta
              sección no tiene subsecciones. Puede agregar documentos
              directamente o crear una subsección en el apartado de
              Subsecciones.
            </label>
          </div>
          <div className="w-full flex flex-row space-x-4">
            <div className="w-6/12 flex flex-col">
              <label className="font-semibold text-black text-lg">Fecha</label>
              <div className="w-full">
                <Day_Picker date={date} setDate={setDate} />
              </div>
            </div>
            <div className="w-6/12 flex flex-col">
              <label className="font-semibold text-black text-lg">
                Tipo de documento
              </label>
              <Select
                placeholder="Seleccione..."
                id="type"
                className="w-full"
                maxMenuHeight={200}
                options={typeOptions}
                onChange={(e) => {
                  setType(e?.value as string);
                }}
                defaultValue={typeOptions[0]}
              />
            </div>
          </div>
          <DropzoneImpl
            type={type}
            files={files}
            name={name}
            link={link}
            setName={setName}
            setLink={setLink}
            dropzoneError={dropzoneError}
            dropzoneLoading={dropzoneLoading}
            handleDelete={handleDelete}
            handleDrop={handleDrop}
            handleError={handleError}
          />
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
              type === "url"
                ? !link || !name || !sectionId || !date || submitLoading
                : files.length === 0 ||
                  !sectionId ||
                  !date ||
                  submitLoading ||
                  (subsectionChecked && !subsectionId)
            }
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
