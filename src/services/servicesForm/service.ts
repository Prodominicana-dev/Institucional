import { notifications } from "@mantine/notifications";
import axios from "axios";

export async function createServiceForm(FormData: any, clear: () => void) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/mail/servicesform `;
    const data = FormData;
    // console.log("data", data);
    
    const response = await axios.post(url, data);

    if (response.status === 201) {
      notifications.show({
        autoClose: 5000,
        withCloseButton: false,
        title: "Solicitud creada",
        message: "Los datos se han enviado correctamente.",
        color: "green",
        loading: false,
        style: {
          zIndex: 1500, // Más alto que cualquier diálogo o fondo del diálogo
        },
      });
      clear();
    }
  } catch (error) {
    notifications.show({
      id: "servicesfrom",
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
export async function createServiceUser(email: any) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/mail/servicesUsers `;
    const response = await axios.post(url, email);

    if (response.status === 201) {
      notifications.show({
        id: "servicesUser",
        autoClose: 5000,
        withCloseButton: false,
        title: "Noticia creada",
        message: "Los datos se ha enviado correctamente.",
        color: "green",
        loading: false,
      });
    }
  } catch (error) {
    console.log("error service:", error);
    notifications.show({
      id: "servicesUser",
      autoClose: 5000,
      withCloseButton: false,
      title: "Error",
      message: "Ha ocurrido un error al enviar los datos.",
      color: "red",
      loading: false,
    });
  }
}
