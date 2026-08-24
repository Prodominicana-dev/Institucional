"use client";
import React, { useState } from "react";
import {
  ArrowPathIcon,
  EyeIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { useUser } from "@auth0/nextjs-auth0";
import DeleteButton from "../delete";
import { deleteQrDoc } from "@/services/qr-docs/service";
import { formatBytes } from "@/lib/image-compression";

export default function Card({
  document,
  onReplace,
  update,
}: {
  document: any;
  onReplace: (document: any) => void;
  update: () => void;
}) {
  const { user, isLoading } = useUser();
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleDeleteOpen = () => setDeleteOpen(!deleteOpen);

  const handleDelete = () => {
    if (user && !isLoading) {
      deleteQrDoc(
        document.name as string,
        handleDeleteOpen,
        update,
        user.sub as string
      );
    }
  };

  const actualizado = new Date(document.updatedAt).toLocaleDateString("es-DO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  /* El nombre lleva la columna más ancha y puede ocupar varias líneas: es la
     dirección del código QR y hay que poder leerlo completo. Los nombres
     largos con guiones bajos no cortan solos, de ahí overflow-wrap. */
  return (
    <>
      <div className="grid items-center w-full min-h-24 py-4 grid-cols-[minmax(0,2.6fr)_minmax(0,0.9fr)_minmax(0,1.2fr)_minmax(0,1.3fr)] gap-2 px-5 text-center bg-white rounded-lg ring-2 ring-gray-100">
        <div className="w-full text-start [overflow-wrap:anywhere]">
          {document?.name}
        </div>
        <div>{formatBytes(document?.size ?? 0)}</div>
        <div>{actualizado}</div>

        <div className="flex justify-center space-x-3">
          <a
            href={document?.url}
            target="_blank"
            rel="noopener noreferrer"
            title="Ver el documento tal como lo abre el código QR"
            className="flex items-center justify-center text-black hover:text-white hover:bg-blue-dark duration-300 bg-white rounded-lg w-14 h-14 ring-1 ring-gray-100 cursor-pointer"
          >
            <EyeIcon className="w-7" />
          </a>
          <button
            onClick={() => onReplace(document)}
            title="Reemplazar el archivo conservando su nombre"
            className="flex items-center justify-center text-black hover:text-white hover:bg-blue-dark duration-300 bg-white rounded-lg w-14 h-14 ring-1 ring-gray-100 cursor-pointer"
          >
            <ArrowPathIcon className="w-7" />
          </button>
          <button
            onClick={handleDeleteOpen}
            title="Eliminar el documento"
            className="flex items-center justify-center text-black hover:text-white hover:bg-red-500 duration-300 bg-white rounded-lg w-14 h-14 ring-1 ring-gray-100 cursor-pointer"
          >
            <TrashIcon className="w-7" />
          </button>
        </div>
      </div>

      {/* El nombre va en el mensaje y no en el título: el título se muestra a
          30px y un nombre de archivo largo, al ser una sola palabra, desborda
          el ancho del modal.

          El mensaje explica para qué sirve eliminar —corregir un nombre mal
          escrito— y advierte del único caso en que no debe hacerse: cuando ese
          nombre ya está impreso en un código QR en circulación. */}
      <DeleteButton
        open={deleteOpen}
        handleOpen={handleDeleteOpen}
        title="¿Eliminar este documento?"
        message={`Se eliminará "${document?.name}". Los códigos QR impresos abren el documento por su nombre de archivo, así que elimínalo solo si ese nombre está mal escrito o no corresponde a ningún código en circulación. Luego vuelve a subir el documento con el nombre correcto.`}
        funct={handleDelete}
      />
    </>
  );
}
