"use client";
import {
  EyeIcon,
  EyeSlashIcon,
  PencilSquareIcon,
  TrashIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/solid";
import React, { useState } from "react";
import DeactiveButton from "../inactive";
import ActivateButton from "../active";
import DeleteButton from "../delete";
import {
  deleteInitiative,
  disableInitiative,
  enableInitiative,
} from "@/services/mujer-exporta/initiatives/service";
import { useUser } from "@auth0/nextjs-auth0";
import { EditInitiativeDialog } from "./edit";

// Colores por ruta
const RUTA_COLORS: Record<string, { bg: string; text: string }> = {
  aprender: { bg: "bg-blue-100", text: "text-blue-700" },
  impulsar: { bg: "bg-rose-100", text: "text-rose-700" },
  exportar: { bg: "bg-teal-100", text: "text-teal-700" },
  conectar: { bg: "bg-orange-100", text: "text-orange-700" },
};

// Estado de vigencia
function getVigenciaStatus(endDate: string | null, status: boolean) {
  if (!status) return { label: "Inactiva", color: "bg-gray-200 text-gray-600" };
  if (!endDate) return { label: "Sin vencimiento", color: "bg-green-100 text-green-700" };

  const now = new Date();
  const end = new Date(endDate);
  const diffDays = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return { label: "Vencida", color: "bg-red-100 text-red-700" };
  if (diffDays <= 30) return { label: `Vence en ${diffDays} días`, color: "bg-yellow-100 text-yellow-700" };
  return { label: "Vigente", color: "bg-green-100 text-green-700" };
}

export default function Card({
  initiative,
  update,
}: {
  initiative: any;
  update: () => void;
}) {
  const { user, isLoading } = useUser();
  const [activate, setActivate] = useState(false);
  const [deleted, setDelete] = useState(false);
  const [inactive, setInactive] = useState(false);
  const [edit, setEdit] = useState(false);

  const handleEditOpen = () => setEdit(!edit);
  const handleInactiveOpen = () => setInactive(!inactive);
  const handleActivateOpen = () => setActivate(!activate);
  const handleDeleteOpen = () => setDelete(!deleted);

  const handleDeactivate = () => {
    if (user && !isLoading) {
      disableInitiative(initiative.id, handleInactiveOpen, update, user.sub as string);
    }
  };

  const handleActivate = () => {
    if (user && !isLoading) {
      enableInitiative(initiative.id, handleActivateOpen, update, user.sub as string);
    }
  };

  const handleDelete = () => {
    if (user && !isLoading) {
      deleteInitiative(initiative.id, handleDeleteOpen, update, user.sub as string);
    }
  };

  const rutaColors = RUTA_COLORS[initiative.ruta] || { bg: "bg-gray-100", text: "text-gray-700" };
  const vigencia = getVigenciaStatus(initiative.endDate, initiative.status);

  return (
    <>
      <div className="w-full bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 truncate mb-1">
              {initiative.es?.title || "Sin título"}
            </h3>
            <p className="text-sm text-gray-500 truncate">
              {initiative.autor}
            </p>
          </div>
          <a
            href={initiative.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Abrir enlace"
          >
            <ArrowTopRightOnSquareIcon className="w-5 h-5 text-gray-400" />
          </a>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${rutaColors.bg} ${rutaColors.text}`}>
            {initiative.ruta.charAt(0).toUpperCase() + initiative.ruta.slice(1)}
          </span>
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-purple-100 text-purple-700">
            {initiative.tipo}
          </span>
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${vigencia.color}`}>
            {vigencia.label}
          </span>
        </div>

        {/* Descripción */}
        <p className="text-sm text-gray-600 line-clamp-2 mb-4">
          {initiative.es?.description || "Sin descripción"}
        </p>

        {/* Fechas */}
        {(initiative.startDate || initiative.endDate) && (
          <div className="text-xs text-gray-500 mb-4">
            {initiative.startDate && (
              <span>Inicio: {new Date(initiative.startDate).toLocaleDateString("es-DO")}</span>
            )}
            {initiative.startDate && initiative.endDate && <span className="mx-2">|</span>}
            {initiative.endDate && (
              <span>Cierre: {new Date(initiative.endDate).toLocaleDateString("es-DO")}</span>
            )}
          </div>
        )}

        {/* Acciones */}
        <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
          <button
            onClick={handleEditOpen}
            className="flex-1 flex items-center justify-center gap-1 py-2 px-3 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <PencilSquareIcon className="w-4 h-4" />
            Editar
          </button>

          {initiative.status ? (
            <button
              onClick={handleInactiveOpen}
              className="flex-1 flex items-center justify-center gap-1 py-2 px-3 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <EyeSlashIcon className="w-4 h-4" />
              Ocultar
            </button>
          ) : (
            <button
              onClick={handleActivateOpen}
              className="flex-1 flex items-center justify-center gap-1 py-2 px-3 text-sm font-medium text-green-600 hover:bg-green-50 rounded-lg transition-colors"
            >
              <EyeIcon className="w-4 h-4" />
              Activar
            </button>
          )}

          <button
            onClick={handleDeleteOpen}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <TrashIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Modales */}
      {edit && (
        <EditInitiativeDialog
          id={initiative.id}
          open={edit}
          handler={handleEditOpen}
          update={update}
        />
      )}

      {inactive && (
        <DeactiveButton
          open={inactive}
          title="Ocultar Iniciativa"
          message="¿Estás seguro que deseas ocultar esta iniciativa? No será visible en la página pública."
          handleOpen={handleInactiveOpen}
          funct={handleDeactivate}
        />
      )}

      {activate && (
        <ActivateButton
          open={activate}
          title="Activar Iniciativa"
          message="¿Estás seguro que deseas activar esta iniciativa? Será visible en la página pública."
          handleOpen={handleActivateOpen}
          funct={handleActivate}
        />
      )}

      {deleted && (
        <DeleteButton
          open={deleted}
          title="Eliminar Iniciativa"
          message="¿Estás seguro de que deseas eliminar esta iniciativa? Esta acción no se puede deshacer."
          handleOpen={handleDeleteOpen}
          funct={handleDelete}
        />
      )}
    </>
  );
}
