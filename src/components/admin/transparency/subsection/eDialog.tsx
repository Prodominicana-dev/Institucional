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
  Textarea,
  Popover,
  PopoverHandler,
  PopoverContent,
  Typography,
  Chip,
  Spinner,
  Switch,
} from "@material-tailwind/react";
import { createSection } from "@/services/section/service";
import { useUser } from "@auth0/nextjs-auth0";
import Select from "react-select";
import { Montserrat } from "next/font/google";
import {
  createSubsection,
  editSubsection,
  useSectionSubsAdmin,
} from "@/services/subsection/service";
import { InformationCircleIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Subsection } from "@/models/subsection";
import Editor from "../../tools/rich-editor/config";
import TextEditor from "../../tools/rich-editor/rich-editor";
import { Checkbox } from "@mantine/core";
const monserratStyle = Montserrat({ subsets: ["latin"] });

export function SubsectionEditDialog({
  subsection,
  open,
  handler,
  update,
}: {
  subsection: Subsection;
  open: boolean;
  handler: () => void;
  update: () => void;
}) {
  const { user, isLoading } = useUser();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [sectionId, setSectionId] = useState("");
  const { data, refetch, isLoading: dataLoaded } = useSectionSubsAdmin();
  const [section, setSection] = useState([
    { value: "", label: "Selecciona una sección..." },
  ]);

  const [dataLoading, setDataLoading] = useState(false);
  const [isUrl, setIsUrl] = useState(false);
  const [isDocument, setIsDocument] = useState(false);
  const [type, setType] = useState("");

  const [imSure, setImSure] = useState(false);
  const [link, setLink] = useState("");

  const handleAcceptUrlWarning = () => {
    setIsUrl(!isUrl);
    setIsDocument(false);
    setType(!isUrl ? "url" : "");
  };

  const handleAcceptDocumentWarning = () => {
    setIsUrl(false);
    setIsDocument(!isDocument);
    setType(!isDocument ? "document" : "");
  };

  useEffect(() => {
    if (subsection) {
      setName(subsection.name || "");
      setDescription(subsection.description || "");
      setSectionId(subsection.sectionId || "");
      setType(subsection.type || "");
      setLink(subsection.url || "");
      subsection.type === "document"
        ? setIsDocument(true)
        : subsection.type === "url"
        ? setIsUrl(true)
        : null;
    }
  }, [subsection]);

  useEffect(() => {
    if (data && !dataLoaded) {
      setSection(data);
    }
  }, [data, dataLoaded]);

  const handleSubmit = () => {
    setDataLoading(true);
    if (user && !isLoading) {
      const data = {
        name,
        sectionId,
        description: type === "document" ? editor?.getHTML() : null,
        url: type === "url" ? link : null,
        type: type,
      };
      editSubsection(
        subsection.id as string,
        data,
        update,
        user.sub as string
      ).then(() => {
        setDataLoading(false);
        setName("");
        setDescription("");
        handler();
      });
    }
  };

  const editor = Editor({
    placeholder: "Descripción de la sección",
    content: description ? description : "",
  });

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
          Editar Subsección
        </DialogHeader>
        <DialogBody
          placeholder={undefined}
          className="flex flex-col space-y-4 overflow-y-auto no-scrollbar min-h-[25vh] max-h-[75vh]"
          style={monserratStyle.style}
        >
          <div className="flex flex-row space-x-4 w-full">
            <div className="flex flex-col w-6/12">
              <label className="font-semibold text-black text-lg">Nombre</label>
              <Input
                crossOrigin={""}
                id="name"
                className="w-full"
                type="text"
                placeholder="Nombre de la subsección"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
            <div className="flex flex-row justify-end items-end space-x-4 w-6/12">
              <div className="flex flex-col w-full">
                <label
                  htmlFor="name"
                  className="font-semibold text-black text-lg"
                >
                  Sección
                </label>
                <Select
                  placeholder="Seleccione..."
                  isDisabled={true}
                  id="subsection"
                  className="w-full"
                  maxMenuHeight={100}
                  options={section}
                  onChange={(e) => {
                    setSectionId(e?.value as string);
                  }}
                  defaultValue={section.find((e) => e.value === sectionId)}
                  value={section.find((e) => e.value === sectionId)}
                />
              </div>
            </div>
          </div>
          {/* Verificar si la sección será de uno de estos tipos: 
              - Padre: tendrá subsecciones.
              - Tipo enlace directo: tendrá un único link que al dar clic a la sección redirija a esa página.
              - Que pueda albergar documentos: si tiene documentos puede tener descripción. 
          */}

          {/* ENLACE DIRECTO */}
          <Switch
            checked={isUrl}
            onChange={() => {
              handleAcceptUrlWarning();
              setImSure(false);
            }}
            crossOrigin={""}
            label={
              <div>
                <p className="font-semibold text-black text-lg p-4">
                  ¿Esta subsección tendrá algún enlace directo?
                </p>
                <p className="font-normal text-xs text-gray-500">
                  <InformationCircleIcon className="w-4 h-4 inline-block" /> En
                  caso que la sección tenga algún enlace directo, al momento del
                  usuario darle un clic será redirigido a la página que se haya
                  establecido.
                </p>
              </div>
            }
            containerProps={{
              className: "-mt-5",
            }}
          />
          <div className={`${isUrl ? "block" : "hidden"} flex flex-col w-full`}>
            <label className="font-semibold text-black text-lg">Enlace</label>
            <Input
              crossOrigin={""}
              id="name"
              className="w-full"
              type="url"
              value={link}
              placeholder="Enlace directo de la sección"
              onChange={(e) => setLink(e.target.value)}
            />
            <label
              className={`${
                type !== subsection.type ? "block" : "hidden"
              } font-normal text-red-500 text-xs text-center pt-4`}
            >
              <InformationCircleIcon className="w-4 h-4 inline-block" /> Si
              cambias esta subsección a URL perderás todos los documentos
              vinculados. No hay manera de deshacer esta acción.
            </label>
            <div
              className={`${
                subsection.type !== type ? "block" : "hidden"
              } w-full pt-4`}
            >
              <Checkbox
                onChange={() => setImSure(!imSure)}
                checked={imSure}
                label={
                  <>
                    Estoy de acuerdo que al cambiar el tipo de esta subsección{" "}
                    <span className="font-medium text-blue-dark">
                      se eliminarán todos los documentos vinculados
                    </span>
                    .
                  </>
                }
              />
            </div>
          </div>
          {/* Documentos */}
          <Switch
            checked={isDocument}
            onChange={() => {
              handleAcceptDocumentWarning();
              setImSure(false);
            }}
            crossOrigin={""}
            label={
              <div className="p-4">
                <p className="font-semibold text-black text-lg">
                  ¿Esta sección tendrá algún documento vinculado directamente?
                </p>
                <p className="font-normal text-xs text-gray-500">
                  <InformationCircleIcon className="w-4 h-4 inline-block" /> Si
                  la sección tiene algún documento vinculado directamente, no
                  podrás agregar subsecciones. No obstante, se puede añadir
                  información adicional a la sección en caso de ser necesario.
                </p>
              </div>
            }
            containerProps={{
              className: "-mt-5",
            }}
          />
          <div
            className={`${
              isDocument ? "block" : "hidden"
            } flex flex-col w-full space-y-4`}
          >
            <label htmlFor="name" className="font-semibold text-black text-lg">
              Descripción{" "}
              <span className="font-normal text-xs italic">(?)</span>
            </label>
            <TextEditor editor={editor} description={description} />
            <label
              className={`${
                type !== subsection.type ? "block" : "hidden"
              } font-normal text-red-500 text-xs text-center`}
            >
              <InformationCircleIcon className="w-4 h-4 inline-block " /> Si
              cambias esta subsección a DOCUMENTO se desvinculará el enlace
              directo. No hay manera de deshacer esta acción.
            </label>

            <label className="text-gray-700 text-xs font-light italic text-center">
              <InformationCircleIcon className="w-4 h-4 inline-block" /> No es
              posible añadir ni eliminar documentos desde este apartado. Por
              favor, dirígete al apartado Transparencia {">"} Documentos para
              gestionar los documentos asociados a cada subsección.
            </label>
            <label className="text-black text-xs font-light italic text-right">
              (?) = Opcional
            </label>
            <div
              className={`${
                subsection.type !== type ? "block" : "hidden"
              } w-full`}
            >
              <Checkbox
                onChange={() => setImSure(!imSure)}
                checked={imSure}
                label={
                  <>
                    Estoy de acuerdo que al cambiar el tipo de esta subsección{" "}
                    <span className="font-medium text-blue-dark">
                      se eliminarán los enlaces directos
                    </span>
                    .
                  </>
                }
              />
            </div>
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
            onClick={handleSubmit}
            disabled={
              !name ||
              !sectionId ||
              dataLoading ||
              (subsection.type !== type && !imSure)
            }
            className="w-36 h-12 bg-green-500 border-2 border-green-500 text-white hover:bg-white hover:text-green-500 hover:shadow-lg duration-300 rounded-xl justify-center flex items-center"
          >
            {dataLoading ? (
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
