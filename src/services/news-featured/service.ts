import { notifications } from "@mantine/notifications";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
var CryptoJS = require("crypto-js");

/* La destacada es la noticia grande del encabezado de Noticias Pro.
   Solo puede haber una: marcar otra desmarca la anterior. */

function authHeader(userId: string) {
  const encrypted = CryptoJS.AES.encrypt(
    userId,
    process.env.NEXT_PUBLIC_CRYPTOJS_KEY
  ).toString();
  return { Authorization: encrypted };
}

export function useFeaturedNewsAdmin(lang: string = "es") {
  return useQuery({
    queryKey: ["newsFeaturedAdmin", lang],
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/news/featured?lang=${lang}`
      );
      return data;
    },
  });
}

export async function setFeaturedNews(
  id: string,
  featured: boolean,
  update: () => void,
  userId: string
): Promise<boolean> {
  try {
    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/news/${id}/featured`,
      { featured },
      { headers: authHeader(userId) }
    );
    if (res.status === 200) {
      notifications.show({
        id: "news-featured",
        autoClose: 5000,
        withCloseButton: false,
        title: featured ? "Noticia destacada" : "Marca retirada",
        message: featured
          ? "La noticia ya aparece en el encabezado de Noticias Pro."
          : "El encabezado de Noticias Pro queda sin noticia destacada.",
        color: "green",
        loading: false,
      });
      update();
      return true;
    }
    return false;
  } catch (error: any) {
    notifications.show({
      id: "news-featured",
      autoClose: 5000,
      withCloseButton: false,
      title: "Error",
      message:
        error?.response?.status === 401
          ? "No tiene permiso para destacar noticias."
          : "No se pudo cambiar la noticia destacada.",
      color: "red",
      loading: false,
    });
    return false;
  }
}
