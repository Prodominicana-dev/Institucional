"use client";
import React, { useRef, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { Dropzone, FileWithPath, PDF_MIME_TYPE } from "@mantine/dropzone";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { HashLoader } from "react-spinners";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { uploadQrDoc } from "@/services/qr-docs/service";
import { formatBytes } from "@/lib/image-compression";

export function QrDocDialog({
  open,
  handler,
  update,
  documento,
}: {
  open: boolean;
  handler: () => void;
  update: () => void;
  /* Si viene un documento, es un reemplazo y el nombre queda bloqueado */
  documento?: { name: string } | null;
}) {
  const { user } = useUser();
  const esReemplazo = !!documento;

  const [nombre, setNombre] = useState(documento?.name ?? "");
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [warning, setWarning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progreso, setProgreso] = useState(0);
  const openRef = useRef<() => void>(null);

  /* Al cambiar el documento a reemplazar se reinicia el formulario */
  React.useEffect(() => {
    setNombre(documento?.name ?? "");
    setFiles([]);
    setWarning(false);
    setProgreso(0);
  }, [documento, open]);

  const handleDrop = (acceptedFiles: FileWithPath[]) => {
    setFiles(acceptedFiles);
    /* En un alta el nombre lo propone el archivo; en un reemplazo no se toca */
    if (!esReemplazo) setNombre(acceptedFiles[0].name);
  };

  const handleDelete = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
    if (!esReemplazo) setNombre("");
  };

  const handleSubmit = async () => {
    if (!nombre || files.length === 0) {
      setWarning(true);
      return;
    }
    if (isLoading) return;

    setIsLoading(true);
    setProgreso(0);

    const formData = new FormData();
    formData.append("name", nombre);
    formData.append("files", files[0] as any);

    const ok = await uploadQrDoc(
      formData,
      update,
      user?.sub as string,
      setProgreso
    );

    setIsLoading(false);
    if (ok) handler();
  };

  return (
    <Dialog open={open} onOpenChange={handler}>
      {/* El encabezado va dentro del contenido: fuera de él se dibujaría en la
          página, debajo de la tabla, en lugar de dentro de la ventana. */}
      <DialogContent className="flex flex-col font-montserrat space-y-4 overflow-y-auto no-scrollbar">
        <DialogHeader className="font-semibold flex flex-col items-start gap-1 font-montserrat">
          <DialogTitle>
            {esReemplazo ? "Reemplazar documento" : "Agregar documento"}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col w-full space-y-4">
          <label className="font-semibold text-black text-lg">
            Nombre del archivo <span className="text-red-600">*</span>
          </label>

          <Input
            crossOrigin={""}
            id="nombre"
            className="w-full"
            disabled={esReemplazo}
            onChange={(e) => setNombre(e.target.value)}
            value={nombre}
            placeholder="nombre-del-documento.pdf"
          />

          {esReemplazo ? (
            <label className="text-black text-sm text-start flex items-start gap-1 w-11/12">
              <ExclamationCircleIcon className="size-5 inline-block shrink-0" />
              El nombre no se puede cambiar: es la dirección que abre el código
              QR ya impreso. El archivo nuevo ocupará su lugar y del anterior se
              guardará una copia.
            </label>
          ) : (
            <label className="text-black text-sm text-start flex items-start gap-1 w-11/12">
              <ExclamationCircleIcon className="size-5 inline-block shrink-0" />
              Este nombre pasa a ser parte de la dirección del documento. Una
              vez impreso el código QR ya no podrá cambiarse.
            </label>
          )}

          <label
            className={`${
              warning && !nombre ? "block" : "hidden"
            } text-red-600 text-sm`}
          >
            <ExclamationCircleIcon className="size-5 inline-block" /> El nombre
            es obligatorio.
          </label>

          <label className="text-black text-sm text-start flex items-start gap-1 w-11/12">
            <ExclamationCircleIcon className="size-5 inline-block shrink-0" />
            Los documentos solo pueden ser .PDF y no deben exceder los 200MB.
          </label>

          <div className="w-full h-[30vh] flex justify-center items-center group">
            <Dropzone
              multiple={false}
              openRef={openRef}
              onDrop={handleDrop}
              accept={PDF_MIME_TYPE}
              maxSize={200 * 1024 ** 2}
              activateOnClick={true}
              className="w-full h-full cursor-pointer border-dashed hover:border-double bg-transparent hover:bg-gray-100 hover:text-blue-dark hover:border-gray-100 duration-300 border-2 rounded-lg border-gray-200 flex justify-center items-center"
            >
              <button
                onClick={() => openRef.current?.()}
                className="w-full h-full cursor-pointer"
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
              Documento
            </label>
            <div className="w-full border-2 border-gray-400 rounded-lg grid grid-cols-3 p-2 justify-center items-center text-center">
              <label>Nombre</label>
              <label>Peso</label>
              <label>Acción</label>
            </div>
            {files.map((file, index) => (
              <div
                key={index}
                className="w-full border-2 border-gray-400 rounded-lg grid grid-cols-3 p-2 items-center text-center"
              >
                <label className="truncate">{file.name}</label>
                <label className="truncate">{formatBytes(file.size)}</label>
                <div className="flex justify-center">
                  <button
                    onClick={() => handleDelete(index)}
                    className="flex justify-center items-center w-10 h-10 rounded-lg bg-red-600 hover:bg-red-600/80 hover:text-white/80 hover:shadow-lg duration-300 text-white cursor-pointer"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <label
            className={`${
              warning && files.length === 0 ? "block" : "hidden"
            } text-red-600 text-sm`}
          >
            <ExclamationCircleIcon className="size-5 inline-block" /> El
            documento es obligatorio.
          </label>

          {/* El avance importa: estos archivos son pesados y la subida tarda */}
          {isLoading && (
            <div className="w-full flex flex-col gap-2">
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-dark duration-300"
                  style={{ width: `${progreso}%` }}
                />
              </div>
              <span className="text-sm text-gray-500">
                Subiendo… {progreso}%
              </span>
            </div>
          )}
        </div>

        <DialogFooter className="space-x-4 font-montserrat">
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-36 h-12 bg-green-500 border-2 border-green-500 text-white hover:bg-white hover:text-green-500 hover:shadow-lg duration-300 rounded-xl flex items-center justify-center disabled:opacity-60 cursor-pointer"
          >
            {isLoading ? <HashLoader size={24} /> : "Guardar"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
