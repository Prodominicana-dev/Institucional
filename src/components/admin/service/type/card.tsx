import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";

import { useUser } from "@auth0/nextjs-auth0";
import DeleteButton from "../../delete";
import { deleteNewsCategory } from "@/services/news/categories/service";
import { deleteEventCategory } from "@/services/events/categories/service";
import { deleteServiceCategory } from "@/services/service/categories/service";
import { deleteServiceType } from "@/services/service/type/service";
import { EditServiceTypeDialog } from "./edit";

export default function Card({
  type,
  update,
}: {
  type: any;
  update: () => void;
}) {
  const { user, isLoading } = useUser();
  const [editOpen, setEditOpen] = useState(false);

  const [deleted, setDelete] = useState(false);

  const handleEditOpen = () => {
    setEditOpen(!editOpen);
  };

  const handleDeleteOpen = () => {
    setDelete(!deleted);
  };

  const handleDelete = () => {
    if (user && !isLoading) {
      deleteServiceType(
        type.id as string,
        handleDeleteOpen,
        update,
        user.sub as string
      );
    }
  };
  return (
    <>
      <div className="grid items-center w-full h-24 grid-cols-2 p-5 text-center bg-white rounded-lg  ring-2 ring-gray-100">
        <div>{type.nameEs}</div>
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
        <EditServiceTypeDialog
          type={type}
          open={editOpen}
          handler={handleEditOpen}
          update={update}
        />
      )}

      {deleted && (
        <DeleteButton
          open={deleted}
          title="Eliminar este tipo de servicios"
          message="¿Estás seguro de que deseas eliminar este tipo? Esta acción no se puede deshacer. Se designarán todos los servicios de este tipo como 'Sin Tipo'."
          handleOpen={handleDeleteOpen}
          funct={handleDelete}
        />
      )}
    </>
  );
}
