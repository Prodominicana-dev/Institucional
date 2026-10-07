"use client";
import React from "react";
import AuthUser from "@/components/admin/auth";
import { SectionCards } from "@/components/admin/proeconomia/SectionCards";

export default function Page() {
  return (
    <AuthUser permission="create:news">
      <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12">
        <div className="w-full max-w-3xl bg-white rounded-lg shadow p-8">
          <h1 className="text-3xl font-bold text-navy mb-4">Noticias Pro</h1>
          <p className="text-gray-600 mb-8">
            Administre el apartado Noticias Pro del portal: las noticias que se
            envían, sus suscriptores, las portadas diarias y los indicadores.
          </p>
          <SectionCards />
        </div>
      </div>
    </AuthUser>
  );
}
