import { notifications } from "@mantine/notifications";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
var CryptoJS = require("crypto-js");

// Hook para obtener suscriptores (admin)
export function useSubscribers(userId: string, search?: string) {
  const userIdEncrypted = CryptoJS.AES.encrypt(
    userId,
    process.env.NEXT_PUBLIC_CRYPTOJS_KEY
  ).toString();

  return useQuery({
    queryKey: ["mujerExportaSubscribers", search],
    queryFn: async () => {
      let url = `${process.env.NEXT_PUBLIC_API_URL}/mujer-exporta/subscribers`;
      if (search) {
        url += `?search=${encodeURIComponent(search)}`;
      }
      const { data } = await axios.get(url, {
        headers: { Authorization: userIdEncrypted },
      });
      return data;
    },
    enabled: !!userId,
  });
}

// Crear suscriptor (público - no requiere auth)
export async function createSubscriber(
  subscriber: {
    name: string;
    email: string;
    company?: string;
    phone?: string;
    sector?: string;
  }
): Promise<boolean> {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/mujer-exporta/subscribers`,
      subscriber
    );

    if (res.status === 201) {
      notifications.show({
        id: "subscriber",
        autoClose: 5000,
        withCloseButton: false,
        title: "Registro exitoso",
        message: "Te has suscrito correctamente a Mujer Exporta.",
        color: "green",
        loading: false,
      });
      return true;
    }
    return false;
  } catch (error: any) {
    const message = error?.response?.data?.error || "Ha ocurrido un error al registrarte.";
    notifications.show({
      id: "subscriber",
      autoClose: 5000,
      withCloseButton: false,
      title: "Error",
      message,
      color: "red",
      loading: false,
    });
    return false;
  }
}

// Eliminar suscriptor
export function deleteSubscriber(
  id: string,
  handleOpen: () => void,
  update: () => void,
  userId: string
) {
  const userIdEncrypted = CryptoJS.AES.encrypt(
    userId,
    process.env.NEXT_PUBLIC_CRYPTOJS_KEY
  ).toString();

  return axios
    .delete(
      `${process.env.NEXT_PUBLIC_API_URL}/mujer-exporta/subscribers/${id}`,
      {
        headers: { Authorization: userIdEncrypted },
      }
    )
    .then((res) => {
      if (res.status === 200) {
        notifications.show({
          id: "subscriber",
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
        id: "subscriber",
        autoClose: 5000,
        withCloseButton: false,
        title: "Error",
        message: "Ha ocurrido un error al eliminar el suscriptor.",
        color: "red",
        loading: false,
      });
    });
}

// Exportar suscriptores a CSV
export async function exportSubscribers(userId: string): Promise<void> {
  const userIdEncrypted = CryptoJS.AES.encrypt(
    userId,
    process.env.NEXT_PUBLIC_CRYPTOJS_KEY
  ).toString();

  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/mujer-exporta/subscribers/export`,
      {
        headers: { Authorization: userIdEncrypted },
        responseType: "blob",
      }
    );

    // Crear enlace de descarga
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "suscriptores-mujer-exporta.csv");
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);

    notifications.show({
      id: "export",
      autoClose: 5000,
      withCloseButton: false,
      title: "Exportación exitosa",
      message: "El archivo CSV se ha descargado correctamente.",
      color: "green",
      loading: false,
    });
  } catch (error) {
    notifications.show({
      id: "export",
      autoClose: 5000,
      withCloseButton: false,
      title: "Error",
      message: "Ha ocurrido un error al exportar los suscriptores.",
      color: "red",
      loading: false,
    });
  }
}
