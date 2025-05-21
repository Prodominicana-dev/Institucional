import { notifications } from "@mantine/notifications";
import axios from "axios";

export async function SendPageEmail(email: any) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/apiv2/mail/pageEmail `;
    const data = email;
    const response = await axios.post(url, data);
    console.log("status", response.status);

    if (response.status === 201) {
      notifications.show({
        id: "sendPage",
        autoClose: 5000,
        withCloseButton: false,
        title: "Pagina Enviada!",
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
