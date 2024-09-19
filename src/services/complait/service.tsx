import { notifications } from "@mantine/notifications";
import axios from "axios";

export async function createcomplaint(FormData: any, clear: () => void) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/mail/complaint `;
    const data = FormData;
    const response = await axios.post(url, data);

    if (response.status === 201) {
      notifications.show({
        id: "contact",
        autoClose: 5000,
        withCloseButton: false,
        title: "Noticia creada",
        message: "Los datos se ha enviado correctamente.",
        color: "green",
        loading: false,
      });

      clear();
    }
  } catch (error) {
    console.log("error contact:", error);
    notifications.show({
      id: "contact",
      autoClose: 5000,
      withCloseButton: false,
      title: "Error",
      message: "Ha ocurrido un error al enviar los datos.",
      color: "red",
      loading: false,
    });

    clear();
  }
}
