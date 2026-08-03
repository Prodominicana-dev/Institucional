import {
  EyeIcon,
  EyeSlashIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import React, { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import DeleteButton from "../../delete";
import { MembersEditDialog } from "./eDialog";
import { deleteMember, showMember, hideMember } from "@/services/structure-organizational/members/service";
import Image from "next/image";

export default function Card({
  member,
  update,
}: {
  member: any;
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
      deleteMember(
        member.id as string,
        handleDeleteOpen,
        update,
        user.sub as string
      );
    }
  };

  const handleToggleVisibility = () => {
    if (user && !isLoading) {
      if (member.visible) {
        hideMember(member.id as string, update, user.sub as string);
      } else {
        showMember(member.id as string, update, user.sub as string);
      }
    }
  };

  return (
    <>
      <div className={`grid items-center w-full h-24 grid-cols-2 lg:grid-cols-6 p-5 text-center bg-white rounded-lg ring-2 ${member.visible === false ? 'ring-gray-300 opacity-60' : 'ring-gray-100'}`}>
        <div className="flex items-center justify-center">
          <Image
            width={2000}
            height={2000}
            src={
              `${process.env.NEXT_PUBLIC_API_URL}/files/member/${member.id}/img/${member.image}` ||
              "/svg/avatar.svg"
            }
            alt={member?.name}
            className={`size-14 rounded-xl ${
              member?.image ? "" : "bg-blue-dark"
            }`}
          />
        </div>
        <div>{member?.name}</div>
        <div>{member?.department?.nameEs}</div>
        <div>{member?.role}</div>
        <div className="flex justify-center">
          {member.visible === false ? (
            <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">Oculto</span>
          ) : (
            <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">Visible</span>
          )}
        </div>
        <div className="flex justify-center space-x-3">
          <button
            onClick={handleToggleVisibility}
            className={`flex items-center justify-center duration-300 bg-white rounded-lg w-10 h-10 ring-1 ring-gray-100 ${
              member.visible === false
                ? "text-gray-400 hover:text-white hover:bg-green-500"
                : "text-green-500 hover:text-white hover:bg-gray-500"
            }`}
            title={member.visible === false ? "Mostrar" : "Ocultar"}
          >
            {member.visible === false ? (
              <EyeIcon className="w-5" />
            ) : (
              <EyeSlashIcon className="w-5" />
            )}
          </button>
          <button
            onClick={handleEditOpen}
            className="flex items-center justify-center text-black hover:text-white hover:bg-blue-dark duration-300 bg-white rounded-lg w-10 h-10 ring-1 ring-gray-100"
          >
            <PencilSquareIcon className="w-5" />
          </button>
          <button
            onClick={handleDeleteOpen}
            className="flex items-center justify-center text-black hover:text-white hover:bg-red-500 duration-300 bg-white rounded-lg w-10 h-10 ring-1 ring-gray-100"
          >
            <TrashIcon className="w-5" />
          </button>
        </div>
      </div>
      {editOpen && (
        <MembersEditDialog
          id={member?.id}
          open={editOpen}
          handler={handleEditOpen}
          update={update}
        />
      )}

      {deleted && (
        <DeleteButton
          open={deleted}
          title="Eliminar Colaborador"
          message="¿Estás seguro de que deseas eliminar este colaborador? Esta acción no se puede deshacer."
          handleOpen={handleDeleteOpen}
          funct={handleDelete}
        />
      )}
    </>
  );
}
