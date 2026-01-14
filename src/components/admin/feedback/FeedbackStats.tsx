"use client";
import React from "react";
import { useFeedbackStats } from "@/services/feedback/service";
import { useUser } from "@auth0/nextjs-auth0";
import { MessageSquare, Clock, CheckCircle, XCircle } from "lucide-react";

export default function FeedbackStats() {
  const { user } = useUser();
  const { data: stats, isLoading, error } = useFeedbackStats();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white rounded-lg shadow p-6 animate-pulse"
          >
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
        Error al cargar estadísticas
      </div>
    );
  }

  const statCards = [
    {
      label: "Total",
      value: stats.total,
      icon: MessageSquare,
      color: "bg-blue-dark",
      textColor: "text-blue-dark",
    },
    {
      label: "Pendientes",
      value: stats.pending,
      icon: Clock,
      color: "bg-yellow-500",
      textColor: "text-yellow-600",
    },
    {
      label: "Aprobados",
      value: stats.approved,
      icon: CheckCircle,
      color: "bg-mint",
      textColor: "text-mint",
    },
    {
      label: "Rechazados",
      value: stats.rejected,
      icon: XCircle,
      color: "bg-red-500",
      textColor: "text-red-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">
                  {stat.label}
                </p>
                <p className={`text-3xl font-bold ${stat.textColor} mt-1`}>
                  {stat.value}
                </p>
              </div>
              <div className={`${stat.color} p-3 rounded-full`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
