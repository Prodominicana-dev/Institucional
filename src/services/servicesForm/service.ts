import { notifications } from "@mantine/notifications";
import axios from "axios";

export async function createServiceForm(FormData: any, clear: () => void) {
    console.log('klk data',FormData);
    
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/mail/servicesform `;
    const data = FormData;
    const response = await axios.post(url, data);

    if (response.status === 201) {
      notifications.show({
        id: "service",
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
    console.log("error service:", error);
    notifications.show({
      id: "service",
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
