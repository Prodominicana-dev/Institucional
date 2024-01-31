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
  Spinner,
  Switch,
} from "@material-tailwind/react";
import { createSection } from "@/services/section/service";
import { useUser } from "@auth0/nextjs-auth0/client";
import Select from "react-select";
import { Montserrat } from "next/font/google";
import Editor from "../../tools/rich-editor/config";
import TextEditor from "../../tools/rich-editor/rich-editor";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { set } from "date-fns";
import { FileWithPath } from "@mantine/dropzone";
import DropzoneImpl from "../document/dropzone";
import { createDocument } from "@/services/document/service";
const monserratStyle = Montserrat({ subsets: ["latin"] });
export function SectionDialog({
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
  const [description] = useState("");
  const [link, setLink] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [isUrl, setIsUrl] = useState(false);
  const [isParent, setIsParent] = useState(false);
  const [isDocument, setIsDocument] = useState(false);
  const [type, setType] = useState("");
  const [fileType, setFileType] = useState("document" as string);
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [fileName, setFileName] = useState("");
  const [fileLink, setFileLink] = useState("");
  const [dropzoneLoading, setDropzoneLoading] = useState(false);
  const [dropzoneError, setDropzoneError] = useState(false);
  const [sectId, setSectId] = useState("");

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
    if (sectId) {
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
        docDataForm.append("sectionId", sectId);
        createDocument(docDataForm, update, user?.sub as string).then(() => {
          setSubmitLoading(false);
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
  }, [sectId]); // useEffect se ejecutará cuando sectId cambie

  const handleSubmit = async () => {
    if (user) {
      setSubmitLoading(true);
      const data = {
        name,
        description: editor?.getHTML(),
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
        return await createSection(data, update, user.sub as string, setSectId);
      }
      // Si el tipo no es "document", simplemente crear la sección
      await createSection(data, update, user.sub as string).then(() => {
        setSubmitLoading(false);
        setName("");
        setLink("");
        setFiles([]);
        setFileName("");
        setFileLink("");
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
          Agregar sección
        </DialogHeader>
        <DialogBody
          placeholder={undefined}
          className="flex flex-col space-y-4 overflow-y-auto no-scrollbar min-h-[25vh] max-h-[75vh]"
          style={monserratStyle.style}
        >
          <label className="text-gray-700 text-xs font-light italic text-center">
            <InformationCircleIcon className="w-4 h-4 inline-block" /> Si solo
            añades el nombre de la sección, esta podrá utilizarse para crear
            alguna subsección en base a ella.
          </label>
          <div className="flex flex-col w-full">
            <label htmlFor="name" className="font-semibold text-black text-lg">
              Nombre
            </label>
            <Input
              crossOrigin={""}
              id="name"
              className="w-full"
              onChange={(e) => setName(e.target.value)}
              placeholder="Nombre de la sección"
            />
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
              setIsUrl(!isUrl);
              setIsDocument(false);
              setIsParent(false);
              setType(!isUrl ? "url" : "");
            }}
            crossOrigin={""}
            label={
              <div>
                <p className="font-semibold text-black text-lg p-4">
                  ¿Esta sección tendrá algún enlace directo?
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
            <label className="font-semibold text-black text-lg">
              Enlace <span className="font-normal text-xs italic">(?)</span>
            </label>
            <Input
              crossOrigin={""}
              id="name"
              className="w-full"
              type="url"
              value={link}
              placeholder="Enlace directo de la sección"
              onChange={(e) => setLink(e.target.value)}
            />
          </div>
          {/* Documentos */}
          <Switch
            checked={isDocument}
            onChange={() => {
              setIsUrl(false);
              setIsDocument(!isDocument);
              setIsParent(false);
              setType(!isDocument ? "document" : "");
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
            disabled={submitLoading || !name || (isUrl && !link)}
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
