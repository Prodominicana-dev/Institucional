import { notifications } from "@mantine/notifications";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@auth0/nextjs-auth0";
import axios from "axios";
var CryptoJS = require("crypto-js");

export interface Newsletter {
  id: string;
  title: string;
  titleEn?: string;
  subject: string;
  html: string;
  state: "draft" | "scheduled" | "published" | "sent";
  cover?: string;
  tags: string[];
  publishDate?: string;
  scheduledSendDate?: string;
  sentAt?: string;
  totalSent: number;
  totalOpened: number;
  totalClicks: number;
}

export function authHeader(userId: string) {
  const encrypted = CryptoJS.AES.encrypt(
    userId,
    process.env.NEXT_PUBLIC_CRYPTOJS_KEY
  ).toString();
  return { Authorization: encrypted };
}

export function useNewsletters() {
  const { user } = useUser();
  const userId = user?.sub;
  return useQuery({
    queryKey: ["newsletters-admin", userId],
    queryFn: async () => {
      if (!userId) return [] as Newsletter[];
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/newsletter/admin`,
        { headers: authHeader(userId) }
      );
      return data as Newsletter[];
    },
    enabled: !!userId,
  });
}

export function useNewsletterStats(id: string, enabled: boolean) {
  const { user } = useUser();
  const userId = user?.sub;
  return useQuery({
    queryKey: ["newsletter-stats", id, userId],
    queryFn: async () => {
      if (!userId) return null;
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/newsletter/${id}/stats`,
        { headers: authHeader(userId) }
      );
      return data;
    },
    enabled: enabled && !!userId,
  });
}

export async function createNewsletter(
  body: Partial<Newsletter>,
  update: () => void,
  userId: string
): Promise<boolean> {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/newsletter`,
      body,
      { headers: authHeader(userId) }
    );
    if (res.status === 201) {
      notifications.show({
        id: "newsletter-create",
        autoClose: 5000,
        withCloseButton: false,
        title: "Boletín creado",
        message: "El boletín se ha creado correctamente.",
        color: "green",
        loading: false,
      });
      update();
      return true;
    }
    return false;
  } catch {
    notifications.show({
      id: "newsletter-create",
      autoClose: 5000,
      withCloseButton: false,
      title: "Error",
      message: "Ha ocurrido un error al crear el boletín.",
      color: "red",
      loading: false,
    });
    return false;
  }
}

export async function editNewsletter(
  id: string,
  body: Partial<Newsletter>,
  update: () => void,
  userId: string
): Promise<boolean> {
  try {
    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/newsletter/${id}`,
      body,
      { headers: authHeader(userId) }
    );
    if (res.status === 200) {
      notifications.show({
        id: "newsletter-edit",
        autoClose: 5000,
        withCloseButton: false,
        title: "Boletín actualizado",
        message: "El boletín se ha actualizado correctamente.",
        color: "green",
        loading: false,
      });
      update();
      return true;
    }
    return false;
  } catch {
    notifications.show({
      id: "newsletter-edit",
      autoClose: 5000,
      withCloseButton: false,
      title: "Error",
      message: "Ha ocurrido un error al actualizar el boletín.",
      color: "red",
      loading: false,
    });
    return false;
  }
}

export function deleteNewsletter(
  id: string,
  handleOpen: () => void,
  update: () => void,
  userId: string
) {
  return axios
    .delete(`${process.env.NEXT_PUBLIC_API_URL}/newsletter/${id}`, {
      headers: authHeader(userId),
    })
    .then((res) => {
      if (res.status === 200) {
        notifications.show({
          id: "newsletter-delete",
          autoClose: 5000,
          withCloseButton: false,
          title: "Boletín eliminado",
          message: "El boletín ha sido eliminado correctamente.",
          color: "green",
          loading: false,
        });
        update();
        handleOpen();
      }
    })
    .catch(() => {
      notifications.show({
        id: "newsletter-delete",
        autoClose: 5000,
        withCloseButton: false,
        title: "Error",
        message: "Ha ocurrido un error al eliminar el boletín.",
        color: "red",
        loading: false,
      });
    });
}

export async function sendNewsletter(
  id: string,
  handleOpen: () => void,
  update: () => void,
  userId: string
): Promise<void> {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/newsletter/${id}/send`,
      {},
      { headers: authHeader(userId) }
    );
    if (res.status === 200 || res.status === 201) {
      notifications.show({
        id: "newsletter-send",
        autoClose: 5000,
        withCloseButton: false,
        title: "Boletín enviado",
        message: "El boletín ha sido enviado a todos los suscriptores activos.",
        color: "green",
        loading: false,
      });
      update();
      handleOpen();
    }
  } catch {
    notifications.show({
      id: "newsletter-send",
      autoClose: 5000,
      withCloseButton: false,
      title: "Error",
      message: "Ha ocurrido un error al enviar el boletín.",
      color: "red",
      loading: false,
    });
  }
}
