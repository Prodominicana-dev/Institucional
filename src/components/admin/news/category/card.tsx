import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";

import { useUser } from "@auth0/nextjs-auth0/client";
import DeleteButton from "../../delete";
import { deleteNewsCategory } from "@/services/news/categories/service";
import { CategoryEditDialog } from "./eDialog";

export default function Card({
  category,
  update,
}: {
  category: any;
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
      deleteNewsCategory(
        category.id as string,
        handleDeleteOpen,
        update,
        user.sub as string
      );
    }
  };
  return (
    <>
      <div className="grid items-center w-full h-24 grid-cols-2 p-5 text-center bg-white rounded-lg  ring-2 ring-gray-100">
        <div>{category.nameEs}</div>
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
        <CategoryEditDialog
          category={category}
          open={editOpen}
          handler={handleEditOpen}
          update={update}
        />
      )}

      {deleted && (
        <DeleteButton
          open={deleted}
          title="Eliminar Categoría"
          message="¿Estás seguro de que deseas eliminar esta categoría? Esta acción no se puede deshacer y eliminarás TODAS las noticias vinculadas a esta categoría."
          handleOpen={handleDeleteOpen}
          funct={handleDelete}
        />
      )}
    </>
  );
}
