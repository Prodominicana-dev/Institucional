import { Section } from "@/models/section";
import { Subsection } from "@/models/subsection";
import { notifications } from "@mantine/notifications";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
var CryptoJS = require("crypto-js");

export function useSubsection() {
  return useQuery({
    queryKey: ["subsections"],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/subsection`;
      const { data } = await axios.get(url);
      return data.subsections;
    },
  });
}

export function useSectionSubsAdmin() {
  return useQuery({
    queryKey: ["secSubsAdmin"],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/subsection`;
      const { data } = await axios.get(url);
      const sectionsObject = data.sections.map((subsection: Section) => {
        return {
          value: subsection.id,
          label: subsection.name,
        };
      });
      return sectionsObject;
    },
  });
}

export function useSectionById(id: number) {
  return useQuery({
    queryKey: ["sectionById", id],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/subsection/${id}`;
      const { data } = await axios.get(url);
      return data;
    },
  });
}

export function createSubsection(
  subsection: Subsection,
  handleOpen: () => void,
  update: () => void,
  userId: string
) {
  const userIdEncrypted = CryptoJS.AES.encrypt(
    userId,
    process.env.NEXT_PUBLIC_CRYPTOJS_KEY
  ).toString();
  return axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}/subsection`, subsection, {
      headers: {
        Authorization: `${userIdEncrypted}`,
      },
    })
    .then((res) => {
      if (res.status === 201) {
        notifications.show({
          id: "subsection",
          autoClose: 5000,
          withCloseButton: false,
          title: "Subsección creada",
          message: "La subsección ha sido creada correctamente.",
          color: "green",
          loading: false,
        });
        update();
        handleOpen();
      }
      if (res.status === 500) {
        notifications.show({
          id: "subsection",
          autoClose: 5000,
          withCloseButton: false,
          title: "Error",
          message: "Hubo un error creando la nueva subsección.",
          color: "red",
          loading: false,
        });
      }
      if (res.status === 401) {
        notifications.show({
          id: "subsection",
          autoClose: 5000,
          withCloseButton: false,
          title: "Usuario inautorizado",
          message: "No tienes permisos para crear una subsección.",
          color: "red",
          loading: false,
        });
      }
    });
}

export function editSubsection(
  id: number,
  subsection: any,
  handleOpen: () => void,
  update: () => void,
  userId: string
) {
  const userIdEncrypted = CryptoJS.AES.encrypt(
    userId,
    process.env.NEXT_PUBLIC_CRYPTOJS_KEY
  ).toString();
  return axios
    .patch(`${process.env.NEXT_PUBLIC_API_URL}/subsection/${id}`, subsection, {
      headers: {
        Authorization: `${userIdEncrypted}`,
      },
    })
    .then((res) => {
      if (res.status === 200) {
        notifications.show({
          id: "subsection",
          autoClose: 5000,
          withCloseButton: false,
          title: "Subsección actualizada",
          message: "La subsección ha sido actualizada correctamente.",
          color: "green",
          loading: false,
        });
        update();
        handleOpen();
      }
      if (res.status === 500) {
        notifications.show({
          id: "subsection",
          autoClose: 5000,
          withCloseButton: false,
          title: "Error",
          message: "Hubo un error creando la nueva subsección.",
          color: "red",
          loading: false,
        });
      }
      if (res.status === 401) {
        notifications.show({
          id: "subsection",
          autoClose: 5000,
          withCloseButton: false,
          title: "Usuario inautorizado",
          message: "No tienes permisos para crear una subsección.",
          color: "red",
          loading: false,
        });
      }
    });
}

export function activeSubsection(
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
      `${process.env.NEXT_PUBLIC_API_URL}/subsection/adm/activate/${id}`,
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
          id: "subsection",
          autoClose: 5000,
          withCloseButton: false,
          title: "Subsección activada",
          message: "La subsección ha sido activada correctamente.",
          color: "green",
          loading: false,
        });
        update();
        handleOpen();
      }
      if (res.status === 500) {
        notifications.show({
          id: "subsection",
          autoClose: 5000,
          withCloseButton: false,
          title: "Error",
          message: "Hubo un error activando la subsección.",
          color: "red",
          loading: false,
        });
      }
      if (res.status === 401) {
        notifications.show({
          id: "subsection",
          autoClose: 5000,
          withCloseButton: false,
          title: "Usuario inautorizado",
          message: "No tienes permisos para activar una subsección.",
          color: "red",
          loading: false,
        });
      }
    });
}

export function inactiveSubsection(
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
      `${process.env.NEXT_PUBLIC_API_URL}/subsection/adm/deactivate/${id}`,
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
          id: "subsection",
          autoClose: 5000,
          withCloseButton: false,
          title: "Sección desactivada",
          message: "La subsección ha sido desactivada correctamente.",
          color: "green",
          loading: false,
        });
        update();
        handleOpen();
      }
      if (res.status === 500) {
        notifications.show({
          id: "subsection",
          autoClose: 5000,
          withCloseButton: false,
          title: "Error",
          message: "Hubo un error desactivando la subsección.",
          color: "red",
          loading: false,
        });
      }
      if (res.status === 401) {
        notifications.show({
          id: "subsection",
          autoClose: 5000,
          withCloseButton: false,
          title: "Usuario inautorizado",
          message: "No tienes permisos para desactivar una subsección.",
          color: "red",
          loading: false,
        });
      }
    });
}

export function deleteSubsection(
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
    .delete(`${process.env.NEXT_PUBLIC_API_URL}/subsection/${id}`, {
      headers: {
        Authorization: `${userIdEncrypted}`,
      },
    })
    .then((res) => {
      if (res.status === 200) {
        notifications.show({
          id: "subsection",
          autoClose: 5000,
          withCloseButton: false,
          title: "Sección eliminada",
          message:
            "La subsección ha sido eliminada correctamente. No podrás recuperarla.",
          color: "green",
          loading: false,
        });
        update();
        handleOpen();
      }
      if (res.status === 500) {
        notifications.show({
          id: "subsection",
          autoClose: 5000,
          withCloseButton: false,
          title: "Error",
          message: "Hubo un error borrando la subsección.",
          color: "red",
          loading: false,
        });
      }
      if (res.status === 401) {
        notifications.show({
          id: "subsection",
          autoClose: 5000,
          withCloseButton: false,
          title: "Usuario inautorizado",
          message: "No tienes permisos para desactivar una subsección.",
          color: "red",
          loading: false,
        });
      }
    });
}
