"use client";
import React, { useMemo, useState } from "react";
import AuthUser from "@/components/admin/auth";
import Sketch from "@/components/admin/sketch";
import { BackLink } from "@/components/admin/proeconomia/BackLink";
import { useNews } from "@/services/news/service";
import TarjetaPro from "@/components/admin/proeconomia/noticias/TarjetaPro";
import { CrearNoticiaPro } from "@/components/admin/proeconomia/noticias/CrearNoticiaPro";
import { FiltroSeccionesPro } from "@/components/admin/proeconomia/noticias/FiltroSeccionesPro";

/* Noticias de Noticias Pro. Camino propio: aqui solo entran las que tienen
   seccion, y las del portal institucional no aparecen nunca. */
export default function Page() {
  const [open, setOpen] = useState(false);
  const [seccionActiva, setSeccionActiva] = useState("");
  const { data, isLoading, refetch } = useNews("es", true);

  const handleOpen = () => setOpen(!open);
  const handleRefresh = () => {
    refetch();
  };

  const noticiasPro = useMemo(
    () => (data ? (data as any[]).filter((n: any) => n.seccion) : []),
    [data]
  );

  const conteos = useMemo(
    () =>
      noticiasPro.reduce((acc: Record<string, number>, n: any) => {
        acc[n.seccion] = (acc[n.seccion] ?? 0) + 1;
        return acc;
      }, {}),
    [noticiasPro]
  );

  const visibles = seccionActiva
    ? noticiasPro.filter((n: any) => n.seccion === seccionActiva)
    : noticiasPro;

  return (
    <AuthUser permission="create:news">
      <BackLink />
      <Sketch
        title="Noticias de Noticias Pro"
        subtitle="Solo las noticias del apartado Noticias Pro. Las del portal institucional se administran en Noticias."
        hasFilter={false}
        handleFilterOpen={() => {}}
        buttons={[{ name: "Agregar", onClick: handleOpen }]}
      >
        <FiltroSeccionesPro
          activa={seccionActiva}
          setActiva={setSeccionActiva}
          conteos={conteos}
          total={noticiasPro.length}
        />

        {!isLoading && visibles.length === 0 && (
          <p className="w-full py-16 text-center font-montserrat text-gray-500">
            No hay noticias en Noticias Pro todavía. Use “Agregar” para publicar
            la primera.
          </p>
        )}

        <div className="w-full grid lg:grid-cols-4 gap-8">
          {visibles.map((n: any) => (
            <TarjetaPro key={n.id} news={n} update={handleRefresh} />
          ))}
        </div>

        {open && (
          <CrearNoticiaPro
            handler={handleOpen}
            open={open}
            update={handleRefresh}
          />
        )}
      </Sketch>
    </AuthUser>
  );
}
