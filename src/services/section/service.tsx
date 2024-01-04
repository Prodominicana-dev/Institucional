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

export function createSection({
  section,
  handleOpen,
  updateProducts,
  userId,
}: {
  section: Section;
  handleOpen: () => void;
  updateProducts: () => void;
  userId: string;
}) {
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
          title: "Producto creado",
          message: "El producto ha sido creado correctamente.",
          color: "green",
          loading: false,
        });
        handleOpen();
        updateProducts();
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
