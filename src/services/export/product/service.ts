import { notifications } from "@mantine/notifications";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
var CryptoJS = require("crypto-js");

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/product`;
      const { data } = await axios.get(url);
      return data;
    },
  });
}

export function useProductByCode(code: string) {
  return useQuery({
    queryKey: ["productById", code],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/product/${code}`;
      const { data } = await axios.get(url);
      return data;
    },
  });
}

export async function createProduct(
  product: any,
  update: () => void,
  userId: string
) {
  try {
    const userIdEncrypted = CryptoJS.AES.encrypt(
      userId,
      process.env.NEXT_PUBLIC_CRYPTOJS_KEY
    ).toString();

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/product`,
      product,
      {
        headers: {
          Authorization: userIdEncrypted,
        },
      }
    );

    if (res.status === 201) {
      notifications.show({
        id: "member",
        autoClose: 5000,
        withCloseButton: false,
        title: "Producto creado",
        message: "El producto ha sido creado correctamente.",
        color: "green",
        loading: false,
      });
      update();
    } else {
      handleErrorResponse(res);
    }
  } catch (error) {
    notifications.show({
      id: "member",
      autoClose: 5000,
      withCloseButton: false,
      title: "Error creando al producto",
      message: "Ocurrió un error creando al producto.",
      color: "red",
      loading: false,
    });
  }
}

function handleErrorResponse(response: any) {
  switch (response.status) {
    case 500:
      notifications.show({
        id: "member",
        autoClose: 5000,
        withCloseButton: false,
        title: "Error creando al producto",
        message:
          "Ocurrió un error creando al producto. Por favor, intenta de nuevo.",
        color: "red",
        loading: false,
      });
      break;

    case 401:
      notifications.show({
        id: "member",
        autoClose: 5000,
        withCloseButton: false,
        title: "Usuario no autorizado",
        message: "No tienes permisos para crear un producto.",
        color: "red",
        loading: false,
      });
      break;
    // Puedes agregar más casos según sea necesario
    default:
      break;
  }
}

export async function editProduct(
  id: string,
  product: any,
  update: () => void,
  userId: string
) {
  try {
    const userIdEncrypted = CryptoJS.AES.encrypt(
      userId,
      process.env.NEXT_PUBLIC_CRYPTOJS_KEY
    ).toString();
    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/product/${id}`,
      product,
      {
        headers: {
          Authorization: `${userIdEncrypted}`,
        },
      }
    );

    if (res.status === 200) {
      notifications.show({
        id: "product",
        autoClose: 5000,
        withCloseButton: false,
        title: "Producto actualizado",
        message: "El producto ha sido actualizado correctamente.",
        color: "green",
        loading: false,
      });
      update();
    } else {
      handleEditErrorResponse(res);
    }
  } catch (error) {
    notifications.show({
      id: "product",
      autoClose: 5000,
      withCloseButton: false,
      title: "Error editando al producto",
      message:
        "Ocurrió un error editando al producto. Por favor, intenta de nuevo.",
      color: "red",
      loading: false,
    });
  }
}

function handleEditErrorResponse(response: any) {
  switch (response.status) {
    case 500:
      notifications.show({
        id: "product",
        autoClose: 5000,
        withCloseButton: false,
        title: "Error editando al producto",
        message:
          "Ocurrió un error editando al producto. Por favor, intenta de nuevo.",
        color: "red",
        loading: false,
      });
      break;

    case 401:
      notifications.show({
        id: "member",
        autoClose: 5000,
        withCloseButton: false,
        title: "Usuario inautorizado",
        message: "No tienes permisos para editar al producto.",
        color: "red",
        loading: false,
      });
      break;
    // Puedes agregar más casos según sea necesario
    default:
      break;
  }
}

export function deleteProduct(
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
    .delete(`${process.env.NEXT_PUBLIC_API_URL}/product/${id}`, {
      headers: {
        Authorization: `${userIdEncrypted}`,
      },
    })
    .then((res) => {
      if (res.status === 200) {
        notifications.show({
          id: "product",
          autoClose: 5000,
          withCloseButton: false,
          title: "Producto eliminado",
          message: "El producto ha sido eliminado correctamente.",
          color: "green",
          loading: false,
        });
        update();
        handleOpen();
      }
      if (res.status === 500) {
        notifications.show({
          id: "member",
          autoClose: 5000,
          withCloseButton: false,
          title: "Error",
          message: "Hubo un error eliminando el producto.",
          color: "red",
          loading: false,
        });
      }
      if (res.status === 401) {
        notifications.show({
          id: "member",
          autoClose: 5000,
          withCloseButton: false,
          title: "Usuario inautorizado",
          message: "No tienes permisos para eliminar productos.",
          color: "red",
          loading: false,
        });
      }
    });
}
