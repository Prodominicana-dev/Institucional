"use client";
import React, { Fragment } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { MessageSquare, Clock, CheckCircle, XCircle } from "lucide-react";
import { useUser } from "@auth0/nextjs-auth0";

const queryClient = new QueryClient();
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

// Componente de estadísticas simplificado
function FeedbackStatsTemp() {
  const { user } = useUser();
  
  const { data: stats, isLoading, error } = useQuery({
    queryKey: ["feedbackStatsTemp"],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}/feedback/admin/stats`, {
        headers: {
          user_id: user?.sub || "admin-user-id",
        },
      });
      return data;
    },
    retry: false,
    enabled: !!user,
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        Error al cargar estadísticas. Verifica que estés autenticado como admin.
      </div>
    );
  }

  const statCards = [
    { label: "Total", value: stats.total, icon: MessageSquare, color: "bg-blue-dark", textColor: "text-blue-dark" },
    { label: "Pendientes", value: stats.pending, icon: Clock, color: "bg-yellow-500", textColor: "text-yellow-600" },
    { label: "Aprobados", value: stats.approved, icon: CheckCircle, color: "bg-mint", textColor: "text-green-700" },
    { label: "Rechazados", value: stats.rejected, icon: XCircle, color: "bg-red-500", textColor: "text-red-600" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((stat) => {
        const Icon = stat.icon;
        return (
          <div key={stat.label} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Componente de tabla simplificado
function FeedbackTableTemp() {
  const { user } = useUser();
  const [selectedFeedback, setSelectedFeedback] = React.useState<any | null>(null);
  
  const { data: feedbacks, isLoading, error, refetch } = useQuery({
    queryKey: ["feedbacksTemp"],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}/feedback/admin/all`, {
        headers: {
          user_id: user?.sub || "admin-user-id",
        },
      });
      return data;
    },
    retry: false,
    enabled: !!user,
  });

  const handleApprove = async (id: string) => {
    try {
      await axios.put(`${API_URL}/feedback/admin/${id}/approve`, {}, {
        headers: {
          user_id: user?.sub || "admin-user-id",
        },
      });
      refetch();
      setSelectedFeedback(null);
      alert("Feedback aprobado exitosamente");
    } catch (error) {
      alert("Error al aprobar feedback");
    }
  };

  const handleReject = async (id: string) => {
    try {
      await axios.put(`${API_URL}/feedback/admin/${id}/reject`, {}, {
        headers: {
          user_id: user?.sub || "admin-user-id",
        },
      });
      refetch();
      setSelectedFeedback(null);
      alert("Feedback rechazado exitosamente");
    } catch (error) {
      alert("Error al rechazar feedback");
    }
  };

  if (isLoading) {
    return <div className="bg-white rounded-lg shadow p-6">Cargando feedbacks...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        Error al cargar feedbacks. Verifica que estés autenticado como admin.
      </div>
    );
  }

  return (
    <>
      {/* Modal para ver feedback completo */}
      {selectedFeedback && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedFeedback(null)}
        >
          <div
            className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-dark to-[#062381] text-white p-6 rounded-t-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold">{selectedFeedback.name}</h2>
                  <p className="text-blue-100 mt-1">{selectedFeedback.email}</p>
                </div>
                <button
                  onClick={() => setSelectedFeedback(null)}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              {/* Rating */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">Calificación:</span>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < selectedFeedback.rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    ({selectedFeedback.rating}/5)
                  </span>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">Estado:</span>
                <span
                  className={`px-3 py-1 text-sm rounded-full ${
                    selectedFeedback.status === "approved"
                      ? "bg-green-100 text-green-800"
                      : selectedFeedback.status === "rejected"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {selectedFeedback.status === "approved"
                    ? "Aprobado"
                    : selectedFeedback.status === "rejected"
                    ? "Rechazado"
                    : "Pendiente"}
                </span>
              </div>

              {/* Date */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">Fecha:</span>
                <span className="text-sm text-gray-600">
                  {new Date(selectedFeedback.createdAt).toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>

              {/* Message */}
              <div className="border-t pt-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Comentario completo:</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                    {selectedFeedback.message}
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="border-t p-6 bg-gray-50 rounded-b-lg flex justify-end gap-3">
              {selectedFeedback.status !== "rejected" && (
                <button
                  onClick={() => handleReject(selectedFeedback.id)}
                  className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors flex items-center gap-2 font-medium"
                >
                  <XCircle className="w-5 h-5" />
                  Rechazar
                </button>
              )}
              {selectedFeedback.status !== "approved" && (
                <button
                  onClick={() => handleApprove(selectedFeedback.id)}
                  className="px-6 py-2 bg-mint hover:bg-green-600 text-white rounded-full transition-colors flex items-center gap-2 font-medium"
                >
                  <CheckCircle className="w-5 h-5" />
                  Aprobar
                </button>
              )}
              <button
                onClick={() => setSelectedFeedback(null)}
                className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full transition-colors font-medium"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden relative">

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rating</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mensaje</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {feedbacks?.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                  No hay feedbacks para mostrar
                </td>
              </tr>
            ) : (
              feedbacks?.map((feedback: any) => (
                <tr key={feedback.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{feedback.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{feedback.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center">
                      {feedback.rating}/5
                      <span className="ml-1 text-yellow-400">★</span>
                    </div>
                  </td>
                  <td
                    className="px-6 py-4 text-sm max-w-xs truncate cursor-pointer hover:text-blue-dark hover:underline font-medium"
                    onClick={() => setSelectedFeedback(feedback)}
                    title="Click para ver mensaje completo"
                  >
                    {feedback.message}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        feedback.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : feedback.status === "rejected"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {feedback.status === "approved"
                        ? "Aprobado"
                        : feedback.status === "rejected"
                        ? "Rechazado"
                        : "Pendiente"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {new Date(feedback.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center gap-2">
                      {feedback.status !== "approved" && (
                        <button
                          onClick={() => handleApprove(feedback.id)}
                          className="p-2 bg-mint/20 hover:bg-mint/30 text-green-700 rounded-lg transition-colors"
                          title="Aprobar"
                        >
                          <CheckCircle className="w-5 h-5" />
                        </button>
                      )}
                      {feedback.status !== "rejected" && (
                        <button
                          onClick={() => handleReject(feedback.id)}
                          className="p-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors"
                          title="Rechazar"
                        >
                          <XCircle className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      </div>
    </>
  );
}

export default function Page() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 bg-gradient-to-r from-blue-dark to-[#062381] text-white p-8 rounded-xl shadow-lg">
            <h1 className="text-4xl font-bold font-montserrat">
              Gestión de Feedbacks
            </h1>
            <p className="text-blue-100 mt-2 text-lg">
              Panel temporal para administrar los feedbacks del sistema
            </p>
          </div>

          <div className="space-y-6">
            {/* Estadísticas */}
            <FeedbackStatsTemp />

            {/* Tabla de feedbacks */}
            <FeedbackTableTemp />
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
}
