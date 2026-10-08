import { notifications } from "@mantine/notifications";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
var CryptoJS = require("crypto-js");

export interface NewspaperCover {
  id: string;
  image: string;
  media: string;
  link?: string;
  section?: string;
  date: string;
}

function authHeader(userId: string) {
  const encrypted = CryptoJS.AES.encrypt(
    userId,
    process.env.NEXT_PUBLIC_CRYPTOJS_KEY
  ).toString();
  return { Authorization: encrypted };
}

export function useNewspaperCovers() {
  return useQuery({
    queryKey: ["newspaper-covers"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/newspaper-cover`
      );
      return data as NewspaperCover[];
    },
  });
}

export async function createNewspaperCover(
  formData: FormData,
  update: () => void,
  userId: string
): Promise<boolean> {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/newspaper-cover`,
      formData,
      { headers: authHeader(userId) }
    );
    if (res.status === 201) {
      notifications.show({
        id: "newspaper-cover-create",
        autoClose: 5000,
        withCloseButton: false,
        title: "Portada creada",
        message: "La portada se ha creado correctamente.",
        color: "green",
        loading: false,
      });
      update();
      return true;
    }
    return false;
  } catch {
    notifications.show({
      id: "newspaper-cover-create",
      autoClose: 5000,
      withCloseButton: false,
      title: "Error",
      message: "Ha ocurrido un error al crear la portada.",
      color: "red",
      loading: false,
    });
    return false;
  }
}

export async function editNewspaperCover(
  id: string,
  formData: FormData,
  update: () => void,
  userId: string
): Promise<boolean> {
  try {
    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/newspaper-cover/${id}`,
      formData,
      { headers: authHeader(userId) }
    );
    if (res.status === 200) {
      notifications.show({
        id: "newspaper-cover-edit",
        autoClose: 5000,
        withCloseButton: false,
        title: "Portada actualizada",
        message: "La portada se ha actualizado correctamente.",
        color: "green",
        loading: false,
      });
      update();
      return true;
    }
    return false;
  } catch {
    notifications.show({
      id: "newspaper-cover-edit",
      autoClose: 5000,
      withCloseButton: false,
      title: "Error",
      message: "Ha ocurrido un error al actualizar la portada.",
      color: "red",
      loading: false,
    });
    return false;
  }
}

export function deleteNewspaperCover(
  id: string,
  handleOpen: () => void,
  update: () => void,
  userId: string
) {
  return axios
    .delete(`${process.env.NEXT_PUBLIC_API_URL}/newspaper-cover/${id}`, {
      headers: authHeader(userId),
    })
    .then((res) => {
      if (res.status === 200) {
        notifications.show({
          id: "newspaper-cover-delete",
          autoClose: 5000,
          withCloseButton: false,
          title: "Portada eliminada",
          message: "La portada ha sido eliminada correctamente.",
          color: "green",
          loading: false,
        });
        update();
        handleOpen();
      }
    })
    .catch(() => {
      notifications.show({
        id: "newspaper-cover-delete",
        autoClose: 5000,
        withCloseButton: false,
        title: "Error",
        message: "Ha ocurrido un error al eliminar la portada.",
        color: "red",
        loading: false,
      });
    });
}
