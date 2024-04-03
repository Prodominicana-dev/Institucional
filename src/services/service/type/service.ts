import { notifications } from "@mantine/notifications";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
var CryptoJS = require("crypto-js");

export function useServiceType() {
  return useQuery({
    queryKey: ["servType"],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/service/types`;
      const { data } = await axios.get(url);
      return data;
    },
  });
}

export function useServiceTypeById(id: string) {
  return useQuery({
    queryKey: ["servTypeById", id],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/service/type/${id}`;
      const { data } = await axios.get(url);
      return data;
    },
  });
}

export function createServiceType(
  type: any,
  update: () => void,
  userId: string
) {
  const userIdEncrypted = CryptoJS.AES.encrypt(
    userId,
    process.env.NEXT_PUBLIC_CRYPTOJS_KEY
  ).toString();
  return axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}/service/type`, type, {
      headers: {
        Authorization: `${userIdEncrypted}`,
      },
    })
    .then((res) => {
      if (res.status === 201) {
        notifications.show({
          id: "event",
          autoClose: 5000,
          withCloseButton: false,
          title: "Tipo de servicio creada",
          message: "El tipo de servicio se ha creado correctamente.",
          color: "green",
          loading: false,
        });
        update();
      }
      if (res.status === 500) {
        notifications.show({
          id: "news",
          autoClose: 5000,
          withCloseButton: false,
          title: "Error",
          message: "Hubo un error creando el tipo de servicio.",
          color: "red",
          loading: false,
        });
      }
      if (res.status === 401) {
        notifications.show({
          id: "section",
          autoClose: 5000,
          withCloseButton: false,
          title: "Usuario inautorizado",
          message: "No tienes permisos para crear un tipo de servicio.",
          color: "red",
          loading: false,
        });
      }
    })
    .catch((error) => {});
}

export function editServiceType(
  id: string,
  type: any,
  update: () => void,
  userId: string
) {
  const userIdEncrypted = CryptoJS.AES.encrypt(
    userId,
    process.env.NEXT_PUBLIC_CRYPTOJS_KEY
  ).toString();
  return axios
    .patch(`${process.env.NEXT_PUBLIC_API_URL}/service/type/${id}`, type, {
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
          title: "Tipo de servicio actualizado",
          message: "El tipo de servicio se ha actualizado correctamente.",
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
          message: "Hubo un error editando el tipo de servicio.",
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
          message: "No tienes permisos para editar el tipo de servicio.",
          color: "red",
          loading: false,
        });
      }
    });
}

export function deleteServiceType(
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
    .delete(`${process.env.NEXT_PUBLIC_API_URL}/service/type/${id}`, {
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
          title: "Tipo de servicio eliminada",
          message: "El tipo de servicio ha sido eliminado correctamente.",
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
          message: "Hubo un error eliminando el tipo de servicio.",
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
          message: "No tienes permisos para eliminar el tipo de servicio.",
          color: "red",
          loading: false,
        });
      }
    });
}
