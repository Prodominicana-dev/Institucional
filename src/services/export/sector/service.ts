import { notifications } from "@mantine/notifications";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
var CryptoJS = require("crypto-js");

export function useSector() {
  return useQuery({
    queryKey: ["sectors"],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/sector`;
      const { data } = await axios.get(url);
      return data;
    },
  });
}

export function useSectorByCode(code: string) {
  return useQuery({
    queryKey: ["sectorByCode", code],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/sector/${code}`;
      const { data } = await axios.get(url);
      return data;
    },
  });
}

export async function createSector(
  sector: any,
  update: () => void,
  userId: string
) {
  try {
    const userIdEncrypted = CryptoJS.AES.encrypt(
      userId,
      process.env.NEXT_PUBLIC_CRYPTOJS_KEY
    ).toString();

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/sector`,
      sector,
      {
        headers: {
          Authorization: userIdEncrypted,
        },
      }
    );

    if (res.status === 201) {
      notifications.show({
        id: "sector",
        autoClose: 5000,
        withCloseButton: false,
        title: "Sector creado",
        message: "El sector ha sido creado correctamente.",
        color: "green",
        loading: false,
      });
      update();
    } else {
      handleErrorResponse(res);
    }
  } catch (error) {
    notifications.show({
      id: "sector",
      autoClose: 5000,
      withCloseButton: false,
      title: "Error creando el sector",
      message: "Ocurrió un error creando el sector.",
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
        title: "Error creando el sector",
        message:
          "Ocurrió un error creando el sector. Por favor, intenta de nuevo.",
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
        message: "No tienes permisos para crear un sector.",
        color: "red",
        loading: false,
      });
      break;
    // Puedes agregar más casos según sea necesario
    default:
      break;
  }
}

export async function editSector(
  id: string,
  sector: any,
  update: () => void,
  userId: string
) {
  try {
    const userIdEncrypted = CryptoJS.AES.encrypt(
      userId,
      process.env.NEXT_PUBLIC_CRYPTOJS_KEY
    ).toString();
    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/sector/${id}`,
      sector,
      {
        headers: {
          Authorization: `${userIdEncrypted}`,
        },
      }
    );

    if (res.status === 200) {
      notifications.show({
        id: "sector",
        autoClose: 5000,
        withCloseButton: false,
        title: "Sector actualizado",
        message: "El sector ha sido actualizado correctamente.",
        color: "green",
        loading: false,
      });
      update();
    } else {
      handleEditErrorResponse(res);
    }
  } catch (error) {
    notifications.show({
      id: "sector",
      autoClose: 5000,
      withCloseButton: false,
      title: "Error editando el sector",
      message:
        "Ocurrió un error editando el sector. Por favor, intenta de nuevo.",
      color: "red",
      loading: false,
    });
  }
}

function handleEditErrorResponse(response: any) {
  switch (response.status) {
    case 500:
      notifications.show({
        id: "sector",
        autoClose: 5000,
        withCloseButton: false,
        title: "Error editando el sector",
        message:
          "Ocurrió un error editando el sector. Por favor, intenta de nuevo.",
        color: "red",
        loading: false,
      });
      break;

    case 401:
      notifications.show({
        id: "sector",
        autoClose: 5000,
        withCloseButton: false,
        title: "Usuario inautorizado",
        message: "No tienes permisos para editar el sector.",
        color: "red",
        loading: false,
      });
      break;
    // Puedes agregar más casos según sea necesario
    default:
      break;
  }
}

export function deleteSector(
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
    .delete(`${process.env.NEXT_PUBLIC_API_URL}/sector/${id}`, {
      headers: {
        Authorization: `${userIdEncrypted}`,
      },
    })
    .then((res) => {
      if (res.status === 200) {
        notifications.show({
          id: "sector",
          autoClose: 5000,
          withCloseButton: false,
          title: "Sector eliminado",
          message: "El sector ha sido eliminado correctamente.",
          color: "green",
          loading: false,
        });
        update();
        handleOpen();
      }
      if (res.status === 500) {
        notifications.show({
          id: "sector",
          autoClose: 5000,
          withCloseButton: false,
          title: "Error",
          message: "Hubo un error eliminando el sector.",
          color: "red",
          loading: false,
        });
      }
      if (res.status === 401) {
        notifications.show({
          id: "sector",
          autoClose: 5000,
          withCloseButton: false,
          title: "Usuario inautorizado",
          message: "No tienes permisos para eliminar sectores.",
          color: "red",
          loading: false,
        });
      }
    });
}
