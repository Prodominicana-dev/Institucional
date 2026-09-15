"use client";
import AuthUser from "@/components/admin/auth";
import Sketch from "@/components/admin/sketch";
import DeleteButton from "@/components/admin/delete";
import {
  useSubscribers,
  deleteSubscriber,
  exportSubscribers,
} from "@/services/mujer-exporta/subscribers/service";
import { useUser } from "@auth0/nextjs-auth0";
import React, { useState, useEffect, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  MagnifyingGlassIcon,
  ArrowDownTrayIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

export default function Page() {
  const { user, isLoading: userLoading } = useUser();
  const [filterOpen, setFilterOpen] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [search, setSearch] = useState("");
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [exporting, setExporting] = useState(false);

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data, isLoading, refetch } = useSubscribers("");
  const [subscribers, setSubscribers] = useState<any[]>([]);

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  useEffect(() => {
    if (data && !isLoading) {
      setSubscribers(data);
    }
  }, [data, isLoading]);

  useEffect(() => {
    if (user && !userLoading) {
      refetch().then((res: any) => {
        if (res.data) {
          setSubscribers(res.data);
        }
      });
    }
  }, [refresh, user, userLoading]);

  const handleFilterOpen = () => {
    setFilterOpen(!filterOpen);
  };

  const handleDeleteOpen = (id?: string) => {
    if (id) setSelectedId(id);
    setDeleteOpen(!deleteOpen);
  };

  const handleDelete = () => {
    if (user && !userLoading && selectedId) {
      deleteSubscriber(selectedId, () => handleDeleteOpen(), handleRefresh);
    }
  };

  const handleExport = async () => {
    if (user && !userLoading) {
      setExporting(true);
      await exportSubscribers();
      setExporting(false);
    }
  };

  // Filtrar suscriptores
  const filteredSubscribers = useMemo(() => {
    if (!search) return subscribers;

    const q = search.toLowerCase();
    return subscribers.filter((s) => {
      return (
        s.name?.toLowerCase().includes(q) ||
        s.email?.toLowerCase().includes(q) ||
        s.company?.toLowerCase().includes(q)
      );
    });
  }, [subscribers, search]);

  // Paginación
  const totalPages = Math.ceil(filteredSubscribers.length / itemsPerPage);
  const paginatedSubscribers = filteredSubscribers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const buttons = [
    {
      name: exporting ? "Exportando..." : "Exportar CSV",
      onClick: handleExport,
      disabled: exporting,
    },
  ];

  return (
    <AuthUser permission="create:mujer-exporta">
      <Sketch
        title="Mujer Exporta - Suscriptores"
        subtitle="Personas suscritas al programa Mujer Exporta"
        handleFilterOpen={handleFilterOpen}
        buttons={buttons}
      >
        {/* Estadísticas */}
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-rose-50 rounded-xl border border-rose-200 px-6 py-4">
            <p className="text-sm text-rose-600">Total de suscriptores</p>
            <p className="text-3xl font-bold text-rose-700">{subscribers.length}</p>
          </div>
        </div>

        {/* Búsqueda */}
        <div
          className={`${
            filterOpen ? "flex" : "hidden"
          } gap-4 mb-6 p-4 bg-gray-50 rounded-xl`}
        >
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar por nombre, email o empresa..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10"
            />
          </div>
        </div>

        {/* Resultados */}
        <div className="mb-4">
          <p className="text-sm text-gray-500">
            Mostrando {paginatedSubscribers.length} de {filteredSubscribers.length} suscriptores
          </p>
        </div>

        {/* Tabla */}
        <div className="bg-white rounded-xl border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nombre
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                    Empresa
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                    Teléfono
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                    Sector
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedSubscribers.map((subscriber) => (
                  <tr key={subscriber.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <p className="text-sm font-medium text-gray-900">{subscriber.name}</p>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <a
                        href={`mailto:${subscriber.email}`}
                        className="text-sm text-blue-600 hover:underline"
                      >
                        {subscriber.email}
                      </a>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap hidden md:table-cell">
                      <p className="text-sm text-gray-500">{subscriber.company || "-"}</p>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap hidden lg:table-cell">
                      <p className="text-sm text-gray-500">{subscriber.phone || "-"}</p>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap hidden lg:table-cell">
                      <p className="text-sm text-gray-500">{subscriber.sector || "-"}</p>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <p className="text-sm text-gray-500">
                        {new Date(subscriber.created_At).toLocaleDateString("es-DO")}
                      </p>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-right">
                      <button
                        onClick={() => handleDeleteOpen(subscriber.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Eliminar"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {paginatedSubscribers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No se encontraron suscriptores</p>
            </div>
          )}
        </div>

        {/* Paginación */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Anterior
            </Button>
            <span className="text-sm text-gray-500">
              Página {currentPage} de {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Siguiente
            </Button>
          </div>
        )}

        {deleteOpen && (
          <DeleteButton
            open={deleteOpen}
            title="Eliminar Suscriptor"
            message="¿Estás seguro de que deseas eliminar este suscriptor? Esta acción no se puede deshacer."
            handleOpen={() => handleDeleteOpen()}
            funct={handleDelete}
          />
        )}
      </Sketch>
    </AuthUser>
  );
}
