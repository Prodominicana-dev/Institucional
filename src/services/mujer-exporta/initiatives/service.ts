import { notifications } from "@mantine/notifications";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
var CryptoJS = require("crypto-js");

// Hook para obtener iniciativas públicas (filtradas por status y vigencia)
export function useInitiatives(lang: string) {
  return useQuery({
    queryKey: ["mujerExportaInitiatives", lang],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/${lang}/mujer-exporta/initiatives`;
      const { data } = await axios.get(url);
      return data;
    },
  });
}

// Hook para obtener todas las iniciativas (admin)
export function useAdminInitiatives(userId: string) {
  const userIdEncrypted = CryptoJS.AES.encrypt(
    userId,
    process.env.NEXT_PUBLIC_CRYPTOJS_KEY
  ).toString();

  return useQuery({
    queryKey: ["mujerExportaInitiativesAdmin"],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/mujer-exporta/initiatives/admin`;
      const { data } = await axios.get(url, {
        headers: { Authorization: userIdEncrypted },
      });
      return data;
    },
    enabled: !!userId,
  });
}

// Hook para obtener una iniciativa por ID (para edición)
export function useInitiativeById(id: string, enabled: boolean = true) {
  return useQuery({
    queryKey: ["mujerExportaInitiative", id],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/mujer-exporta/initiatives/${id}`;
      const { data } = await axios.get(url);
      return data;
    },
    enabled: enabled && !!id,
  });
}

// Crear iniciativa
export async function createInitiative(
  initiative: any,
  update: () => void,
  userId: string
): Promise<boolean> {
  const userIdEncrypted = CryptoJS.AES.encrypt(
    userId,
    process.env.NEXT_PUBLIC_CRYPTOJS_KEY
  ).toString();

  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/mujer-exporta/initiatives`,
      initiative,
      {
        headers: { Authorization: userIdEncrypted },
      }
    );

    if (res.status === 201) {
      notifications.show({
        id: "initiative",
        autoClose: 5000,
        withCloseButton: false,
        title: "Iniciativa creada",
        message: "La iniciativa se ha creado correctamente.",
        color: "green",
        loading: false,
      });
      update();
      return true;
    }
    return false;
  } catch (error: any) {
    notifications.show({
      id: "initiative",
      autoClose: 5000,
      withCloseButton: false,
      title: "Error",
      message: error?.response?.data?.error || "Ha ocurrido un error al crear la iniciativa.",
      color: "red",
      loading: false,
    });
    return false;
  }
}

// Editar iniciativa
export async function editInitiative(
  id: string,
  initiative: any,
  update: () => void,
  userId: string
): Promise<boolean> {
  const userIdEncrypted = CryptoJS.AES.encrypt(
    userId,
    process.env.NEXT_PUBLIC_CRYPTOJS_KEY
  ).toString();

  try {
    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/mujer-exporta/initiatives/${id}`,
      initiative,
      {
        headers: { Authorization: userIdEncrypted },
      }
    );

    if (res.status === 200) {
      notifications.show({
        id: "initiative",
        autoClose: 5000,
        withCloseButton: false,
        title: "Iniciativa actualizada",
        message: "La iniciativa ha sido actualizada correctamente.",
        color: "green",
        loading: false,
      });
      update();
      return true;
    }
    return false;
  } catch (error: any) {
    notifications.show({
      id: "initiative",
      autoClose: 5000,
      withCloseButton: false,
      title: "Error",
      message: error?.response?.data?.error || "Ha ocurrido un error al actualizar la iniciativa.",
      color: "red",
      loading: false,
    });
    return false;
  }
}

// Habilitar iniciativa
export function enableInitiative(
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
    .patch(
      `${process.env.NEXT_PUBLIC_API_URL}/mujer-exporta/initiatives/enable/${id}`,
      null,
      {
        headers: { Authorization: userIdEncrypted },
      }
    )
    .then((res) => {
      if (res.status === 200) {
        notifications.show({
          id: "initiative",
          autoClose: 5000,
          withCloseButton: false,
          title: "Iniciativa activada",
          message: "La iniciativa ha sido activada correctamente.",
          color: "green",
          loading: false,
        });
        update();
        handleOpen();
      }
    })
    .catch(() => {
      notifications.show({
        id: "initiative",
        autoClose: 5000,
        withCloseButton: false,
        title: "Error",
        message: "Ha ocurrido un error al activar la iniciativa.",
        color: "red",
        loading: false,
      });
    });
}

// Deshabilitar iniciativa
export function disableInitiative(
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
    .patch(
      `${process.env.NEXT_PUBLIC_API_URL}/mujer-exporta/initiatives/disable/${id}`,
      null,
      {
        headers: { Authorization: userIdEncrypted },
      }
    )
    .then((res) => {
      if (res.status === 200) {
        notifications.show({
          id: "initiative",
          autoClose: 5000,
          withCloseButton: false,
          title: "Iniciativa desactivada",
          message: "La iniciativa ha sido desactivada correctamente.",
          color: "green",
          loading: false,
        });
        update();
        handleOpen();
      }
    })
    .catch(() => {
      notifications.show({
        id: "initiative",
        autoClose: 5000,
        withCloseButton: false,
        title: "Error",
        message: "Ha ocurrido un error al desactivar la iniciativa.",
        color: "red",
        loading: false,
      });
    });
}

// Eliminar iniciativa
export function deleteInitiative(
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
    .delete(
      `${process.env.NEXT_PUBLIC_API_URL}/mujer-exporta/initiatives/${id}`,
      {
        headers: { Authorization: userIdEncrypted },
      }
    )
    .then((res) => {
      if (res.status === 200) {
        notifications.show({
          id: "initiative",
          autoClose: 5000,
          withCloseButton: false,
          title: "Iniciativa eliminada",
          message: "La iniciativa ha sido eliminada correctamente.",
          color: "green",
          loading: false,
        });
        update();
        handleOpen();
      }
    })
    .catch(() => {
      notifications.show({
        id: "initiative",
        autoClose: 5000,
        withCloseButton: false,
        title: "Error",
        message: "Ha ocurrido un error al eliminar la iniciativa.",
        color: "red",
        loading: false,
      });
    });
}
