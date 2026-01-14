"use client";
import React, { useState } from "react";
import {
  useAllFeedbacks,
  useApproveFeedback,
  useRejectFeedback,
  useRevertFeedback,
  Feedback,
} from "@/services/feedback/service";
import { useUser } from "@auth0/nextjs-auth0";
import { CheckCircle, XCircle, RotateCcw, Star, Mail, Calendar, X } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export default function FeedbackTable() {
  const { user } = useUser();
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
  const { data: feedbacks, isLoading, error } = useAllFeedbacks(
    statusFilter === "all" ? undefined : statusFilter
  );

  const approveMutation = useApproveFeedback();
  const rejectMutation = useRejectFeedback();
  const revertMutation = useRevertFeedback();

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: "bg-yellow-100 text-yellow-800",
      approved: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
    };
    const labels = {
      pending: "Pendiente",
      approved: "Aprobado",
      rejected: "Rechazado",
    };
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-semibold ${
          styles[status as keyof typeof styles]
        }`}
      >
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  const renderRating = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !feedbacks) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        Error al cargar feedbacks
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Filtros */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex gap-2">
          <button
            onClick={() => setStatusFilter("all")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors font-['Montserrat'] ${
              statusFilter === "all"
                ? "bg-blue-dark text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setStatusFilter("pending")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors font-['Montserrat'] ${
              statusFilter === "pending"
                ? "bg-yellow-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Pendientes
          </button>
          <button
            onClick={() => setStatusFilter("approved")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors font-['Montserrat'] ${
              statusFilter === "approved"
                ? "bg-mint text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Aprobados
          </button>
          <button
            onClick={() => setStatusFilter("rejected")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors font-['Montserrat'] ${
              statusFilter === "rejected"
                ? "bg-red-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Rechazados
          </button>
        </div>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mensaje
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Valoración
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tipo Servicio
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {feedbacks.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                  No hay feedbacks para mostrar
                </td>
              </tr>
            ) : (
              feedbacks.map((feedback: Feedback) => (
                <tr 
                  key={feedback.id} 
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedFeedback(feedback)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {feedback.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Mail className="w-4 h-4" />
                      {feedback.email}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate">
                      {feedback.message}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {renderRating(feedback.rating)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {!feedback.serviceType ? (
                      <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => approveMutation.mutate({ 
                            id: feedback.id, 
                            serviceType: "export" 
                          })}
                          className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs font-semibold hover:bg-purple-200 transition-colors"
                        >
                          → Exportación
                        </button>
                        <button
                          onClick={() => approveMutation.mutate({ 
                            id: feedback.id, 
                            serviceType: "investment" 
                          })}
                          className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-semibold hover:bg-blue-200 transition-colors"
                        >
                          → Inversión
                        </button>
                      </div>
                    ) : (
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        feedback.serviceType === "investment" 
                          ? "bg-blue-100 text-blue-800"
                          : feedback.serviceType === "export"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-gray-100 text-gray-800"
                      }`}>
                        {feedback.serviceType === "investment" 
                          ? "Inversión"
                          : feedback.serviceType === "export"
                          ? "Exportación"
                          : "Sin asignar"}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(feedback.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      {format(new Date(feedback.createdAt), "dd/MM/yyyy", {
                        locale: es,
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                      {feedback.status === "pending" && (
                        <>
                          <button
                            onClick={() => approveMutation.mutate({ 
                              id: feedback.id, 
                              serviceType: feedback.serviceType 
                            })}
                            disabled={approveMutation.isPending}
                            className="p-2 text-mint hover:bg-green-50 rounded-full transition-colors disabled:opacity-50"
                            title="Aprobar"
                          >
                            <CheckCircle className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => rejectMutation.mutate({ 
                              id: feedback.id, 
                              serviceType: feedback.serviceType 
                            })}
                            disabled={rejectMutation.isPending}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors disabled:opacity-50"
                            title="Rechazar"
                          >
                            <XCircle className="w-5 h-5" />
                          </button>
                        </>
                      )}
                      {(feedback.status === "approved" ||
                        feedback.status === "rejected") && (
                        <button
                          onClick={() => revertMutation.mutate({ 
                            id: feedback.id, 
                            serviceType: feedback.serviceType 
                          })}
                          disabled={revertMutation.isPending}
                          className="p-2 text-blue-dark hover:bg-blue-50 rounded-full transition-colors disabled:opacity-50"
                          title="Revertir a pendiente"
                        >
                          <RotateCcw className="w-5 h-5" />
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

      {/* Modal para ver feedback completo */}
      {selectedFeedback && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedFeedback(null)}
        >
          <div 
            className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header con gradiente institucional */}
            <div className="bg-gradient-to-r from-blue-dark to-[#062381] text-white p-6 rounded-t-xl relative">
              <button
                onClick={() => setSelectedFeedback(null)}
                className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <h3 className="text-2xl font-['Montserrat'] font-bold pr-8">Detalle del Feedback</h3>
            </div>

            {/* Contenido */}
            <div className="p-6 space-y-6">
              {/* Info del usuario */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500 font-['Montserrat']">Nombre</label>
                  <p className="text-lg font-semibold text-gray-900 font-['Montserrat']">{selectedFeedback.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 font-['Montserrat']">Email</label>
                  <p className="text-lg text-gray-900 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-blue-dark" />
                    {selectedFeedback.email}
                  </p>
                </div>
              </div>

              {/* Valoración */}
              <div>
                <label className="text-sm font-medium text-gray-500 font-['Montserrat']">Valoración</label>
                <div className="flex gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-6 h-6 ${
                        i < selectedFeedback.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-lg font-semibold text-gray-900">
                    {selectedFeedback.rating}/5
                  </span>
                </div>
              </div>

              {/* Mensaje completo */}
              <div>
                <label className="text-sm font-medium text-gray-500 font-['Montserrat']">Mensaje</label>
                <div className="mt-2 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-gray-900 whitespace-pre-wrap leading-relaxed">
                    {selectedFeedback.message}
                  </p>
                </div>
              </div>

              {/* Estado y fecha */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500 font-['Montserrat']">Estado</label>
                  <div className="mt-1">{getStatusBadge(selectedFeedback.status)}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 font-['Montserrat']">Fecha</label>
                  <p className="text-gray-900 flex items-center gap-2 mt-1">
                    <Calendar className="w-4 h-4 text-blue-dark" />
                    {format(new Date(selectedFeedback.createdAt), "dd/MM/yyyy HH:mm", {
                      locale: es,
                    })}
                  </p>
                </div>
              </div>

              {/* Acciones */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                {selectedFeedback.status === "pending" && (
                  <>
                    <button
                      onClick={() => {
                        approveMutation.mutate(selectedFeedback.id);
                        setSelectedFeedback(null);
                      }}
                      disabled={approveMutation.isPending}
                      className="flex-1 bg-mint hover:bg-mint/90 text-white font-['Montserrat'] font-semibold py-3 px-6 rounded-full transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="w-5 h-5" />
                      Aprobar
                    </button>
                    <button
                      onClick={() => {
                        rejectMutation.mutate(selectedFeedback.id);
                        setSelectedFeedback(null);
                      }}
                      disabled={rejectMutation.isPending}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white font-['Montserrat'] font-semibold py-3 px-6 rounded-full transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      <XCircle className="w-5 h-5" />
                      Rechazar
                    </button>
                  </>
                )}
                {(selectedFeedback.status === "approved" ||
                  selectedFeedback.status === "rejected") && (
                  <button
                    onClick={() => {
                      revertMutation.mutate(selectedFeedback.id);
                      setSelectedFeedback(null);
                    }}
                    disabled={revertMutation.isPending}
                    className="flex-1 bg-blue-dark hover:bg-[#062381] text-white font-['Montserrat'] font-semibold py-3 px-6 rounded-full transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-5 h-5" />
                    Revertir a Pendiente
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
