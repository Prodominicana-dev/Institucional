import axios from "axios";
import { toast } from "sonner";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.prodominicana.gob.do";

// Tipos
export interface Feedback {
  id: string;
  name: string;
  email: string;
  message: string;
  rating: number;
  status: "pending" | "approved" | "rejected";
  isPublic: boolean;
  serviceType?: "investment" | "export" | null;
  serviceId?: string | null;
  serviceName?: string | null;
  createdAt: string;
  updatedAt: string;
  reviewedBy: string | null;
  reviewedAt: string | null;
}

export interface FeedbackStats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
}

// Obtener user_id del admin (desde Auth0 o sesión)
const getAdminUserId = () => {
  // TODO: Implementar obtención del user_id desde Auth0 o contexto
  const userId = "admin-user-id"; // Placeholder
  console.log("getAdminUserId:", userId);
  return userId;
};

// Hook para obtener todos los feedbacks con filtro opcional
export function useAllFeedbacks(status?: "pending" | "approved" | "rejected") {
  return useQuery({
    queryKey: ["allFeedbacks", status],
    queryFn: async () => {
      const url = status 
        ? `${API_URL}/feedback/admin/all?status=${status}`
        : `${API_URL}/feedback/admin/all`;
      const { data } = await axios.get<Feedback[]>(url, {
        headers: {
          user_id: getAdminUserId(),
        },
      });
      return data;
    },
  });
}

// Hook para obtener feedbacks aprobados públicos por tipo de servicio
export function usePublicFeedbacks(serviceType?: "investment" | "export") {
  return useQuery({
    queryKey: ["publicFeedbacks", serviceType],
    queryFn: async () => {
      const url = serviceType 
        ? `${API_URL}/feedback/public?serviceType=${serviceType}`
        : `${API_URL}/feedback/public`;
      const { data } = await axios.get<Feedback[]>(url);
      return data;
    },
  });
}

// Hook para obtener feedbacks pendientes (admin)
export function usePendingFeedbacks() {
  return useQuery({
    queryKey: ["pendingFeedbacks"],
    queryFn: async () => {
      const url = `${API_URL}/feedback/admin/pending`;
      const { data } = await axios.get<Feedback[]>(url, {
        headers: {
          user_id: getAdminUserId(),
        },
      });
      return data;
    },
  });
}

// Hook para obtener estadísticas de feedbacks
export function useFeedbackStats() {
  return useQuery({
    queryKey: ["feedbackStats"],
    queryFn: async () => {
      const url = `${API_URL}/feedback/admin/stats`;
      const { data } = await axios.get<FeedbackStats>(url, {
        headers: {
          user_id: getAdminUserId(),
        },
      });
      return data;
    },
  });
}

// Hook para obtener un feedback específico
export function useFeedbackById(id: string) {
  return useQuery({
    queryKey: ["feedback", id],
    queryFn: async () => {
      const url = `${API_URL}/feedback/admin/${id}`;
      const { data } = await axios.get<Feedback>(url, {
        headers: {
          user_id: getAdminUserId(),
        },
      });
      return data;
    },
    enabled: !!id,
  });
}

// Hook legacy (mantener por compatibilidad)
export function useFeedbacks() {
  return useQuery({
    queryKey: ["feedbacks"],
    queryFn: async () => {
      const url = `${API_URL}/feedbacks`;
      const { data } = await axios.get(url);
      return data;
    },
  });
}

export async function createFeedback(
  feedbackData: {
    name: string;
    email: string;
    message: string;
    rating: number;
    serviceId?: string | null;
    serviceName?: string | null;
    serviceType?: string | null;
  },
  contactCode: string,
  clear: () => void
) {
  try {
    // Agregar el código de contacto a los datos
    const dataToSend = {
      ...feedbackData,
      contactCode,
    };

    // Usar el endpoint unificado de mail (igual que contact y complaint)
    const url = `${API_URL}/mail/feedback`;
    const response = await axios.post(url, dataToSend, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 201 || response.status === 200) {
      toast.success("¡Gracias por compartir tu experiencia con nosotros!");
      clear();
      return response.data;
    }
  } catch (error) {
    console.error("Error al enviar el feedback:", error);
    toast.error(
      "Error al enviar tu experiencia. Por favor, inténtalo de nuevo más tarde."
    );
    throw error;
  }
}

// Mutation para aprobar un feedback
export function useApproveFeedback() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, serviceType }: { id: string; serviceType?: "investment" | "export" | null }) => {
      console.log("Aprobando feedback con ID:", id);
      console.log("ServiceType:", serviceType);
      const url = `${API_URL}/feedback/admin/${id}/approve`;
      console.log("URL de aprobación:", url);
      console.log("API_URL:", API_URL);
      const { data } = await axios.patch<Feedback>(url, 
        { serviceType }, // Enviar serviceType en el body
        {
          headers: {
            user_id: getAdminUserId(),
            'Content-Type': 'application/json',
          },
        }
      );
      console.log("Feedback aprobado exitosamente:", data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allFeedbacks"] });
      queryClient.invalidateQueries({ queryKey: ["pendingFeedbacks"] });
      queryClient.invalidateQueries({ queryKey: ["feedbackStats"] });
      toast.success("Feedback aprobado exitosamente");
    },
    onError: (error) => {
      console.error("Error al aprobar feedback:", error);
      toast.error("Error al aprobar el feedback");
    },
  });
}

// Mutation para rechazar un feedback
export function useRejectFeedback() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, serviceType }: { id: string; serviceType?: "investment" | "export" | null }) => {
      console.log("Rechazando feedback con ID:", id);
      const url = `${API_URL}/feedback/admin/${id}/reject`;
      console.log("URL de rechazo:", url);
      const { data } = await axios.patch<Feedback>(url, 
        { serviceType }, // Enviar serviceType en el body
        {
          headers: {
            user_id: getAdminUserId(),
            'Content-Type': 'application/json',
          },
        }
      );
      console.log("Feedback rechazado exitosamente:", data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allFeedbacks"] });
      queryClient.invalidateQueries({ queryKey: ["pendingFeedbacks"] });
      queryClient.invalidateQueries({ queryKey: ["feedbackStats"] });
      toast.success("Feedback rechazado");
    },
    onError: (error) => {
      console.error("Error al rechazar feedback:", error);
      toast.error("Error al rechazar el feedback");
    },
  });
}

// Mutation para revertir un feedback a pending
export function useRevertFeedback() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, serviceType }: { id: string; serviceType?: "investment" | "export" | null }) => {
      console.log("Revirtiendo feedback con ID:", id);
      const url = `${API_URL}/feedback/admin/${id}/revert`;
      console.log("URL de reversión:", url);
      const { data } = await axios.patch<Feedback>(url, 
        { serviceType }, // Enviar serviceType en el body
        {
          headers: {
            user_id: getAdminUserId(),
            'Content-Type': 'application/json',
          },
        }
      );
      console.log("Feedback revertido exitosamente:", data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allFeedbacks"] });
      queryClient.invalidateQueries({ queryKey: ["pendingFeedbacks"] });
      queryClient.invalidateQueries({ queryKey: ["feedbackStats"] });
      toast.success("Feedback revertido a pendiente");
    },
    onError: (error) => {
      console.error("Error al revertir feedback:", error);
      toast.error("Error al revertir el feedback");
    },
  });
}
