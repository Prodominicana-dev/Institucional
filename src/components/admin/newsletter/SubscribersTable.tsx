"use client";
import { useState, useMemo } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { TrashIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { HashLoader } from "react-spinners";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import DeleteButton from "@/components/admin/delete";
import {
  NewsletterSubscriber,
  deleteNewsletterSubscriber,
  useNewsletterSubscribers,
} from "@/services/newsletter/subscribers";

interface Props {
  onExport: () => void;
  exporting: boolean;
}

export function SubscribersTable({ onExport, exporting }: Props) {
  const { user } = useUser();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const PER_PAGE = 10;
  const [deleteItem, setDeleteItem] = useState<NewsletterSubscriber | null>(null);

  const { data, isLoading, refetch } = useNewsletterSubscribers("");
  const subscribers = data ?? [];

  const filtered = useMemo(() => {
    if (!search) return subscribers;
    const q = search.toLowerCase();
    return subscribers.filter(
      (s) =>
        s.email?.toLowerCase().includes(q) ||
        s.name?.toLowerCase().includes(q)
    );
  }, [subscribers, search]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handleDelete = () => {
    if (!deleteItem || !user) return;
    deleteNewsletterSubscriber(
      deleteItem.id,
      () => setDeleteItem(null),
      () => { refetch(); },
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
      <div className="mb-4 flex items-center gap-3">
        <div className="bg-blue-dark/5 rounded-xl border border-blue-dark/20 px-5 py-3">
          <p className="text-xs text-blue-dark/70">Total suscriptores</p>
          <p className="text-2xl font-bold text-blue-dark">{subscribers.length}</p>
        </div>
      </div>

      <div className="mb-4 flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Buscar por nombre o email..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="pl-9 h-10 rounded-xl"
          />
        </div>
        <Button
          onClick={onExport}
          disabled={exporting}
          variant="outline"
          className="h-10 rounded-xl"
        >
          {exporting ? "Exportando..." : "Exportar CSV"}
        </Button>
      </div>

      <div className="w-full rounded-xl border bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Nombre</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Email</th>
                <th className="hidden px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 md:table-cell">Estado</th>
                <th className="hidden px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 lg:table-cell">Fecha</th>
                <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginated.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">{s.name ?? "—"}</td>
                  <td className="px-4 py-4 text-sm text-blue-dark">{s.email}</td>
                  <td className="hidden px-4 py-4 md:table-cell">
                    <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${s.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}>
                      {s.status === "active" ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td className="hidden px-4 py-4 text-sm text-gray-500 lg:table-cell">
                    {new Date(s.created_At).toLocaleDateString("es-DO")}
                  </td>
                  <td className="px-4 py-4 text-right">
                    <button
                      onClick={() => setDeleteItem(s)}
                      className="rounded-lg p-1.5 text-red-600 hover:bg-red-50 transition-colors"
                      title="Eliminar"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {paginated.length === 0 && (
          <div className="py-12 text-center text-gray-500">
            No se encontraron suscriptores.
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
            Anterior
          </Button>
          <span className="text-sm text-gray-500">Página {page} de {totalPages}</span>
          <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
            Siguiente
          </Button>
        </div>
      )}

      {deleteItem && (
        <DeleteButton
          open
          title="Eliminar suscriptor"
          message={`¿Está seguro de que desea eliminar al suscriptor "${deleteItem.email}"? Esta acción no se puede deshacer.`}
          handleOpen={() => setDeleteItem(null)}
          funct={handleDelete}
        />
      )}
    </>
  );
}
