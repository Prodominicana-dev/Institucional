import { notifications } from "@mantine/notifications";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
var CryptoJS = require("crypto-js");

/* Mismo criterio que en noticias: una guía en PDF pesa decenas de MB y el
   hosting compartido de la API es lento subiendo. */
const UPLOAD_TIMEOUT_MS = 5 * 60 * 1000;

/* Listado de los PDF que abren los códigos QR.

   Sin reintentos: si la API no responde, conviene decirlo de una vez en
   pantalla. Con los tres reintentos por defecto el usuario se queda mirando
   el indicador de carga varios segundos antes de enterarse. */
export function useQrDocs() {
  return useQuery({
    queryKey: ["qrDocs"],
    retry: false,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/qr-docs`;
      const { data } = await axios.get(url);
      return data;
    },
  });
}

/* Elimina un documento de la carpeta de los códigos QR.

   Es la vía para corregir un nombre mal escrito: se borra el archivo y se
   vuelve a subir con el nombre correcto. La API guarda una copia antes de
   borrar. */
export async function deleteQrDoc(
  name: string,
  handleOpen: () => void,
  update: () => void,
  userId: string
): Promise<boolean> {
  const userIdEncrypted = CryptoJS.AES.encrypt(
    userId,
    process.env.NEXT_PUBLIC_CRYPTOJS_KEY
  ).toString();

  try {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/qr-docs/${encodeURIComponent(name)}`,
      { headers: { Authorization: `${userIdEncrypted}` } }
    );

    if (res.status === 200) {
      toast.success("El documento se eliminó correctamente.");
      update();
      handleOpen();
      return true;
    }

    toast.error("No se pudo eliminar el documento.");
    return false;
  } catch (error: any) {
    notifications.show({
      id: "qrDoc",
      autoClose: 5000,
      withCloseButton: false,
      title: "Error al eliminar el documento",
      message:
        error?.response?.data?.message ??
        "Ocurrió un error eliminando el documento. Intenta de nuevo.",
      color: "red",
    });
    toast.error("No se pudo eliminar el documento.");
    return false;
  }
}

/* Sube un PDF nuevo o reemplaza uno existente. El nombre viaja en el
   formulario: cuando es un reemplazo lo fija la pantalla, no el archivo. */
export async function uploadQrDoc(
  document: FormData,
  update: () => void,
  userId: string,
  onProgress?: (percent: number) => void
): Promise<boolean> {
  const userIdEncrypted = CryptoJS.AES.encrypt(
    userId,
    process.env.NEXT_PUBLIC_CRYPTOJS_KEY
  ).toString();

  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/qr-docs`,
      document,
      {
        headers: { Authorization: `${userIdEncrypted}` },
        timeout: UPLOAD_TIMEOUT_MS,
        onUploadProgress: (event) => {
          if (onProgress && event.total) {
            onProgress(Math.round((event.loaded * 100) / event.total));
          }
        },
      }
    );

    if (res.status === 201) {
      toast.success(
        res.data?.replaced
          ? "El documento fue reemplazado. El código QR ya abre el archivo nuevo."
          : "El documento se subió correctamente."
      );
      update();
      return true;
    }

    toast.error("No se pudo guardar el documento.");
    return false;
  } catch (error: any) {
    notifications.show({
      id: "qrDoc",
      autoClose: 5000,
      withCloseButton: false,
      title: "Error al guardar el documento",
      message:
        error?.response?.data?.error ??
        error?.response?.data?.message ??
        "Ocurrió un error subiendo el documento. Intenta de nuevo.",
      color: "red",
    });
    toast.error("No se pudo guardar el documento.");
    return false;
  }
}
