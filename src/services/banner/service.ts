import { notifications } from "@mantine/notifications";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
var CryptoJS = require("crypto-js");

import { Banner } from "./public";

export type { Banner };
export { bannerImageUrl } from "./public";

const API = () => process.env.NEXT_PUBLIC_API_URL;

function authHeader(userId: string) {
  const encrypted = CryptoJS.AES.encrypt(
    userId,
    process.env.NEXT_PUBLIC_CRYPTOJS_KEY
  ).toString();
  return { Authorization: encrypted };
}

/* Todos los banners, visibles u ocultos, para el admin. */
export function useAdminBanners(userId?: string) {
  return useQuery({
    queryKey: ["admin-banners", userId],
    enabled: !!userId,
    queryFn: async () => {
      const { data } = await axios.get(`${API()}/banner/admin`, {
        headers: authHeader(userId as string),
      });
      return data as Banner[];
    },
  });
}

function notify(id: string, ok: boolean, title: string, message: string) {
  notifications.show({
    id,
    autoClose: 5000,
    withCloseButton: false,
    title,
    message,
    color: ok ? "green" : "red",
    loading: false,
  });
}

export async function createBanner(
  formData: FormData,
  update: () => void,
  userId: string,
  silent = false
): Promise<boolean> {
  try {
    const res = await axios.post(`${API()}/banner`, formData, {
      headers: authHeader(userId),
    });
    if (res.status === 201) {
      if (!silent)
        notify("banner-create", true, "Banner creado", "El banner se ha creado correctamente.");
      update();
      return true;
    }
    return false;
  } catch {
    notify("banner-create", false, "Error", "Ha ocurrido un error al crear el banner.");
    return false;
  }
}

export async function editBanner(
  id: string,
  formData: FormData,
  update: () => void,
  userId: string
): Promise<boolean> {
  try {
    const res = await axios.patch(`${API()}/banner/${id}`, formData, {
      headers: authHeader(userId),
    });
    if (res.status === 200) {
      notify("banner-edit", true, "Banner actualizado", "El banner se ha actualizado correctamente.");
      update();
      return true;
    }
    return false;
  } catch {
    notify("banner-edit", false, "Error", "Ha ocurrido un error al actualizar el banner.");
    return false;
  }
}

/* Ocultar o volver a mostrar un banner sin borrarlo. */
export async function setBannerVisibility(
  id: string,
  visible: boolean,
  update: () => void,
  userId: string
): Promise<boolean> {
  try {
    const res = await axios.patch(
      `${API()}/banner/${id}/visibility`,
      { visible, updated_By: userId },
      { headers: authHeader(userId) }
    );
    if (res.status === 200) {
      notify(
        "banner-visibility",
        true,
        visible ? "Banner visible" : "Banner oculto",
        visible
          ? "El banner vuelve a mostrarse en la página."
          : "El banner ya no se muestra en la página."
      );
      update();
      return true;
    }
    return false;
  } catch {
    notify("banner-visibility", false, "Error", "No se pudo cambiar la visibilidad del banner.");
    return false;
  }
}

/* Recibe los ids en el orden en que deben salir. */
export async function reorderBanners(
  ids: string[],
  update: () => void,
  userId: string
): Promise<boolean> {
  try {
    await axios.post(
      `${API()}/banner/reorder`,
      { ids },
      { headers: authHeader(userId) }
    );
    update();
    return true;
  } catch {
    notify("banner-reorder", false, "Error", "No se pudo cambiar el orden de los banners.");
    return false;
  }
}

export function deleteBanner(
  id: string,
  handleOpen: () => void,
  update: () => void,
  userId: string
) {
  return axios
    .delete(`${API()}/banner/${id}`, { headers: authHeader(userId) })
    .then((res) => {
      if (res.status === 200) {
        notify("banner-delete", true, "Banner eliminado", "El banner ha sido eliminado correctamente.");
        update();
        handleOpen();
      }
    })
    .catch(() => {
      notify("banner-delete", false, "Error", "Ha ocurrido un error al eliminar el banner.");
    });
}
