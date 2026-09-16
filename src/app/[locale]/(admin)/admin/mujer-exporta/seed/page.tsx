"use client";
import AuthUser from "@/components/admin/auth";
import Sketch from "@/components/admin/sketch";
import { Button } from "@/components/ui/button";
import { recursos } from "@/data/mujeresExportadorasRecursos";
import axios from "axios";
import React, { useState } from "react";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ created: number; errors: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSeed = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/mujer-exporta/initiatives/seed`,
        { recursos }
      );
      setResult(response.data);
    } catch (err: any) {
      setError(err?.response?.data?.error || err.message || "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthUser permission="create:transparency">
      <Sketch
        title="Mujer Exporta - Migrar Recursos"
        subtitle="Migrar los recursos estáticos a la base de datos"
      >
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl border p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Recursos a migrar</h2>
            <p className="text-gray-600 mb-4">
              Se migrarán <span className="font-bold text-rose-600">{recursos.length}</span> recursos
              del archivo estático a la base de datos.
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Esta acción creará nuevos registros en la base de datos. Si ya existen registros,
              se crearán duplicados.
            </p>

            <Button
              onClick={handleSeed}
              disabled={loading}
              className="w-full bg-rose-600 hover:bg-rose-700"
            >
              {loading ? "Migrando..." : "Iniciar migración"}
            </Button>
          </div>

          {result && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-green-800 mb-2">Migración completada</h3>
              <p className="text-green-700">
                <span className="font-bold">{result.created}</span> recursos creados correctamente.
              </p>
              {result.errors > 0 && (
                <p className="text-yellow-700 mt-2">
                  <span className="font-bold">{result.errors}</span> recursos con errores.
                </p>
              )}
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-red-800 mb-2">Error</h3>
              <p className="text-red-700">{error}</p>
            </div>
          )}

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Vista previa de recursos</h3>
            <div className="bg-gray-50 rounded-xl border p-4 max-h-96 overflow-y-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Ruta</th>
                    <th className="text-left py-2">Título</th>
                    <th className="text-left py-2">Tipo</th>
                  </tr>
                </thead>
                <tbody>
                  {recursos.slice(0, 20).map((r, i) => (
                    <tr key={i} className="border-b">
                      <td className="py-2 capitalize">{r.ruta}</td>
                      <td className="py-2">{r.titulo.substring(0, 40)}...</td>
                      <td className="py-2">{r.tipo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {recursos.length > 20 && (
                <p className="text-center text-gray-500 mt-4">
                  ... y {recursos.length - 20} recursos más
                </p>
              )}
            </div>
          </div>
        </div>
      </Sketch>
    </AuthUser>
  );
}
