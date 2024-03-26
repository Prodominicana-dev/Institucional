import {
  EyeIcon,
  EyeSlashIcon,
  PencilSquareIcon,
  PhotoIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import React, { useState } from "react";

import { useUser } from "@auth0/nextjs-auth0/client";
import DeactiveButton from "../inactive";
import ActivateButton from "../active";
import DeleteButton from "../delete";
import { deleteDirection } from "@/services/structure-organizational/service";
import Image from "next/image";
import { deleteMember } from "@/services/structure-organizational/members/service";
import { deleteGallery } from "@/services/gallery/service";
import { GalleryEditDialog } from "./edit";
import Link from "next/link";

export default function Card({
  gallery,
  update,
}: {
  gallery: any;
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
      deleteGallery(
        gallery.id as string,
        handleDeleteOpen,
        update,
        user.sub as string
      );
    }
  };
  return (
    <>
      <div className="grid items-center w-full h-24 grid-cols-2 lg:grid-cols-3 p-5 text-center bg-white rounded-lg  ring-2 ring-gray-100">
        <div className="w-full h-full flex justify-center items-center">
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}/gallery/${gallery?.id}/img/${gallery?.cover}`} // Use the preview URL directly
            alt=""
            width="500"
            height="500"
            className="size-16 rounded-sm  object-cover" // Add bg-white for visibility
          />
        </div>
        <div>{gallery?.title}</div>
        <div className="flex justify-center space-x-5 ">
          <Link
            href={`/admin/gallery/${gallery?.id}`}
            className="flex items-center justify-center text-black hover:text-white hover:bg-blue-dark duration-300 bg-white rounded-lg w-14 h-14 ring-1 ring-gray-100"
          >
            <PhotoIcon className="w-7" />
          </Link>
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
        <GalleryEditDialog
          id={gallery?.id}
          open={editOpen}
          handler={handleEditOpen}
          update={update}
        />
      )}

      {deleted && (
        <DeleteButton
          open={deleted}
          title="Eliminar Galería de Fotos"
          message="¿Estás seguro de que deseas eliminar esta galería de fotos? Esta acción no se puede deshacer y además se eliminarán todas las imágenes asociadas a la galería."
          handleOpen={handleDeleteOpen}
          funct={handleDelete}
        />
      )}
    </>
  );
}
