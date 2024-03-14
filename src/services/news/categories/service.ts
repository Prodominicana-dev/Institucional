import { notifications } from "@mantine/notifications";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
var CryptoJS = require("crypto-js");

export function useNewsCategories() {
  return useQuery({
    queryKey: ["newscategories"],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/news-category`;
      const { data } = await axios.get(url);
      return data;
    },
  });
}

export function useNewsCategoriesById(id: string) {
  return useQuery({
    queryKey: ["newscategoriesBYId", id],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/news-category/${id}`;
      const { data } = await axios.get(url);
      return data;
    },
  });
}

export async function createNewsCategory(
  newscategory: any,
  update: () => void,
  userId: string
) {
  try {
    const userIdEncrypted = CryptoJS.AES.encrypt(
      userId,
      process.env.NEXT_PUBLIC_CRYPTOJS_KEY
    ).toString();

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/news-category`,
      newscategory,
      {
        headers: {
          Authorization: userIdEncrypted,
        },
      }
    );

    if (res.status === 201) {
      notifications.show({
        id: "newscategory",
        autoClose: 5000,
        withCloseButton: false,
        title: "Categoría creada",
        message: "La categoría ha sido creada correctamente.",
        color: "green",
        loading: false,
      });
      update();
    } else {
      handleErrorResponse(res);
    }
  } catch (error) {
    notifications.show({
      id: "newscategory",
      autoClose: 5000,
      withCloseButton: false,
      title: "Error creando la categoría",
      message:
        "Existe una categoría con el mismo nombre. Por favor, cambia el nombre de la categoría o intenta de nuevo.",
      color: "red",
      loading: false,
    });
  }
}

function handleErrorResponse(response: any) {
  switch (response.status) {
    case 500:
      notifications.show({
        id: "newscategory",
        autoClose: 5000,
        withCloseButton: false,
        title: "Error creando la categoría",
        message:
          "Existe una categoría con el mismo nombre. Por favor, cambia el nombre de la categoría o intenta de nuevo.",
        color: "red",
        loading: false,
      });
      break;

    case 401:
      notifications.show({
        id: "newscategory",
        autoClose: 5000,
        withCloseButton: false,
        title: "Usuario no autorizado",
        message: "No tienes permisos para crear una categoría.",
        color: "red",
        loading: false,
      });
      break;
    // Puedes agregar más casos según sea necesario
    default:
      break;
  }
}

export async function editNewsCategory(
  id: string,
  direction: any,
  update: () => void,
  userId: string
) {
  try {
    const userIdEncrypted = CryptoJS.AES.encrypt(
      userId,
      process.env.NEXT_PUBLIC_CRYPTOJS_KEY
    ).toString();
    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/news-category/${id}`,
      direction,
      {
        headers: {
          Authorization: `${userIdEncrypted}`,
        },
      }
    );

    if (res.status === 200) {
      notifications.show({
        id: "newscategory",
        autoClose: 5000,
        withCloseButton: false,
        title: "Categoría actualizada",
        message: "La categoría ha sido actualizada correctamente.",
        color: "green",
        loading: false,
      });
      update();
    } else {
      handleEditErrorResponse(res);
    }
  } catch (error) {
    notifications.show({
      id: "newscategory",
      autoClose: 5000,
      withCloseButton: false,
      title: "Error editando la categoría",
      message:
        "Existe una categoría con el mismo nombre. Por favor, cambia el nombre de la categoría o intenta de nuevo.",
      color: "red",
      loading: false,
    });
  }
}

function handleEditErrorResponse(response: any) {
  switch (response.status) {
    case 500:
      notifications.show({
        id: "newscategory",
        autoClose: 5000,
        withCloseButton: false,
        title: "Error creando la categoría",
        message:
          "Existe una categoría con el mismo nombre. Por favor, cambia el nombre de la categoría o intenta de nuevo.",
        color: "red",
        loading: false,
      });
      break;

    case 401:
      notifications.show({
        id: "newscategory",
        autoClose: 5000,
        withCloseButton: false,
        title: "Usuario inautorizado",
        message: "No tienes permisos para editar una categoría.",
        color: "red",
        loading: false,
      });
      break;
    // Puedes agregar más casos según sea necesario
    default:
      break;
  }
}

export function deleteNewsCategory(
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
    .delete(`${process.env.NEXT_PUBLIC_API_URL}/news-category/${id}`, {
      headers: {
        Authorization: `${userIdEncrypted}`,
      },
    })
    .then((res) => {
      if (res.status === 200) {
        notifications.show({
          id: "newscategory",
          autoClose: 5000,
          withCloseButton: false,
          title: "Categoría eliminada",
          message: "La categoría ha sido eliminada correctamente.",
          color: "green",
          loading: false,
        });
        update();
        handleOpen();
      }
      if (res.status === 500) {
        notifications.show({
          id: "newscategory",
          autoClose: 5000,
          withCloseButton: false,
          title: "Error",
          message: "Hubo un error borrando la categoría.",
          color: "red",
          loading: false,
        });
      }
      if (res.status === 401) {
        notifications.show({
          id: "newscategory",
          autoClose: 5000,
          withCloseButton: false,
          title: "Usuario inautorizado",
          message: "No tienes permisos para desactivar una dirección.",
          color: "red",
          loading: false,
        });
      }
    });
}
