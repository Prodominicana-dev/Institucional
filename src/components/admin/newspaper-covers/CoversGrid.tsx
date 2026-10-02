"use client";
import { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { HashLoader } from "react-spinners";
import Image from "next/image";
import DeleteButton from "@/components/admin/delete";
import {
  NewspaperCover,
  useNewspaperCovers,
  deleteNewspaperCover,
} from "@/services/newspaper-cover/service";
import { CoverModal } from "./CoverModal";

interface Props {
  addOpen: boolean;
  onAddClose: () => void;
}

export function CoversGrid({ addOpen, onAddClose }: Props) {
  const { user } = useUser();
  const { data, isLoading, refetch } = useNewspaperCovers();
  const [editItem, setEditItem] = useState<NewspaperCover | null>(null);
  const [deleteItem, setDeleteItem] = useState<NewspaperCover | null>(null);

  const handleUpdate = () => { refetch(); };

  const handleDelete = () => {
    if (!deleteItem || !user) return;
    deleteNewspaperCover(
      deleteItem.id,
      () => setDeleteItem(null),
      handleUpdate,
      user.sub as string
    );
  };

  if (isLoading) {
    return (
      <div className="flex w-full justify-center py-20">
        <HashLoader />
      </div>
    );
  }

  const covers = (data ?? []).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <>
      <div className="grid w-full grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
        {covers.map((c) => (
          <div
            key={c.id}
            className="group relative rounded-xl border bg-white shadow-sm overflow-hidden"
          >
            <div className="relative h-52">
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}/newspaper-cover/${c.id}/img/${c.image}`}
                alt={c.media}
                fill
                sizes="300px"
                className="object-cover"
              />
            </div>
            <div className="p-3">
              <p className="truncate text-sm font-semibold text-gray-900">
                {c.media}
              </p>
              <p className="text-xs text-gray-500">
                {new Date(c.date).toLocaleDateString("es-DO")}
              </p>
              {c.link && (
                <a
                  href={c.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block truncate text-xs text-blue-dark hover:underline"
                >
                  Ver artículo
                </a>
              )}
            </div>
            <div className="absolute right-2 top-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
              <button
                onClick={() => setEditItem(c)}
                className="rounded-lg bg-white/90 p-1.5 text-blue-dark shadow backdrop-blur"
                title="Editar"
              >
                <PencilSquareIcon className="h-4 w-4" />
              </button>
              <button
                onClick={() => setDeleteItem(c)}
                className="rounded-lg bg-white/90 p-1.5 text-red-600 shadow backdrop-blur"
                title="Eliminar"
              >
                <TrashIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
        {covers.length === 0 && (
          <p className="col-span-full py-12 text-center text-gray-500">
            No hay portadas registradas.
          </p>
        )}
      </div>

      {addOpen && (
        <CoverModal open onClose={onAddClose} update={handleUpdate} />
      )}
      {editItem && (
        <CoverModal
          open
          cover={editItem}
          onClose={() => setEditItem(null)}
          update={handleUpdate}
        />
      )}
      {deleteItem && (
        <DeleteButton
          open
          title="Eliminar portada"
          message={`¿Está seguro de que desea eliminar la portada de "${deleteItem.media}"? Esta acción no se puede deshacer.`}
          handleOpen={() => setDeleteItem(null)}
          funct={handleDelete}
        />
      )}
    </>
  );
}
