import { notifications } from "@mantine/notifications";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
var CryptoJS = require("crypto-js");

/* Obtener todos los documentos */
export function useDocuments() {
  return useQuery({
    queryKey: ["documents"],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/documents`;
      const { data } = await axios.get(url);
      return data.documents;
    },
  });
}

/* Crear un documento */
export function createDocument(
  document: any,
  update: () => void,
  userId: string
) {
  const userIdEncrypted = CryptoJS.AES.encrypt(
    userId,
    process.env.NEXT_PUBLIC_CRYPTOJS_KEY
  ).toString();
  return axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}/documents`, document, {
      headers: {
        Authorization: `${userIdEncrypted}`,
      },
    })
    .then((res) => {
      if (res.status === 201) {
        notifications.show({
          id: "document",
          autoClose: 5000,
          withCloseButton: false,
          title: "Documento creado",
          message: "El documento se ha creado correctamente",
          color: "green",
        });
        update();
      }
    })
    .catch((error) => {
      notifications.show({
        id: "document",
        autoClose: 5000,
        withCloseButton: false,
        title: "Error al crear el documento",
        message: "No se ha podido crear el documento",
        color: "red",
      });
    });
}

/* Editar documento */
export function editDocument(
  id: string,
  document: any,
  update: () => void,
  userId: string
) {
  const userIdEncrypted = CryptoJS.AES.encrypt(
    userId,
    process.env.NEXT_PUBLIC_CRYPTOJS_KEY
  ).toString();
  return axios
    .patch(`${process.env.NEXT_PUBLIC_API_URL}/documents/${id}`, document, {
      headers: {
        Authorization: `${userIdEncrypted}`,
      },
    })
    .then((res) => {
      if (res.status === 200) {
        notifications.show({
          id: "document",
          autoClose: 5000,
          withCloseButton: false,
          title: "Documento editado",
          message: "El documento se ha editado correctamente",
          color: "green",
        });
        update();
      }
    })
    .catch((error) => {
      notifications.show({
        id: "document",
        autoClose: 5000,
        withCloseButton: false,
        title: "Error al editar el documento",
        message: "No se ha podido editar el documento",
        color: "red",
      });
    });
}

/* Eliminar documento */
export function deleteDocument(
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
    .delete(`${process.env.NEXT_PUBLIC_API_URL}/documents/${id}`, {
      headers: {
        Authorization: `${userIdEncrypted}`,
      },
    })
    .then((res) => {
      if (res.status === 200) {
        notifications.show({
          id: "document",
          autoClose: 5000,
          withCloseButton: false,
          title: "Documento eliminado",
          message: "El documento se ha eliminado correctamente",
          color: "green",
        });
        update();
        handleOpen();
      }
    })
    .catch((error) => {
      notifications.show({
        id: "document",
        autoClose: 5000,
        withCloseButton: false,
        title: "Error al eliminar el documento",
        message: "No se ha podido eliminar el documento",
        color: "red",
      });
    });
}
