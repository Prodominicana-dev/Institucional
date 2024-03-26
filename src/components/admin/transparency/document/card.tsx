import { Section } from "@/models/section";
import {
  EyeIcon,
  EyeSlashIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import React, { use, useEffect, useState } from "react";
import {
  activeSection,
  deleteSection,
  inactiveSection,
} from "@/services/section/service";
import { useUser } from "@auth0/nextjs-auth0/client";
import DeactiveButton from "../../inactive";
import ActivateButton from "../../active";
import DeleteButton from "../../delete";
import { EditDocumentDialog } from "./eDialog";
import { Document } from "@/models/document";
import { deleteDocument } from "@/services/document/service";
import { format } from "date-fns";

export default function Card({
  document,
  update,
}: {
  document: any;
  update: () => void;
}) {
  const { user, isLoading } = useUser();
  const [editOpen, setEditOpen] = useState(false);
  const [inactive, setInactive] = useState(false);
  const [activate, setActivate] = useState(false);
  const [deleted, setDelete] = useState(false);
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    if (document.date) {
      setFormattedDate(format(new Date(document.date), "dd/MM/yyyy"));
    }
  }, [document]);
  const handleInactiveOpen = () => {
    setInactive(!inactive);
  };

  const handleEditOpen = () => {
    setEditOpen(!editOpen);
  };

  const handleDeactivate = () => {
    if (user && !isLoading) {
      inactiveSection(
        document.id as string,
        handleInactiveOpen,
        update,
        user.sub as string
      );
    }
  };

  const handleActivateOpen = () => {
    setActivate(!activate);
  };

  const handleActivate = () => {
    if (user && !isLoading) {
      activeSection(
        document.id as string,
        handleActivateOpen,
        update,
        user.sub as string
      );
    }
  };

  const handleDeleteOpen = () => {
    setDelete(!deleted);
  };

  const handleDelete = () => {
    if (user && !isLoading) {
      deleteDocument(
        document.id as string,
        handleDeleteOpen,
        update,
        user.sub as string
      );
    }
  };
  return (
    <>
      <div className="grid items-center w-full h-24 grid-cols-5 p-5 text-center bg-white rounded-lg  ring-2 ring-gray-100">
        <div>{formattedDate}</div>
        <div className="truncate">{document.section.name}</div>
        <div className="truncate">
          {document.subsection?.name ? document.subsection.name : "-"}
        </div>
        <div className="truncate">
          {document.url ? document.url : document.title}
        </div>
        <div className="flex justify-center space-x-5 ">
          <button
            onClick={handleEditOpen}
            className="flex items-center justify-center text-black hover:text-white hover:bg-blue-dark duration-300 bg-white rounded-lg w-14 h-14 ring-1 ring-gray-100"
          >
            <PencilSquareIcon className="w-7" />
          </button>
          <button
            onClick={handleDeleteOpen}
            className="flex items-center justify-center text-black hover:text-white hover:bg-red-500 duration-300 bg-white rounded-lg w-14 h-14 ring-1 ring-gray-100"
          >
            <TrashIcon className="w-7" />
          </button>
        </div>
      </div>
      {editOpen && (
        <EditDocumentDialog
          document={document}
          open={editOpen}
          handler={handleEditOpen}
          update={update}
        />
      )}
      {inactive && (
        <DeactiveButton
          open={inactive}
          title="Desactivar Sección"
          message="¿Estás seguro que deseas desactivar esta sección? Esta acción se puede deshacer."
          handleOpen={handleInactiveOpen}
          funct={handleDeactivate}
        />
      )}
      {activate && (
        <ActivateButton
          open={activate}
          title="Activar Sección"
          message="¿Estás seguro que deseas activar esta sección? Será visible para trabajar con ella más adelante. Además, será pública para todo el público."
          handleOpen={handleActivateOpen}
          funct={handleActivate}
        />
      )}
      {deleted && (
        <DeleteButton
          open={deleted}
          title="Eliminar Documento"
          message="¿Estás seguro que deseas eliminar este documento? Esta acción no se puede deshacer."
          handleOpen={handleDeleteOpen}
          funct={handleDelete}
        />
      )}
    </>
  );
}
