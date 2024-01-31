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
import { createSection, useSection } from "@/services/section/service";
import { useUser } from "@auth0/nextjs-auth0/client";
import Select from "react-select";
import {
  createSubsection,
  useSectionSubsAdmin,
} from "@/services/subsection/service";
import { InformationCircleIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Montserrat } from "next/font/google";
import SectionPopover from "../section/popover";
import Editor from "../../tools/rich-editor/config";
import TextEditor from "../../tools/rich-editor/rich-editor";
import { Section } from "@/models/section";
import { FileWithPath } from "@mantine/dropzone";
import DropzoneImpl from "../document/dropzone";
import { createDocument } from "@/services/document/service";
const monserratStyle = Montserrat({ subsets: ["latin"] });

export function SubsectionDialog({
  open,
  handler,
  update,
}: {
  open: boolean;
  handler: () => void;
  update: () => void;
}) {
  const { user, isLoading } = useUser();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [sectionId, setSectionId] = useState("");
  const { data, refetch, isLoading: dataLoaded } = useSection();
  const [section, setSection] = useState([
    { value: "", label: "Selecciona una sección..." },
  ]);
  const [refresh, setRefresh] = useState(false);
  const [openPopover, setOpenPopover] = useState(false);
  const [sectionName, setSectionName] = useState("");
  const [sectionDescription, setSectionDescription] = useState("");
  const [sectionLoading, setSectionLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [isUrl, setIsUrl] = useState(false);
  const [isDocument, setIsDocument] = useState(false);
  const [type, setType] = useState("");
  const [fileType, setFileType] = useState("document" as string);
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [fileName, setFileName] = useState("");
  const [fileLink, setFileLink] = useState("");
  const [dropzoneLoading, setDropzoneLoading] = useState(false);
  const [dropzoneError, setDropzoneError] = useState(false);
  const [subsectionId, setSubsectionId] = useState("");

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

  const typeOptions = [
    { value: "document", label: "Documento" },
    { value: "url", label: "Enlace" },
  ];

  useEffect(() => {
    if (subsectionId) {
      console.log(subsectionId);
      // Acciones que se deben realizar después de que sectId se actualice
      // Crear el documento utilizando el ID de la sección
      const docDataForm = new FormData();

      // Agrega cada archivo al FormData
      if (files.length > 0) {
        files.forEach((file) => {
          docDataForm.append(`files`, file);
        });
      }

      if (fileType === "url" && fileLink !== "" && fileName !== "") {
        docDataForm.append("url", fileLink);
        docDataForm.append("name", fileName);
      }

      if ((fileLink !== "" && fileName !== "") || files.length > 0) {
        console.log("toca crear el doc");
        docDataForm.append("sectionId", sectionId);
        docDataForm.append("subsectionId", subsectionId);
        createDocument(docDataForm, update, user?.sub as string).then(() => {
          setDataLoading(false);
          setName("");
          setLink("");
          setFiles([]);
          setFileName("");
          setFileLink("");
          handler();
        });
      }
      handler();
    }
  }, [subsectionId]); // useEffect se ejecutará cuando sectId cambie

  useEffect(() => {
    if (data && !dataLoaded) {
      const sectionData =
        data
          ?.filter((e: Section) => e.type === "" || e.type === null)
          .map((e: Section) => ({ value: e.id, label: e.name })) || [];
      setSection(sectionData);
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

  const handlePopOver = () => {
    setOpenPopover(!openPopover);
  };

  const handleSectionSubmit = () => {
    setSectionLoading(true);
    if (user) {
      const data = {
        name: sectionName,
      };
      createSection(data, handleSectionRefresh, user.sub as string).then(() => {
        setSectionLoading(false);
        setSectionName("");
        setSectionDescription("");
        handlePopOver();
      });
    }
  };
  const handleSubmit = async () => {
    setDataLoading(true);
    if (user) {
      const data = {
        name,
        description: editor?.getHTML(),
        sectionId,
        url: link,
        type: type,
      };
      if (
        type === "document" &&
        ((files.length === 0 &&
          (fileName !== "" || fileName !== null) &&
          (fileLink !== "" || fileLink !== null)) ||
          files.length > 0)
      ) {
        console.log(
          "es documento y tiene archivos",
          fileName,
          fileLink,
          files.length
        );
        // Crear la sección y obtener el ID
        return await createSubsection(
          data,
          update,
          user.sub as string,
          setSubsectionId
        );
      }
      createSubsection(data, update, user.sub as string).then(() => {
        setDataLoading(false);
        setName("");
        setDescription("");
        handler();
      });
    }
  };
  const statusOption = [
    { value: true, label: "Activo" },
    { value: false, label: "Inactivo" },
  ];

  const editor = Editor({
    placeholder: "Descripción de la sección",
    content: description ? description : "",
  });

  const sectionTriggers = {
    onMouseEnter: () => setOpenPopover(true),
    onMouseLeave: () => setOpenPopover(false),
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
          Agregar Subsección
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
              />
            </div>
            <div className="flex flex-row justify-end items-end space-x-4 w-6/12">
              <div className="flex flex-col w-10/12">
                <label
                  htmlFor="name"
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
          </div>
          {/* ENLACE DIRECTO */}
          <Switch
            checked={isUrl}
            onChange={() => {
              setIsUrl(!isUrl);
              setIsDocument(false);
              setType(!isUrl ? "url" : "");
            }}
            crossOrigin={""}
            label={
              <div className="">
                <p className="font-semibold text-black text-lg">
                  ¿Esta subsección tendrá algún enlace directo?
                </p>
                <p className="font-normal text-xs text-gray-500">
                  <InformationCircleIcon className="w-4 h-4 inline-block" /> Si
                  la subsección tiene un enlace vinculado, al hacer clic, el
                  usuario será redirigido a la página establecida.
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
              placeholder="Enlace directo de la subsección"
              onChange={(e) => setLink(e.target.value)}
            />
          </div>
          {/* Documentos */}
          <Switch
            checked={isDocument}
            onChange={() => {
              setIsUrl(false);
              setIsDocument(!isDocument);
              setType(!isDocument ? "document" : "");
            }}
            crossOrigin={""}
            label={
              <div className="p-4">
                <p className="font-semibold text-black text-lg">
                  ¿Esta subsección tendrá algún documento vinculado?
                </p>
                <p className="font-normal text-xs text-gray-500">
                  <InformationCircleIcon className="w-4 h-4 inline-block" /> Al
                  optar por permitir documentos en esta subsección, también
                  tendrás la opción de agregar información adicional en caso de
                  ser necesario.
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
            <label className="font-semibold text-black text-lg">
              Descripción{" "}
              <span className="font-normal text-xs italic">(?)</span>
            </label>
            <TextEditor editor={editor} />
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
                  setFileType(e?.value as string);
                }}
                defaultValue={typeOptions[0]}
              />
            </div>
            <DropzoneImpl
              type={fileType}
              files={files}
              name={fileName}
              link={fileLink}
              setName={setFileName}
              setLink={setFileLink}
              dropzoneError={dropzoneError}
              dropzoneLoading={dropzoneLoading}
              handleDelete={handleDelete}
              handleDrop={handleDrop}
              handleError={handleError}
            />
            <label className="text-black text-xs font-light italic text-right">
              (?) = Opcional
            </label>
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
              (isUrl && !link) ||
              (!isUrl && !isDocument)
            }
            className="w-36 h-12 bg-green-500 border-2 border-green-500 text-white hover:bg-white hover:text-green-500 hover:shadow-lg duration-300 rounded-xl justify-center flex items-center"
          >
            {dataLoading ? <Spinner className="w-7 h-7" /> : "Guardar"}
          </button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
