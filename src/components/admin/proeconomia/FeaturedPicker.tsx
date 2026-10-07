"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0";
import { StarIcon } from "@heroicons/react/24/solid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNews } from "@/services/news/service";
import {
  useFeaturedNewsAdmin,
  setFeaturedNews,
} from "@/services/news-featured/service";

export function FeaturedPicker() {
  const { user } = useUser();
  const [busca, setBusca] = useState("");
  const [guardando, setGuardando] = useState<string | null>(null);

  const { data: noticias, refetch: refetchNoticias } = useNews("es", true);
  const { data: destacada, refetch: refetchDestacada } =
    useFeaturedNewsAdmin("es");

  const recargar = () => {
    refetchNoticias();
    refetchDestacada();
  };

  const lista: any[] = Array.isArray(noticias) ? noticias : [];
  const filtradas = busca.trim()
    ? lista.filter((n) =>
        (n.title ?? "").toLowerCase().includes(busca.trim().toLowerCase())
      )
    : lista.slice(0, 20);

  const marcar = async (id: string, valor: boolean) => {
    if (!user?.sub) return;
    setGuardando(id);
    await setFeaturedNews(id, valor, recargar, user.sub as string);
    setGuardando(null);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-xl border bg-white p-5 shadow-sm">
        <p className="text-sm font-semibold text-gray-900">
          Noticia destacada actual
        </p>
        {destacada?.id ? (
          <p className="mt-1 text-sm text-gray-600">{destacada.title}</p>
        ) : (
          <p className="mt-1 text-sm text-amber-700">
            Ninguna. El encabezado de Noticias Pro aparece vacío.
          </p>
        )}
      </div>

      <Input
        placeholder="Buscar una noticia por su título..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />
      {!busca.trim() && (
        <p className="-mt-2 text-xs text-gray-500">
          Mostrando las 20 noticias más recientes. Use el buscador para
          encontrar una anterior.
        </p>
      )}

      <div className="flex flex-col gap-2">
        {filtradas.map((n) => {
          const esDestacada = destacada?.id === n.id;
          return (
            <div
              key={n.id}
              className={`flex items-center gap-4 rounded-xl border p-3 ${
                esDestacada ? "border-blue-dark bg-blue-50" : "bg-white"
              }`}
            >
              {n.cover && (
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/news/images/${n.id}/${n.cover}`}
                  alt=""
                  width={96}
                  height={64}
                  className="h-16 w-24 flex-shrink-0 rounded-md object-cover"
                />
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-gray-900">
                  {n.title}
                </p>
                <p className="text-xs text-gray-500">
                  {n.category?.nameEs ?? n.category ?? "Sin categoría"}
                  {n.date
                    ? ` · ${new Date(n.date).toLocaleDateString("es-DO")}`
                    : ""}
                </p>
              </div>
              <Button
                variant={esDestacada ? "secondary" : "default"}
                size="sm"
                disabled={guardando === n.id}
                onClick={() => marcar(n.id, !esDestacada)}
              >
                <StarIcon
                  className={`mr-1 size-4 ${
                    esDestacada ? "text-amber-500" : "text-white"
                  }`}
                />
                {esDestacada ? "Quitar" : "Destacar"}
              </Button>
            </div>
          );
        })}
        {filtradas.length === 0 && (
          <p className="py-6 text-center text-sm text-gray-500">
            No hay noticias que coincidan con la búsqueda.
          </p>
        )}
      </div>
    </div>
  );
}
