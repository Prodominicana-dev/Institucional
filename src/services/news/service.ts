import { notifications } from "@mantine/notifications";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
var CryptoJS = require("crypto-js");

export function useNews(lang: string) {
  return useQuery({
    queryKey: ["newsEs"],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/${lang}/news`;
      const { data } = await axios.get(url);
      return data;
    },
  });
}

export function useEnNews() {
  return useQuery({
    queryKey: ["newsEn"],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/en/news`;
      const { data } = await axios.get(url);
      return data;
    },
  });
}

export function useNewsById(lang: string, id: string) {
  return useQuery({
    queryKey: ["newsById", id],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/${lang}/news/${id}`;
      const { data } = await axios.get(url);
      return data[0];
    },
  });
}

export function useNewsConfById(id: string) {
  return useQuery({
    queryKey: ["newsConfById", id],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/news/${id}`;
      const { data } = await axios.get(url);
      return data;
    },
  });
}

export function usePrevNextById(lang: string, id: string) {
  return useQuery({
    queryKey: ["prevNext", id],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/${lang}/news/prnxt/${id}`;
      const { data } = await axios.get(url);
      return data;
    },
  });
}

export function useCategoriesNews() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/news/c/all`;
      const { data } = await axios.get(url);
      return data;
    },
  });
}

export function createNews(news: FormData, update: () => void, userId: string) {
  const userIdEncrypted = CryptoJS.AES.encrypt(
    userId,
    process.env.NEXT_PUBLIC_CRYPTOJS_KEY
  ).toString();
  return axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}/news`, news, {
      headers: {
        Authorization: `${userIdEncrypted}`,
      },
    })
    .then((res) => {
      if (res.status === 201) {
        notifications.show({
          id: "news",
          autoClose: 5000,
          withCloseButton: false,
          title: "Noticia creada",
          message: "La noticia se ha creado correctamente.",
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
          message: "Ha ocurrido un error al crear la noticia.",
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
          message: "No tienes permisos para crear una sección.",
          color: "red",
          loading: false,
        });
      }
    })
    .catch((error) => {});
}

export function editNews(
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
    .patch(`${process.env.NEXT_PUBLIC_API_URL}/news/${id}`, news, {
      headers: {
        Authorization: `${userIdEncrypted}`,
      },
    })
    .then((res) => {
      if (res.status === 200) {
        notifications.show({
          id: "news",
          autoClose: 5000,
          withCloseButton: false,
          title: "Noticia actualizada",
          message: "La noticia ha sido actualizada correctamente.",
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
          message: "Hubo un error creando la nueva noticia.",
          color: "red",
          loading: false,
        });
      }
      if (res.status === 401) {
        notifications.show({
          id: "news",
          autoClose: 5000,
          withCloseButton: false,
          title: "Usuario inautorizado",
          message: "No tienes permisos para crear una noticia.",
          color: "red",
          loading: false,
        });
      }
    });
}

export function enableNews(
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
    .patch(`${process.env.NEXT_PUBLIC_API_URL}/news/enable/${id}`, null, {
      headers: {
        Authorization: `${userIdEncrypted}`,
      },
    })
    .then((res) => {
      if (res.status === 200) {
        notifications.show({
          id: "news",
          autoClose: 5000,
          withCloseButton: false,
          title: "Noticia publicada",
          message: "La noticia ha sido publicada correctamente.",
          color: "green",
          loading: false,
        });
        update();
        handleOpen();
      }
      if (res.status === 500) {
        notifications.show({
          id: "news",
          autoClose: 5000,
          withCloseButton: false,
          title: "Error",
          message: "Hubo un error publicando la noticia.",
          color: "red",
          loading: false,
        });
      }
      if (res.status === 401) {
        notifications.show({
          id: "news",
          autoClose: 5000,
          withCloseButton: false,
          title: "Usuario inautorizado",
          message: "No tienes permisos para publicar una noticia.",
          color: "red",
          loading: false,
        });
      }
    });
}

export function disableNews(
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
    .patch(`${process.env.NEXT_PUBLIC_API_URL}/news/disable/${id}`, null, {
      headers: {
        Authorization: `${userIdEncrypted}`,
      },
    })
    .then((res) => {
      if (res.status === 200) {
        notifications.show({
          id: "news",
          autoClose: 5000,
          withCloseButton: false,
          title: "Noticia ocultada",
          message: "La noticia ha sido ocultada correctamente.",
          color: "green",
          loading: false,
        });
        update();
        handleOpen();
      }
      if (res.status === 500) {
        notifications.show({
          id: "news",
          autoClose: 5000,
          withCloseButton: false,
          title: "Error",
          message: "Hubo un error ocultando la noticia.",
          color: "red",
          loading: false,
        });
      }
      if (res.status === 401) {
        notifications.show({
          id: "news",
          autoClose: 5000,
          withCloseButton: false,
          title: "Usuario inautorizado",
          message: "No tienes permisos para ocultar una noticia.",
          color: "red",
          loading: false,
        });
      }
    });
}

export function deleteNews(
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
    .delete(`${process.env.NEXT_PUBLIC_API_URL}/news/${id}`, {
      headers: {
        Authorization: `${userIdEncrypted}`,
      },
    })
    .then((res) => {
      if (res.status === 200) {
        notifications.show({
          id: "news",
          autoClose: 5000,
          withCloseButton: false,
          title: "Noticia eliminada",
          message: "La noticia ha sido eliminada correctamente. ",
          color: "green",
          loading: false,
        });
        update();
        handleOpen();
      }
      if (res.status === 500) {
        notifications.show({
          id: "news",
          autoClose: 5000,
          withCloseButton: false,
          title: "Error",
          message: "Hubo un error eliminando la noticia.",
          color: "red",
          loading: false,
        });
      }
      if (res.status === 401) {
        notifications.show({
          id: "news",
          autoClose: 5000,
          withCloseButton: false,
          title: "Usuario inautorizado",
          message: "No tienes permisos para eliminar una noticia.",
          color: "red",
          loading: false,
        });
      }
    });
}
