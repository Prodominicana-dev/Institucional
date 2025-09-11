"use client";
import React from "react";

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow p-8">
        <h1 className="text-3xl font-bold text-navy mb-4">
          Panel de Administración
        </h1>
        <p className="text-gray-600 mb-8">
          Bienvenido al panel de administración. Aquí puedes gestionar usuarios,
          contenido y configuraciones del sistema.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-100 rounded-lg p-6 flex flex-col items-center">
            <span className="text-xl font-semibold text-navy mb-2">
              Novedades
            </span>
            <span className="text-gray-500 text-sm">
              Gestiona las novedades y anuncios.
            </span>
          </div>
          <div className="bg-gray-100 rounded-lg p-6 flex flex-col items-center">
            <span className="text-xl font-semibold text-navy mb-2">
              Contenido
            </span>
            <span className="text-gray-500 text-sm">
              Administra el contenido publicado.
            </span>
          </div>
          <div className="bg-gray-100 rounded-lg p-6 flex flex-col items-center">
            <span className="text-xl font-semibold text-navy mb-2">
              Organizacional
            </span>
            <span className="text-gray-500 text-sm">
              {" "}
              Ajusta las Direcciones y Subsecciones.
            </span>
          </div>
          <div className="bg-gray-100 rounded-lg p-6 flex flex-col items-center">
            <span className="text-xl font-semibold text-navy mb-2">
              Servicios
            </span>
            <span className="text-gray-500 text-sm">
              Gestionar los Servicios y sus tipos.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
