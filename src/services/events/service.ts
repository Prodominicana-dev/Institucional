import { notifications } from "@mantine/notifications";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
var CryptoJS = require("crypto-js");

export function useEvents(lang: string) {
  return useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/${lang}/events`;
      const { data } = await axios.get(url);
      console.log(data);
      return data;
    },
  });
}

export function useEnNews() {
  return useQuery({
    queryKey: ["news"],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/en/events`;
      const { data } = await axios.get(url);
      return data;
    },
  });
}

export function useEventById(id: string) {
  return useQuery({
    queryKey: ["newsById", id],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/events/${id}`;
      const { data } = await axios.get(url);
      return data;
    },
  });
}

export function createEvents(
  event: FormData,
  update: () => void,
  userId: string
) {
  const userIdEncrypted = CryptoJS.AES.encrypt(
    userId,
    process.env.NEXT_PUBLIC_CRYPTOJS_KEY
  ).toString();
  return axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}/events`, event, {
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
          title: "Evento creado",
          message: "El evento se ha creado correctamente",
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
          message: "Hubo un error creando el evento.",
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
          message: "No tienes permisos para crear un evento.",
          color: "red",
          loading: false,
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

export function editEvents(
  id: string,
  news: any,
  update: () => void,
  userId: string
) {
  const userIdEncrypted = CryptoJS.AES.encrypt(
    userId,
    process.env.NEXT_PUBLIC_CRYPTOJS_KEY
  ).toString();
  return axios
    .patch(`${process.env.NEXT_PUBLIC_API_URL}/events/${id}`, news, {
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
          title: "Evento actualizado",
          message: "El evento ha sido actualizado correctamente.",
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
          message: "Hubo un error creando el nuevo evento.",
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
          message: "No tienes permisos para crear un evento.",
          color: "red",
          loading: false,
        });
      }
    });
}

export function enableEvents(
  id: string,
  handleOpen: () => void,
  update: () => void,
  userId: string
) {
  console.log(userId);
  const userIdEncrypted = CryptoJS.AES.encrypt(
    userId,
    process.env.NEXT_PUBLIC_CRYPTOJS_KEY
  ).toString();
  return axios
    .patch(`${process.env.NEXT_PUBLIC_API_URL}/events/enable/${id}`, null, {
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
          title: "Evento publicado",
          message: "El evento se ha publicado correctamente.",
          color: "green",
          loading: false,
        });
        update();
        handleOpen();
      }
      if (res.status === 500) {
        notifications.show({
          id: "event",
          autoClose: 5000,
          withCloseButton: false,
          title: "Error",
          message: "Hubo un error publicando el evento.",
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
          message: "No tienes permisos para publicar un evento.",
          color: "red",
          loading: false,
        });
      }
    });
}

export function disableEvents(
  id: string,
  handleOpen: () => void,
  update: () => void,
  userId: string
) {
  console.log(userId);
  const userIdEncrypted = CryptoJS.AES.encrypt(
    userId,
    process.env.NEXT_PUBLIC_CRYPTOJS_KEY
  ).toString();
  return axios
    .patch(`${process.env.NEXT_PUBLIC_API_URL}/events/disable/${id}`, null, {
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
          title: "Evento ocultado",
          message: "El evento se ha ocultado correctamente.",
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
          message: "Hubo un error ocultando el evento.",
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
          message: "No tienes permisos para ocultar un evento.",
          color: "red",
          loading: false,
        });
      }
    });
}

export function deleteEvents(
  id: string,
  handleOpen: () => void,
  update: () => void,
  userId: string
) {
  console.log(userId);
  const userIdEncrypted = CryptoJS.AES.encrypt(
    userId,
    process.env.NEXT_PUBLIC_CRYPTOJS_KEY
  ).toString();
  return axios
    .delete(`${process.env.NEXT_PUBLIC_API_URL}/events/${id}`, {
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
          title: "Evento eliminado",
          message: "El evento se ha eliminado correctamente",
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
          message: "Hubo un error eliminando el evento.",
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
          message: "No tienes permisos para eliminar un evento.",
          color: "red",
          loading: false,
        });
      }
    });
}
