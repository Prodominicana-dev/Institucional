import { notifications } from "@mantine/notifications";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
var CryptoJS = require("crypto-js");

export function useSchedule() {
  return useQuery({
    queryKey: ["schedule"],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/apiv2/schedule`;
      const { data } = await axios.get(url);
      return data;
    },
  });
}

export function useSheduleById(id: string) {
  return useQuery({
    queryKey: ["scheduleById", id],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/schedule/${id}`;
      const { data } = await axios.get(url);
      return data;
    },
  });
}

export async function createSchedule(
  schedule: any,
  update: () => void,
  userId: string
) {
  try {
    const userIdEncrypted = CryptoJS.AES.encrypt(
      userId,
      process.env.NEXT_PUBLIC_CRYPTOJS_KEY
    ).toString();

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/schedule`,
      schedule,
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
        title: "Evento creado",
        message: "El evento ha sido creado correctamente.",
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
      title: "Error creando el evento",
      message: "Ocurrió un error creando el evento.",
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
        title: "Error creando el evento",
        message: "Ocurrió un error creando el evento.",
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
        message: "No tienes permisos para crear el evento.",
        color: "red",
        loading: false,
      });
      break;
    // Puedes agregar más casos según sea necesario
    default:
      break;
  }
}

export async function editSchedule(
  id: string,
  schedule: any,
  update: () => void,
  userId: string
) {
  try {
    const userIdEncrypted = CryptoJS.AES.encrypt(
      userId,
      process.env.NEXT_PUBLIC_CRYPTOJS_KEY
    ).toString();
    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/schedule/${id}`,
      schedule,
      {
        headers: {
          Authorization: `${userIdEncrypted}`,
        },
      }
    );

    if (res.status === 200) {
      notifications.show({
        id: "member",
        autoClose: 5000,
        withCloseButton: false,
        title: "Evento actualizado",
        message: "El evento ha sido actualizado correctamente.",
        color: "green",
        loading: false,
      });
      update();
    } else {
      handleEditErrorResponse(res);
    }
  } catch (error) {
    notifications.show({
      id: "member",
      autoClose: 5000,
      withCloseButton: false,
      title: "Error editando el evento",
      message:
        "Ocurrió un error editando el evento. Por favor, intenta de nuevo.",
      color: "red",
      loading: false,
    });
  }
}

function handleEditErrorResponse(response: any) {
  switch (response.status) {
    case 500:
      notifications.show({
        id: "member",
        autoClose: 5000,
        withCloseButton: false,
        title: "Error editando el evento",
        message:
          "Ocurrió un error editando el evento. Por favor, intenta de nuevo.",
        color: "red",
        loading: false,
      });
      break;

    case 401:
      notifications.show({
        id: "member",
        autoClose: 5000,
        withCloseButton: false,
        title: "Usuario inautorizado",
        message: "No tienes permisos para editar el evento.",
        color: "red",
        loading: false,
      });
      break;
    // Puedes agregar más casos según sea necesario
    default:
      break;
  }
}

export function deleteSchedule(
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
    .delete(`${process.env.NEXT_PUBLIC_API_URL}/schedule/${id}`, {
      headers: {
        Authorization: `${userIdEncrypted}`,
      },
    })
    .then((res) => {
      if (res.status === 200) {
        notifications.show({
          id: "deletedSucc",
          autoClose: 5000,
          withCloseButton: false,
          title: "Evento eliminado",
          message:
            "El evento ha sido eliminado correctamente. No podrás recuperarlo.",
          color: "green",
          loading: false,
        });
        update();
        handleOpen();
      }
      if (res.status === 500) {
        notifications.show({
          id: "err500",
          autoClose: 5000,
          withCloseButton: false,
          title: "Error",
          message: "Hubo un error borrando el evento.",
          color: "red",
          loading: false,
        });
      }
      if (res.status === 401) {
        notifications.show({
          id: "err401",
          autoClose: 5000,
          withCloseButton: false,
          title: "Usuario inautorizado",
          message: "No tienes permisos para eliminar un colaborador.",
          color: "red",
          loading: false,
        });
      }
    });
}
