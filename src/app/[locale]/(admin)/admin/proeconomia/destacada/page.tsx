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
        title="Noticia destacada"
        subtitle="La noticia grande del encabezado de Noticias Pro. Solo puede haber una: al destacar otra, la anterior se retira sola."
        handleFilterOpen={() => {}}
        hasFilter={false}
        buttons={[]}
      >
        <FeaturedPicker />
      </Sketch>
    </AuthUser>
  );
}
