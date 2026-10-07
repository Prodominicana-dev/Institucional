import { notifications } from "@mantine/notifications";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@auth0/nextjs-auth0";
import axios from "axios";
import { authHeader } from "./service";

export interface NewsletterSubscriber {
  id: string;
  email: string;
  name?: string;
  status: string;
  created_At: string;
  unsubscribed_At?: string;
}

export function useNewsletterSubscribers(search?: string) {
  const { user } = useUser();
  const userId = user?.sub;
  return useQuery({
    queryKey: ["newsletter-subscribers", search, userId],
    queryFn: async () => {
      if (!userId) return [] as NewsletterSubscriber[];
      const base = `${process.env.NEXT_PUBLIC_API_URL}/newsletter-subscriber`;
      const url = search ? `${base}?search=${encodeURIComponent(search)}` : base;
      const { data } = await axios.get(url, { headers: authHeader(userId) });
      return data as NewsletterSubscriber[];
    },
    enabled: !!userId,
  });
}

export async function exportNewsletterSubscribers(userId: string): Promise<void> {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/newsletter-subscriber/export`,
      { headers: authHeader(userId), responseType: "blob" }
    );
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "suscriptores-newsletter.csv");
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
    notifications.show({
      id: "newsletter-export",
      autoClose: 5000,
      withCloseButton: false,
      title: "Exportación exitosa",
      message: "El archivo CSV se ha descargado correctamente.",
      color: "green",
      loading: false,
    });
  } catch {
    notifications.show({
      id: "newsletter-export",
      autoClose: 5000,
      withCloseButton: false,
      title: "Error",
      message: "Ha ocurrido un error al exportar los suscriptores.",
      color: "red",
      loading: false,
    });
  }
}

export function deleteNewsletterSubscriber(
  id: string,
  handleOpen: () => void,
  update: () => void,
  userId: string
) {
  return axios
    .delete(
      `${process.env.NEXT_PUBLIC_API_URL}/newsletter-subscriber/${id}`,
      { headers: authHeader(userId) }
    )
    .then((res) => {
      if (res.status === 200) {
        notifications.show({
          id: "newsletter-sub-delete",
          autoClose: 5000,
          withCloseButton: false,
          title: "Suscriptor eliminado",
          message: "El suscriptor ha sido eliminado correctamente.",
          color: "green",
          loading: false,
        });
        update();
        handleOpen();
      }
    })
    .catch(() => {
      notifications.show({
        id: "newsletter-sub-delete",
        autoClose: 5000,
        withCloseButton: false,
        title: "Error",
        message: "Ha ocurrido un error al eliminar el suscriptor.",
        color: "red",
        loading: false,
      });
    });
}
