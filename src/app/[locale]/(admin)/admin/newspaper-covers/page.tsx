"use client";
import { useState } from "react";
import AuthUser from "@/components/admin/auth";
import Sketch from "@/components/admin/sketch";
import { CoversGrid } from "@/components/admin/newspaper-covers/CoversGrid";

export default function Page() {
  const [addOpen, setAddOpen] = useState(false);

  const buttons = [{ name: "Agregar portada", onClick: () => setAddOpen(true) }];

  return (
    <AuthUser permission="create:news">
      <Sketch
        title="Portadas Diarias"
        subtitle="Portadas de periódicos que mencionan a Prodominicana"
        handleFilterOpen={() => {}}
        buttons={buttons}
        hasFilter={false}
      >
        <CoversGrid addOpen={addOpen} onAddClose={() => setAddOpen(false)} />
      </Sketch>
    </AuthUser>
  );
}
