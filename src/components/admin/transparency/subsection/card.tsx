import { Section } from "@/models/section";
import {
  EyeIcon,
  EyeSlashIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import React, { useState } from "react";

import {
  activeSection,
  deleteSection,
  inactiveSection,
} from "@/services/section/service";
import { useUser } from "@auth0/nextjs-auth0/client";
import DeactiveButton from "../../inactive";
import ActivateButton from "../../active";
import DeleteButton from "../../delete";
import { Subsection } from "@/models/subsection";
import { SubsectionEditDialog } from "./eDialog";
import {
  activeSubsection,
  deleteSubsection,
  inactiveSubsection,
} from "@/services/subsection/service";

export default function Card({
  subsection,
  update,
}: {
  subsection: Subsection;
  update: () => void;
}) {
  const { user, isLoading } = useUser();
  const [editOpen, setEditOpen] = useState(false);
  const [inactive, setInactive] = useState(false);
  const [activate, setActivate] = useState(false);
  const [deleted, setDelete] = useState(false);

  const handleInactiveOpen = () => {
    setInactive(!inactive);
  };

  const handleEditOpen = () => {
    setEditOpen(!editOpen);
  };

  const handleDeactivate = () => {
    if (user && !isLoading) {
      inactiveSubsection(
        subsection.id as string,
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
      activeSubsection(
        subsection.id as string,
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
      deleteSubsection(
        subsection.id as string,
        handleDeleteOpen,
        update,
        user.sub as string
      );
    }
  };
  return (
    <>
      <div className="grid items-center w-full h-24 grid-cols-4 p-5 text-center bg-white rounded-lg  ring-2 ring-gray-100">
        <div>{subsection.name}</div>
        <div>{subsection.section?.name}</div>
        <div>{subsection.status === true ? "Activo" : "Desactivado"}</div>
        <div className="flex justify-center space-x-5 ">
          <button
            onClick={handleEditOpen}
            className="flex items-center justify-center text-black hover:text-white hover:bg-blue-dark duration-300 bg-white rounded-lg w-14 h-14 ring-1 ring-gray-100"
          >
            <PencilSquareIcon className="w-7" />
          </button>
          {subsection.status === true ? (
            <button
              className="flex items-center justify-center text-black hover:text-white hover:bg-black duration-300 bg-white rounded-lg w-14 h-14 ring-1 ring-gray-100"
              onClick={handleInactiveOpen}
            >
              <EyeSlashIcon className="w-7" />
            </button>
          ) : (
            <button
              className="flex items-center justify-center text-black hover:text-white hover:bg-green-500 duration-300 bg-white rounded-lg w-14 h-14 ring-1 ring-gray-100"
              onClick={handleActivateOpen}
            >
              <EyeIcon className="w-7" />
            </button>
          )}
          <button
            onClick={handleDeleteOpen}
            className="flex items-center justify-center text-black hover:text-white hover:bg-red-500 duration-300 bg-white rounded-lg w-14 h-14 ring-1 ring-gray-100"
          >
            <TrashIcon className="w-7" />
          </button>
        </div>
      </div>
      {editOpen && (
        <SubsectionEditDialog
          subsection={subsection}
          open={editOpen}
          handler={handleEditOpen}
          update={update}
        />
      )}
      {inactive && (
        <DeactiveButton
          open={inactive}
          title="Desactivar Subsección"
          message="¿Estás seguro que deseas desactivar esta subsección? Esta acción se puede deshacer."
          handleOpen={handleInactiveOpen}
          funct={handleDeactivate}
        />
      )}
      {activate && (
        <ActivateButton
          open={activate}
          title="Activar Subsección"
          message="¿Estás seguro que deseas activar esta subsección? Será visible para trabajar con ella más adelante. Además, será pública para todo el público."
          handleOpen={handleActivateOpen}
          funct={handleActivate}
        />
      )}
      {deleted && (
        <DeleteButton
          open={deleted}
          title="Eliminar Subsección"
          message="¿Estás seguro que deseas eliminar esta subsección? No podrá ser recuperada."
          handleOpen={handleDeleteOpen}
          funct={handleDelete}
        />
      )}
    </>
  );
}
