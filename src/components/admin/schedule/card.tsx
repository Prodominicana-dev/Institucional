import {
  ChevronDownIcon,
  ChevronUpIcon,
  EyeIcon,
  EyeSlashIcon,
  PencilSquareIcon,
  PhotoIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";

import { useUser } from "@auth0/nextjs-auth0";
import DeleteButton from "../delete";
import { EditScheduleDialog } from "./edit";
import { Tooltip } from "@material-tailwind/react";
import { deleteSchedule } from "@/services/schedule/service";

export default function Card({
  schedule,
  update,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
}: {
  schedule: any;
  update: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  isFirst: boolean;
  isLast: boolean;
}) {
  const { user, isLoading } = useUser();
  const [editOpen, setEditOpen] = useState(false);
  const [deleted, setDelete] = useState(false);
  const [date, setDate] = useState(new Date(schedule.date));

  useEffect(() => {
    setDate(new Date(schedule.date));
  }, [schedule]);

  const handleEditOpen = () => {
    setEditOpen(!editOpen);
  };

  const handleDeleteOpen = () => {
    setDelete(!deleted);
  };

  const handleDelete = () => {
    if (user && !isLoading) {
      deleteSchedule(
        schedule.id as string,
        handleDeleteOpen,
        update,
        user.sub as string
      );
    }
  };
  return (
    <>
      <div className="grid items-center w-full h-24 grid-cols-2 lg:grid-cols-3 p-5 text-center bg-white rounded-lg  ring-2 ring-gray-100">
        <div className="w-full line-clamp-2">
          <Tooltip>{schedule?.title}</Tooltip>
        </div>
        <div>
          {date.toLocaleString("es", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </div>
        <div className="flex justify-center space-x-5 ">
          <div className="flex flex-col justify-center">
            <button
              onClick={onMoveUp}
              disabled={isFirst}
              title="Subir en la agenda"
              className="flex items-center justify-center text-black hover:text-white hover:bg-blue-dark duration-300 bg-white rounded-t-lg w-10 h-7 ring-1 ring-gray-100 disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-black"
            >
              <ChevronUpIcon className="w-4" />
            </button>
            <button
              onClick={onMoveDown}
              disabled={isLast}
              title="Bajar en la agenda"
              className="flex items-center justify-center text-black hover:text-white hover:bg-blue-dark duration-300 bg-white rounded-b-lg w-10 h-7 ring-1 ring-gray-100 disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-black"
            >
              <ChevronDownIcon className="w-4" />
            </button>
          </div>
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
        <EditScheduleDialog
          schedule={schedule}
          open={editOpen}
          handler={handleEditOpen}
          update={update}
        />
      )}

      {deleted && (
        <DeleteButton
          open={deleted}
          title="Eliminar Agenda"
          message="¿Estás seguro de que deseas eliminar esta agenda? Esta acción no se puede deshacer y además se eliminará este evento de la agenda."
          handleOpen={handleDeleteOpen}
          funct={handleDelete}
        />
      )}
    </>
  );
}
