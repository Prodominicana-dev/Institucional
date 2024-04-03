import { notifications } from "@mantine/notifications";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
var CryptoJS = require("crypto-js");

export function usePhotoGallery(id: string) {
  return useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/gallery/${id}/photo`;
      const { data } = await axios.get(url);
      return data;
    },
  });
}

export function usePhotoGalleryByNameAndLang(name: string) {
  return useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/gallery/nm/${name}/photo`;
      const { data } = await axios.get(url);
      return data;
    },
  });
}

export function useGalleryById(id: string) {
  return useQuery({
    queryKey: ["memberById", id],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/gallery/${id}`;
      const { data } = await axios.get(url);
      return data;
    },
  });
}

export async function createPhoto(
  id: string,
  gallery: any,
  update: () => void,
  userId: string
) {
  try {
    const userIdEncrypted = CryptoJS.AES.encrypt(
      userId,
      process.env.NEXT_PUBLIC_CRYPTOJS_KEY
    ).toString();

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/gallery/${id}/photo`,
      gallery,
      {
        headers: {
          Authorization: userIdEncrypted,
        },
      }
    );

    if (res.status === 201) {
      notifications.show({
        id: "member",
        autoClose: 5000,
        withCloseButton: false,
        title: "Colaborador creada",
        message: "El colaborador ha sido creada correctamente.",
        color: "green",
        loading: false,
      });
      update();
    } else {
      handleErrorResponse(res);
    }
  } catch (error) {
    notifications.show({
      id: "member",
      autoClose: 5000,
      withCloseButton: false,
      title: "Error creando al colaborador",
      message: "Ocurrió un error creando al colaborador.",
      color: "red",
      loading: false,
    });
  }
}

function handleErrorResponse(response: any) {
  switch (response.status) {
    case 500:
      notifications.show({
        id: "member",
        autoClose: 5000,
        withCloseButton: false,
        title: "Error creando al colaborador",
        message: "Ocurrió un error creando al colaborador.",
        color: "red",
        loading: false,
      });
      break;

    case 401:
      notifications.show({
        id: "member",
        autoClose: 5000,
        withCloseButton: false,
        title: "Usuario no autorizado",
        message: "No tienes permisos para crear un colaborador.",
        color: "red",
        loading: false,
      });
      break;
    // Puedes agregar más casos según sea necesario
    default:
      break;
  }
}

export function deletePhoto(
  id: string,
  idPhoto: string,
  update: () => void,
  userId: string
) {
  const userIdEncrypted = CryptoJS.AES.encrypt(
    userId,
    process.env.NEXT_PUBLIC_CRYPTOJS_KEY
  ).toString();
  return axios
    .delete(
      `${process.env.NEXT_PUBLIC_API_URL}/gallery/${id}/photo/${idPhoto}`,
      {
        headers: {
          Authorization: `${userIdEncrypted}`,
        },
      }
    )
    .then((res) => {
      if (res.status === 200) {
        notifications.show({
          id: "member",
          autoClose: 5000,
          withCloseButton: false,
          title: "Galería eliminada",
          message:
            "La galería y todas las fotos asociadas a esta galería han sido eliminada correctamente.",
          color: "green",
          loading: false,
        });
        update();
      }
      if (res.status === 500) {
        notifications.show({
          id: "member",
          autoClose: 5000,
          withCloseButton: false,
          title: "Error",
          message: "Hubo un error borrando la galería.",
          color: "red",
          loading: false,
        });
      }
      if (res.status === 401) {
        notifications.show({
          id: "member",
          autoClose: 5000,
          withCloseButton: false,
          title: "Usuario inautorizado",
          message: "No tienes permisos para eliminar la galería.",
          color: "red",
          loading: false,
        });
      }
    });
}
