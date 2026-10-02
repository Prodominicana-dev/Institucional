"use client";
import AuthUser from "@/components/admin/auth";
import Sketch from "@/components/admin/sketch";
import { IndicatorsForm } from "@/components/admin/indicators/IndicatorsForm";

export default function Page() {
  return (
    <AuthUser permission="create:news">
      <Sketch
        title="Indicadores Económicos"
        subtitle="Radar Económico — valores visibles en Proeconomía"
        handleFilterOpen={() => {}}
        buttons={[]}
        hasFilter={false}
      >
        <IndicatorsForm />
      </Sketch>
    </AuthUser>
  );
}
