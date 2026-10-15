import { notifications } from "@mantine/notifications";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
var CryptoJS = require("crypto-js");

/* Las destacadas son las noticias grandes del encabezado de Noticias Pro,
   que las pasa en carrusel. Pueden ser varias, hasta TOPE_DESTACADAS; el tope
   lo impone tambien la API, que responde 409 cuando ya no hay cupo. */

export const TOPE_DESTACADAS = 5;

function authHeader(userId: string) {
  const encrypted = CryptoJS.AES.encrypt(
    userId,
    process.env.NEXT_PUBLIC_CRYPTOJS_KEY
  ).toString();
  return { Authorization: encrypted };
}

// Devuelve el arreglo de destacadas, de la mas reciente a la mas antigua.
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
          ? "La noticia ya aparece en el carrusel del encabezado de Noticias Pro."
          : "La noticia sale del carrusel del encabezado de Noticias Pro.",
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
          : error?.response?.status === 409
            ? `Ya hay ${TOPE_DESTACADAS} noticias destacadas. Retire una antes de destacar otra.`
            : "No se pudo cambiar la noticia destacada.",
      color: "red",
      loading: false,
    });
    return false;
  }
}
