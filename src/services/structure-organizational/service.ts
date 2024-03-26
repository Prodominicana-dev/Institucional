import { notifications } from "@mantine/notifications";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
var CryptoJS = require("crypto-js");

export function useDirections() {
  return useQuery({
    queryKey: ["directions"],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/so/direction`;
      const { data } = await axios.get(url);
      return data;
    },
  });
}

export function useDirectionById(id: string) {
  return useQuery({
    queryKey: ["directionById", id],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/so/direction/${id}`;
      const { data } = await axios.get(url);
      return data;
    },
  });
}

export async function createDirection(
  direction: any,
  update: () => void,
  userId: string
) {
  try {
    const userIdEncrypted = CryptoJS.AES.encrypt(
      userId,
      process.env.NEXT_PUBLIC_CRYPTOJS_KEY
    ).toString();

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/so/direction`,
      direction,
      {
        headers: {
          Authorization: userIdEncrypted,
        },
      }
    );

    if (res.status === 201) {
      notifications.show({
        id: "direction",
        autoClose: 5000,
        withCloseButton: false,
        title: "Dirección creada",
        message: "La dirección ha sido creada correctamente.",
        color: "green",
        loading: false,
      });
      update();
    } else {
      handleErrorResponse(res);
    }
  } catch (error) {
    notifications.show({
      id: "direction",
      autoClose: 5000,
      withCloseButton: false,
      title: "Error creando la dirección",
      message:
        "Existe una dirección con el mismo nombre. Por favor, cambia el nombre de la dirección.",
      color: "red",
      loading: false,
    });
  }
}

function handleErrorResponse(response: any) {
  switch (response.status) {
    case 500:
      notifications.show({
        id: "direction",
        autoClose: 5000,
        withCloseButton: false,
        title: "Error creando la dirección",
        message:
          "Existe una dirección con el mismo nombre. Por favor, cambia el nombre de la dirección.",
        color: "red",
        loading: false,
      });
      break;

    case 401:
      notifications.show({
        id: "direction",
        autoClose: 5000,
        withCloseButton: false,
        title: "Usuario no autorizado",
        message: "No tienes permisos para crear una dirección.",
        color: "red",
        loading: false,
      });
      break;
    // Puedes agregar más casos según sea necesario
    default:
      break;
  }
}

export async function editDirection(
  id: string,
  direction: any,
  update: () => void,
  userId: string
) {
  try {
    const userIdEncrypted = CryptoJS.AES.encrypt(
      userId,
      process.env.NEXT_PUBLIC_CRYPTOJS_KEY
    ).toString();
    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/so/direction/${id}`,
      direction,
      {
        headers: {
          Authorization: `${userIdEncrypted}`,
        },
      }
    );

    if (res.status === 200) {
      notifications.show({
        id: "direction",
        autoClose: 5000,
        withCloseButton: false,
        title: "Dirección actualizada",
        message: "La dirección ha sido actualizada correctamente.",
        color: "green",
        loading: false,
      });
      update();
    } else {
      handleEditErrorResponse(res);
    }
  } catch (error) {
    notifications.show({
      id: "direction",
      autoClose: 5000,
      withCloseButton: false,
      title: "Error editando la dirección",
      message:
        "Existe una dirección con el mismo nombre. Por favor, cambia el nombre de la dirección.",
      color: "red",
      loading: false,
    });
  }
}

function handleEditErrorResponse(response: any) {
  switch (response.status) {
    case 500:
      notifications.show({
        id: "direction",
        autoClose: 5000,
        withCloseButton: false,
        title: "Error creando la dirección",
        message:
          "Existe una dirección con el mismo nombre. Por favor, cambia el nombre de la dirección.",
        color: "red",
        loading: false,
      });
      break;

    case 401:
      notifications.show({
        id: "direction",
        autoClose: 5000,
        withCloseButton: false,
        title: "Usuario inautorizado",
        message: "No tienes permisos para editar una dirección.",
        color: "red",
        loading: false,
      });
      break;
    // Puedes agregar más casos según sea necesario
    default:
      break;
  }
}

export function deleteDirection(
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
    .delete(`${process.env.NEXT_PUBLIC_API_URL}/so/direction/${id}`, {
      headers: {
        Authorization: `${userIdEncrypted}`,
      },
    })
    .then((res) => {
      if (res.status === 200) {
        notifications.show({
          id: "direction",
          autoClose: 5000,
          withCloseButton: false,
          title: "Dirección eliminada",
          message:
            "La dirección ha sido eliminada correctamente. No podrás recuperarla.",
          color: "green",
          loading: false,
        });
        update();
        handleOpen();
      }
      if (res.status === 500) {
        notifications.show({
          id: "direction",
          autoClose: 5000,
          withCloseButton: false,
          title: "Error",
          message: "Hubo un error borrando la dirección.",
          color: "red",
          loading: false,
        });
      }
      if (res.status === 401) {
        notifications.show({
          id: "direction",
          autoClose: 5000,
          withCloseButton: false,
          title: "Usuario inautorizado",
          message: "No tienes permisos para desactivar una dirección.",
          color: "red",
          loading: false,
        });
      }
    });
}
