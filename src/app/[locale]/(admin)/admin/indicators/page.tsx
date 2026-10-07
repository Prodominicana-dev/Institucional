"use client";
import AuthUser from "@/components/admin/auth";
import { BackLink } from "@/components/admin/proeconomia/BackLink";
import Sketch from "@/components/admin/sketch";
import { IndicatorsForm } from "@/components/admin/indicators/IndicatorsForm";

export default function Page() {
  return (
    <AuthUser permission="create:news">
      <BackLink />
      <Sketch
        title="Indicadores Económicos"
        subtitle="Valores visibles en Noticias Pro"
        handleFilterOpen={() => {}}
        buttons={[]}
        hasFilter={false}
      >
        <IndicatorsForm />
      </Sketch>
    </AuthUser>
  );
}
