import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";

import { useUser } from "@auth0/nextjs-auth0/client";
import DeleteButton from "../delete";
import { deleteNewsCategory } from "@/services/news/categories/service";
import { deleteEventCategory } from "@/services/events/categories/service";
import { deleteServiceCategory } from "@/services/service/categories/service";
import { deleteServiceType } from "@/services/service/type/service";
import { EditServiceDialog } from "./edit";
import { deleteService } from "@/services/service/service";

export default function Card({
  service,
  update,
}: {
  service: any;
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
      deleteService(
        service.id as string,
        handleDeleteOpen,
        update,
        user.sub as string
      );
    }
  };
  return (
    <>
      <div className="grid items-center w-full h-24 grid-cols-2 lg:grid-cols-4 p-5 text-center bg-white rounded-lg  ring-2 ring-gray-100">
        <div>{service.es.name}</div>
        <div className="hidden lg:block">{service.category}</div>
        <div className="hidden lg:block">{service.typeEs}</div>
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
        <EditServiceDialog
          id={service.id}
          open={editOpen}
          handler={handleEditOpen}
          update={update}
        />
      )}

      {deleted && (
        <DeleteButton
          open={deleted}
          title="Eliminar este servicio"
          message="¿Estás seguro de que deseas eliminar este servicio? Esta acción no se puede deshacer y puede ser perjudicial para los usuarios que lo utilizan."
          handleOpen={handleDeleteOpen}
          funct={handleDelete}
        />
      )}
    </>
  );
}
