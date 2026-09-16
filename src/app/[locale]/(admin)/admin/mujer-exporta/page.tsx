"use client";
import AuthUser from "@/components/admin/auth";
import Card from "@/components/admin/mujer-exporta/card";
import { InitiativeDialog } from "@/components/admin/mujer-exporta/dialog";
import Sketch from "@/components/admin/sketch";
import { useAdminInitiatives } from "@/services/mujer-exporta/initiatives/service";
import { useUser } from "@auth0/nextjs-auth0";
import React, { useState, useEffect, useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const RUTAS = [
  { value: "all", label: "Todas las rutas" },
  { value: "aprender", label: "Aprender" },
  { value: "impulsar", label: "Impulsar" },
  { value: "exportar", label: "Exportar" },
  { value: "conectar", label: "Conectar" },
];

const ESTADOS = [
  { value: "all", label: "Todos los estados" },
  { value: "active", label: "Activas" },
  { value: "inactive", label: "Inactivas" },
  { value: "expired", label: "Vencidas" },
];

export default function Page() {
  const { user, isLoading: userLoading } = useUser();
  const [open, setOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);

  // Filtros
  const [search, setSearch] = useState("");
  const [rutaFilter, setRutaFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const { data, isLoading, refetch } = useAdminInitiatives();
  const [initiatives, setInitiatives] = useState<any[]>([]);

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  useEffect(() => {
    if (data && !isLoading) {
      setInitiatives(data);
    }
  }, [data, isLoading]);

  useEffect(() => {
    if (user && !userLoading) {
      refetch().then((res: any) => {
        if (res.data) {
          setInitiatives(res.data);
        }
      });
    }
  }, [refresh, user, userLoading]);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleFilterOpen = () => {
    setFilterOpen(!filterOpen);
  };

  // Filtrar iniciativas
  const filteredInitiatives = useMemo(() => {
    const now = new Date();

    return initiatives.filter((initiative) => {
      // Filtro de búsqueda
      if (search) {
        const q = search.toLowerCase();
        const title = initiative.es?.title?.toLowerCase() || "";
        const autor = initiative.autor?.toLowerCase() || "";
        const tipo = initiative.tipo?.toLowerCase() || "";
        if (!title.includes(q) && !autor.includes(q) && !tipo.includes(q)) {
          return false;
        }
      }

      // Filtro de ruta
      if (rutaFilter !== "all" && initiative.ruta !== rutaFilter) {
        return false;
      }

      // Filtro de estado
      if (statusFilter !== "all") {
        const isExpired = initiative.endDate && new Date(initiative.endDate) < now;

        if (statusFilter === "active" && (!initiative.status || isExpired)) {
          return false;
        }
        if (statusFilter === "inactive" && initiative.status) {
          return false;
        }
        if (statusFilter === "expired" && (!isExpired || !initiative.status)) {
          return false;
        }
      }

      return true;
    });
  }, [initiatives, search, rutaFilter, statusFilter]);

  const buttons = [
    {
      name: "Agregar",
      onClick: () => {
        handleOpen();
      },
    },
  ];

  // Estadísticas
  const stats = useMemo(() => {
    const now = new Date();
    const total = initiatives.length;
    const active = initiatives.filter(
      (i) => i.status && (!i.endDate || new Date(i.endDate) >= now)
    ).length;
    const inactive = initiatives.filter((i) => !i.status).length;
    const expired = initiatives.filter(
      (i) => i.status && i.endDate && new Date(i.endDate) < now
    ).length;

    return { total, active, inactive, expired };
  }, [initiatives]);

  return (
    <AuthUser permission="create:transparency">
      <Sketch
        title="Mujer Exporta - Iniciativas"
        subtitle="Gestiona las iniciativas del repositorio de Mujer Exporta"
        handleFilterOpen={handleFilterOpen}
        buttons={buttons}
      >
        {/* Estadísticas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl border p-4">
            <p className="text-sm text-gray-500">Total</p>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          </div>
          <div className="bg-green-50 rounded-xl border border-green-200 p-4">
            <p className="text-sm text-green-600">Activas</p>
            <p className="text-2xl font-bold text-green-700">{stats.active}</p>
          </div>
          <div className="bg-gray-50 rounded-xl border p-4">
            <p className="text-sm text-gray-500">Inactivas</p>
            <p className="text-2xl font-bold text-gray-600">{stats.inactive}</p>
          </div>
          <div className="bg-red-50 rounded-xl border border-red-200 p-4">
            <p className="text-sm text-red-600">Vencidas</p>
            <p className="text-2xl font-bold text-red-700">{stats.expired}</p>
          </div>
        </div>

        {/* Filtros */}
        <div
          className={`${
            filterOpen ? "flex" : "hidden"
          } flex-col md:flex-row gap-4 mb-6 p-4 bg-gray-50 rounded-xl`}
        >
          {/* Búsqueda */}
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar por título, autor o tipo..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filtro de ruta */}
          <Select value={rutaFilter} onValueChange={setRutaFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Ruta" />
            </SelectTrigger>
            <SelectContent>
              {RUTAS.map((r) => (
                <SelectItem key={r.value} value={r.value}>
                  {r.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Filtro de estado */}
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              {ESTADOS.map((e) => (
                <SelectItem key={e.value} value={e.value}>
                  {e.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Resultados */}
        <div className="mb-4">
          <p className="text-sm text-gray-500">
            Mostrando {filteredInitiatives.length} de {initiatives.length} iniciativas
          </p>
        </div>

        {/* Grid de Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredInitiatives.map((initiative) => (
            <Card key={initiative.id} initiative={initiative} update={handleRefresh} />
          ))}
        </div>

        {filteredInitiatives.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-gray-500">No se encontraron iniciativas</p>
            {(search || rutaFilter !== "all" || statusFilter !== "all") && (
              <button
                onClick={() => {
                  setSearch("");
                  setRutaFilter("all");
                  setStatusFilter("all");
                }}
                className="mt-2 text-sm text-rose-600 hover:underline"
              >
                Limpiar filtros
              </button>
            )}
          </div>
        )}

        {open && (
          <InitiativeDialog handler={handleOpen} open={open} update={handleRefresh} />
        )}
      </Sketch>
    </AuthUser>
  );
}
