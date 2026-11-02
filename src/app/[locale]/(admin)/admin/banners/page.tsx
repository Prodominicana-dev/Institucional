"use client";
import { useState } from "react";
import AuthUser from "@/components/admin/auth";
import Sketch from "@/components/admin/sketch";
import { BannersGrid } from "@/components/admin/banners/BannersGrid";

export default function Page() {
  const [addOpen, setAddOpen] = useState(false);

  const buttons = [{ name: "Agregar banner", onClick: () => setAddOpen(true) }];

  return (
    <AuthUser permission="create:news">
      <Sketch
        title="Banners"
        subtitle="Banners del carrusel de la página de inicio"
        handleFilterOpen={() => {}}
        buttons={buttons}
        hasFilter={false}
      >
        <BannersGrid addOpen={addOpen} onAddClose={() => setAddOpen(false)} />
      </Sketch>
    </AuthUser>
  );
}
