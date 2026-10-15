"use client";
import React from "react";
import AuthUser from "@/components/admin/auth";
import { BackLink } from "@/components/admin/proeconomia/BackLink";
import Sketch from "@/components/admin/sketch";
import { FeaturedPicker } from "@/components/admin/proeconomia/FeaturedPicker";

export default function Page() {
  return (
    <AuthUser permission="create:news">
      <BackLink />
      <Sketch
        title="Noticias destacadas"
        subtitle="Las noticias grandes del encabezado de Noticias Pro. Se pueden destacar hasta cinco: el encabezado las pasa en carrusel, de la más reciente a la más antigua."
        handleFilterOpen={() => {}}
        hasFilter={false}
        buttons={[]}
      >
        <FeaturedPicker />
      </Sketch>
    </AuthUser>
  );
}
