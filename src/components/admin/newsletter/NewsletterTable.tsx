"use client";
import { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import {
  PencilSquareIcon,
  TrashIcon,
  PaperAirplaneIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import { HashLoader } from "react-spinners";
import DeleteButton from "@/components/admin/delete";
import {
  Newsletter,
  deleteNewsletter,
} from "@/services/newsletter/service";
import { NewsletterModal } from "./NewsletterModal";
import { SendModal } from "./SendModal";
import { StatsModal } from "./StatsModal";

interface Props {
  items: Newsletter[];
  isLoading: boolean;
  update: () => void;
}

const STATE_LABELS: Record<string, string> = {
  draft: "Borrador",
  scheduled: "Programado",
  published: "Publicado",
  sent: "Enviado",
};

const STATE_COLORS: Record<string, string> = {
  draft: "bg-gray-100 text-gray-700",
  scheduled: "bg-blue-100 text-blue-700",
  published: "bg-green-100 text-green-700",
  sent: "bg-purple-100 text-purple-700",
};

export function NewsletterTable({ items, isLoading, update }: Props) {
  const { user } = useUser();
  const [editItem, setEditItem] = useState<Newsletter | null>(null);
  const [sendItem, setSendItem] = useState<Newsletter | null>(null);
  const [statsItem, setStatsItem] = useState<Newsletter | null>(null);
  const [deleteItem, setDeleteItem] = useState<Newsletter | null>(null);

  const handleDelete = () => {
    if (!deleteItem || !user) return;
    deleteNewsletter(
      deleteItem.id,
      () => setDeleteItem(null),
      update,
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

  return (
    <>
      <div className="w-full rounded-xl border bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Título
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Estado
                </th>
                <th className="hidden px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 md:table-cell">
                  Enviados
                </th>
                <th className="hidden px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 lg:table-cell">
                  Abiertos
                </th>
                <th className="hidden px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 lg:table-cell">
                  Clicks
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {items.map((nl) => (
                <tr key={nl.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <p className="line-clamp-1 text-sm font-medium text-gray-900">
                      {nl.title}
                    </p>
                    {nl.sentAt && (
                      <p className="text-xs text-gray-400">
                        {new Date(nl.sentAt).toLocaleDateString("es-DO")}
                      </p>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${STATE_COLORS[nl.state] ?? ""}`}
                    >
                      {STATE_LABELS[nl.state] ?? nl.state}
                    </span>
                  </td>
                  <td className="hidden px-4 py-4 text-sm text-gray-600 md:table-cell">
                    {nl.totalSent}
                  </td>
                  <td className="hidden px-4 py-4 text-sm text-gray-600 lg:table-cell">
                    {nl.totalOpened}
                  </td>
                  <td className="hidden px-4 py-4 text-sm text-gray-600 lg:table-cell">
                    {nl.totalClicks}
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex justify-end gap-1">
                      <button
                        onClick={() => setStatsItem(nl)}
                        className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100"
                        title="Ver métricas"
                      >
                        <ChartBarIcon className="h-4 w-4" />
                      </button>
                      {nl.state !== "sent" && (
                        <button
                          onClick={() => setSendItem(nl)}
                          className="rounded-lg p-1.5 text-blue-dark hover:bg-blue-dark/10"
                          title="Enviar"
                        >
                          <PaperAirplaneIcon className="h-4 w-4" />
                        </button>
                      )}
                      <button
                        onClick={() => setEditItem(nl)}
                        className="rounded-lg p-1.5 text-blue-dark hover:bg-blue-dark/10"
                        title="Editar"
                      >
                        <PencilSquareIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setDeleteItem(nl)}
                        className="rounded-lg p-1.5 text-red-600 hover:bg-red-50"
                        title="Eliminar"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {items.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-gray-500">No hay boletines registrados.</p>
          </div>
        )}
      </div>

      {editItem && (
        <NewsletterModal
          open
          newsletter={editItem}
          onClose={() => setEditItem(null)}
          update={update}
        />
      )}
      {sendItem && (
        <SendModal
          open
          newsletter={sendItem}
          onClose={() => setSendItem(null)}
          update={update}
        />
      )}
      {statsItem && (
        <StatsModal
          open
          newsletter={statsItem}
          onClose={() => setStatsItem(null)}
        />
      )}
      {deleteItem && (
        <DeleteButton
          open
          title="Eliminar boletín"
          message={`¿Está seguro de que desea eliminar el boletín "${deleteItem.title}"? Esta acción no se puede deshacer.`}
          handleOpen={() => setDeleteItem(null)}
          funct={handleDelete}
        />
      )}
    </>
  );
}
