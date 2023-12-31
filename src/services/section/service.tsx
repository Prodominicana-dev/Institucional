import { Section } from "@/models/section";
import { notifications } from "@mantine/notifications";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
var CryptoJS = require("crypto-js");

export function useSection() {
  return useQuery({
    queryKey: ["sections"],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/section`;
      const { data } = await axios.get(url);
      return data.sections;
    },
  });
}

export function useSectionAdmin() {
  return useQuery({
    queryKey: ["sectionsAdmin"],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/section/adm/all`;
      const { data } = await axios.get(url);
      return data.sections;
    },
  });
}

export function useSectionById(id: number) {
  return useQuery({
    queryKey: ["sectionById", id],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/section/${id}`;
      const { data } = await axios.get(url);
      return data;
    },
  });
}

export function createSection(
  section: Section,
  handleOpen: () => void,
  update: () => void,
  userId: string
) {
  const userIdEncrypted = CryptoJS.AES.encrypt(
    userId,
    process.env.NEXT_PUBLIC_CRYPTOJS_KEY
  ).toString();
  return axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}/section`, section, {
      headers: {
        Authorization: `${userIdEncrypted}`,
      },
    })
    .then((res) => {
      if (res.status === 201) {
        notifications.show({
          id: "section",
          autoClose: 5000,
          withCloseButton: false,
          title: "Sección creada",
          message: "La sección ha sido creada correctamente.",
          color: "green",
          loading: false,
        });
        update();
        handleOpen();
      }
      if (res.status === 500) {
        notifications.show({
          id: "section",
          autoClose: 5000,
          withCloseButton: false,
          title: "Error",
          message: "Hubo un error creando la nueva sección.",
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
    });
}

export function editSection(
  id: number,
  section: Section,
  handleOpen: () => void,
  update: () => void,
  userId: string
) {
  const userIdEncrypted = CryptoJS.AES.encrypt(
    userId,
    process.env.NEXT_PUBLIC_CRYPTOJS_KEY
  ).toString();
  return axios
    .patch(`${process.env.NEXT_PUBLIC_API_URL}/section/${id}`, section, {
      headers: {
        Authorization: `${userIdEncrypted}`,
      },
    })
    .then((res) => {
      if (res.status === 200) {
        notifications.show({
          id: "section",
          autoClose: 5000,
          withCloseButton: false,
          title: "Sección actualizada",
          message: "La sección ha sido actualizada correctamente.",
          color: "green",
          loading: false,
        });
        update();
        handleOpen();
      }
      if (res.status === 500) {
        notifications.show({
          id: "section",
          autoClose: 5000,
          withCloseButton: false,
          title: "Error",
          message: "Hubo un error creando la nueva sección.",
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
    });
}

export function activeSection(
  id: number,
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
    .patch(
      `${process.env.NEXT_PUBLIC_API_URL}/section/adm/activate/${id}`,
      null,
      {
        headers: {
          Authorization: `${userIdEncrypted}`,
        },
      }
    )
    .then((res) => {
      if (res.status === 200) {
        notifications.show({
          id: "section",
          autoClose: 5000,
          withCloseButton: false,
          title: "Sección activada",
          message: "La sección ha sido activada correctamente.",
          color: "green",
          loading: false,
        });
        update();
        handleOpen();
      }
      if (res.status === 500) {
        notifications.show({
          id: "section",
          autoClose: 5000,
          withCloseButton: false,
          title: "Error",
          message: "Hubo un error activando la sección.",
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
          message: "No tienes permisos para activar una sección.",
          color: "red",
          loading: false,
        });
      }
    });
}

export function inactiveSection(
  id: number,
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
    .patch(
      `${process.env.NEXT_PUBLIC_API_URL}/section/adm/deactivate/${id}`,
      null,
      {
        headers: {
          Authorization: `${userIdEncrypted}`,
        },
      }
    )
    .then((res) => {
      if (res.status === 200) {
        notifications.show({
          id: "section",
          autoClose: 5000,
          withCloseButton: false,
          title: "Sección desactivada",
          message: "La sección ha sido desactivada correctamente.",
          color: "green",
          loading: false,
        });
        update();
        handleOpen();
      }
      if (res.status === 500) {
        notifications.show({
          id: "section",
          autoClose: 5000,
          withCloseButton: false,
          title: "Error",
          message: "Hubo un error desactivando la sección.",
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
          message: "No tienes permisos para desactivar una sección.",
          color: "red",
          loading: false,
        });
      }
    });
}

export function deleteSection(
  id: number,
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
    .delete(`${process.env.NEXT_PUBLIC_API_URL}/section/${id}`, {
      headers: {
        Authorization: `${userIdEncrypted}`,
      },
    })
    .then((res) => {
      if (res.status === 200) {
        notifications.show({
          id: "section",
          autoClose: 5000,
          withCloseButton: false,
          title: "Sección eliminada",
          message:
            "La sección ha sido eliminada correctamente. No podrás recuperarla.",
          color: "green",
          loading: false,
        });
        update();
        handleOpen();
      }
      if (res.status === 500) {
        notifications.show({
          id: "section",
          autoClose: 5000,
          withCloseButton: false,
          title: "Error",
          message: "Hubo un error borrando la sección.",
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
          message: "No tienes permisos para desactivar una sección.",
          color: "red",
          loading: false,
        });
      }
    });
}
