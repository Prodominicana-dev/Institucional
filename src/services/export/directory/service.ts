import { notifications } from "@mantine/notifications";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";
var CryptoJS = require("crypto-js");

export function useExportersPaginated({ perpage, page, search }: any) {
  const fetchExporters = async (page: any) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/export/pagination`;
    const { data } = await axios.post(url, {
      page,
      perpage,
      search,
    });
    return data;
  };
  return useQuery({
    queryKey: ["exporters"],
    queryFn: () => fetchExporters(page),
  });
}

export function useExportersPerPage({
  perPage,
  search = "",
  selectedProduct = "",
  selectedSector = "",
  selectedProvince = "",
}: any) {
  const fetchExporters = async (page: any) => {
    console.log(selectedProduct, selectedSector);
    const url = `${process.env.NEXT_PUBLIC_API_URL}/export/pagination`;
    const { data } = await axios.post(url, {
      page,
      perPage,
      search,
      selectedProduct,
      selectedSector,
      selectedProvince,
    });
    return data;
  };
  return useInfiniteQuery({
    queryKey: ["exporters"],
    queryFn: ({ pageParam }) => fetchExporters(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.meta.next,
  });
}

export function useExporters() {
  return useQuery({
    queryKey: ["exportersAll"],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/export/`;
      const { data } = await axios.get(url);
      return data;
    },
  });
}

export function useExportersProducts(lang: string) {
  return useQuery({
    queryKey: ["exportersProducts"],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/product/exported`;
      const { data } = await axios.post(url, {
        lang,
      });
      return data;
    },
  });
}

export function useExportersSectors(lang: string) {
  return useQuery({
    queryKey: ["exportersSectors"],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/sector/exported`;
      const { data } = await axios.post(url, {
        lang,
      });
      return data;
    },
  });
}

export function useExportersProvinces() {
  return useQuery({
    queryKey: ["exportersProvinces"],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/export/provinces`;
      const { data } = await axios.get(url);
      return data;
    },
  });
}

export function useGalleryById(id: string) {
  return useQuery({
    queryKey: ["memberById", id],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/gallery/${id}`;
      const { data } = await axios.get(url);
      return data;
    },
  });
}

export function useGalleryByNameAndLang(name: string) {
  return useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/gallery/nm/${name}`;
      const { data } = await axios.get(url);
      return data;
    },
  });
}

export async function createExporter(
  exporter: any,
  update: () => void,
  userId: string
) {
  try {
    const userIdEncrypted = CryptoJS.AES.encrypt(
      userId,
      process.env.NEXT_PUBLIC_CRYPTOJS_KEY
    ).toString();

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/export`,
      exporter,
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
        title: "Colaborador creada",
        message: "El colaborador ha sido creada correctamente.",
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
      title: "Error creando al colaborador",
      message: "Ocurrió un error creando al colaborador.",
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
        title: "Error creando al colaborador",
        message: "Ocurrió un error creando al colaborador.",
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
        message: "No tienes permisos para crear un colaborador.",
        color: "red",
        loading: false,
      });
      break;
    // Puedes agregar más casos según sea necesario
    default:
      break;
  }
}

export async function editExporter(
  id: string,
  gallery: any,
  update: () => void,
  userId: string
) {
  try {
    const userIdEncrypted = CryptoJS.AES.encrypt(
      userId,
      process.env.NEXT_PUBLIC_CRYPTOJS_KEY
    ).toString();
    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/export/${id}`,
      gallery,
      {
        headers: {
          Authorization: `${userIdEncrypted}`,
        },
      }
    );

    if (res.status === 200) {
      notifications.show({
        id: "member",
        autoClose: 5000,
        withCloseButton: false,
        title: "Colaborador actualizada",
        message: "El colaborador ha sido actualizado correctamente.",
        color: "green",
        loading: false,
      });
      update();
    } else {
      handleEditErrorResponse(res);
    }
  } catch (error) {
    notifications.show({
      id: "member",
      autoClose: 5000,
      withCloseButton: false,
      title: "Error editando al colaborador",
      message:
        "Ocurrió un error editando al colaborador. Por favor, intenta de nuevo.",
      color: "red",
      loading: false,
    });
  }
}

function handleEditErrorResponse(response: any) {
  switch (response.status) {
    case 500:
      notifications.show({
        id: "member",
        autoClose: 5000,
        withCloseButton: false,
        title: "Error editando al colaborador",
        message:
          "Ocurrió un error editando al colaborador. Por favor, intenta de nuevo.",
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
        message: "No tienes permisos para editar un colaborador.",
        color: "red",
        loading: false,
      });
      break;
    // Puedes agregar más casos según sea necesario
    default:
      break;
  }
}

export function deleteExporter(
  rnc: string,
  handleOpen: () => void,
  update: () => void,
  userId: string
) {
  const userIdEncrypted = CryptoJS.AES.encrypt(
    userId,
    process.env.NEXT_PUBLIC_CRYPTOJS_KEY
  ).toString();
  return axios
    .delete(`${process.env.NEXT_PUBLIC_API_URL}/export/${rnc}`, {
      headers: {
        Authorization: `${userIdEncrypted}`,
      },
    })
    .then((res) => {
      if (res.status === 200) {
        notifications.show({
          id: "member",
          autoClose: 5000,
          withCloseButton: false,
          title: "Galería eliminada",
          message:
            "La galería y todas las fotos asociadas a esta galería han sido eliminada correctamente.",
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
          message: "Hubo un error borrando la galería.",
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
          message: "No tienes permisos para eliminar la galería.",
          color: "red",
          loading: false,
        });
      }
    });
}
