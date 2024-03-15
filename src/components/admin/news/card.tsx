"use client";
import AuthUser from "@/components/admin/auth";
import { NewsDialog } from "@/components/admin/news/dialog";
import Sketch from "@/components/admin/sketch";
import {
  EyeDropperIcon,
  EyeIcon,
  EyeSlashIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { Autocomplete } from "@mantine/core";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { useHover } from "usehooks-ts";
import DeactiveButton from "../inactive";
import ActivateButton from "../active";
import DeleteButton from "../delete";
import { deleteNews, disableNews, enableNews } from "@/services/news/service";
import { useUser } from "@auth0/nextjs-auth0/client";
import { EditNewsDialog } from "./edit";

export default function Card({
  news,
  update,
}: {
  news: any;
  update: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const { user, isLoading } = useUser();
  const [editHover, setEditHover] = useState(false);
  const [enableHover, setEnableHover] = useState(false);
  const [disabledHover, setDisabledHover] = useState(false);
  const [deleteHover, setDeleteHover] = useState(false);
  const [activate, setActivate] = useState(false);
  const [deleted, setDelete] = useState(false);
  const [inactive, setInactive] = useState(false);
  const [edit, setEdit] = useState(false);

  const handleEditOpen = () => {
    setEdit(!edit);
  };

  const handleInactiveOpen = () => {
    setInactive(!inactive);
  };

  const handleDeactivate = () => {
    if (user && !isLoading) {
      disableNews(
        news.id as string,
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
      enableNews(
        news.id as string,
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
      deleteNews(
        news.id as string,
        handleDeleteOpen,
        update,
        user.sub as string
      );
    }
  };

  return (
    <div className="w-full min-h-[60vh] bg-gray-200 flex flex-col justify-center items-center rounded-lg">
      <div className="w-full h-5/6 flex flex-col  items-center  rounded-t-lg">
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}/news/images/${news.id}/${news.cover}`}
          alt={news.title}
          width={1920}
          height={1080}
          className="w-full h-[75%] rounded-t-lg shadow-sm object-cover"
        />
        <div className="w-11/12 h-[25%] flex flex-col justify-center">
          <h1 className="text-2xl text-black font-montserrat font-bold truncate w-full">
            {news.title}
          </h1>
          <p className="text-lg text-black/90 font-montserrat truncate w-full">
            {news.category.nameEs}
          </p>
        </div>
      </div>
      <div className="w-full h-1/6 flex gap-2 relative justify-center items-center group rounded-lg">
        <div
          onMouseEnter={() => setEditHover(true)}
          onMouseLeave={() => setEditHover(false)}
          className={`w-1/3 h-full relative duration-100 flex items-center justify-center ${
            disabledHover || enableHover || deleteHover
              ? "hidden"
              : "group-hover:w-full"
          }`}
        >
          <button
            onClick={handleEditOpen}
            className={`w-8/12 h-4/6 flex gap-2 justify-center items-center rounded-lg bg-blue-500  group-hover:absolute group-hover:w-full group-hover:h-full group-hover:rounded-t-none group-hover:rounded-b-lg group-hover:animate-pulse duration-100`}
          >
            <PencilSquareIcon className="size-8 text-white" />
            <p
              className={`${
                editHover ? "block" : "hidden"
              } text-white font-semibold font-montserrat`}
            >
              Editar
            </p>
          </button>
        </div>

        {news.status ? (
          <div
            onMouseEnter={() => setDisabledHover(true)}
            onMouseLeave={() => setDisabledHover(false)}
            className={`w-1/3 h-full relative  duration-100 flex justify-center items-center ${
              editHover || enableHover || deleteHover
                ? "hidden"
                : "group-hover:w-full"
            }`}
          >
            <button
              onClick={handleInactiveOpen}
              className={` bg-black gap-2 flex justify-center items-center w-8/12 h-4/6 rounded-lg  group-hover:absolute group-hover:w-full group-hover:h-full group-hover:rounded-t-none group-hover:rounded-b-lg group-hover:animate-pulse duration-100`}
            >
              <EyeSlashIcon className="size-8 text-white" />
              <p
                className={`${
                  disabledHover ? "block" : "hidden"
                } text-white font-semibold font-montserrat`}
              >
                Ocultar
              </p>
            </button>
          </div>
        ) : (
          <div
            onMouseEnter={() => setEnableHover(true)}
            onMouseLeave={() => setEnableHover(false)}
            className={`w-1/3 h-full relative duration-100 flex items-center justify-center ${
              disabledHover || editHover || deleteHover
                ? "hidden"
                : "group-hover:w-full"
            }`}
          >
            <button
              onClick={handleActivateOpen}
              className={`bg-green-500 gap-2 flex justify-center items-center w-8/12 h-4/6 rounded-lg  group-hover:absolute group-hover:w-full group-hover:h-full group-hover:rounded-t-none group-hover:rounded-b-lg group-hover:animate-pulse duration-300`}
            >
              <EyeIcon className="size-8 text-white" />
              <p
                className={`${
                  disabledHover ? "block" : "hidden"
                } text-white font-semibold font-montserrat`}
              >
                Publicar
              </p>
            </button>
          </div>
        )}
        <div
          onMouseEnter={() => setDeleteHover(true)}
          onMouseLeave={() => setDeleteHover(false)}
          className={`w-1/3 h-full relative duration-100 flex items-center justify-center ${
            disabledHover || editHover || enableHover
              ? "hidden"
              : "group-hover:w-full"
          }`}
        >
          <button
            onClick={handleDeleteOpen}
            className={`bg-red-500 gap-2 flex justify-center items-center w-8/12 h-4/6 rounded-lg  group-hover:absolute group-hover:w-full group-hover:h-full group-hover:rounded-t-none group-hover:rounded-b-lg group-hover:animate-pulse duration-300`}
          >
            <TrashIcon className="size-8 text-white" />
            <p
              className={`${
                deleteHover ? "block" : "hidden"
              } text-white font-semibold font-montserrat`}
            >
              Eliminar
            </p>
          </button>
        </div>
      </div>
      {edit && (
        <EditNewsDialog
          id={news.id}
          open={edit}
          handler={handleEditOpen}
          update={update}
        />
      )}

      {inactive && (
        <DeactiveButton
          open={inactive}
          title="Ocultar Noticia"
          message="¿Estás seguro que deseas ocultar esta noticia? "
          handleOpen={handleInactiveOpen}
          funct={handleDeactivate}
        />
      )}
      {activate && (
        <ActivateButton
          open={activate}
          title="Activar Noticia"
          message="¿Estás seguro que deseas activar esta noticia? Será visible en la página de noticias."
          handleOpen={handleActivateOpen}
          funct={handleActivate}
        />
      )}
      {deleted && (
        <DeleteButton
          open={deleted}
          title="Eliminar Noticia"
          message="¿Estás seguro de que deseas eliminar esta noticia? Esta acción no se puede deshacer."
          handleOpen={handleDeleteOpen}
          funct={handleDelete}
        />
      )}
    </div>
  );
}
