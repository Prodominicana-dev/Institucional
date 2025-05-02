"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Spinner,
  Switch,
} from "@material-tailwind/react";
import { Montserrat } from "next/font/google";
import { editSection } from "@/services/section/service";
import { useUser } from "@auth0/nextjs-auth0";
import { Section } from "@/models/section";
import Editor from "../../tools/rich-editor/config";
import TextEditor from "../../tools/rich-editor/rich-editor";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { Checkbox } from "@mantine/core";

const monserratStyle = Montserrat({ subsets: ["latin"] });

export function EditSectionDialog({
  section,
  open,
  handler,
  update,
}: {
  section: Section;
  open: boolean;
  handler: () => void;
  update: () => void;
}) {
  const { user, isLoading } = useUser();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [priority, setPriority] = useState(1);
  const [status, setStatus] = useState(true);
  const [uploadData, setUploadData] = useState(false);
  const [isUrl, setIsUrl] = useState(false);
  const [isParent, setIsParent] = useState(false);
  const [isDocument, setIsDocument] = useState(false);
  const [type, setType] = useState("");
  const [toUrl, setToUrl] = useState(false);
  const [toDocument, setToDocument] = useState(false);
  const [imSure, setImSure] = useState(false);

  const handleAcceptUrlWarning = () => {
    setIsUrl(!isUrl);
    setIsDocument(false);
    setIsParent(false);
    setType(!isUrl ? "url" : "");
  };

  const handleAcceptDocumentWarning = () => {
    setIsUrl(false);
    setIsDocument(!isDocument);
    setIsParent(false);
    setType(!isDocument ? "document" : "");
  };

  const editor = Editor({
    placeholder: "Descripción de la sección",
    content: description ? description : "",
  });

  useEffect(() => {
    if (section) {
      section.type === "url"
        ? setIsUrl(true)
        : section.type === "document"
        ? setIsDocument(true)
        : null;

      setName(section.name || "");
      setDescription(section.description || "");
      setPriority(section.priority || 1);
      setStatus(section.status || true);
      setLink(section.url || "");
      setType(section.type || "");
      section.type === "document"
        ? setIsDocument(true)
        : section.type === "url"
        ? setIsUrl(true)
        : null;
    }
  }, [section]);

  const handleSubmit = () => {
    handleUpload();

    if (user && !isLoading) {
      const data = {
        name,
        description: type === "document" ? editor?.getHTML() : null,
        priority: priority,
        url: type === "url" ? link : null,
        status: status,
        type: type,
      };

      editSection(section.id as string, data, update, user.sub as string);
      setTimeout(() => {
        handleUpload();
        handler();
      }, 1000);
    }
  };
  const handleUpload = () => {
    setUploadData(!uploadData);
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
          className="font-semibold"
          style={monserratStyle.style}
        >
          Editar sección
        </DialogHeader>
        <DialogBody
          placeholder={undefined}
          className="flex flex-col space-y-4 overflow-y-auto no-scrollbar min-h-[25vh] max-h-[75vh]"
          style={monserratStyle.style}
        >
          <label
            className={`${
              isDocument ? "block" : "hidden"
            } text-gray-700 text-xs font-light italic text-center`}
          >
            <InformationCircleIcon className="w-4 h-4 inline-block" /> Este
            documento puede contener actualmente una descripción y permite la
            adición de documentos directos. Si desea agregar algún documento, le
            solicitamos que se dirija al apartado de Documentos en el
            administrador correspondiente. Es importante tener en cuenta que no
            se pueden asignar subsecciones a esta sección.
          </label>
          <label
            className={`${
              isUrl ? "block" : "hidden"
            } text-gray-700 text-xs font-light italic text-center`}
          >
            <InformationCircleIcon className="w-4 h-4 inline-block" /> Esta
            sección cuenta con un enlace directo vinculado, por lo tanto, no es
            posible asignarle subsecciones ni agregar documentos.
          </label>
          <label
            className={`${
              isParent ? "block" : "hidden"
            } text-gray-700 text-xs font-light italic text-center`}
          >
            <InformationCircleIcon className="w-4 h-4 inline-block" /> Esta
            sección no tiene un enlace directo vinculado ni documentos, por lo
            tanto, es posible asignarle subsecciones
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
              defaultValue={name}
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
              handleAcceptUrlWarning();
              setImSure(false);
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
            <label
              className={`${
                type !== section.type ? "block" : "hidden"
              } font-normal text-red-500 text-xs text-center pt-4`}
            >
              <InformationCircleIcon className="w-4 h-4 inline-block" /> Si
              cambias esta sección a URL perderás todos los documentos y/o
              subsecciones vinculadas. No hay manera de deshacer esta acción.
            </label>
            <div
              className={`${
                section.type !== type ? "block" : "hidden"
              } w-full pt-4`}
            >
              <Checkbox
                onChange={() => setImSure(!imSure)}
                checked={imSure}
                label={
                  <>
                    Estoy de acuerdo que al cambiar el tipo de esta sección{" "}
                    <span className="font-medium text-blue-dark">
                      se eliminarán todas las subsecciones, con sus datos,
                      vinculadas y/o documentos vinculados
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
                type !== section.type ? "block" : "hidden"
              } font-normal text-red-500 text-xs text-center`}
            >
              <InformationCircleIcon className="w-4 h-4 inline-block " /> Si
              cambias esta sección a DOCUMENTO se desvinculará el enlace directo
              y las subsecciones. No hay manera de deshacer esta acción.
            </label>

            <label className="text-gray-700 text-xs font-light italic text-center">
              <InformationCircleIcon className="w-4 h-4 inline-block" /> No es
              posible añadir ni eliminar documentos desde este apartado. Por
              favor, dirígete a la sección Transparencia {">"} Documentos para
              gestionar los documentos asociados a cada sección.
            </label>
            <label className="text-black text-xs font-light italic text-right">
              (?) = Opcional
            </label>
            <div
              className={`${section.type !== type ? "block" : "hidden"} w-full`}
            >
              <Checkbox
                onChange={() => setImSure(!imSure)}
                checked={imSure}
                label={
                  <>
                    Estoy de acuerdo que al cambiar el tipo de esta sección{" "}
                    <span className="font-medium text-blue-dark">
                      se eliminarán todas las subsecciones, con sus datos,
                      vinculadas y los enlaces directos
                    </span>
                    .
                  </>
                }
              />
            </div>
          </div>
          <div
            className={`${
              section.type !== type && type === "" ? "block" : "hidden"
            } w-full`}
          >
            <Checkbox
              onChange={() => setImSure(!imSure)}
              checked={imSure}
              label={
                <>
                  Estoy de acuerdo que al cambiar el tipo de esta sección{" "}
                  <span className="font-medium text-blue-dark">
                    se elimanarán todos los documentos y enlaces directos
                    vinculados.
                  </span>
                  .
                </>
              }
            />
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
            disabled={uploadData || !name || (section.type !== type && !imSure)}
            onClick={handleSubmit}
            className="w-36 h-12 bg-green-500 border-2 border-green-500 text-white hover:bg-white hover:text-green-500 hover:shadow-lg duration-300 rounded-xl justify-center flex items-center"
          >
            {uploadData ? (
              <Spinner
                className="w-7 h-7"
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              />
            ) : (
              "Confirmar"
            )}
          </button>
        </DialogFooter>
      </Dialog>
      {/* {toUrl && (
        <ChangeTypeMessage
          open={toUrl}
          handleOpen={handleOpenUrlWarning}
          title="¿Estás seguro que quieres cambiar de tipo esta sección?"
          message="Si cambias esta sección a URL perderás todos los documentos y/o subsecciones vinculadas. No hay manera de deshacer esta acción."
          handleAccept={handleAcceptUrlWarning}
          handleCancel={handleOpenUrlWarning}
        />
      )}
      {toDocument && (
        <ChangeTypeMessage
          open={toUrl}
          handleOpen={handleOpenUrlWarning}
          title="¿Estás seguro que quieres cambiar de tipo esta sección?"
          message="Si cambias esta sección a DOCUMENTO se desvinculará el enlace directo y las subsecciones. No hay manera de deshacer esta acción."
          handleAccept={handleAcceptDocumentWarning}
          handleCancel={handleOpenDocumentWarning}
        />
      )} */}
    </>
  );
}
