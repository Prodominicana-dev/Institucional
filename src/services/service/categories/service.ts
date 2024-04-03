import { notifications } from "@mantine/notifications";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
var CryptoJS = require("crypto-js");

export function useServiceCategory() {
  return useQuery({
    queryKey: ["servCategory"],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/service/categories`;
      const { data } = await axios.get(url);
      return data;
    },
  });
}

export function useServiceCategoryById(id: string) {
  return useQuery({
    queryKey: ["servCategoryById", id],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/service/category/${id}`;
      const { data } = await axios.get(url);
      return data;
    },
  });
}

export function createServiceCategory(
  category: any,
  update: () => void,
  userId: string
) {
  const userIdEncrypted = CryptoJS.AES.encrypt(
    userId,
    process.env.NEXT_PUBLIC_CRYPTOJS_KEY
  ).toString();
  return axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}/service/category`, category, {
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
          title: "Categoría de servicio creada",
          message: "La categoría de servicio se ha creado correctamente.",
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
          message: "Hubo un error creando la categoría de servicio.",
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
          message: "No tienes permisos para crear una categoría de servicio.",
          color: "red",
          loading: false,
        });
      }
    })
    .catch((error) => {});
}

export function editServiceCategory(
  id: string,
  category: any,
  update: () => void,
  userId: string
) {
  const userIdEncrypted = CryptoJS.AES.encrypt(
    userId,
    process.env.NEXT_PUBLIC_CRYPTOJS_KEY
  ).toString();
  return axios
    .patch(
      `${process.env.NEXT_PUBLIC_API_URL}/service/category/${id}`,
      category,
      {
        headers: {
          Authorization: `${userIdEncrypted}`,
        },
      }
    )
    .then((res) => {
      if (res.status === 200) {
        notifications.show({
          id: "event",
          autoClose: 5000,
          withCloseButton: false,
          title: "Categoría de servicio actualizada",
          message: "La categoría de servicio se ha actualizado correctamente.",
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
          message: "Hubo un error editando la categoría de servicio.",
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
          message: "No tienes permisos para editar la categoría de servicio.",
          color: "red",
          loading: false,
        });
      }
    });
}

export function deleteServiceCategory(
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
    .delete(`${process.env.NEXT_PUBLIC_API_URL}/service/category/${id}`, {
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
          title: "Categoría de servicio eliminada",
          message: "La categoría de servicio ha sido eliminada correctamente.",
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
          message: "Hubo un error eliminando la categoría de servicio.",
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
          message: "No tienes permisos para eliminar la categoría de servicio.",
          color: "red",
          loading: false,
        });
      }
    });
}
