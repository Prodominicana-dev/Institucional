import { notifications } from "@mantine/notifications";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
var CryptoJS = require("crypto-js");

export function useServices() {
  return useQuery({
    queryKey: ["newsEs"],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/service`;
      const { data } = await axios.get(url);
      return data;
    },
  });
}

export function useInvestmentServices() {
  return useQuery({
    queryKey: ["invServ"],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/service/category/c/investment`;
      const { data } = await axios.get(url);
      return data;
    },
  });
}

export function useExportServices() {
  return useQuery({
    queryKey: ["exportServ"],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/service/category/c/export`;
      const { data } = await axios.get(url);
      return data;
    },
  });
}

export function useServicesByLanguage(lang: string) {
  return useQuery({
    queryKey: ["servLeng"],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/service/lng/${lang}`;
      const { data } = await axios.get(url);
      return data;
    },
  });
}

export function useServicesById(id: string) {
  return useQuery({
    queryKey: ["newsById", id],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/service/${id}`;
      const { data } = await axios.get(url);
      return data;
    },
  });
}

export async function createService(
  service: any,
  update: () => void,
  userId: string
) {
  try {
    const userIdEncrypted = CryptoJS.AES.encrypt(
      userId,
      process.env.NEXT_PUBLIC_CRYPTOJS_KEY
    ).toString();

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/service`,
      service,
      {
        headers: {
          Authorization: userIdEncrypted,
        },
      }
    );

    if (res.status === 201) {
      notifications.show({
        id: "category",
        autoClose: 5000,
        withCloseButton: false,
        title: "Categoría del evento creada",
        message: "La categoría del evento ha sido creada correctamente.",
        color: "green",
        loading: false,
      });
      update();
    } else {
      handleErrorResponse(res);
    }
  } catch (error) {
    notifications.show({
      id: "category",
      autoClose: 5000,
      withCloseButton: false,
      title: "Error creando la categoría del evento",
      message: "Ocurrió un error creando la categoría del evento.",
      color: "red",
      loading: false,
    });
  }
}

function handleErrorResponse(response: any) {
  switch (response.status) {
    case 500:
      notifications.show({
        id: "category",
        autoClose: 5000,
        withCloseButton: false,
        title: "Error creando la categoría del evento",
        message: "Ocurrió un error creando la categoría del evento.",
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

export function editService(
  id: string,
  service: any,
  update: () => void,
  userId: string
) {
  const userIdEncrypted = CryptoJS.AES.encrypt(
    userId,
    process.env.NEXT_PUBLIC_CRYPTOJS_KEY
  ).toString();
  return axios
    .patch(`${process.env.NEXT_PUBLIC_API_URL}/service/${id}`, service, {
      headers: {
        Authorization: `${userIdEncrypted}`,
      },
    })
    .then((res) => {
      if (res.status === 200) {
        notifications.show({
          id: "event",
          autoClose: 5000,
          withCloseButton: false,
          title: "Servicio actualizado",
          message: "El servicio se ha actualizado correctamente.",
          color: "green",
          loading: false,
        });
        update();
      }
      if (res.status === 500) {
        notifications.show({
          id: "event",
          autoClose: 5000,
          withCloseButton: false,
          title: "Error",
          message: "Hubo un error actualizando el servicio.",
          color: "red",
          loading: false,
        });
      }
      if (res.status === 401) {
        notifications.show({
          id: "event",
          autoClose: 5000,
          withCloseButton: false,
          title: "Usuario inautorizado",
          message: "No tienes permisos para actualizar servicios.",
          color: "red",
          loading: false,
        });
      }
    });
}

export function deleteService(
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
    .delete(`${process.env.NEXT_PUBLIC_API_URL}/service/${id}`, {
      headers: {
        Authorization: `${userIdEncrypted}`,
      },
    })
    .then((res) => {
      if (res.status === 200) {
        notifications.show({
          id: "events",
          autoClose: 5000,
          withCloseButton: false,
          title: "Servicio eliminado",
          message: "El servicio se ha eliminado correctamente.",
          color: "green",
          loading: false,
        });
        update();
        handleOpen();
      }
      if (res.status === 500) {
        notifications.show({
          id: "events",
          autoClose: 5000,
          withCloseButton: false,
          title: "Error",
          message: "Hubo un error eliminando el servicio.",
          color: "red",
          loading: false,
        });
      }
      if (res.status === 401) {
        notifications.show({
          id: "events",
          autoClose: 5000,
          withCloseButton: false,
          title: "Usuario inautorizado",
          message: "No tienes permisos para eliminar servicios.",
          color: "red",
          loading: false,
        });
      }
    });
}
